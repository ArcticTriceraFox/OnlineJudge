import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [LogInfo, setLogInfo] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState("user"); // default role
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LogInfo;
    if (email === "" || password === "") {
      return handleError("Please fill all the fields, as all of them are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...LogInfo, role }), // include role
      });
      const result = await response.json();
      const { success, message, jwtToken, firstName, lastName, role: userRole, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("role", userRole);
        setTimeout(() => {
          // Redirect based on role
          if (userRole === "master") navigate("/master-dashboard");
          else navigate("/home");
        }, 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || error.message || message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError("Network error");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Login as:</label>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              /> User
            </label>
            <label style={{ marginLeft: 16 }}>
              <input
                type="radio"
                name="role"
                value="master"
                checked={role === "master"}
                onChange={() => setRole("master")}
              /> Master
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            onChange={handleChange}
            value={LogInfo.email}
            name="email"
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            onChange={handleChange}
            value={LogInfo.password}
            name="password"
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <span className="mx-2">
          Don't have an account?
          <Link to="/signup" className="mx-2">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;