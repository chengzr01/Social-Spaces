import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Discussion = ({ discussionPolicy, setDiscussionState }) => {
  const [userVote, setUserVote] = useState(null);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState(discussionPolicy.comments);

  useEffect(() => {
    if (discussionPolicy.comments) {
      setComments(discussionPolicy.comments);
    }
  }, [discussionPolicy.comments]);

  const handleVote = (vote) => {
    setUserVote(vote);
  };

  const handleSubmitComment = () => {
    const username = Cookies.get("username");
    setUserComment("");

    var vote_number = 0;
    if (userVote === "Agree") {
      vote_number = 1;
    } else {
      vote_number = -1;
    }
    const body = {
      _id: discussionPolicy._id,
      userID: username,
      vote: vote_number,
      comment: userComment,
    };
    axios
      .post("/updatePolicy", body)
      .then((response) => {
        console.log("Comment submitted successfully:", response);
        setComments([...comments, { author: username, body: userComment }]);
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
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
                <strong>{comment.author}</strong> : {comment.body}
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
