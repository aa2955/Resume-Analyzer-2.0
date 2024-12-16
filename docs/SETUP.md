To run:
1) Clone the github onto your local machine using the following command:
git clone https://github.com/Zarrar5/resume_analyzer_documentation.git

Backend
2)  cd resume_analyzer_documentation/backend
    Requires Python version: 3.10
    pip install -r requirements.txt

    run using fastapi run app.py or [uvicorn app:app --reload]

Frontend
3) Open another terminal and cd ../frontend
    node version: v20.10.0
    npm version: 10.8.2
    npm install
    If the command above command does not work, then do the following:
    npm install vite --save-dev
    npx vite
    npm install @react-pdf-viewer/core@^3.12.0 @react-pdf-viewer/default-layout@^3.12.0 pdfjs-dist@^4.8.69 react@^18.3.1 react-dom@^18.3.1 react-pdf@^9.1.1 react-router-dom@^6.28.0

    npm install --save-dev @eslint/js@^9.13.0 @types/react@^18.3.12 @types/react-dom@^18.3.1 @vitejs/plugin-react@^4.3.3 eslint@^9.13.0 eslint-plugin-react@^7.37.2 eslint-plugin-react-hooks@^5.0.0 eslint-plugin-react-refresh@^0.4.14 globals@^15.11.0 vite@^5.4.11

    run using npm run dev

3) open the local site 

Unit Test
1) Frontend unit test: npx cypress run
2) Backend unit test: pytest