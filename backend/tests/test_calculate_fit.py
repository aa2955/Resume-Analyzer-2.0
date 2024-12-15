def test_calculate_fit_score(client):
    data = {
        "resume_text": "Experience in Python and JavaScript",
        "job_description": "Looking for Python expertise"
    }
    response = client.post("/api/calculate-fit", json=data)
    assert response.status_code == 200
    result = response.json()
    assert result["fit_score"] > 0
    assert "matched_keywords" in result
    assert "unmatched_keywords" in result
    assert "feedback" in result
