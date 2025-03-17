import React, { useEffect, useRef } from "react";

const ProfilePopup = ({ user, position, onClose }) => {
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        padding: "10px",
        width: "250px",
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={user.profilePicture || "/default-avatar.png"}
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 10 }}
        />
        <div>
          <h4 style={{ margin: 0 }}>{user.username}</h4>
          <p style={{ fontSize: "12px", color: "gray" }}>
            {user.followers.length} Followers | {user.posts.length} Posts
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
