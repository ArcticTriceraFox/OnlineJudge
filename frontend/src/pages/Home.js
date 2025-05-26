import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState("");
    const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World";\n    return 0;\n}`);
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("firstName"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        handleSuccess('User logged out!');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };


    const handleRun = async (e) => {
        e.preventDefault();
        setLoading(true);
        setOutput("");
        try {
            const response = await fetch("http://localhost:8080/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language: "cpp", code }),
            });
            const data = await response.json();
            if (data.success) {
                setOutput(data.output);
                handleSuccess("Code executed successfully!");
            } else {
                setOutput(data.message || "Error running code");
                handleError(data.message || "Error running code");
            }
        } catch (err) {
            setOutput("Network error");
            handleError("Network error");
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
            padding: 0,
            margin: 0, 
            fontFamily: "Segoe UI, sans-serif"
        }}>
            <div style={{
                maxWidth: 1100, // Increased width
                margin: "40px auto",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                padding: 32,
                position: "relative"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24
                }}>
                    <h2 style={{ margin: 0, color: "#232526" }}>
                        👋 Welcome, <span style={{ color: "#007bff" }}>{loggedInUser}</span>
                    </h2>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: "linear-gradient(90deg, #ff5858 0%, #f09819 100%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            padding: "8px 18px",
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(255,88,88,0.1)"
                        }}
                    >
                        Logout
                    </button>
                </div>
                <form onSubmit={handleRun}>
                    <label htmlFor="code" style={{
                        display: "block",
                        marginBottom: 8,
                        fontWeight: 600,
                        color: "#333"
                    }}>
                        C++ Code:
                    </label>
                    <textarea
                        rows={26}
                        cols={80}
                        id="code"
                        style={{
                            width: "100%",
                            fontFamily: "Fira Mono, monospace",
                            fontSize: 18,
                            borderRadius: 8,
                            border: "1px solid #ddd",
                            padding: 14,
                            background: "#f7f7f9",
                            color: "#232526",
                            marginBottom: 16,
                            resize: "vertical",
                            outline: "none",
                            transition: "border 0.2s"
                            
                        }}
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: "linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            padding: "10px 28px",
                            fontWeight: 700,
                            fontSize: 18,
                            cursor: loading ? "not-allowed" : "pointer",
                            boxShadow: "0 2px 8px rgba(91,134,229,0.1)",
                            transition: "background 0.2s"
                        }}
                    >
                        {loading ? "Running..." : "Run Code"}
                    </button>
                </form>
                <div style={{
                    marginTop: 32,
                    background: "#232526",
                    borderRadius: 8,
                    padding: 20,
                    minHeight: 80,
                    color: "#0f0",
                    fontFamily: "Fira Mono, monospace",
                    fontSize: 18,
                    boxShadow: "0 2px 8px rgba(35,37,38,0.08)"
                }}>
                    <h4 style={{ color: "#fff", margin: "0 0 10px 0" }}>Output:</h4>
                    <pre style={{
                        margin: 0,
                        background: "none",
                        color: "#0f0",
                        fontSize: 18,
                        whiteSpace: "pre-wrap"
                    }}>
                        {output}
                    </pre>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Home;