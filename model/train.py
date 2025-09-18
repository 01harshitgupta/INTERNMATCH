import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

def main():
    """Trains the TF-IDF vectorizer from the raw dataset and saves it."""
    print("Loading dataset: internship.csv...")
    try:
        df = pd.read_csv("internship.csv")
    except FileNotFoundError:
        print("Error: 'internship.csv' not found. Please place it in the same directory.")
        return

    # Combine text fields for training
    df['Combined'] = df['internship_title'].astype(str).str.lower() + ' ' + df['company_name'].astype(str).str.lower()

    print("Training TF-IDF vectorizer...")
    vectorizer = TfidfVectorizer(stop_words="english", min_df=2)
    vectorizer.fit(df['Combined'])

    model_file = 'tfidf_vectorizer.pkl'
    print(f"Saving vectorizer to disk as '{model_file}'...")
    joblib.dump(vectorizer, model_file)

    print("✅ Training complete and model saved!")

if __name__ == "__main__":
    main()