import React from "react";
import { Link } from "react-router-dom";

function MasterDashboard() {
  return (
    <div className="container">
      <h1>Master Dashboard</h1>
      <ul>
        <li>
          <Link to="/create-problem">Create New Problem</Link>
        </li>
        <li>
          <Link to="/my-problems">View/Edit My Problems</Link>
        </li>
        <li>
          <Link to="/problem-sets">Manage Problem Sets</Link>
        </li>
        <li>
            <Link to="/create-problem">Create New Problem</Link>
        </li>
        {/* Add more links as you build features */}
      </ul>
    </div>
  );
}

export default MasterDashboard;