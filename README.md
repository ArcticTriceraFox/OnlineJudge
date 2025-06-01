## Project Progress & Recent Changes

### UI/UX Redesign (May/June 2025)
- Redesigned the Signup and EditProblem pages for a clean, modern, and responsive look using Tailwind CSS.
- Improved spacing, color schemes, and layout for a more professional and user-friendly experience.
- Grouped form fields into logical sections and applied responsive grid layouts.
- Enhanced input fields, textareas, and buttons with consistent styles and interactive effects.
- Removed outdated inline styles and unused variables for code cleanliness.
- Ensured all main pages are visually appealing and work well across all screen sizes.

### Codebase Cleanup
- Removed unused imports (e.g., `useTheme` from EditProblem.js) and variables for better maintainability.
- Refactored form layouts and components for clarity and reusability.

### AI Features
- Added an AI-powered code review tool (`backend/aiCodeReview.js`) to provide automated feedback and suggestions on submitted code.

### Next Steps
- Verify that all UI changes are reflected in the running application and address any remaining visual or functional issues.
- Ensure full responsiveness and visual consistency across all devices.
- Add Docker support for easier deployment (planned).

---

## Coding Platform

A full-stack coding platform inspired by LeetCode, built with React (frontend), Node.js/Express (backend), and MongoDB. Supports user and master roles, problem management, code execution in C++, Python, and Java, and a modern, responsive UI.

## Features

- **Role-based Authentication**: User and Master roles, JWT-based login/signup, protected routes.
- **Dashboards**: Separate dashboards for users and masters, with navigation and management tools.
- **Problem Management**: Masters can create, edit, and delete problems and problem sets. Problems include title, description, input/output format, constraints, category, and test cases.
- **Problem Solving**: Users can browse problems, view details, and solve them in a code editor with language selection (C++, Python, Java).
- **Code Execution**: 
  - `/run` endpoint: Runs user code with custom input (stdin) for all supported languages.
  - `/submit` endpoint: Runs user code against all test cases for a problem, returns detailed feedback, and enforces a 4-second timeout.
- **Test Case Evaluation**: Multi-test-case support, with results and feedback for each case.
- **Modern UI/UX**: Glassmorphism-inspired cards, gradient backgrounds, responsive layouts, and clear navigation throughout all main pages.
- **Navigation**: Easy access to home, dashboards, problem lists, and back/logout buttons.
- **Error Handling**: User-friendly error messages for code and input issues.

## Tech Stack
- **Frontend**: React, inline modern CSS, fetch API
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Languages Supported**: C++, Python, Java (code execution)

## Folder Structure
```
backend/
  Models/           # Mongoose schemas (see problem.js for test case storage)
  Routes/           # Express routes (problems, problem sets, auth, etc.)
  Controllers/      # Route logic
  ExecuteCpp.js     # C++ code execution
  ExecutePython.js  # Python code execution
  ExecuteJava.js    # Java code execution
  generateFile.js   # Handles code file creation
  index.js          # Main server entry point
frontend/
  src/pages/        # All main React pages (Questions, ProblemDetails, CreateProblem, etc.)
  src/App.css       # (Optional) Global styles
```

## How Test Cases Are Stored
- Test cases are stored in the MongoDB `problems` collection, in the `testCases` field of each problem document (see `backend/Models/problem.js`).
- When a user submits code, the backend retrieves the test cases from the database and runs the code against them.

## Getting Started

### Prerequisites
- Node.js, npm
- MongoDB (local or Atlas)

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file with `MONGO_URI=your_mongodb_connection_string`
4. `node index.js` (or use nodemon)

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm start`

### Usage
- Visit `http://localhost:3000` in your browser.
- Sign up as a User or Master.
- Masters can create/edit problems and problem sets.
- Users can browse, solve, and submit problems.

## Customization & Extending
- Add more languages by extending the backend executor files.
- Improve UI by editing React pages in `frontend/src/pages/`.
- Add analytics, leaderboards, or submission history as needed.

## License
MIT

---
**Note:** For code execution, the backend must have access to compilers/interpreters for C++, Python, and Java. Ensure your server environment is set up accordingly.
