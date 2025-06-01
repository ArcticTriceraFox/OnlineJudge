import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

function EditProblem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const navigate = useNavigate();
  // Remove unused theme

  useEffect(() => {
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

  if (!problem)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-lg font-sans animate-pulse">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-2 py-8 font-sans">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-left tracking-tight flex items-center gap-2">
          <span className="text-blue-500">✎</span> Edit Problem
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-lg">Title</label>
              <input className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition" name="title" value={problem.title} onChange={handleChange} required />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-lg">Category/Set</label>
              <input className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition" name="category" value={problem.category} onChange={handleChange} />
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2 text-lg">Description</label>
            <textarea className="w-full min-h-[100px] rounded-lg border border-gray-300 px-4 py-2 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-y overflow-y-auto transition" name="description" value={problem.description} onChange={handleChange} required />
          </div>
          {/* Input/Output Format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-lg">Input Format</label>
              <textarea className="w-full min-h-[70px] rounded-lg border border-gray-300 px-4 py-2 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-y overflow-y-auto transition" name="inputFormat" value={problem.inputFormat} onChange={handleChange} required />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-lg">Output Format</label>
              <textarea className="w-full min-h-[70px] rounded-lg border border-gray-300 px-4 py-2 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-y overflow-y-auto transition" name="outputFormat" value={problem.outputFormat} onChange={handleChange} required />
            </div>
          </div>
          {/* Constraints & Test Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-lg">Constraints</label>
              <textarea className="w-full min-h-[70px] rounded-lg border border-gray-300 px-4 py-2 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-y overflow-y-auto transition" name="constraints" value={problem.constraints} onChange={handleChange} required />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-lg">Test Cases <span className="font-normal text-xs text-gray-500">(one per line, format: input|expected_output)</span></label>
              <textarea className="w-full min-h-[70px] rounded-lg border border-gray-300 px-4 py-2 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-y overflow-y-auto transition" name="testCases" value={problem.testCases} onChange={handleChange} required />
            </div>
          </div>
          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between mt-4">
            <button type="submit" className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-extrabold text-lg shadow-lg flex items-center justify-center gap-2 transition">
              <span className="text-2xl">✎</span> Update Problem
            </button>
            <button type="button" onClick={() => navigate('/my-problems')} className="w-full md:w-auto px-8 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-blue-600 font-bold text-lg shadow flex items-center justify-center gap-2 transition">
              <span className="text-2xl">←</span> Back to My Problems
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProblem;
