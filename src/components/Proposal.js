import React, { useState, useEffect } from "react";
import axios from "axios";
const Proposal = ({ setDiscussionState }) => {
  function truncateText(text, maxLength) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [comment, setComment] = useState("");
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost("");
    setComment("");
  };

  const handlePostSelection = (event) => setSelectedPost(event.target.value);
  const handleCommentChange = (event) => setComment(event.target.value);

  const submitProposal = () => {
    // Simulate getting policy suggestions from AI model
    const aiSuggestions = ["Policy Suggestion 1", "Policy Suggestion 2"];
    alert(`AI Policy Suggestions: ${aiSuggestions.join(", ")}`);
    closeDialog();
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
    </div>
    // <div className="dialog-overlay">
    //   <div className="dialog-box">
    //     <h3>Policy Proposal</h3>
    //     <label>
    //       Select a Post (Optional):
    //       <select
    //         value={selectedPost}
    //         onChange={handlePostSelection}
    //         style={{ display: "block", margin: "10px 0" }}
    //       >
    //         <option value="">None</option>
    //         {discussionPost.map((post) => (
    //           <option key={post.id} value={post.title}>
    //             {truncateText(post.title, 50)}{" "}
    //             {/* Truncate titles to 50 characters */}
    //           </option>
    //         ))}
    //       </select>
    //     </label>
    //     <label>
    //       Comment:
    //       <textarea
    //         value={comment}
    //         onChange={handleCommentChange}
    //         style={{ display: "block", margin: "10px 0", width: "100%" }}
    //       />
    //     </label>
    //     <div className="dialog-actions">
    //       <button onClick={submitProposal}>Submit</button>
    //       <button onClick={closeDialog}>Cancel</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Proposal;
