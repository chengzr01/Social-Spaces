import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Proposal = ({ discussionPost, setDiscussionState }) => {
  function truncateText(text, maxLength) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  const [selectedPost, setSelectedPost] = useState("");
  const [comment, setComment] = useState("");

  const handlePostSelection = (event) => setSelectedPost(event.target.value);
  const handleCommentChange = (event) => setComment(event.target.value);

  const submitProposal = () => {
    const username = Cookies.get("username");
    axios
      .post("/concern", {
        userID: username,
        _id: selectedPost._id,
        concern: comment,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearProposal = () => {
    setSelectedPost("");
    setComment("");
  };

  return (
    <div className="feed">
      <button
        onClick={() => {
          setDiscussionState("feed");
        }}
      >
        ← Back
      </button>
      <h1>Proposal</h1>
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
          <button onClick={clearProposal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
