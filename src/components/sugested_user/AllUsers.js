// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext'; // Import useAuth
// import "./AllUsers.css";
// //import ProfilePopup from '../popup/ProfilePopup';

// const AllUsers = () => {
//   const { user } = useAuth(); // Get logged-in user from AuthContext
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     if (!user) return; // Ensure user exists before making request

//     const fetchUsers = async () => {
//       try {
//         console.log("made an api call for all users with id ", user._id);
//         const res = await axios.get(`http://localhost:5000/all/${user._id}`); // Fetch all users except logged-in user
//         setUsers(res.data);
//         console.log("all users fetched from backend are ", users);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, [user]); // Re-run effect if user changes

//   // Handle Follow/Unfollow Button Click
//   const handleFollowToggle = async (targetUserId, isFollowing) => {
//     try {
//       const url = `http://localhost:5000/follow/${user._id}/${targetUserId}`;
//       await axios.post(url); // Send follow/unfollow request

//       // Update UI instantly
//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u._id === targetUserId ? { ...u, isFollowing: !isFollowing } : u
//         )
//       );
//     } catch (error) {
//       console.error("Error updating follow status:", error);
//     }
//   };

//   return (
//     <div className="home-container">
//       {/* <h2>Welcome, {user?.username}!</h2> */}
//       <div className="suggested-users">
//         <h3>Suggested Users</h3>
//         <div className="users-list">
//           {users.map((u) => (
//             <div key={u._id} className="user-card">
//               <img
//                 loading="lazy"
//                 src={u.profilePicture ? `http://localhost:5000/files/${u.profilePicture}` : "/default-avatar.png"}
//                 alt="Avatar"
//               />
//               <p data-bio={u.bio || "No bio provided"}>{u.username}</p>
//               <button
//                 onClick={() => handleFollowToggle(u._id, u.isFollowing)}
//                 className={u.isFollowing ? "following" : "follow"}
//               >
//                 {u.isFollowing ? "Following" : "Follow"}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import "./AllUsers.css";
import ProfilePopup from '../popup/ProfilePopup';
import { Tooltip } from "@mui/material";

const AllUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/all/${user._id}`);
        setUsers(res.data);
        res.data.forEach((u) => {
          console.log("Bio received for", u.username, ":", u.bio);
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user]);

  const handleFollowToggle = async (targetUserId, isFollowing) => {
    try {
      const url = `http://localhost:5000/follow/${user._id}/${targetUserId}`;
      await axios.post(url);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === targetUserId ? { ...u, isFollowing: !isFollowing } : u
        )
      );
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  // Handle click on username to open profile popup
  const handleUserClick = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/profile/${userId}`);
      console.log("other user profile details",res.data);
      setSelectedProfile(res.data);  // ← pass entire object
      setPopupOpen(true);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  

  return (
    <div className="home-container">
      <div className="suggested-users">
        <h3>Suggested Users</h3>
        <div className="users-list">
          {users.map((u) => (
            <div key={u._id} className="user-card">
              <img
                loading="lazy"
                src={u.profilePicture ? `http://localhost:5000/files/${u.profilePicture}` : "/default-avatar.png"}
                alt="Avatar"
              />
              <p
                data-bio={u.bio|| "No bio provided"}
                onClick={() => handleUserClick(u._id)}
                style={{ cursor: 'pointer', color: '#007bff' }}
              >
                {u.username}
              </p>
          

              <button
                onClick={() => handleFollowToggle(u._id, u.isFollowing)}
                className={u.isFollowing ? "following" : "follow"}
              >
                {u.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Pop-up */}
      <ProfilePopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        profileData={selectedProfile}
      />
    </div>
  );
};

export default AllUsers;

