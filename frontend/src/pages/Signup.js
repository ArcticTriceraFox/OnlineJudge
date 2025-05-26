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
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Sign up as:</label>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={signupInfo.role === "user"}
                onChange={handleChange}
              /> User
            </label>
            <label style={{ marginLeft: 16 }}>
              <input
                type="radio"
                name="role"
                value="master"
                checked={signupInfo.role === "master"}
                onChange={handleChange}
              /> Master
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            onChange={handleChange}
            value={signupInfo.firstName}
            name="firstName"
            type="text"
            className="form-control"
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            onChange={handleChange}
            value={signupInfo.lastName}
            name="lastName"
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={handleChange}
            value={signupInfo.email}
            name="email"
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={handleChange}
            value={signupInfo.password}
            name="password"
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        <span className="mx-2">
          Already have an account?
          <Link to="/login" className="mx-2">
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;