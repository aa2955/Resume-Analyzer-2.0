import os

def test_full_workflow(client):
   
    file_path = os.path.join(os.path.dirname(__file__), "test_resume.pdf")
 
    assert os.path.exists(file_path), f"Test file not found: {file_path}"
   
    with open(file_path, "rb") as file:
        files = {"resume_file": ("test_resume.pdf", file, "application/pdf")}
        response = client.post("/api/resume-upload", files=files)
    
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    assert "extracted_text" in response.json(), "Response missing extracted text"


def test_upload_invalid_file_type(client):

    file_path = os.path.join(os.path.dirname(__file__), "test_image.jpg")
    

    assert os.path.exists(file_path), f"Test file not found: {file_path}"

    with open(file_path, "rb") as file:
        files = {"resume_file": ("test_image.jpg", file, "image/jpeg")}
        response = client.post("/api/resume-upload", files=files)

    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    assert "Invalid file type" in response.json()["detail"]
    assert "PDF" in response.json()["detail"]
    assert "WORD" in response.json()["detail"]