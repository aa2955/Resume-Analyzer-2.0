def test_upload_valid_resume(client):
    with open("test_resume.pdf", "rb") as file:
        response = client.post("/api/resume-upload", files={"resume_file": file})
    assert response.status_code == 200
    assert response.json()["message"] == "Resume uploaded successfully."

def test_upload_invalid_file_type(client):
    with open("test_image.jpg", "rb") as file:
        response = client.post("/api/resume-upload", files={"resume_file": file})
    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid file type. Only PDF or WORD allowed."
