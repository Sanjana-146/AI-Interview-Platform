# AI-Powered Interview Preparation Platform

An AI-powered web application that helps students, freshers, and professionals prepare for interviews through personalized questions, mock interview practice, and AI-generated feedback.

## About the Project
Preparing for interviews can be challenging, especially when candidates don't have access to personalized practice or feedback. This platform makes interview preparation more interactive by generating questions based on the user's selected role, experience, technical skills, and interview preferences.

Users can configure mock interviews, practise answering questions, review feedback, and track their previous sessions in one place.
### Features
Personalized Interview Setup: Configure interviews based on company, job role, experience level, job description, technical skills, difficulty, and duration.
AI-Generated Questions: Generate interview questions tailored to the selected interview settings using the Gemini API.
Interactive Mock Interviews: Practise answering questions in a structured interview environment with a timer.
Speech Recognition: Use speech-to-text functionality to practise answering questions verbally.
Text-to-Speech: Listen to questions using speech output for a more interactive practice experience.
AI-Powered Feedback: Review feedback and scores to understand performance and identify areas for improvement.
ATS Resume Scoring: Evaluate a resume using the platform's resume-scoring functionality.
Interview History: Review previous interview sessions and track preparation progress.
User Authentication: Register and log in to access personalized interview features.

##Tech Stack

React.js ->	Frontend development and user interface
JavaScript ->	Application functionality
Tailwind CSS ->	Styling and responsive UI
Node.js ->	Backend runtime
Express.js ->	Backend APIs and server
MongoDB ->	Database and application data
Gemini API ->	AI-powered question generation and feedback
React SpeechRecognition API ->	Speech-to-text functionality
JWT ->	Authentication
Git & GitHub ->	Version control

## How it Works

Register or log in to access the platform.
Configure an interview by selecting the role, experience level, difficulty, duration, and relevant skills.
Generate questions based on the selected interview preferences.
Start practising by answering questions in the mock interview interface, including available speech features.
Review feedback and scores to understand your performance.
Track your progress by revisiting previous interview sessions.

## Sreenshots

1. Home Page
<img width="1891" height="910" alt="Screenshot 2026-09-28 115327" src="https://github.com/user-attachments/assets/09c38057-dbca-414e-86ca-711cfe0253a1" />

2. Interview Setup
<img width="1902" height="880" alt="Screenshot 2026-10-01 083705" src="https://github.com/user-attachments/assets/19ece7d6-b1c1-48aa-8324-9e85164da6d4" />

3. Mock Interview
<img width="1907" height="872" alt="Screenshot 2026-10-01 084129" src="https://github.com/user-attachments/assets/7d7003ca-8b26-428c-a8dc-7af144aed5bc" />

4. Feedback
5. <img width="1919" height="947" alt="Screenshot 2026-03-11 185019" src="https://github.com/user-attachments/assets/f42f6ae9-6997-4c9d-bfa2-99eff83325ea" />
<img width="1919" height="934" alt="Screenshot 2026-03-11 185006" src="https://github.com/user-attachments/assets/bdd3f84d-8f7b-4de3-b04d-5b895ee21941" />

## Getting Started

Follow these steps to run the project locally. The commands below assume separate frontend and backend applications; adjust the folder names and scripts to match your repository.

Prerequisites
Node.js and npm
MongoDB or a MongoDB connection string
Gemini API key
Git

1. Clone the Repository

git clone https://github.com/Sanjana-146/AI-Interview-Platform

2. Set Up the Backend
Open the backend directory:

cd backend
npm install

Create a .env file in the backend directory and add the environment variables required by your application. For example:

PORT=4000
MONGO_URI='mongodb+srv://sanjanaPatel:Major-Project01@cluster0.dsulln4.mongodb.net'
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

Start the backend using the script configured in your package.json, for example:

npm run start

3. Set Up the Frontend

Open a separate terminal and navigate to the frontend directory:

cd frontend
npm install

Configure the frontend's backend API URL using the environment variable expected by your application. For example, a Vite application commonly uses:

VITE_API_URL=http://localhost:4000

Start the frontend:

npm run dev

Open the local URL shown in the terminal.

## Project Structure

The application contains frontend and backend functionality.

Frontend

User interface and interview configuration
Mock interview experience
Speech-related interactions
Feedback and interview history screens
API communication with the backend

Backend

Authentication and protected endpoints
Interview-related APIs
User and interview data handling
Integration with AI-powered functionality
Database operations

## What I Learned

Through this project, I gained practical experience with:

Developing interactive web applications using React.js.
Connecting frontend components with backend APIs.
Understanding authentication and protected routes.
Working with MongoDB and application data.
Integrating AI APIs into a web application.
Exploring speech recognition and text-to-speech functionality.
Collaborating on a team-based software project.

## Future Improvements
Improve the accuracy and usefulness of interview feedback.
Add more detailed performance analytics and progress tracking.
Expand question categories and interview templates.
Improve the user experience across devices.
Add more personalized recommendations based on previous interview performance.

Developed as an academic team project.
