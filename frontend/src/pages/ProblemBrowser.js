import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProblemBrowser() {
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/problem-sets")
      .then(res => res.json())
      .then(data => setSets(data.problemSets || []));
  }, []);

  const handleSetClick = (setName) => {
    setSelectedSet(setName);
    fetch(`http://localhost:8080/problems/set/${setName}`)
      .then(res => res.json())
      .then(data => setProblems(data.problems || []));
  };

  return (
    <div className="container">
      <h2>Browse Problem Sets</h2>
      <ul className="list-group mb-4">
        {sets.map(set => (
          <li
            key={set._id}
            className={`list-group-item${selectedSet === set.name ? " active" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleSetClick(set.name)}
          >
            <strong>{set.name}</strong>{" "}
            <span style={{ fontSize: "0.9em" }}>
              by {set.master?.firstName} {set.master?.lastName}
            </span>
            <div style={{ fontSize: "0.9em" }}>{set.description}</div>
          </li>
        ))}
      </ul>
      {selectedSet && (
        <>
          <h3>Problems in "{selectedSet}"</h3>
          <ul className="list-group">
            {problems.length === 0 && (
              <li className="list-group-item">No problems in this set.</li>
            )}
            {problems.map(problem => (
              <li key={problem._id} className="list-group-item">
                <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProblemBrowser;