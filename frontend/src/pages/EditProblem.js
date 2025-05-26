import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProblem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the problem details
    fetch(`http://localhost:8080/problems/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProblem(data.problem);
        else alert(data.message || "Problem not found");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/problems/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(problem),
      });
      const data = await res.json();
      if (data.success) {
        alert("Problem updated!");
        navigate("/my-problems");
      } else {
        alert(data.message || "Update failed");
      }
    } catch {
      alert("Network error");
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Edit Problem</h2>
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
        <button type="submit" className="btn btn-success">Update Problem</button>
      </form>
    </div>
  );
}

export default EditProblem;