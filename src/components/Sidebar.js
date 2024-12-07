import React, { useState, useEffect } from "react";
import axios from "axios";

import PolicyCard from "./Policy";

const Sidebar = ({ discussionPost, setDiscussionPost }) => {
  const [policies, setPolicies] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [comment, setComment] = useState("");
  function truncateText(text, maxLength) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }
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

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost("");
    setComment("");
  };

  const handlePostSelection = (event) => setSelectedPost(event.target.value);
  const handleCommentChange = (event) => setComment(event.target.value);

  const submitProposal = () => {
    console.log("Selected Post:", selectedPost);
    console.log("Comment:", comment);

    // Simulate getting policy suggestions from AI model
    const aiSuggestions = ["Policy Suggestion 1", "Policy Suggestion 2"];
    alert(`AI Policy Suggestions: ${aiSuggestions.join(", ")}`);
    closeDialog();
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
          <PolicyCard key={policy.id} policy={policy} />
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
            onClick={openDialog}
            style={{
              all: "unset", // Resets all default styles
              cursor: "pointer", // Ensures it still behaves like a button
              fontSize: "inherit", // Matches the parent font size
              fontFamily: "inherit", // Matches the parent font family
              color: "inherit", // Matches the text color
            }}
          >
            ➕
          </button>
        </div>
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Policy Proposal</h3>
            <label>
              Select a Post (Optional):
              <select
                value={selectedPost}
                onChange={handlePostSelection}
                style={{ display: "block", margin: "10px 0" }}
              >
                <option value="">None</option>
                {discussionPost.map((post) => (
                  <option key={post.id} value={post.title}>
                    {truncateText(post.title, 50)}{" "}
                    {/* Truncate titles to 50 characters */}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={handleCommentChange}
                style={{ display: "block", margin: "10px 0", width: "100%" }}
              />
            </label>
            <div className="dialog-actions">
              <button onClick={submitProposal}>Submit</button>
              <button onClick={closeDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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
