import React, { useEffect, useState } from "react";

function ProblemSets() {
  const [sets, setSets] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchSets = async () => {
    const res = await fetch("http://localhost:8080/problem-sets/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    const data = await res.json();
    setSets(data.problemSets || []);
  };

  useEffect(() => {
    fetchSets();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/problem-sets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({ name, description }),
    });
    const data = await res.json();
    if (data.success) {
      setName("");
      setDescription("");
      fetchSets();
    } else {
      alert(data.message || "Error creating set");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this problem set?")) return;
    const res = await fetch(`http://localhost:8080/problem-sets/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      fetchSets();
    } else {
      alert(data.message || "Delete failed");
    }
  };

  return (
    <div className="container">
      <h2>Manage Problem Sets</h2>
      <form onSubmit={handleCreate} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Set Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success" type="submit">Create Set</button>
      </form>
      <ul className="list-group">
        {sets.map(set => (
          <li key={set._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{set.name}</strong>
              <div style={{ fontSize: "0.9em" }}>{set.description}</div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(set._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemSets;