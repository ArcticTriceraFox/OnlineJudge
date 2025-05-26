import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user", // default role
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, role } = signupInfo;
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      !role
    ) {
      return handleError(
        "Please fill all the fields, as all of them are required"
      );
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || message);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError("Network error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          margin: "40px auto",
          background: "rgba(255,192,203,0.92)",
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          padding: 38,
          position: "relative",
          backdropFilter: "blur(6px)",
        }}
      >
        <h1
          style={{
            marginBottom: 24,
            color: "#232526",
            fontWeight: 900,
            letterSpacing: 1,
            fontSize: 34,
            textAlign: "center",
            textShadow: "0 2px 8px #e0e7ef",
          }}
        >
          Signup
        </h1>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: 18 }}>
            <label
              style={{
                fontWeight: 600,
                color: "#333",
                marginBottom: 6,
                display: "block",
              }}
            >
              Sign up as:
            </label>
            <div
              style={{
                display: "flex",
                gap: 24,
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <label
                style={{
                  fontWeight: 500,
                  color: "#232526",
                  fontSize: 16,
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={signupInfo.role === "user"}
                  onChange={handleChange}
                  style={{ marginRight: 6 }}
                />{" "}
                User
              </label>
              <label
                style={{
                  fontWeight: 500,
                  color: "#232526",
                  fontSize: 16,
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="master"
                  checked={signupInfo.role === "master"}
                  onChange={handleChange}
                  style={{ marginRight: 6 }}
                />{" "}
                Master
              </label>
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="firstName" style={labelStyle}>
              First Name
            </label>
            <input
              onChange={handleChange}
              value={signupInfo.firstName}
              name="firstName"
              type="text"
              style={inputStyle}
              id="firstName"
              placeholder="First Name"
              autoComplete="given-name"
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="lastName" style={labelStyle}>
              Last Name
            </label>
            <input
              onChange={handleChange}
              value={signupInfo.lastName}
              name="lastName"
              type="text"
              style={inputStyle}
              id="lastName"
              placeholder="Last Name"
              autoComplete="family-name"
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              onChange={handleChange}
              value={signupInfo.email}
              name="email"
              type="email"
              style={inputStyle}
              id="email"
              placeholder="Email"
              autoComplete="email"
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              onChange={handleChange}
              value={signupInfo.password}
              name="password"
              type="password"
              style={inputStyle}
              id="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Signup
          </button>
          <div
            style={{
              marginTop: 18,
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#007bff",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Login
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #e0e7ef",
  fontSize: 16,
  background: "rgba(255,255,255,0.95)",
  marginTop: 4,
  marginBottom: 0,
  outline: "none",
  boxShadow: "0 1px 4px #e0e7ef",
  fontWeight: 500,
};
const labelStyle = {
  fontWeight: 600,
  color: "#333",
  marginBottom: 6,
  display: "block",
};
const buttonStyle = {
  width: "100%",
  background: "linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "12px 0",
  fontWeight: 800,
  fontSize: 18,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(91,134,229,0.13)",
  transition: "background 0.2s",
  outline: "none",
  marginTop: 8,
};

export default Signup;