import React, { useState } from "react";

const PolicyCard = ({
  policy,
  isFinal,
  setDiscussionPolicy,
  setDiscussionState,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

        <p style={{ marginLeft: "10px" }}>{isExpanded ? "▲" : "▼"}</p>
      </div>
      {isExpanded && (
        <div className="policy-details">
          <p>{policy.policy_description}</p>
        </div>
      )}
      {!isFinal && (
        <button
          onClick={() => {
            setDiscussionPolicy(policy);
            setDiscussionState("discussion");
          }}
          style={{ marginLeft: "10px" }}
        >
          Discuss
        </button>
      )}
    </div>
  );
};

export default PolicyCard;
