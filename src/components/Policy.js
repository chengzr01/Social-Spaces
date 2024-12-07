import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PolicyCard = ({ policy }) => {
  console.log(policy);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const goToPolicyDiscussion = (id) => {
    navigate(`/policy/${id}`);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="policy-card">
      <div
        className="policy-header"
        onClick={toggleExpand}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>
          <b>{policy.policy_name}</b>
        </p>

        <p style={{ marginLeft: "10px" }}>{isExpanded ? "⬆️" : "⬇️"}</p>
      </div>
      {isExpanded && (
        <div className="policy-details">
          <p>{policy.policy_description}</p>
        </div>
      )}
      {policy.is_final && (
        <button
          onClick={() => goToPolicyDiscussion(policy.policy_id)}
          style={{ marginLeft: "10px" }}
        >
          Discuss
        </button>
      )}
    </div>
  );
};

export default PolicyCard;
