// App.js
import React, { useState } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import Discussion from "./components/Discussion";
import Proposal from "./components/Proposal";

import "./index.css";

const App = () => {
  const [discussionState, setDiscussionState] = useState("feed");
  const [discussionPost, setDiscussionPost] = useState([]);
  const [discussionPolicy, setDiscussionPolicy] = useState({});

  const getMainInterface = () => {
    console.log(discussionState);
    switch (discussionState) {
      case "feed":
        return (
          <Feed
            discussionPost={discussionPost}
            setDiscussionPost={setDiscussionPost}
            setDiscussionState={setDiscussionState}
          />
        );
      case "proposal":
        return <Proposal setDiscussionState={setDiscussionState} />;
      default:
        return (
          <Discussion
            discussionPolicy={discussionPolicy}
            setDiscussionState={setDiscussionState}
          />
        );
    }
  };

  return (
    <div className="app">
      <User />
      <Header />
      <div className="content">
        {getMainInterface()}
        <Sidebar
          discussionPost={discussionPost}
          setDiscussionPost={setDiscussionPost}
          setDiscussionPolicy={setDiscussionPolicy}
          setDiscussionState={setDiscussionState}
        />
      </div>
    </div>
  );
};

export default App;
