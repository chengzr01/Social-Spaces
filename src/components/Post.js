// components/Post.js
import React, { useState } from "react";

const Post = ({ post, onVote, discussionList, setDiscussionList }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(["Nice post!", "React is great!"]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = event.target.comment.value;
    setComments([...comments, newComment]);
    event.target.reset();
  };

  const handleReportDiscussion = (event) => {
    var discussionListUpdated = discussionList;
    discussionListUpdated.push(post);
    setDiscussionList(discussionListUpdated);
  };

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-footer">
        <button onClick={() => onVote(post.id, 1)}>⬆</button>
        <span>{post.votes}</span>
        <button onClick={() => onVote(post.id, -1)}>⬇</button>
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        <button onClick={() => handleReportDiscussion()}>
          {" "}
          Report Discussion{" "}
        </button>
      </div>
      {showComments && (
        <div className="comments">
          <h4>Comments</h4>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <form onSubmit={handleCommentSubmit}>
            <input type="text" name="comment" placeholder="Comment" />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
