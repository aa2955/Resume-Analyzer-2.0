import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import mammoth from 'mammoth';
import LoadingSpinner from './LoadingSpinner';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

const ResumeUpload = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [message, setMessage] = useState('');
  const [resumeCheck, setResumeCheck] = useState(false);
  const [preview, setPreview] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const [isWORD, setIsWORD] = useState(false);
  const [docxPreview, setDocxPreview] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setIsPDF(file.type === 'application/pdf');
      setIsWORD(file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 2) {
        setMessage('File Larger Than 2MB');
        setResumeCheck(false);
        setResumeFile(null);
        return;
      }

      setResumeCheck(true);
      setResumeFile(file);
      setPreview(true);
      setMessage('');
    } else {
      setMessage('Please upload a valid PDF or DOCX file.');
      setResumeFile(null);
      setResumeCheck(false);
    }
  };

  const handleCharCount = (e) => {
    const text = e.target.value;
    if (text.length <= 5000) {
      setJobDescription(text);
      setCharCount(text.length);
      setMessage(text.length >= 4000 ? 'Max Char almost reached!!!' : '');
    } else {
      setMessage('Max Char Limit Reached');
    }
  };

  const handleClear = () => {
    setCharCount(0);
    setJobDescription('');
  };

  const handleResumeCheck = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (resumeCheck) {
        const formData = new FormData();
        formData.append('resume_file', resumeFile);

        const response = await fetch('http://127.0.0.1:8000/api/resume-upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setPreview(false);
          setMessage('Uploaded Successfully');
        } else {
          const errorData = await response.json();
          setMessage(errorData.detail || 'Failed to upload resume.');
        }
      } else {
        throw new Error('Invalid File');
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJobDescriptionSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/job-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_description: jobDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || 'Failed to submit job description.');
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="container">
      {loading && <LoadingSpinner />}
      <form onSubmit={handleResumeCheck}>
        <h2>Resume Upload</h2>
        <input
          data-testid="resume-file-input"
          type="file"
          id= "resume-file"
          // accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          required
        />
        <button type="submit" id="resume-button">Submit Resume</button>
      </form>
      <form onSubmit={handleJobDescriptionSubmit}>
        <label>
          Job Description
          <textarea
            value={jobDescription}
            rows={5}
            onChange={handleCharCount}
            required
          />
        </label>
        <p>Character Count: {charCount}/5000</p>
        <button type="submit">Submit Job Description</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default ResumeUpload;
