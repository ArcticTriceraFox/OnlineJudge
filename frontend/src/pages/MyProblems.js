import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/problems/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      const data = await res.json();
      setProblems(data.problems || []);
    } catch {
      setProblems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    try {
      const res = await fetch(`http://localhost:8080/problems/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setProblems(problems.filter((p) => p._id !== id));
      } else {
        alert(data.message || "Delete failed");
      }
    } catch {
      alert("Network error");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-problem/${id}`);
  };

  return (
    <div className="container">
      <h2>My Problems</h2>
      {loading ? (
        <p>Loading...</p>
      ) : problems.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem._id}>
                <td>{problem.title}</td>
                <td>{problem.category}</td>
                <td>{new Date(problem.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-primary mx-1" onClick={() => handleEdit(problem._id)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(problem._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyProblems;