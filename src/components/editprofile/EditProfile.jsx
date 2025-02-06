// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Button,
//   Avatar,
//   Badge,
// } from "@mui/material";
// import { PhotoCamera } from "@mui/icons-material"; // Icon for the badge
// import "./EditProfile.css";
// import 

// export default function EditProfile({ open, setOpen, profile, setProfile }) {
//   const [newProfile, setNewProfile] = useState(profile);

//   // Handle input change
//   const handleChange = (event) => {
//     setNewProfile({ ...newProfile, [event.target.name]: event.target.value });
//   };

//   // Handle profile picture change
//   const handleAvatarChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setNewProfile({ ...newProfile, avatar: imageURL });
//     }
//   };

//   // Save changes and update profile
//   const handleSaveChanges = () => {
//     setProfile(newProfile);
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
//       <DialogTitle>Edit Profile</DialogTitle>
//       <DialogContent>
//         <div className="edit-profile-container">
//           {/* Left side: Avatar with Badge */}
//           <div className="avatar-section">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleAvatarChange}
//               style={{ display: "none" }}
//               id="avatar-upload"
//             />
//             <label htmlFor="avatar-upload">
//               <Badge
//                 overlap="circular"
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 badgeContent={
//                   <div className="avatar-badge">
//                     <PhotoCamera fontSize="small" />
//                   </div>
//                 }
//               >
//                 <Avatar
//                   src={newProfile.avatar}
//                   className="profile-avatar"
//                   sx={{ width: 150, height: 150, cursor: "pointer" }}
//                 />
//               </Badge>
//             </label>
//           </div>

//           {/* Right side: Form fields */}
//           <div className="form-section">
//             <div className="input-container">
//               <TextField
//                 margin="dense"
//                 name="name"
//                 label="Name"
//                 type="text"
//                 fullWidth
//                 value={newProfile.name}
//                 onChange={handleChange}
//                 className="input-field"
//               />
//             </div>

//             <div className="input-container">
//               <TextField
//                 margin="dense"
//                 name="tagline"
//                 label="Tagline"
//                 type="text"
//                 fullWidth
//                 value={newProfile.tagline}
//                 onChange={handleChange}
//                 className="input-field"
//               />
//             </div>

//             <div className="input-container">
//               <TextField
//                 margin="dense"
//                 name="bio"
//                 label="About You"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 value={newProfile.bio}
//                 onChange={handleChange}
//                 className="input-field"
//               />
//               <Button
//                 variant="contained"
//                 className="edit-profile-btn"
//                 onClick={() => setOpen(true)}
//               >
//                 Change Password
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={() => setOpen(false)} color="secondary" className="cancel-button">
//           Cancel
//         </Button>
//         <Button onClick={handleSaveChanges} color="primary" className="save-button">
//           Save Changes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }


import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Avatar,
  Badge
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import ChangePasswordModal from "./ChangePass"; 
import "./EditProfile.css";

export default function EditProfile({ open, setOpen, profile, setProfile }) {
  const [newProfile, setNewProfile] = useState(profile);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false); // State for password modal

  // Handle input change
  const handleChange = (event) => {
    setNewProfile({ ...newProfile, [event.target.name]: event.target.value });
  };

  // Handle profile picture change
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewProfile({ ...newProfile, avatar: imageURL });
    }
  };

  // Save changes and update profile
  const handleSaveChanges = () => {
    setProfile(newProfile);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <div className="edit-profile-container">
            {/* Left side: Avatar */}
            <div className="avatar-section">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
                id="avatar-upload"
              />
              <div className="changeimage">
              <label htmlFor="avatar-upload">
               <Badge
                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                   <div className="avatar-badge bottom-right">
                     <PhotoCamera fontSize="small" />
                   </div>
                 }
               >
                 <Avatar
                   src={newProfile.avatar}
                   className="profile-avatar"
                   sx={{ width: 150, height: 150, cursor: "pointer" }}
                 />
               </Badge>
             </label>
              </div>
            </div>

            {/* Right side: Form fields */}
            <div className="form-section">
              <div className="input-container">
                <TextField
                  margin="dense"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  value={newProfile.name}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-container">
                <TextField
                  margin="dense"
                  name="tagline"
                  label="Tagline"
                  type="text"
                  fullWidth
                  value={newProfile.tagline}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="input-container">
                <TextField
                  margin="dense"
                  name="bio"
                  label="About You"
                  multiline
                  rows={4}
                  fullWidth
                  value={newProfile.bio}
                  onChange={handleChange}
                  className="input-field"
                />
                <Button
                  variant="contained"
                  className="edit-profile-btn"
                  onClick={() => setPasswordModalOpen(true)} // Open password modal
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary" className="cancel-button">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary" className="save-button">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Modal */}
      <ChangePasswordModal open={passwordModalOpen} setOpen={setPasswordModalOpen} />
    </>
  );
}
