import numpy as np
import faiss
import pickle
import sqlite3
import pandas as pd
from langchain_community.vectorstores import FAISS
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain.schema import Document
import os

class IndexBuilder:
    def __init__(self, data_path, embedding_db_path, desired_columns=None):
        if desired_columns is None:
            desired_columns = ['id', 'title', 'genres', 'overview', 'popularity', 'vote_average', 'release_date']
        
        self.data_path = data_path
        self.embedding_db_path = embedding_db_path
        
        self.movies_data = self.load_and_preprocess_data(desired_columns)
        
        self.conn = sqlite3.connect(self.embedding_db_path)
        self.c = self.conn.cursor()
    
    def load_and_preprocess_data(self, desired_columns):
        """Load and preprocess the movie data."""
        movies_data_raw = pd.read_csv(self.data_path)
        movies_data_filtered = movies_data_raw[desired_columns]
        movies_data = self.preprocess(movies_data_filtered)
        return movies_data
    
    def preprocess(self, movies_data):
        """Preprocess the movie data."""
        movies_data = movies_data.dropna(subset=['genres', 'overview', 'title'])
        movies_data = movies_data.fillna('N/A')
        movies_data['overview_original'] = movies_data['overview']  # Preserve original overview before chunking
        return movies_data

    def load_embeddings_from_db(self):
        """Load embeddings from the SQLite database and merge them into the DataFrame."""
        self.c.execute('SELECT id, embedding FROM embeddings_progress')
        embeddings_data = self.c.fetchall()
        
        embeddings_df = pd.DataFrame(embeddings_data, columns=['id', 'embedding'])
        
        self.movies_data = pd.merge(self.movies_data, embeddings_df, on='id', how='left')

        self.movies_data['embedding'] = self.movies_data['embedding'].apply(lambda x: np.frombuffer(x, dtype=np.float32))
    
    def aggregate_embeddings(self):
        """Aggregate embeddings and other metadata by title and genre."""
        aggregated_df = self.movies_data.groupby(['title', 'genres']).agg({
            'embedding': lambda x: np.mean(np.vstack(x), axis=0),
            'overview_original': ' '.join, 
            'popularity': 'mean',
            'vote_average': 'mean',
            'release_date': lambda x: x.iloc[0]  
        }).reset_index()
        
        return aggregated_df

    def build_faiss_index(self, aggregated_df, path='Index/'):
        """Build and persist the FAISS index, document store, and index_to_docstore_id mapping."""

        os.makedirs(path, exist_ok=True)

        embeddings_array = np.vstack(aggregated_df['embedding'].values).astype('float32')

        dimension = embeddings_array.shape[1]
        nlist = 100  # Number of clusters

        quantizer = faiss.IndexFlatL2(dimension)

        faiss_index = faiss.IndexIVFFlat(quantizer, dimension, nlist, faiss.METRIC_L2)

        faiss_index.train(embeddings_array)

        faiss_index.add(embeddings_array)

        docs = [
            Document(
                page_content=row['title'],
                metadata={
                    'title': row['title'],
                    'genre': row['genres'],
                    'popularity': row['popularity'],
                    'vote_average': row['vote_average'],
                    'release_date': row['release_date'],
                    'overview': row['overview_original']
                }
            )
            for _, row in aggregated_df.iterrows()
        ]

        docstore = InMemoryDocstore({str(i): doc for i, doc in enumerate(docs)})

        index_to_docstore_id = {i: str(i) for i in range(len(docs))}

        vector_store = FAISS(
            index=faiss_index,
            docstore=docstore,
            index_to_docstore_id=index_to_docstore_id,
            embedding_function=None  
        )

        faiss.write_index(faiss_index, os.path.join(path, "faiss_index.bin"))

        with open(os.path.join(path, "docstore.pkl"), "wb") as f:
            pickle.dump(docstore, f)

        with open(os.path.join(path, "index_to_docstore_id.pkl"), "wb") as f:
            pickle.dump(index_to_docstore_id, f)

    def close(self):
        """Close the SQLite connection."""
        self.conn.close()

if __name__ == "__main__":
    data_path = 'Data/movies.csv'
    embedding_db_path = 'Data/embeddings.db'

    index_builder = IndexBuilder(data_path, embedding_db_path)
    
    index_builder.load_embeddings_from_db()
    aggregated_df = index_builder.aggregate_embeddings()
    index_builder.build_faiss_index(aggregated_df)
    
    index_builder.close()
    

