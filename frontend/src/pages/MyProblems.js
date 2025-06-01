import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

function MyProblems() {
  const { theme } = useTheme();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Problems</h2>
          {loading ? (
            <div className="py-8 text-center text-gray-500">Loading...</div>
          ) : problems.length === 0 ? (
            <p className="text-lg text-center text-gray-500 py-8">No problems found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed divide-y divide-gray-200 text-base">
                <colgroup>
                  <col style={{ width: '32%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '22%' }} />
                  <col style={{ width: '18%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 align-middle">Title</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 align-middle">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 align-middle">Created</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 align-middle">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {problems.map((problem, idx) => (
                    <tr
                      key={problem._id}
                      className={
                        idx % 2 === 0
                          ? "bg-white hover:bg-gray-50 transition-colors"
                          : "bg-gray-50 hover:bg-gray-100 transition-colors"
                      }
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 truncate align-middle text-base">
                        {problem.title}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-600">
                          {problem.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle text-gray-500 text-sm whitespace-nowrap">
                        {new Date(problem.createdAt).toLocaleDateString()}<br />
                        <span className="text-xs">{new Date(problem.createdAt).toLocaleTimeString()}</span>
                      </td>
                      <td className="px-4 py-3 align-middle text-center">
                        <div className="flex flex-row gap-3 justify-center items-center">
                          <button
                            className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => handleEdit(problem._id)}
                            title="Edit Problem"
                            style={{ minWidth: 0 }}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={() => handleDelete(problem._id)}
                            title="Delete Problem"
                            style={{ minWidth: 0 }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProblems;