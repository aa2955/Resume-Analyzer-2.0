# 🧠 AI-Powered Resume Analyzer

This web application helps job seekers improve their resumes and understand how well they match specific job descriptions. Powered by AI, it provides personalized feedback and a relevance score to help users tailor their applications more effectively.

---

## 🛠 Tech Stack

**Frontend:**  
- Next.js (React)  
- HTML/CSS  
- Axios  

**Backend:**  
- FastAPI (Python)  
- Hugging Face Transformers (BERT)  
- Pinecone (vector search)  
- PostgreSQL  

**Authentication:**  
- JWT-based auth  

**DevOps & Deployment:**  
- AWS Lambda (serverless backend)  
- Vercel (frontend hosting)  
- GitHub Actions (CI/CD)  

---

## ✅ Key Features

### 1. User Accounts & Login  
Users can sign up or log in to access their dashboard, manage resumes, and track analysis history.

### 2. Resume Upload  
After logging in, users can upload their resumes in PDF or Word format. The app will process the content automatically.

### 3. Job Description Comparison  
Users can paste a job listing or upload a job description file to compare it with their resume.

### 4. Match Score & Feedback  
The app generates a match score that shows how well the resume aligns with the selected job description. Users receive categorized feedback on:
- Skills match
- Experience alignment
- Formatting suggestions
- Missing keywords or buzzwords

### 5. Improvement Suggestions  
The platform offers specific, actionable suggestions to increase the match score and improve resume quality.

### 6. Saved Results  
Users can view and revisit their previous analyses to track progress or apply changes.

### 7. Optional Job Board Integration (Future Feature)  
Users may browse job listings from supported platforms and directly analyze their resume against listings with one click.

---

## 🗂️ Sprints & Milestones

### 🟢 **Sprint 1: MVP Setup**
- Project planning and repo setup
- Resume upload UI
- Basic FastAPI backend with mock analysis response
- Local testing of Hugging Face model inference

### 🟡 **Sprint 2: Core Functionality**
- Integrate Pinecone for semantic job matching
- Upload + parse job descriptions
- Resume-job scoring logic
- Basic feedback structure

### 🟠 **Sprint 3: UI Feedback & Analysis**
- Build results page with categorized feedback
- Match score visualization (progress bar, %)
- Error handling and UI polish

### 🔵 **Sprint 4: Authentication & User Dashboard**
- JWT-based login/register
- Save & view previous analyses
- Build user dashboard

### 🟣 **Sprint 5: Testing & Deployment**
- Frontend/backend testing (unit + integration)
- Deploy backend to AWS Lambda
- Deploy frontend to Vercel
- Setup CI/CD with GitHub Actions

---

## 🧠 How AI Is Used

This application uses Artificial Intelligence to provide deep, semantic-level analysis of resumes and job descriptions:

- **Natural Language Understanding:**  
  Utilizes BERT-based transformer models (via Hugging Face Transformers) to generate semantic embeddings of both resumes and job descriptions, capturing the true meaning beyond exact keyword matches.

- **Semantic Similarity Matching:**  
  Uses Pinecone’s vector search engine to compare resume embeddings against job descriptions and return a relevance score based on cosine similarity.

- **Skill & Keyword Extraction:**  
  Identifies missing or underrepresented skills by comparing high-weighted tokens and phrases from job listings to those in the uploaded resume.

- **Categorized Feedback Engine:**  
  AI-generated feedback is broken down into categories like experience, formatting, and skills — helping users understand where they can improve and why.

- **Future Expansion:**  
  Plans to integrate large language models (LLMs) for conversational resume feedback and auto-improvement suggestions based on job role context.

---

## ⚠️ Limitations

While the platform provides AI-powered insights, there are a few important limitations to note:

- **Generalized Scoring:**  
  The match score is based on semantic similarity and not tailored to specific industries or company preferences.

- **Static Feedback Rules:**  
  Feedback is generated using pattern-based detection and cosine thresholds — it does not yet incorporate true contextual reasoning or deep learning interpretability.

- **Model Bias:**  
  The BERT model may reflect biases present in its training data, which could affect how resumes are interpreted and scored.

- **Limited File Handling:**  
  Currently optimized for clean, text-based PDF or Word resumes. Heavily formatted or image-based files may reduce accuracy.

- **No Human Review:**  
  The system does not replace professional resume reviews or hiring advice — it is meant as a tool to augment, not replace, human judgment.

---



