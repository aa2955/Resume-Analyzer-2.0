import os
def test_full_workflow(client):
    # Register User
    client.post("/api/register", data={
        "username": "testuser",
        "email": "test@example.com",
        "password": "TestPassword123"
    })

    # Login User
    login_response = client.post("/api/login", data={
        "username": "testuser",
        "password": "TestPassword123"
    })
    token = login_response.json()["token"]

    # Upload Resume
    file_path = os.path.join(os.path.dirname(__file__), "test_resume.pdf")  # Ensure correct file path
    assert os.path.exists(file_path), f"Test file not found: {file_path}"

    with open(file_path, "rb") as file:
        upload_response = client.post("/api/resume-upload", files={"resume_file": file},
                                      headers={"Authorization": f"Bearer {token}"})
    assert upload_response.status_code == 200

    # Submit Job Description
    job_description = {"job_description": "Looking for Python expertise"}
    jd_response = client.post("/api/job-description", json=job_description,
                               headers={"Authorization": f"Bearer {token}"})
    assert jd_response.status_code == 200

    # Calculate Fit Score
    fit_response = client.post("/api/calculate-fit", json={
        "resume_text": upload_response.json()["extracted_text"],
        "job_description": job_description["job_description"]
    }, headers={"Authorization": f"Bearer {token}"})
    assert fit_response.status_code == 200
    assert "fit_score" in fit_response.json()
