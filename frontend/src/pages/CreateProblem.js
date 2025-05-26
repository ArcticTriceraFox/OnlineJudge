import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateProblem() {
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    testCases: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your backend endpoint here
    try {
      const response = await fetch("http://localhost:8080/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(problem),
      });
      const result = await response.json();
      if (result.success) {
        alert("Problem created successfully!");
        navigate("/master-dashboard");
      } else {
        alert(result.message || "Error creating problem");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return (
    <div className="container">
      <h2>Create New Problem</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input className="form-control" name="title" value={problem.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" name="description" value={problem.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Input Format</label>
          <textarea className="form-control" name="inputFormat" value={problem.inputFormat} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Output Format</label>
          <textarea className="form-control" name="outputFormat" value={problem.outputFormat} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Constraints</label>
          <textarea className="form-control" name="constraints" value={problem.constraints} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Test Cases (one per line, format: input|expected_output)</label>
          <textarea className="form-control" name="testCases" value={problem.testCases} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Category/Set</label>
          <input className="form-control" name="category" value={problem.category} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">Create Problem</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateProblem;