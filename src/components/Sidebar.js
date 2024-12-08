import React, { useState, useEffect } from "react";
import axios from "axios";

import PolicyCard from "./Policy";

const Sidebar = ({
  discussionPost,
  setDiscussionPost,
  setDiscussionPolicy,
  setDiscussionState,
}) => {
  const [policies, setPolicies] = useState([]);
  const [newPolicies, setNewPolicies] = useState([]);

  useEffect(() => {
    axios
      .get("/policy")
      .then((response) => {
        const data = response.data;
        setPolicies(data.map((policy) => ({ id: policy.id, ...policy })));
      })
      .catch((error) => {
        console.error("Failed to fetch policies:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/newPolicy")
      .then((response) => {
        const data = response.data;
        setNewPolicies(data.map((policy) => ({ id: policy.id, ...policy })));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleClearDiscussion = () => {
    axios
      .delete("/newPolicy")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sidebar">
      <div className="subreddit-info">
        <h2>The University of Illinois at Urbana-Champaign</h2>
        <p>
          This subreddit is for anyone/anything related to UIUC. Students,
          Alumni, Faculty, and Townies are all welcome. Given the lack of a
          regional subreddit, it also covers most things in the Champaign-Urbana
          area. This subreddit is not sponsored or endorsed by the University of
          Illinois or any other on-campus group.
        </p>
        <p>Created Aug 7, 2008</p>
        <p>Public</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <div>97K Members</div>
          <div>30 Online</div>
          <div>Top 2% Ranked by size</div>
        </div>
      </div>

      <div className="rules">
        <h3>Policies</h3>
        {policies.map((policy) => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            isFinal={true}
            setDiscussionPolicy={setDiscussionPolicy}
            setDiscussionState={setDiscussionState}
          />
        ))}
      </div>

      <div className="policy-discussion">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // Ensures vertical alignment
          }}
        >
          <h3>Policy Discussion</h3>
          <button
            onClick={() => {
              setDiscussionState("proposal");
            }}
          >
            Propose
          </button>
          <button
            onClick={() => {
              handleClearDiscussion();
            }}
          >
            Clear
          </button>
        </div>
        {newPolicies.map((policy) => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            isFinal={false}
            setDiscussionPolicy={setDiscussionPolicy}
            setDiscussionState={setDiscussionState}
          />
        ))}
      </div>

      <div className="policy-discussion">
        <h3>Post Discussion</h3>
        {discussionPost.map((post) => (
          <div key={post.post_id} className="policy-item">
            <h4>{post.title}</h4>
            <p>{post.post_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
