from fastapi.testclient import TestClient
from main import app  # Import your FastAPI app

client = TestClient(app)

def test_get_recommendations_success():
    # Define a sample request body
    request_data = {
        "Skills": "python developer",
        "LocationPreference": "delhi"
    }
    
    # Make a POST request to your endpoint
    response = client.post("/recommend/?top_n=3", json=request_data)
    
    # Assert that the request was successful (status code 200)
    assert response.status_code == 200
    
    # Assert that the response body is a dictionary and has the 'recommendations' key
    response_json = response.json()
    assert "recommendations" in response_json
    assert isinstance(response_json["recommendations"], list)
    
    # If recommendations are returned, check the structure of the first one
    if len(response_json["recommendations"]) > 0:
        first_rec = response_json["recommendations"][0]
        assert "Title" in first_rec
        assert "Score" in first_rec

def test_invalid_request():
    # Test a request with missing 'Skills' field (should fail validation)
    response = client.post("/recommend/", json={"LocationPreference": "delhi"})
    assert response.status_code == 422 # Unprocessable Entity