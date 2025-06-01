import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

function MasterDashboard() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
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
          maxWidth: 520,
          margin: '48px auto',
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 24,
          boxShadow: '0 8px 32px 0 rgba(60,72,100,0.13)',
          padding: '48px 40px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        <h2
          style={{
            marginBottom: 36,
            color: '#232526',
            fontWeight: 900,
            letterSpacing: 1,
            fontSize: 36,
            textAlign: 'center',
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
            textShadow: '0 2px 8px #e0e7ef',
          }}
        >
          <span style={{ verticalAlign: 'middle', marginRight: 8, fontSize: 32 }}>🛠️</span>
          Master Dashboard
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          alignItems: 'center',
        }}>
          <li style={{ width: '100%' }}>
            <a href="/create-problem" style={buttonStyle('linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)', '#fff', '📝')}>Create New Problem</a>
          </li>
          <li style={{ width: '100%' }}>
            <a href="/my-problems" style={buttonStyle('linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', '#fff', '📚')}>View/Edit My Problems</a>
          </li>
          <li style={{ width: '100%' }}>
            <a href="/problem-sets" style={buttonStyle('linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', '#232526', '🗂️')}>Manage Problem Sets</a>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          style={{
            marginTop: 36,
            background: 'linear-gradient(90deg, #ff5858 0%, #f857a6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '14px 0',
            fontWeight: 800,
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(248,87,166,0.13)',
            transition: 'background 0.2s, transform 0.2s',
            outline: 'none',
            width: '100%',
            display: 'block',
            letterSpacing: 1,
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'}
          onMouseOut={e => e.currentTarget.style.transform = 'none'}
        >
          <span style={{ marginRight: 8, fontSize: 20 }}>🚪</span>Logout
        </button>
      </div>
      <style>{`
        @media (max-width: 700px) {
          div[style*='max-width: 520px'] {
            padding: 18px 4vw !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

function buttonStyle(bg, color, icon) {
  return {
    color,
    background: bg,
    padding: '14px 0',
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 18,
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(91,134,229,0.13)',
    transition: 'background 0.2s, transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    letterSpacing: 0.5,
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    margin: 0,
    marginBottom: 0,
    marginTop: 0,
    position: 'relative',
    overflow: 'hidden',
    // Add icon as a pseudo-element
    '::before': {
      content: `'${icon}'`,
      marginRight: 8,
      fontSize: 20,
      verticalAlign: 'middle',
    },
  };
}

export default MasterDashboard;