from langchain_community.vectorstores import FAISS
from sentence_transformers import SentenceTransformer
import faiss
import pickle
import warnings

warnings.filterwarnings("ignore")

class IndexSearch:
    def __init__(self, index_path, docstore_path, docstore_id_path):
        self.index = faiss.read_index(index_path)

        assert docstore_path, "Document store path must be provided."
        with open(docstore_path, "rb") as f:
            self.docstore = pickle.load(f)

        assert docstore_id_path, "Index to docstore ID path must be provided."
        with open(docstore_id_path, "rb") as f:
            self.index_to_docstore_id = pickle.load(f)

        self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L12-v2')

        self.faiss_index = FAISS(
            index=self.index,
            docstore=self.docstore,
            index_to_docstore_id=self.index_to_docstore_id,
            embedding_function=self.model.encode
        )

    def search(self, query, k=5, genre_filter=None, min_vote_average=None, after_year=None, before_year=None, initial_k=10, max_k=1000):
        query_embedding = self.model.encode(query).astype('float32')

        current_k = initial_k
        filtered_results = []

        doc_ids = list(self.docstore._dict.keys())

        # Attempt counter to prevent infinite loops
        attempt_counter = 0

        while len(filtered_results) < k and current_k <= max_k:
            search_results = self.faiss_index.similarity_search_by_vector(query_embedding, k=current_k)
            print(f"Current k: {current_k}, Results Retrieved: {len(search_results)}")

            for result in search_results:
                metadata = result.metadata

                if genre_filter and genre_filter not in metadata.get('genre', 'N/A'):
                    continue

                vote_average = metadata.get('vote_average', 'N/A')
                if min_vote_average is not None and (vote_average == 'N/A' or float(vote_average) < min_vote_average):
                    continue

                release_date = metadata.get('release_date', 'N/A')
                release_year_str = release_date.split("-")[0] if release_date != 'N/A' else None
                if release_year_str is not None:
                    release_year = int(release_year_str)
                    if after_year and release_year <= after_year:
                        continue
                    if before_year and release_year >= before_year:
                        continue

                filtered_results.append(result)

            print(f"Filtered Results: {len(filtered_results)}")
            if len(filtered_results) < k:
                current_k = min(current_k * 2, max_k)
            else:
                break

            # Break out of the loop if it becomes clear we're not finding any results
            attempt_counter += 1
            if attempt_counter >= 10:  # Arbitrary limit to prevent infinite loops
                print("No results meet the filter criteria after multiple attempts.")
                break

        return [f"{result.metadata['title']} ({result.metadata.get('release_date', 'Unknown').split('-')[0]}) - {result.metadata['genre']}"
                for result in filtered_results[:k]] or ["No results match the given filters."]


if __name__ == "__main__":
    index_path = "Index/faiss_index.bin"
    docstore_path = "Index/docstore.pkl"
    docstore_id_path = "Index/index_to_docstore_id.pkl"

    search_instance = IndexSearch(index_path, docstore_path, docstore_id_path)
    results = search_instance.search(
        "Wandering her rambling old house in her boring new town, an 11-year-old Coraline discovers a hidden door to a strangely idealized version of her life. In order to stay in the fantasy, she must make a frighteningly real sacrifice.",
        k=5,
        genre_filter="Drama",
        min_vote_average=10.0,  
        after_year=2000,  
        before_year=2020,
        initial_k=10,  
        max_k=10
    )

    for result in results:
        print(result)
