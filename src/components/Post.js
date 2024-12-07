// components/Post.js
import React, { useState } from "react";

const Post = ({ post, onVote }) => {
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = event.target.comment.value.trim();
    if (newComment) {
      post.comments.push({
        author: "you",
        body: newComment,
        created_at: new Date().toISOString(),
      });
      event.target.reset();
    }
  };

  return (
    <div
      className="post"
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "15px",
        margin: "15px 0",
      }}
    >
      <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>{post.title}</h2>
      <p style={{ color: "#555", marginBottom: "10px" }}>
        Posted by <strong>{post.author}</strong> ·{" "}
        {new Date(post.created_at).toLocaleString()}
      </p>
      <p style={{ fontSize: "14px", lineHeight: "1.5", marginBottom: "10px" }}>
        {post.body}
      </p>
      <div
        className="post-footer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="voting">
          <button
            onClick={() => onVote(post.id, 1)}
            aria-label="Upvote"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ⬆
          </button>
          <span style={{ margin: "0 5px" }}>{post.upvote}</span>
          <button
            onClick={() => onVote(post.id, -1)}
            aria-label="Downvote"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ⬇
          </button>
        </div>
        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            background: "#0079d3",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          {showComments
            ? "Hide Comments"
            : `Show Comments (${post.comments.length})`}
        </button>
      </div>
      {showComments && (
        <div className="comments" style={{ marginTop: "15px" }}>
          <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>Comments</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            {post.comments.map((comment, index) => (
              <li
                key={index}
                style={{
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                }}
              >
                <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                  <strong>{comment.author}</strong> ·{" "}
                  {new Date(comment.created_at).toLocaleString()}
                </p>
                <p style={{ fontSize: "14px", lineHeight: "1.4" }}>
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
          <form onSubmit={handleCommentSubmit} style={{ marginTop: "10px" }}>
            <input
              type="text"
              name="comment"
              placeholder="Add a comment"
              style={{
                width: "calc(100% - 80px)",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                marginRight: "5px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#0079d3",
                color: "#fff",
                border: "none",
                padding: "8px 15px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
