import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const rules = [
  {
    id: 1,
    title: "Sales, ads, voting, etc.",
    description: "No promotional content or advertising.",
  },
  {
    id: 2,
    title: "Personal information",
    description: "Do not share personal or sensitive information.",
  },
];

const policyProposals = [
  {
    id: 1,
    title: "Reduce spam filter aggressiveness",
    description: "Adjust spam filters to allow legitimate posts.",
  },
  {
    id: 2,
    title: "Introduce weekly discussion threads",
    description: "Encourage weekly discussions on campus topics.",
  },
];

const discussionList = [
  {
    id: 1,
    title: "Hello reddit!",
    description: "This is my first post.",
  },
];

const Sidebar = () => {
  const [expandedRules, setExpandedRules] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const toggleRule = (id) => {
    setExpandedRules((prev) =>
      prev.includes(id) ? prev.filter((ruleId) => ruleId !== id) : [...prev, id]
    );
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost("");
    setComment("");
  };

  const handlePostSelection = (event) => setSelectedPost(event.target.value);
  const handleCommentChange = (event) => setComment(event.target.value);

  const submitProposal = () => {
    console.log("Selected Post:", selectedPost);
    console.log("Comment:", comment);

    // Simulate getting policy suggestions from AI model
    const aiSuggestions = ["Policy Suggestion 1", "Policy Suggestion 2"];
    alert(`AI Policy Suggestions: ${aiSuggestions.join(", ")}`);
    closeDialog();
  };

  const goToPolicyDiscussion = (id) => {
    navigate(`/policy/${id}`); // Navigate to the discussion page
  };

  return (
    <div className="sidebar">
      <div className="subreddit-info">
        <h2>The University of Illinois at Urbana-Champaign</h2>
        <p>
          This subreddit is for anyone/anything related to UIUC. Students,
          Alumni, Faculty, and Townies are all welcome. Given the lack of a
          regional subreddit, it also covers most things in the Champaign-Urbana
          area. This subreddit is not sponsored or endorsed by the University of
          Illinois or any other on-campus group.
        </p>
        <p>Created Aug 7, 2008</p>
        <p>Public</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <div>97K Members</div>
          <div>30 Online</div>
          <div>Top 2% Ranked by size</div>
        </div>
      </div>

      <div className="rules">
        <h3>Rules</h3>
        {rules.map((rule) => (
          <div key={rule.id} className="rule">
            <div className="rule-title" onClick={() => toggleRule(rule.id)}>
              {rule.title} {expandedRules.includes(rule.id) ? "▲" : "▼"}
            </div>
            {expandedRules.includes(rule.id) && (
              <p className="rule-description">{rule.description}</p>
            )}
          </div>
        ))}
      </div>

      <div className="policy-discussion">
        <div>
          <h3>Policy Discussion</h3>
          <button onClick={openDialog}>Propose</button>
        </div>

        {policyProposals.map((policy) => (
          <div key={policy.id} className="policy-item">
            <h4>{policy.title}</h4>
            <p>{policy.description}</p>
            <button onClick={() => goToPolicyDiscussion(policy.id)}>
              Discuss
            </button>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Propose a Policy</h3>
            <label>
              Select a Post (Optional):
              <select
                value={selectedPost}
                onChange={handlePostSelection}
                style={{ display: "block", margin: "10px 0" }}
              >
                <option value="">None</option>
                {discussionList.map((post) => (
                  <option key={post.id} value={post.title}>
                    {post.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={handleCommentChange}
                style={{ display: "block", margin: "10px 0", width: "100%" }}
              />
            </label>
            <div className="dialog-actions">
              <button onClick={submitProposal}>Submit</button>
              <button onClick={closeDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="policy-discussion">
        <h3>Post Discussion</h3>
        {discussionList.map((post) => (
          <div key={post.id} className="policy-item">
            <h4>{post.title}</h4>
            <p>{post.description}</p>
          </div>
        ))}
      </div>

      <div className="moderator-info">
        <h3>Moderators</h3>
        <ul>
          <li>Mod1</li>
          <li>Mod2</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
