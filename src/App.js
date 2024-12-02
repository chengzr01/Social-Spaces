// App.js
import React, { useState } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import "./index.css";

const App = () => {
  return (
    <div className="app">
      <User />
      <Header />
      <div className="content">
        <Feed />
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
