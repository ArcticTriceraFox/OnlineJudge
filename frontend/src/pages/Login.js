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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      padding: 0,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        maxWidth: 400,
        width: '100%',
        margin: '40px auto',
        background: 'rgba(255,192,203,0.92)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        padding: 36,
        position: 'relative',
        backdropFilter: 'blur(6px)',
      }}>
        <h1 style={{
          marginBottom: 24,
          color: '#232526',
          fontWeight: 900,
          letterSpacing: 1,
          fontSize: 32,
          textAlign: 'center',
          textShadow: '0 2px 8px #e0e7ef',
        }}>Login</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, color: '#333', marginBottom: 6, display: 'block' }}>Login as:</label>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 4 }}>
              <label style={{ fontWeight: 500, color: '#232526', fontSize: 16 }}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                  style={{ marginRight: 6 }}
                /> User
              </label>
              <label style={{ fontWeight: 500, color: '#232526', fontSize: 16 }}>
                <input
                  type="radio"
                  name="role"
                  value="master"
                  checked={role === "master"}
                  onChange={() => setRole("master")}
                  style={{ marginRight: 6 }}
                /> Master
              </label>
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              onChange={handleChange}
              value={LogInfo.email}
              name="email"
              type="email"
              style={inputStyle}
              id="email"
              autoComplete="username"
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              onChange={handleChange}
              value={LogInfo.password}
              name="password"
              type="password"
              style={inputStyle}
              id="password"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" style={buttonStyle}>Login</button>
          <div style={{ marginTop: 18, textAlign: 'center', fontSize: 15 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#007bff', textDecoration: 'underline', fontWeight: 600 }}>Signup</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid #e0e7ef',
  fontSize: 16,
  background: 'rgba(255,255,255,0.95)',
  marginTop: 4,
  marginBottom: 0,
  outline: 'none',
  boxShadow: '0 1px 4px #e0e7ef',
  fontWeight: 500,
};
const labelStyle = {
  fontWeight: 600,
  color: '#333',
  marginBottom: 6,
  display: 'block',
};
const buttonStyle = {
  width: '100%',
  background: 'linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '12px 0',
  fontWeight: 800,
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(91,134,229,0.13)',
  transition: 'background 0.2s',
  outline: 'none',
  marginTop: 8,
};

export default Login;