import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

function Questions() {
  const { theme } = useTheme();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/problems")
      .then((res) => res.json())
      .then((data) => setProblems(Array.isArray(data) ? data : []))
      .catch(() => setProblems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className={`questions-root ${theme}-mode`}
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #181c24 0%, #232b3a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 0',
      }}
    >
      <div
        className="questions-card"
        style={{
          width: '100%',
          maxWidth: 900,
          minWidth: 320,
          borderRadius: 18,
          boxShadow:
            theme === 'dark'
              ? '0 8px 32px rgba(20,20,30,0.7)'
              : '0 8px 32px rgba(66,68,90,0.13)',
          background:
            theme === 'dark'
              ? 'rgba(30,34,44,0.92)'
              : 'rgba(255,255,255,0.92)',
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          marginTop: 48, // Add margin to push card below the blue bar
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ marginBottom: 0, color: "#232526", fontWeight: 800, letterSpacing: 1, fontSize: 36, textAlign: 'center', textShadow: '0 2px 8px #e0e7ef', zIndex: 2 }}>
            All Questions
          </h2>
          <button
            onClick={() => navigate('/home')}
            style={{
              background: 'linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 22px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(91,134,229,0.13)',
              transition: 'background 0.2s',
              outline: 'none',
              zIndex: 2,
            }}
          >
            Home
          </button>
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#888', fontSize: 20, fontWeight: 500 }}>Loading...</p>
        ) : problems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', fontSize: 20, fontWeight: 500 }}>No questions found.</p>
        ) : (
          <div style={{
            width: '100%',
            overflowX: 'auto',
            marginTop: 24,
          }}>
            <table
              className="table"
              style={{ width: "100%", background: "#fff", borderRadius: 12, borderCollapse: 'collapse', minWidth: 700 }}
            >
              <thead style={{ background: '#f4f6fa' }}>
                <tr>
                  <th style={{ padding: '16px 12px', fontWeight: 800, color: '#222', fontSize: 19, borderBottom: '2px solid #e0e7ef', letterSpacing: 0.5 }}>Title</th>
                  <th style={{ padding: '16px 12px', fontWeight: 800, color: '#222', fontSize: 19, borderBottom: '2px solid #e0e7ef', letterSpacing: 0.5 }}>Category</th>
                  <th style={{ padding: '16px 12px', fontWeight: 800, color: '#222', fontSize: 19, borderBottom: '2px solid #e0e7ef', letterSpacing: 0.5 }}>Created</th>
                  <th style={{ padding: '16px 12px', fontWeight: 800, color: '#222', fontSize: 19, borderBottom: '2px solid #e0e7ef', letterSpacing: 0.5 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, idx) => (
                  <tr key={problem._id} style={{ background: idx % 2 === 0 ? '#f8fafc' : '#fff', transition: 'background 0.2s' }}>
                    <td style={{ padding: '14px 12px', fontWeight: 600, color: '#232526', fontSize: 17 }}>{problem.title}</td>
                    <td style={{ padding: '14px 12px', color: '#4b5563', fontSize: 16 }}>{problem.category}</td>
                    <td style={{ padding: '14px 12px', color: '#888', fontSize: 15 }}>
                      {problem.createdAt
                        ? new Date(problem.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{
                          background: 'linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '10px 22px',
                          fontWeight: 700,
                          fontSize: 17,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(91,134,229,0.13)',
                          transition: 'background 0.2s',
                          outline: 'none',
                        }}
                        onClick={() => navigate(`/problems/${problem._id}`)}
                      >
                        Solve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Questions;
