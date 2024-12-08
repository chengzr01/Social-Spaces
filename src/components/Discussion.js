import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

const Discussion = ({ discussionPolicy, setDiscussionState }) => {
  const [userVote, setUserVote] = useState(null);
  const [userComment, setUserComment] = useState("");
  // const [comments, setComments] = useState(discussionPolicy.comments);
  const [comments, setComments] = useState([]);

  const handleVote = (vote) => {
    setUserVote(vote);
  };

  console.log(discussionPolicy);

  const handleSubmitComment = () => {
    const username = Cookies.get("username");
    console.log(username);
    setUserComment("");
    var newVote = 0;
    if (userVote === "Agree") newVote = discussionPolicy.vote_count + 1;
    else if (userVote === "Disagree") newVote = discussionPolicy.vote_count - 1;
    else newVote = discussionPolicy.vote_count;
    var newComments = comments;
    newComments.push({
      username: username,
      vote: userVote || "No vote",
      comment: userComment,
    });
    setComments([...comments]);
    axios
      .post("/updatePolicy", {
        _id: discussionPolicy._id,
        userID: username,
        vote: newVote,
        comment: newComments,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <h2>{discussionPolicy.policy_name}</h2>
      <p>{discussionPolicy.policy_description}</p>

      <div className="comments-section">
        <h3>Simulation</h3>
        <ul>
          <li>
            <b>Policy Overview</b>:{" "}
            {discussionPolicy.simulationResult["Policy Overview"]}
          </li>
          <li>
            <i>Moderator</i>: {discussionPolicy.simulationResult["Moderator"]}
          </li>
          <li>
            <i>Regular User</i>:{" "}
            {discussionPolicy.simulationResult["Regular User"]}
          </li>
          <li>
            <i>Irregular User</i>: {discussionPolicy.simulationResult["Abuser"]}
          </li>
        </ul>
      </div>

      <div className="comments-section">
        <h3>Current Vote</h3>
        <p>{discussionPolicy.vote_count}</p>
      </div>

      <div className="comments-section">
        <h3>Current Comments</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.username}</strong> ({comment.vote}):{" "}
                {comment.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      <div className="user-interaction">
        <h3>Your Vote</h3>
        <button
          className={userVote === "Agree" ? "selected" : ""}
          onClick={() => handleVote("Agree")}
        >
          Agree
        </button>
        <button
          className={userVote === "Disagree" ? "selected" : ""}
          onClick={() => handleVote("Disagree")}
        >
          Disagree
        </button>

        <h3>Your Comment</h3>
        <textarea
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <button onClick={handleSubmitComment}>Submit</button>
      </div>
    </div>
  );
};

export default Discussion;
