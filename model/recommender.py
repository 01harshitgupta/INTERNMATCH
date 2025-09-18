import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import re

class InternshipRecommender:
    def __init__(self, dataset_path: str):
        try:
            self.df = pd.read_csv(dataset_path)
            # --- LOAD THE PRE-TRAINED MODEL ---
            self.vectorizer = joblib.load('tfidf_vectorizer.pkl')
        except FileNotFoundError as e:
            raise RuntimeError(f"Required file not found: {e}")
            
        self._preprocess()

        # Combine text for transformation, not for training
        self.df['Combined'] = self.df['internship_title'].astype(str).str.lower() + ' ' + self.df['company_name'].astype(str).str.lower()
        
        # --- TRANSFORM THE DATA USING THE LOADED VECTORIZER ---
        self.internship_tfidf_matrix = self.vectorizer.transform(self.df['Combined'])

    def _preprocess(self):
        text_cols = ['internship_title', 'company_name', 'location']
        for col in text_cols:
            self.df[col] = self.df[col].astype(str).fillna('').str.lower().str.strip()

        if 'InternshipID' not in self.df.columns:
            self.df['InternshipID'] = range(1, len(self.df) + 1)

        def parse_stipend(stipend_text):
            stipend_text = str(stipend_text).lower()
            if 'unpaid' in stipend_text:
                return 0.0
            
            numbers = re.findall(r'[\d,]+', stipend_text)
            if not numbers:
                return 0.0
            
            cleaned_numbers = [int(n.replace(',', '')) for n in numbers]
            
            if len(cleaned_numbers) > 1:
                return float(sum(cleaned_numbers) / len(cleaned_numbers))
            else:
                return float(cleaned_numbers[0])

        self.df['stipend'] = self.df['stipend'].apply(parse_stipend)

    def _clean_text(self, text: str) -> str:
        return re.sub(r'[^a-zA-Z0-9\s]', ' ', str(text).lower()).strip()
    
    def _get_match_reason(self, candidate_skills_str: str, internship_title: str) -> str:
        candidate_skills = set(candidate_skills_str.split())
        internship_words = set(internship_title.split())
        matched = candidate_skills.intersection(internship_words)
        if matched:
            return f"Matched skills: {', '.join(matched)}."
        return "Relevant based on title and company."

    def recommend(self, candidate: dict, top_n: int = 5, location_boost: float = 0.1, stipend_boost: float = 0.05):
        candidate_skills = self._clean_text(candidate.get('Skills', ''))
        candidate_loc = self._clean_text(candidate.get('LocationPreference', ''))

        filtered_df = self.df.copy() # Start with a copy of the full dataframe
        # Fallback to the full dataset is handled implicitly now
        if candidate_loc:
             # Prioritize exact matches if preference is given, but don't exclude others
            location_matches = self.df[self.df['location'].str.contains(candidate_loc, na=False)]
            if not location_matches.empty:
                filtered_df = location_matches.copy()

        candidate_text = candidate_skills
        candidate_vec = self.vectorizer.transform([candidate_text])
        
        filtered_indices = filtered_df.index
        filtered_internship_vecs = self.internship_tfidf_matrix[filtered_indices]

        similarity_scores = cosine_similarity(candidate_vec, filtered_internship_vecs).flatten()
        filtered_df['Score'] = similarity_scores

        # --- IMPLEMENTED BOOST LOGIC ---
        # 1. Apply location boost for exact matches
        if candidate_loc:
            filtered_df.loc[filtered_df['location'] == candidate_loc, 'Score'] += location_boost
        
        # 2. Apply stipend boost (normalized by max stipend)
        if stipend_boost > 0 and filtered_df['stipend'].max() > 0:
            stipend_score = filtered_df['stipend'] / filtered_df['stipend'].max()
            filtered_df['Score'] += stipend_score * stipend_boost
        # --- END OF BOOST LOGIC ---

        # Sort by the new, final 'Score' after boosts have been applied
        top_recommendations = filtered_df.sort_values(by='Score', ascending=False).head(top_n)

        # Create the final columns for the output
        top_recommendations = top_recommendations.copy() # Avoid SettingWithCopyWarning
        top_recommendations['Title'] = top_recommendations['internship_title']
        top_recommendations['Company'] = top_recommendations['company_name']
        top_recommendations['Location'] = top_recommendations['location']
        top_recommendations['Stipend'] = top_recommendations['stipend']
        top_recommendations['Reason'] = top_recommendations['internship_title'].apply(
            lambda title: self._get_match_reason(candidate_skills, title)
        )

        # Return only the columns we need
        return top_recommendations[['InternshipID', 'Title', 'Company', 'Location', 'Stipend', 'Score', 'Reason']]