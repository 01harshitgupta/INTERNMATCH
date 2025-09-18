import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib  # For saving the model

print("Loading dataset...")
df = pd.read_csv("internship.csv")

# Combine text fields for training
df['Combined'] = df['internship_title'].astype(str).str.lower() + ' ' + df['company_name'].astype(str).str.lower()

print("Training TF-IDF vectorizer...")
vectorizer = TfidfVectorizer(stop_words="english")
vectorizer.fit(df['Combined']) # Train the vectorizer

print("Saving vectorizer to disk...")
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')

print("✅ Training complete and model saved!")