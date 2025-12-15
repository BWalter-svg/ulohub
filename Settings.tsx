import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiBell } from "react-icons/fi";
import "../App.css";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Account Info",
      description: "View or edit your account details.",
      path: "/settings/account",
      icon: <FiUser size={28} className="text-sky-500" />,
    },
    {
      title: "Security",
      description: "Change password or manage security settings.",
      path: "/settings/security",
      icon: <FiLock size={28} className="text-sky-500" />,
    },
    {
      title: "Notifications",
      description: "Manage your notification preferences.",
      path: "/settings/notifications",
      icon: <FiBell size={28} className="text-sky-500" />,
    },
  ];

  return (
    <div className="page-container mt-20">
      <h1>Settings</h1>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card flex flex-col items-start gap-3 p-4"
            onClick={() => navigate(card.path)}
            style={{ cursor: "pointer" }}
          >
            {card.icon}
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
