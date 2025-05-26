import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProblemSets() {
  const [sets, setSets] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

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
          maxWidth: 480,
          width: "100%",
          margin: "40px auto",
          background: "rgba(255,255,255,0.85)",
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
          padding: 36,
          position: "relative",
          backdropFilter: "blur(6px)",
        }}
      >
        <h2
          style={{
            marginBottom: 28,
            color: "#232526",
            fontWeight: 800,
            letterSpacing: 1,
            fontSize: 28,
            textAlign: "center",
            textShadow: "0 2px 8px #e0e7ef",
          }}
        >
          Manage Problem Sets
        </h2>
        <form onSubmit={handleCreate} style={{ marginBottom: 28 }}>
          <input
            style={inputStyle}
            placeholder="Set Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            style={textareaStyle}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button style={buttonStyle} type="submit">
            Create Set
          </button>
        </form>
        <div style={{ marginTop: 10 }}>
          {sets.length === 0 ? (
            <div
              style={{
                color: "#888",
                textAlign: "center",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              No problem sets found.
            </div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {sets.map((set) => (
                <li
                  key={set._id}
                  style={{
                    background: "#f8fafc",
                    borderRadius: 10,
                    boxShadow: "0 2px 8px #0001",
                    marginBottom: 16,
                    padding: "16px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#232526",
                      }}
                    >
                      {set.name}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "#4b5563",
                        marginTop: 2,
                      }}
                    >
                      {set.description}
                    </div>
                  </div>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(set._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: 18,
            background: "none",
            color: "#36d1c4",
            border: "none",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
            textDecoration: "underline",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Go Back
        </button>
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
  marginBottom: 12,
  outline: "none",
  boxShadow: "0 1px 4px #e0e7ef",
  fontWeight: 500,
};
const textareaStyle = {
  ...inputStyle,
  minHeight: 48,
  resize: "vertical",
};
const buttonStyle = {
  width: "100%",
  background: "linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "12px 0",
  fontWeight: 800,
  fontSize: 17,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(91,134,229,0.13)",
  transition: "background 0.2s",
  outline: "none",
  marginTop: 8,
};
const deleteButtonStyle = {
  background: "linear-gradient(90deg, #ff5858 0%, #f857a6 100%)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "8px 22px",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(248,87,166,0.13)",
  transition: "background 0.2s",
  outline: "none",
  marginLeft: 16,
};

export default ProblemSets;