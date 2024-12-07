// App.js
import React, { useState } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import "./index.css";

const App = () => {
  const [discussionPost, setDiscussionPost] = useState([]);
  return (
    <div className="app">
      <User />
      <Header />
      <div className="content">
        <Feed
          discussionPost={discussionPost}
          setDiscussionPost={setDiscussionPost}
        />
        <Sidebar
          discussionPost={discussionPost}
          setDiscussionPost={setDiscussionPost}
        />
      </div>
    </div>
  );
};

export default App;
