# CodeMaster

CodeMaster is a full-stack coding platform designed for seamless problem management, secure user authentication, and real-time code execution in C++, Python, and Java. The platform is built with a modern React frontend and a robust Node.js/Express backend, leveraging MongoDB for data storage and Docker for containerized deployment.

---

## Features

- **User Authentication**
  - Secure registration and login with JWT-based session management.
  - Role-based access control (admin/user).

- **Problem Management**
  - Create, edit, and delete coding problems.
  - Categorize and browse problems.
  - Personal dashboard for managing your own problems.

- **Code Execution**
  - Real-time code execution for C++, Python, and Java.
  - Custom input support and instant output display.

- **AI Code Review**
  - Integrated AI-powered feedback on code submissions.

- **Submissions & Tracking**
  - Submit solutions and receive instant feedback.
  - Track submission history and results.

- **Admin Tools**
  - User and problem management capabilities for administrators.

- **Responsive UI**
  - Intuitive and mobile-friendly interface built with React and Tailwind CSS.

- **Production-Ready**
  - Dockerized backend and frontend for easy deployment.
  - Environment variable support for secure configuration.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB instance
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- [Git](https://git-scm.com/)

---

### Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd CodeMaster
   ```

2. **Configure Environment Variables**

   - **Backend (`backend/.env`):**
     ```
     PORT=8080
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     GEMINI_API_KEY=your_gemini_api_key
     NODE_ENV=dev
     ```

   - **Frontend (`frontend/.env`):**
     ```
     REACT_APP_BACKEND_URL=http://localhost:8080
     ```

3. **Install Dependencies**

   - **Backend:**
     ```sh
     cd backend
     npm install
     ```

   - **Frontend:**
     ```sh
     cd ../frontend
     npm install
     ```

---

### Running Locally

1. **Start the Backend**
   ```sh
   cd backend
   npm start
   ```

2. **Start the Frontend**
   ```sh
   cd ../frontend
   npm start
   ```

3. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)

---

### Running with Docker

1. **Build and Start Containers**
   ```sh
   docker-compose up --build
   ```

2. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)

---

## Deployment

- **Backend:** Deployable on AWS EC2, Render, or any Docker-compatible cloud provider.
- **Frontend:** Deployable as a static site (e.g., Vercel, Netlify) or served via the backend in production.

---

## Folder Structure

```
CodeMaster/
  backend/
    src/
      index.js
      Routes/
      Models/
      ...
    .env
    Dockerfile
  frontend/
    src/
    .env
    Dockerfile
  .gitignore
  README.md
  docker-compose.yml
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or feature requests.

---

## License

This project is licensed under the [ISC License](LICENSE).

---

## Acknowledgements

- Built with Node.js, Express, React, MongoDB, and Docker.
- AI code review powered by Google Gemini API.
