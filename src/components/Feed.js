import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

const Feed = ({ discussionList, setDiscussionList }) => {
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Number of posts per page

  // Fetch posts from API using axios
  useEffect(() => {
    axios
      .get("/posts")
      .then((response) => {
        const data = response.data;
        setPosts(
          data.map((post) => ({
            id: post.id, // Compatibility with Post component
            ...post,
          }))
        );

        // Initialize the first page of posts
        setCurrentPosts(data.slice(0, postsPerPage));
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
      });
  }, []); // Run only once on component mount

  const handleVote = (postId, delta) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, upvote: post.upvote + delta } : post
    );
    setPosts(updatedPosts);

    // Update the visible posts for the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentPosts(updatedPosts.slice(indexOfFirstPost, indexOfLastPost));
  };

  // Handle pagination: Next Page
  const handleNextPage = () => {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const indexOfLastPost = nextPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;

      // Update current page and visible posts
      setCurrentPage(nextPage);
      setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    }
  };

  // Handle pagination: Previous Page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const indexOfLastPost = prevPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;

      // Update current page and visible posts
      setCurrentPage(prevPage);
      setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    }
  };

  return (
    <div className="feed">
      {currentPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onVote={handleVote}
          discussionList={discussionList}
          setDiscussionList={setDiscussionList}
        />
      ))}

      {/* Pagination controls */}
      <div
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            background: currentPage === 1 ? "#ddd" : "#0079d3",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            marginRight: "10px",
            borderRadius: "3px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ padding: "10px 20px", fontSize: "16px" }}>
          Page {currentPage} of {Math.ceil(posts.length / postsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
          style={{
            background:
              currentPage === Math.ceil(posts.length / postsPerPage)
                ? "#ddd"
                : "#0079d3",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            marginLeft: "10px",
            borderRadius: "3px",
            cursor:
              currentPage === Math.ceil(posts.length / postsPerPage)
                ? "not-allowed"
                : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Feed;
