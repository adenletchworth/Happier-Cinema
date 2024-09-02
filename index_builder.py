import os
import sqlite3
import logging
import pandas as pd
from sentence_transformers import SentenceTransformer

class IndexBuilder:
    def __init__(self, data_path, embedding_db_path, desired_columns=None):
        # Ensure the data path exists
        assert os.path.exists(data_path), f"Data path does not exist: {data_path}"
        
        if desired_columns is None:
            desired_columns = ['id', 'title', 'genres', 'overview', 'popularity', 'vote_average', 'release_date']
        
        self.data_path = data_path
        self.embedding_db_path = embedding_db_path
        
        # Set up logging
        logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
        
        # Load data
        self.movies_data = self.load_and_preprocess_data(desired_columns)
        
        # Initialize Sentence Transformer model
        self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L12-v2')
        
        # Set up SQLite connection
        self.conn = sqlite3.connect(self.embedding_db_path)
        self.c = self.conn.cursor()
        self.setup_embedding_db()

    def load_and_preprocess_data(self, desired_columns):
        """Load and preprocess the movie data."""
        logging.info("Loading and preprocessing data...")
        movies_data_raw = pd.read_csv(self.data_path)
        assert not movies_data_raw.empty, "Loaded data is empty"
        
        movies_data_filtered = movies_data_raw[desired_columns]
        movies_data = self.preprocess(movies_data_filtered)
        return movies_data
    
    def preprocess(self, movies_data):
        """Preprocess the movie data."""
        logging.info("Preprocessing data...")
        movies_data = movies_data.dropna(subset=['genres', 'overview', 'title'])
        assert not movies_data.empty, "Preprocessed data is empty after dropping NA values"
        
        movies_data = movies_data.fillna('N/A')
        movies_data['overview_original'] = movies_data['overview']  # Preserve original overview before chunking
        return movies_data
    
    def setup_embedding_db(self):
        """Set up the SQLite database to store embeddings."""
        logging.info("Setting up the SQLite database...")
        self.c.execute('''
            CREATE TABLE IF NOT EXISTS embeddings_progress (
                id INTEGER PRIMARY KEY,
                embedding BLOB
            )
        ''')
        self.conn.commit()

    def save_embedding_to_db(self, movie_id, embedding):
        """Save an embedding to the SQLite database."""
        self.c.execute('''
            INSERT INTO embeddings_progress (id, embedding)
            VALUES (?, ?)
        ''', (movie_id, embedding))
        self.conn.commit()

    def get_processed_ids(self):
        """Get the IDs of movies for which embeddings have already been generated."""
        self.c.execute('SELECT id FROM embeddings_progress')
        return set(row[0] for row in self.c.fetchall())

    def generate_embeddings(self, chunk_size=100):
        """Generate embeddings in chunks and save progress."""
        assert chunk_size > 0, "Chunk size must be greater than zero"
        
        processed_ids = self.get_processed_ids()
        total_rows = len(self.movies_data)
        logging.info(f"Starting embedding generation for {total_rows} movies...")

        for start in range(0, total_rows, chunk_size):
            end = min(start + chunk_size, total_rows)
            chunk = self.movies_data.iloc[start:end]

            for _, row in chunk.iterrows():
                movie_id = row['id']
                if movie_id not in processed_ids:
                    logging.info(f"Generating embedding for movie ID: {movie_id}")
                    try:
                        embedding = self.model.encode(row['overview'], show_progress_bar=False)
                        assert embedding is not None, f"Embedding generation failed for movie ID: {movie_id}"
                        self.save_embedding_to_db(movie_id, embedding)
                    except Exception as e:
                        logging.error(f"Error generating embedding for movie ID: {movie_id}: {e}")

        logging.info("Completed embedding generation.")

    def close(self):
        """Close the SQLite connection."""
        logging.info("Closing SQLite connection...")
        self.conn.close()

if __name__ == "__main__":
    data_path = '/Data/movies.csv'
    embedding_db_path = '/Data/embeddings.db'

    index_builder = IndexBuilder(data_path, embedding_db_path)
    index_builder.generate_embeddings(chunk_size=100)
    index_builder.close()
