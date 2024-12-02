// components/Feed.js
import React, { useState } from "react";
import Post from "./Post";

const initialPosts = [
  {
    id: 1,
    title: "Hello Reddit!",
    content: "This is my first post.",
    votes: 10,
  },
  {
    id: 2,
    title: "React is awesome",
    content: "Let's learn React together!",
    votes: 20,
  },
];

const Feed = ({ discussionList, setDiscussionList }) => {
  const [posts, setPosts] = useState(initialPosts);

  const handleVote = (postId, delta) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, votes: post.votes + delta } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="feed">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onVote={handleVote}
          discussionList={discussionList}
          setDiscussionList={setDiscussionList}
        />
      ))}
    </div>
  );
};

export default Feed;
