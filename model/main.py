#To start the app: uvicorn main:app --reload

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

# Import your recommender class
from recommender import InternshipRecommender

# 1. DEFINE DATA MODELS (using Pydantic)
class CandidateProfile(BaseModel):
    # CHANGED: Used json_schema_extra for example
    Skills: str = Field(..., json_schema_extra={'example': "python data science machine learning"})
    # CHANGED: Used json_schema_extra for example
    LocationPreference: Optional[str] = Field(None, json_schema_extra={'example': "delhi"})

# ... (The Recommendation and RecommendationResponse models are fine and need no changes)
class Recommendation(BaseModel):
    InternshipID: int
    Title: str
    Company: str
    Location: str
    Stipend: float
    Score: float
    Reason: str

class RecommendationResponse(BaseModel):
    recommendations: List[Recommendation]

# 2. INITIALIZE THE APP AND RECOMMENDER
app = FastAPI(
    title="Internship Recommendation API",
    description="An API that recommends internships based on candidate skills.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Add the URL of your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

try:
    recommender = InternshipRecommender(dataset_path="internship.csv")
except RuntimeError as e:
    raise RuntimeError(f"Failed to initialize recommender: {e}")

# 3. CREATE THE API ENDPOINT
@app.post("/recommend/", response_model=RecommendationResponse)
def get_recommendations(profile: CandidateProfile, top_n: int = 5):
    """
    Accepts a candidate's profile and returns a list of top N internship recommendations.
    """
    try:
        # CHANGED: Replaced .dict() with .model_dump()
        profile_dict = profile.model_dump()
        
        results_df = recommender.recommend(candidate=profile_dict, top_n=top_n)
        
        if results_df.empty:
            return {"recommendations": []}

        recommendations_list = results_df.to_dict(orient="records")
        
        return {"recommendations": recommendations_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))