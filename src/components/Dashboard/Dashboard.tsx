import React from "react";
import Header from "../Header/Header";
import PersonalNotes from "../PersonalNotes/PersonalNotes";

import "./Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <PersonalNotes />
    </div>
  );
};

export default Dashboard;
