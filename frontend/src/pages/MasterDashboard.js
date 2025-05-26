import React from "react";
import { Link, useNavigate } from "react-router-dom";

function MasterDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <div className="container">
      <div style={{
        maxWidth: 900,
        margin: "40px auto",
        background: "#fff0f3",
        borderRadius: 22,
        boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
        padding: 44,
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{ marginBottom: 28, color: "#232526", fontWeight: 900, letterSpacing: 1, fontSize: 38, textAlign: 'center', textShadow: '0 2px 12px #f8c6c8' }}>
          Master Dashboard
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          alignItems: 'center',
        }}>
          <li>
            <a href="/create-problem" style={{
              color: '#fff',
              background: 'linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)',
              padding: '12px 32px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(91,134,229,0.13)',
              transition: 'background 0.2s',
              display: 'inline-block',
            }}>Create New Problem</a>
          </li>
          <li>
            <a href="/my-problems" style={{
              color: '#fff',
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              padding: '12px 32px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(67,233,123,0.13)',
              transition: 'background 0.2s',
              display: 'inline-block',
            }}>View/Edit My Problems</a>
          </li>
          <li>
            <a href="/problem-sets" style={{
              color: '#fff',
              background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
              padding: '12px 32px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(247,151,30,0.13)',
              transition: 'background 0.2s',
              display: 'inline-block',
            }}>Manage Problem Sets</a>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          style={{
            marginTop: 28,
            background: 'linear-gradient(90deg, #ff5858 0%, #f857a6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontWeight: 800,
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(248,87,166,0.13)',
            transition: 'background 0.2s',
            outline: 'none',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MasterDashboard;