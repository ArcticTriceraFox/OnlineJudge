import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useTheme } from "../ThemeContext";

function Login() {
  const { theme } = useTheme();
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
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
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
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #e0e7ef 0%, #f8fafc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          margin: '48px auto',
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 20,
          boxShadow: '0 8px 32px 0 rgba(60,72,100,0.13)',
          padding: '40px 36px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <h1
          style={{
            marginBottom: 28,
            color: '#232526',
            fontWeight: 900,
            letterSpacing: 1,
            fontSize: 34,
            textAlign: 'center',
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
          }}
        >
          Login
        </h1>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div style={{ marginBottom: 22 }}>
            <label style={{ fontWeight: 600, color: '#333', marginBottom: 8, display: 'block', fontSize: 16 }}>
              Login as:
            </label>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginTop: 6 }}>
              <label style={{ fontWeight: 500, color: '#232526', fontSize: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                  style={{ accentColor: '#5b86e5' }}
                />
                User
              </label>
              <label style={{ fontWeight: 500, color: '#232526', fontSize: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="radio"
                  name="role"
                  value="master"
                  checked={role === "master"}
                  onChange={() => setRole("master")}
                  style={{ accentColor: '#5b86e5' }}
                />
                Master
              </label>
            </div>
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="email" style={{ fontWeight: 600, color: '#333', marginBottom: 8, display: 'block', fontSize: 16 }}>Email</label>
            <input
              onChange={handleChange}
              value={LogInfo.email}
              name="email"
              type="email"
              style={inputStyle}
              id="email"
              autoComplete="username"
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="password" style={{ fontWeight: 600, color: '#333', marginBottom: 8, display: 'block', fontSize: 16 }}>Password</label>
            <input
              onChange={handleChange}
              value={LogInfo.password}
              name="password"
              type="password"
              style={inputStyle}
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" style={buttonStyle}>Login</button>
          <div style={{ marginTop: 22, textAlign: 'center', fontSize: 15 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#5b86e5', textDecoration: 'underline', fontWeight: 600 }}>Signup</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
      <style>{`
        @media (max-width: 600px) {
          div[style*='max-width: 420px'] {
            padding: 18px 6vw !important;
            min-width: 0 !important;
          }
        }
      `}</style>
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