// // import React, { useState } from "react";
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   TextField,
// //   DialogActions,
// //   Button,
// //   Avatar,
// //   Badge,
// // } from "@mui/material";
// // import { PhotoCamera } from "@mui/icons-material"; // Icon for the badge
// // import "./EditProfile.css";
// // import 

// // export default function EditProfile({ open, setOpen, profile, setProfile }) {
// //   const [newProfile, setNewProfile] = useState(profile);

// //   // Handle input change
// //   const handleChange = (event) => {
// //     setNewProfile({ ...newProfile, [event.target.name]: event.target.value });
// //   };

// //   // Handle profile picture change
// //   const handleAvatarChange = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       const imageURL = URL.createObjectURL(file);
// //       setNewProfile({ ...newProfile, avatar: imageURL });
// //     }
// //   };

// //   // Save changes and update profile
// //   const handleSaveChanges = () => {
// //     setProfile(newProfile);
// //     setOpen(false);
// //   };

// //   return (
// //     <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
// //       <DialogTitle>Edit Profile</DialogTitle>
// //       <DialogContent>
// //         <div className="edit-profile-container">
// //           {/* Left side: Avatar with Badge */}
// //           <div className="avatar-section">
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleAvatarChange}
// //               style={{ display: "none" }}
// //               id="avatar-upload"
// //             />
// //             <label htmlFor="avatar-upload">
// //               <Badge
// //                 overlap="circular"
// //                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //                 badgeContent={
// //                   <div className="avatar-badge">
// //                     <PhotoCamera fontSize="small" />
// //                   </div>
// //                 }
// //               >
// //                 <Avatar
// //                   src={newProfile.avatar}
// //                   className="profile-avatar"
// //                   sx={{ width: 150, height: 150, cursor: "pointer" }}
// //                 />
// //               </Badge>
// //             </label>
// //           </div>

// //           {/* Right side: Form fields */}
// //           <div className="form-section">
// //             <div className="input-container">
// //               <TextField
// //                 margin="dense"
// //                 name="name"
// //                 label="Name"
// //                 type="text"
// //                 fullWidth
// //                 value={newProfile.name}
// //                 onChange={handleChange}
// //                 className="input-field"
// //               />
// //             </div>

// //             <div className="input-container">
// //               <TextField
// //                 margin="dense"
// //                 name="tagline"
// //                 label="Tagline"
// //                 type="text"
// //                 fullWidth
// //                 value={newProfile.tagline}
// //                 onChange={handleChange}
// //                 className="input-field"
// //               />
// //             </div>

// //             <div className="input-container">
// //               <TextField
// //                 margin="dense"
// //                 name="bio"
// //                 label="About You"
// //                 multiline
// //                 rows={4}
// //                 fullWidth
// //                 value={newProfile.bio}
// //                 onChange={handleChange}
// //                 className="input-field"
// //               />
// //               <Button
// //                 variant="contained"
// //                 className="edit-profile-btn"
// //                 onClick={() => setOpen(true)}
// //               >
// //                 Change Password
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </DialogContent>

// //       <DialogActions>
// //         <Button onClick={() => setOpen(false)} color="secondary" className="cancel-button">
// //           Cancel
// //         </Button>
// //         <Button onClick={handleSaveChanges} color="primary" className="save-button">
// //           Save Changes
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // }


// import React, { useState,useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Button,
//   Avatar,
//   Badge
// } from "@mui/material";
// import { PhotoCamera } from "@mui/icons-material";
// import ChangePasswordModal from "./ChangePass"; 
// import "./EditProfile.css";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// export default function EditProfile({ open, setOpen }) {
//   const [newProfile, setNewProfile] = useState();
//   const [passwordModalOpen, setPasswordModalOpen] = useState(false); // State for password modal


//   const {user}=useAuth();//get user from AuthContext
//   const [userData, setUserData] = useState({});
//   const [preview, setPreview] = useState(""); // Profile pic preview state
//   const [selectedFile, setSelectedFile] = useState(null);

//   const [originalUserData, setOriginalUserData] = useState({});

//  // Fetch user data from backend
//  useEffect(() => {
//   if (user?.username) {
//     axios
//       .get(`http://localhost:5000/users/${encodeURIComponent(user.username)}`)
//       .then((response) => {
//         setUserData(response.data.user);
//         console.log("user data from backend ",response.data.user);
//         setOriginalUserData(response.data.user);

//         //  Ensure profilePicture is set correctly
//         if (response.data.user.profilePicture) {
//           setPreview(`http://localhost:5000${response.data.user.profilePicture}`);
//         } else {
//           setPreview("/default-avatar.png"); // Fallback image
//         }
//       })
//       .catch((error) => console.error("Error fetching user data:", error));
//   }
// }, [user]);



// // // Handle file selection
// // const handleFileChange = (event) => {
// //   const file = event.target.files[0];
// //   setSelectedFile(file);

// //   // Show preview immediately
// //   if (file) {
// //     setPreview(URL.createObjectURL(file)); 
// //   }
// // };

// // Handle Save Profile Changes
// const handleSaveChanges = () => {
//   const formData = new FormData();
//   formData.append("username", userData.username);
//   formData.append("email", userData.email);
//   formData.append("bio", userData.bio);

//   if (selectedFile) {
//     formData.append("profilePicture", selectedFile);
//   }

//   axios.post(`http://localhost:5000/uploadProfile/${encodeURIComponent(user.username)}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" }
//   })
//   .then(response => {
//     console.log(" Image uploaded successfully:", response.data.imageUrl);
    
//     setPreview(`http://localhost:5000${response.data.imageUrl}`); // Update preview
//     setUserData(prev => ({ ...prev, profilePicture: response.data.imageUrl })); // Update userData

//     setOpen(false); // Close pop-up
//   })
//   .catch(error => {
//     console.error(" Error uploading image:", error);
//   });
// };































//   // Handle input change
//   const handleChange = (event) => {
//     setNewProfile({ ...newProfile, [event.target.name]: event.target.value });
//   };

//   // Handle profile picture change
//   const handleAvatarChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setPreview(URL.createObjectURL(file));
//       setNewProfile({ ...newProfile, avatar: imageURL });
//     }
//   };

//   // // Save changes and update profile
//   // const handleSaveChanges = () => {
//   //   // setProfile(newProfile);
//   //   setNewProfile(newProfile);
//   //   setOpen(false);
//   // };

//   return (
//     <>
//       <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>Edit Profile</DialogTitle>
//         <DialogContent>
//           <div className="edit-profile-container">
//             {/* Left side: Avatar */}
//             <div className="avatar-section">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleAvatarChange}
//                 style={{ display: "none" }}
//                 id="avatar-upload"
//               />
//               <div className="changeimage">
//               <label htmlFor="avatar-upload">
//                <Badge
//                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 badgeContent={
//                    <div className="avatar-badge bottom-right">
//                      <PhotoCamera fontSize="small" />
//                    </div>
//                  }
//                >
//                  <Avatar
//                    src={preview}
//                    className="profile-avatar"
//                    sx={{ width: 150, height: 150, cursor: "pointer" }}
//                  />
//                </Badge>
//              </label>
//               </div>
//             </div>

//             {/* Right side: Form fields */}
//             <div className="form-section">
//               <div className="input-container">
//                 <TextField
//                   margin="dense"
//                   name="username"
//                   label="Name"
//                   type="text"
//                   fullWidth
//                   // value={newProfile.name}
//                   value={userData.username}
//                   onChange={handleChange}
//                   className="input-field"
//                 />
//               </div>

//               {/* <div className="input-container">
//                 <TextField
//                   margin="dense"
//                   name="tagline"
//                   label="Tagline"
//                   type="text"
//                   fullWidth
//                   value={newProfile.tagline}
//                   onChange={handleChange}
//                   className="input-field"
//                 />
//               </div> */}

//               <div className="input-container">
//                 <TextField
//                   margin="dense"
//                   name="bio"
//                   label="About You"
//                   multiline
//                   rows={4}
//                   fullWidth
//                   // value={newProfile.bio}
//                   value={userData.bio}
//                   onChange={handleChange}
//                   className="input-field"
//                 />
//                 <Button
//                   variant="contained"
//                   className="edit-profile-btn"
//                   onClick={() => setPasswordModalOpen(true)} // Open password modal
//                 >
//                   Change Password
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="secondary" className="cancel-button">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveChanges} color="primary" className="save-button">
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Change Password Modal */}
//       <ChangePasswordModal open={passwordModalOpen} setOpen={setPasswordModalOpen} />
//     </>
//   );
// }
