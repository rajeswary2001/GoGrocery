import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../assets/home_background.png';

function Account() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  const handleLogout = () => {
    localStorage.removeItem("user");      // Remove user info
    alert("Logged out successfully");
    navigate("/auth");                   // Redirect to login page
    window.location.reload();            // Refresh to update nav/UI
  };

  return (
    <div  className="app-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div style={{ padding: "1rem" }}>
        {user ? (
            <h2>Welcome {user.name}, This is your account </h2>
            ):<h2></h2>
        }
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
    
  );
}

export default Account;
