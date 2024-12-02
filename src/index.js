// index.js or App.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import PolicyDiscussionPage from "./components/PolicyDiscussionPage";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/policy/:id" element={<PolicyDiscussionPage />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
