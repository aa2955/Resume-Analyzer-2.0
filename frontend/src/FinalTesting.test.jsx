import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../components/Register'; // path to your Register component
import Login from '../components/Login'; // path to your Login component
import Dashboard from '../components/Dashboard'; // path to your Dashboard component
import { BrowserRouter as Router } from 'react-router-dom'; // Wrap in Router if using react-router

// Test for User Registration
test('User can register successfully', async () => {
    render(
        <Router>
            <Register />
        </Router>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'TestPassword123');
    userEvent.type(confirmPasswordInput, 'TestPassword123');
    
    userEvent.click(submitButton);

    // Check if success message or redirection happens
    const successMessage = await screen.findByText(/registration successful/i);
    expect(successMessage).toBeInTheDocument();
});

// Test for User Login
test('User can login with correct credentials', async () => {
    render(
        <Router>
            <Login />
        </Router>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'TestPassword123');
    
    userEvent.click(loginButton);

    // Check if redirected to dashboard or success message
    const dashboardHeading = await screen.findByText(/welcome to your dashboard/i);
    expect(dashboardHeading).toBeInTheDocument();
});

// Test for Resume Upload and Job Description Submission
test('User can upload a resume and submit job description', async () => {
    render(
        <Router>
            <Dashboard />
        </Router>
    );

    const fileInput = screen.getByLabelText(/upload resume/i);
    const jobDescriptionInput = screen.getByLabelText(/paste job description/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    userEvent.upload(fileInput, file);
    userEvent.type(jobDescriptionInput, 'Sample job description for analysis');

    userEvent.click(submitButton);

    // Check for success message, fit score, or feedback
    const feedback = await screen.findByText(/fit score/i);
    expect(feedback).toBeInTheDocument();
});

// Test for Report Download
test('User can download PDF report', async () => {
    render(
        <Router>
            <Dashboard />
        </Router>
    );

    const downloadButton = screen.getByRole('button', { name: /download report/i });

    userEvent.click(downloadButton);

    // Check for PDF download initiation (this may need to be mocked)
    expect(downloadButton).toHaveAttribute('href', expect.stringContaining('.pdf'));
});
