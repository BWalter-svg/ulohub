import React from "react";
import "./alerts.css";

const Alerts: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Notifications & Alerts</h1>

      <div className="alerts-container">
        <p className="empty">No alerts available yet </p>
      </div>
    </div>
  );
};

export default Alerts;
