import React, { useState } from "react";

const User = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", avatar: "" });
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLoginClick = () => {
    setShowLoginDialog(true); // Show the login dialog
  };

  const handleLoginSubmit = () => {
    // Simulate login process
    setUserInfo({
      username: credentials.username,
      avatar: "https://via.placeholder.com/40", // Placeholder avatar
    });
    setIsLoggedIn(true);
    setShowLoginDialog(false); // Close the dialog
  };

  const handleLogout = () => {
    setUserInfo({ username: "", avatar: "" });
    setIsLoggedIn(false);
  };

  const handleCancel = () => {
    setShowLoginDialog(false); // Close the dialog
  };

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="user">
      {/* Left: Logo */}
      <a href="/">
        <img
          style={{ height: "2em" }}
          src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Reddit_logo_2023.svg/2880px-Reddit_logo_2023.svg.png"
          alt="Reddit Logo"
        />
      </a>

      {/* Right: User Info */}
      <div className="user-actions">
        {isLoggedIn ? (
          <div className="user-info">
            <img src={userInfo.avatar} alt="User Avatar" className="avatar" />
            <span className="username">{userInfo.username}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleLoginClick} className="login-button">
            Login
          </button>
        )}
      </div>

      {/* Login Dialog */}
      {showLoginDialog && (
        <div
          className="login-dialog"
          style={{
            display: "flex",
            justifyContent: "center", // Horizontally centers the content
            alignItems: "center", // Vertically centers the content
            height: "100vh", // Takes full height of the viewport
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: dim background for dialog
          }}
        >
          <div
            className="dialog-content"
            style={{
              display: "flex",
              flexDirection: "column", // Stack child elements vertically
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "10px", // Optional: rounded corners
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: shadow for the dialog
              width: "300px", // Adjust the width as per your needs
            }}
          >
            <h2>Login</h2>
            <input
              style={{
                width: "80%",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleInputChange}
            />
            <input
              style={{
                width: "80%",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
            />
            <div
              className="dialog-actions"
              style={{
                display: "flex",
                justifyContent: "space-between", // Space between the buttons
                width: "80%", // Ensure buttons align with the inputs
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleLoginSubmit}
                className="submit-button"
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "#4caf50", // Green for submit
                  color: "white",
                }}
              >
                Submit
              </button>
              <button
                onClick={handleCancel}
                className="cancel-button"
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "#f44336", // Red for cancel
                  color: "white",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
