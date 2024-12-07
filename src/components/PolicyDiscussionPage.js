// components/PolicyDiscussionPage.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const policies = {
  1: {
    title: "Reduce spam filter aggressiveness",
    description:
      "Adjust spam filters to allow legitimate posts while still blocking actual spam.",
    comments: [
      "Spam filters are too aggressive!",
      "We should carefully adjust this to avoid more spam.",
    ],
  },
  2: {
    title: "Introduce weekly discussion threads",
    description:
      "Encourage students to participate in structured weekly discussions.",
    comments: [
      "This sounds like a great idea!",
      "We need more engagement from the community.",
    ],
  },
};

const PolicyDiscussionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState(policies[id]?.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const policy = policies[id];

  if (!policy) {
    return <div>Policy not found</div>;
  }

  return (
    <div className="policy-discussion-page">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>{policy.title}</h2>
      <p>{policy.description}</p>
      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default PolicyDiscussionPage;
