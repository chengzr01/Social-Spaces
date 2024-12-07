// components/PolicyDiscussionPage.js
import React from "react";

const Discussion = ({ discussionPolicy, setDiscussionState }) => {
  return (
    <div className="feed">
      <button
        onClick={() => {
          setDiscussionState("feed");
        }}
      >
        ← Back
      </button>
      <h2>{discussionPolicy.policy_name}</h2>
      <p>{discussionPolicy.policy_description}</p>
    </div>
  );
};

export default Discussion;
