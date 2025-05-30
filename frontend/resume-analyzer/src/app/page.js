import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.readme}>
          <h2>AI Resume Matcher</h2>
          <p>
            ResumeX uses AI to compare your resume against a job description and provides:
          </p>
          <ul>
            <li><strong>Match Score</strong> — how well your resume fits the job</li>
            <li><strong>Smart Suggestions</strong> — areas to improve for a better match</li>
          </ul>

          <h3>How It Works</h3>
          <ol>
            <li>Upload your resume and a job description</li>
            <li>We use semantic analysis with BERT & Pinecone</li>
            <li>Get a detailed fit score + personalized suggestions</li>
          </ol>

          <h3>Powered By</h3>
          <ul>
            <li>🧠 Hugging Face Transformers (BERT)</li>
            <li>📈 Pinecone vector search</li>
            <li>⚙️ Next.js + FastAPI + AWS Lambda</li>
          </ul>

          <div className={styles.ctas}>
            <a
              href="https://github.com/aa2955"
              className={styles.secondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Repo
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 ResumeX · Built with ❤️ by Anurag Agarwal</p>
      </footer>
    </div>
  );
}
