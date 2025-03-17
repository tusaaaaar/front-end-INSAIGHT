import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import "./AllUsers.css"
import ProfilePopup from '../components/popup/ProfilePopup';
const AllUsers = () => {
  const { user } = useAuth(); // Get logged-in user from AuthContext
  const [users, setUsers] = useState([]);





  useEffect(() => {
    if (!user) return; // Ensure user exists before making request

    const fetchUsers = async () => {
      try {
        console.log("made an api call fro all users with id ",user._id);

        const res = await axios.get(`http://localhost:5000/all/${user._id}`); // Fetch all users except logged-in user
        setUsers(res.data);
        
        console.log("all users fetched from backend are ",users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user]); // Re-run effect if user changes


    //  Handle Follow/Unfollow Button Click
    const handleFollowToggle = async (targetUserId, isFollowing) => {
      try {
        const url = `http://localhost:5000/follow/${user._id}/${targetUserId}`;
        await axios.post(url); // Send follow/unfollow request
  
        //  Update UI instantly
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === targetUserId ? { ...u, isFollowing: !isFollowing } : u
          )
        );
      } catch (error) {
        console.error("Error updating follow status:", error);
      }
    };




  return (
    <div className="home-container">
      {/* <h2>Welcome, {user?.username}!</h2> */}
      <div className="suggested-users">
        <h3>Suggested Users</h3>
        <div className="users-list">
          {users.map((u) => (
            <div key={u._id} className="user-card">
              <img
                src={u.profilePicture ? `http://localhost:5000/files/${u.profilePicture}` : "/default-avatar.png"}
                alt="Avatar"
              />
              <p >{u.username}</p>

                {/* {selectedUser && (
                <ProfilePopup
                  user={selectedUser}
                  position={popupPosition}
                  onClose={() => setSelectedUser(null)}
                />
              )} */}



              {/* <button>Follow</button> */}
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
    </div>
  );
};

export default AllUsers;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext"; // Import useAuth
// import { Modal, Box, Typography, Button, Avatar } from "@mui/material";
// import "./AllUsers.css";

// const AllUsers = () => {
//   const { user } = useAuth(); // Get logged-in user from AuthContext
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null); // Store the clicked user for the pop-up

//   useEffect(() => {
//     if (!user) return; // Ensure user exists before making request

//     const fetchUsers = async () => {
//       try {
//         console.log("Made an API call for all users with ID:", user._id);
//         const res = await axios.get(`http://localhost:5000/all/${user._id}`);
//         setUsers(res.data);
//         console.log("All users fetched from backend are:", res.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [user]);

//   // 🟢 Handle Follow/Unfollow Button Click
//   const handleFollowToggle = async (targetUserId, isFollowing) => {
//     try {
//       const url = `http://localhost:5000/follow/${user._id}/${targetUserId}`;
//       await axios.post(url);

//       // 🟢 Update UI instantly
//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u._id === targetUserId ? { ...u, isFollowing: !isFollowing } : u
//         )
//       );
//     } catch (error) {
//       console.error("Error updating follow status:", error);
//     }
//   };

//   // 🟢 Handle Click on Username to Open Profile Pop-Up
//   const handleUserClick = async (userId) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/user/${userId}`); // Fetch full user details
//       setSelectedUser(res.data);
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     }
//   };

//   // 🟢 Close Modal
//   const handleClose = () => {
//     setSelectedUser(null);
//   };

//   return (
//     <div className="home-container">
//       <div className="suggested-users">
//         <h3>Suggested Users</h3>
//         <div className="users-list">
//           {users.map((u) => (
//             <div key={u._id} className="user-card">
//               <img
//                 src={
//                   u.profilePicture
//                     ? `http://localhost:5000/files/${u.profilePicture}`
//                     : "/default-avatar.png"
//                 }
//                 alt="Avatar"
//               />
//               <p onClick={() => handleUserClick(u._id)} className="username">
//                 {u.username}
//               </p>
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

//       {/* 🟢 User Profile Pop-Up */}
//       <Modal open={!!selectedUser} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "white",
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4,
//             textAlign: "center",
//           }}
//         >
//           {selectedUser && (
//             <>
//               <Avatar
//                 src={
//                   selectedUser.profilePicture
//                     ? `http://localhost:5000/files/${selectedUser.profilePicture}`
//                     : "/default-avatar.png"
//                 }
//                 sx={{ width: 100, height: 100, margin: "auto" }}
//               />
//               <Typography variant="h5">{selectedUser.username}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {selectedUser.bio || "No bio available"}
//               </Typography>

//               {/* 🟢 Profile Stats */}
//               <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
//                 <div>
//                   <Typography variant="h6">{selectedUser.posts?.length}</Typography>
//                   <Typography variant="body2">Posts</Typography>
//                 </div>
//                 <div>
//                   <Typography variant="h6">{selectedUser.followers?.length}</Typography>
//                   <Typography variant="body2">Followers</Typography>
//                 </div>
//                 <div>
//                   <Typography variant="h6">{selectedUser.following?.length}</Typography>
//                   <Typography variant="body2">Following</Typography>
//                 </div>
//               </Box>

//               {/* 🟢 Follow/Unfollow Button in Pop-Up */}
//               <Button
//                 variant="contained"
//                 color={selectedUser.isFollowing ? "secondary" : "primary"}
//                 sx={{ mt: 2 }}
//                 onClick={() => handleFollowToggle(selectedUser._id, selectedUser.isFollowing)}
//               >
//                 {selectedUser.isFollowing ? "Unfollow" : "Follow"}
//               </Button>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default AllUsers;

