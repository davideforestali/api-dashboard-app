import React, { useState } from "react";
import List from "./List";
import Dashboard from "./Dashboard";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("list");

  const handleTabClick = tab => setActiveTab(tab);

  return (
    <div className="tabs-container">
      <div className="tab-buttons">
        <button
          onClick={() => handleTabClick("list")}
          className={`tab-button ${activeTab === "list" ? "active" : ""}`}
        >
          List
        </button>
        <button
          onClick={() => handleTabClick("dashboard")}
          className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}
        >
          Dashboard
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "list" ? <List /> : <Dashboard />}
      </div>
    </div>
  );
};

export default Tabs;
