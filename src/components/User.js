import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const User = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", avatar: "" });
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Effect to check for username in cookies on component mount
  useEffect(() => {
    const cachedUsername = Cookies.get("username");
    if (cachedUsername) {
      setUserInfo({
        username: cachedUsername,
        avatar: "https://via.placeholder.com/40", // Placeholder avatar
      });
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    setShowLoginDialog(true); // Show the login dialog
  };

  const handleLoginSubmit = () => {
    // Simulate login process
    const username = credentials.username;
    setUserInfo({
      username,
      avatar: "https://via.placeholder.com/40", // Placeholder avatar
    });
    setIsLoggedIn(true);

    // Save username to cookies
    Cookies.set("username", username, { expires: 7 }); // Cookie expires in 7 days

    setShowLoginDialog(false); // Close the dialog
  };

  const handleLogout = () => {
    setUserInfo({ username: "", avatar: "" });
    setIsLoggedIn(false);

    // Remove username from cookies
    Cookies.remove("username");
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
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="dialog-content"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "300px",
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
                justifyContent: "space-between",
                width: "80%",
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
                  backgroundColor: "#4caf50",
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
                  backgroundColor: "#f44336",
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
