import React, { useEffect, useState } from "react";
import { Tooltip,IconButton } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  Grid,
  CardMedia,
  CardHeader,CardActions

} from "@mui/material";
import ReactDOM from "react-dom";
import "./Profile.css";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LockIcon from "@mui/icons-material/Lock";
import CreatePost from "../../components/post/CreatePost";

import DeleteIcon from "@mui/icons-material/Delete";
import { Favorite, ChatBubble, Delete,FavoriteBorder,ChatBubbleOutline } from "@mui/icons-material";

import {  Snackbar, CircularProgress, DialogActions, Dialog, DialogTitle, } from "@mui/material";


export default function Profile() {
  const { user, fetchUserData } = useAuth(); // Get user from AuthContext
  console.log("user details from useAuth in profile component", user);

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(""); // Profile pic preview state
  const [userData, setUserData] = useState({});
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [selectedTab, setSelectedTab] = useState("posts"); // Default: Show posts
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [zoomed, setZoomed] = useState(false);

  //for delete popup
 // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [users, setUsers] = useState([]);
   // Handle Delete Confirmation
   const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setDialogOpen(true);
  };

  const handleAvatarClick = () => setZoomed(!zoomed);
// Fetch user data from backend (includes GridFS image fetch)
useEffect(() => {
  if (user?._id) {
    axios
      .get(`http://localhost:5000/users/${encodeURIComponent(user._id)}`) // Use user._id
      .then(async (response) => {
        setUserData(response.data.user);

        if (response.data.user.profilePicture) {
          console.log("Profile picture from backend:", response.data.user.profilePicture);
          try {
            const imageResponse = await axios.get(
              `http://localhost:5000/files/${response.data.user.profilePicture}`,
              { responseType: "blob" }
            );

            const imageUrl = URL.createObjectURL(imageResponse.data);
            setPreview(imageUrl);
            console.log("Image URL:", imageUrl);
          } catch (error) {
            console.error("Error fetching profile picture:", error);
            setPreview("/default-avatar.png");
          }
        } else {
          setPreview("/default-avatar.png"); // Fallback image
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }
}, [user, userData.profilePicture]); // Refetch when profilePicture changes

  // Fetch posts, saved, followers, or following based on selectedTab
useEffect(() => {
  if (!user) return;

  const fetchData = async () => {
    try {
      if (selectedTab === "posts") {
        const res = await axios.get(`http://localhost:5000/posts/user/${user._id}/posts`);
        console.log("User posts:", res.data);
        setPosts(res.data);
      } else if (selectedTab === "saved") {
        const res = await axios.get(`http://localhost:5000/posts/user/${user._id}/saved`);
        setSavedPosts(res.data);
      } else if (selectedTab === "followers") {
        const res = await axios.get(`http://localhost:5000/user/${user._id}/followers`);
        setFollowers(res.data);
      } else if (selectedTab === "following") {
        const res = await axios.get(`http://localhost:5000/user/${user._id}/following`);
        setFollowing(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [selectedTab, user]);

// Toggle follow/unfollow user
const handleFollowToggle = async (targetId, listType) => {
  try {
    console.log("Sending backend details for follow/unfollow", user._id, targetId);
    const res = await axios.post(`http://localhost:5000/follow/${user._id}/${targetId}`);

    if (listType === "following") {
      setFollowing((prevState) =>
        prevState
          .map((u) =>
            u._id === targetId ? { ...u, isFollowing: res.data.isFollowing } : u
          )
          .filter((u) => res.data.isFollowing || u._id !== targetId) // Remove if unfollowed
      );
    } else if (listType === "followers") {
      setFollowers((prevState) =>
        prevState.map((u) =>
          u._id === targetId ? { ...u, isFollowing: res.data.isFollowing } : u
        )
      );
    }

    // Update userData follow lists
    setUserData((prevUserData) => ({
      ...prevUserData,
      following: res.data.isFollowing
        ? [...prevUserData.following, targetId]
        : prevUserData.following.filter((id) => id !== targetId),

      followers: res.data.isFollowing
        ? prevUserData.followers
        : prevUserData.followers.filter((id) => id !== user._id),
    }));
  } catch (error) {
    console.error("Error toggling follow state:", error);
  }
};

// Handle profile picture file selection
const handleFileChange = (event) => {
  console.log("Picture selected");
  const file = event.target.files[0];
  setSelectedFile(file);

  if (file) {
    setPreview(URL.createObjectURL(file)); // Show preview
  }
};

// Save new password
const handleSavePassword = async () => {
  setPasswordError("");

  if (newPassword !== confirmPassword) {
    setPasswordError("New password and confirm password do not match.");
    return;
  }

  console.log("Password typed to verify with hashed password:", typedPassword);
  try {
    const response = await axios.post(
      `http://localhost:5000/users/${encodeURIComponent(user.username)}/verify-password`,
      { password: typedPassword }
    );

    if (response.status === 200) {
      console.log("Password verified successfully!");
      console.log(response.data.message);
      setPasswordOpen(false);
      setPasswordError("");
    } else {
      setPasswordError(response.data.message || "Failed to update password.");
    }
  } catch (error) {
    setPasswordError("Please enter correct password");
  }
};

const [showCreatePost, setShowCreatePost] = useState(false);


// Close password popup and clear error
const handleClosePasswordPopup = () => {
  setPasswordOpen(false);
  setPasswordError("");
};

// Save profile changes (including GridFS upload)
const handleSave = async () => {
  const formData = new FormData();
  formData.append("username", userData.username);
  formData.append("id", userData._id);
  console.log("User ID:", userData._id);
  formData.append("email", userData.email);
  formData.append("bio", userData.bio);

  if (selectedFile) {
    formData.append("profilePicture", selectedFile);
  }

  if (newPassword) {
    formData.append("password", newPassword);
  }

  try {
    const response = await axios.put(
      `http://localhost:5000/users/${encodeURIComponent(userData._id)}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Profile updated successfully:", response.data);
    await fetchUserData(userData._id); // Update global user state
    setUserData(response.data.user);
    setOpen(false);

    if (response.data.user.profilePicture) {
      const imageResponse = await axios.get(
        `http://localhost:5000/files/${response.data.user.profilePicture}`,
        { responseType: "blob" }
      );
      const imageUrl = URL.createObjectURL(imageResponse.data);
      console.log("Image response URL:", imageUrl);
      setPreview(imageUrl);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

//for delete post
// const handleDeletePost = async (postId) => {
//   if (!window.confirm("Are you sure you want to delete this post?")) return;

//   try {
//     console.log("POST DELETE TO BACKEND id: ", postId);
    
//     const response = await axios.delete(`http://localhost:5000/post/delete/${postId}`);

//     if (response.status !== 200) throw new Error("Failed to delete post");

//     setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

//     alert("Post deleted successfully!");
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     alert("Failed to delete post. Please try again.");
//   }
// };

// const handleDeletePost = async (postId) => {
//   if (!window.confirm("Are you sure you want to delete this post?")) return; // Confirm before deleting
  
//   try {
//     console.log("Deleting post:", postId);
//     const response = await axios.delete(`http://localhost:5000/posts/delete/${postId}`);
    
//     alert("Post deleted successfully!"); // Show success message
//     setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId)); // Update UI
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     alert("Failed to delete post.");
//   }
// };

// const handleDeletePost = async (postId) => {
//   setLoading(true);
//   try {
//     await axios.delete(`http://localhost:5000/posts/delete/${postId}`);

//     setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
//     setSnackbarOpen(true); // Show success message

//   } catch (error) {
//     console.error("Error deleting post:", error);
//   }
//   setLoading(false);
//   setDialogOpen(false); // Close dialog after deleting
// };
 // Handle Post Deletion
 const handleDeletePost = async () => {
  if (!selectedPostId) return;

  setLoading(true);
  try {
    await axios.delete(`http://localhost:5000/posts/delete/${selectedPostId}`);

    // Remove the deleted post from the state
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== selectedPostId));
    

     // Update userData to reflect new post count
     setUserData((prevUserData) => ({
      ...prevUserData,
      posts: prevUserData.posts.filter((id) => id !== selectedPostId), // Remove post ID
    }));

    setSnackbarOpen(true); // Show success message
  } catch (error) {
    console.error("Error deleting post:", error);
  }
  setLoading(false);
  setDialogOpen(false);
};



// Show loading if user not available
if (!user) {
  return <Typography variant="h6">Loading user data...</Typography>;
}

 return (
  <Box className="profile-page">
    <Grid container justifyContent="center">
      <Grid item lg={9} xl={7}>
        <Card className="profile-card">
          {/* Header */}
          <Box className="profile-header">
            <Avatar
              src={preview}
              className="profile-avatar"
              onClick={handleAvatarClick}
            />

            {zoomed && ReactDOM.createPortal(
              <div className="zoomed-avatar-overlay" onClick={() => setZoomed(false)}>
                <Avatar src={preview} className="zoomed-avatar" />
              </div>,
              document.body // Directly body ke andar render hoga
            )}
           
            <Box className="profile-info">
              <Typography className="username">{userData.username}</Typography>
              <Typography className="bio">{userData.bio || "No bio available"}</Typography>
            </Box>
            





            <Tooltip title="Edit Profile" arrow>
              <IconButton Button className="edit-btn" onClick={() => setOpen(true)}>
                <EditIcon className="edit-icon" />
              </IconButton>
            </Tooltip>

            {/* <Box className="Create-Post-Button">
            <CreatePost />
</Box> */}

          </Box>
          {/* Edit Profile Popup */}
          {open && ReactDOM.createPortal (
            <Box className="popup-overlay">
              <Card className="popup-card">
                <Typography variant="h6">Edit Profile</Typography>
                <Divider />
                <CardContent className="popup-content">
                  <div className="popup-avatar-section">
                    <Avatar src={preview} className="popup-avatar" />
                    <Button component="label" className="upload-btn">
                      Upload
                      <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                  </div>
                  <div className="popup-inputs">
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Bio</FormLabel>
                      <Input value={userData.bio} onChange={(e) => setUserData({ ...userData, bio: e.target.value })} />
                    </FormControl>
                    <Button className="password-btn" onClick={() => setPasswordOpen(true)}>
                      Change Password
                    </Button>
                  </div>
                </CardContent>
                <div className="popup-actions">
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </Card>
            </Box>,
            document.body
          )}

          {/* Change Password Popup */}
          {passwordOpen && ReactDOM.createPortal(
            <Box className="popup-overlay">
              <Card className="popup-card">
                <Typography variant="h6">Change Password</Typography>
                <Divider />
                <FormControl>
                  <FormLabel>Current Password</FormLabel>
                  <Input type="password" onChange={(e) => setTypedPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>New Password</FormLabel>
                  <Input type="password" onChange={(e) => setNewPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </FormControl>
                {passwordError && <Typography color="error">{passwordError}</Typography>}
                <div className="popup-actions">
                  <Button onClick={handleClosePasswordPopup}>Cancel</Button>
                  <Button onClick={handleSavePassword}>Save</Button>
                </div>
              </Card>
            </Box>,
            document.body
          )}
        </Card>

        {/* Stats Section */}
        <Box className="Create-Post-Button">
            <CreatePost />
</Box>
        <Card className="profile-card">
          <CardContent className="profile-stats">
            <div className="stat-item" onClick={() => setSelectedTab("posts")}>
              <Typography variant="h5">{userData?.posts?.length || 0}</Typography>
              <Typography variant="body2">Posts</Typography>
            </div>
            <div className="stat-item" onClick={() => setSelectedTab("saved")}>
              <Typography variant="h5">{userData?.savedPosts?.length || 0}</Typography>
              <Typography variant="body2">Saved</Typography>
            </div>
            <div className="stat-item" onClick={() => setSelectedTab("followers")}>
              <Typography variant="h5">{userData?.followers?.length || 0}</Typography>
              <Typography variant="body2">Followers</Typography>
            </div>
            <div className="stat-item" onClick={() => setSelectedTab("following")}>
              <Typography variant="h5">{userData?.following?.length || 0}</Typography>
              <Typography variant="body2">Following</Typography>
            </div>
          </CardContent>

          {/* Dynamic Content Section */}
          <CardContent>
          <>
      {selectedTab === "posts" && (
  <div>
    <Typography variant="h5" sx={{ mb: 2 }}>Your Posts</Typography>

    {posts.length > 0 ? (
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card className="post-card" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              {/* Post Header */}
              <CardHeader
                avatar={
                  <Avatar src={user?.profilePictureUrl || "/default-avatar.png"} alt={user?.username || "User"} />
                }
                title={user?.username || "Unknown User"}
                subheader={new Date(post.createdAt).toLocaleString()}
              />

              {/* Post Content: Fixed height box */}
              <Box
                sx={{
                  height: 250,
                  bgcolor: "#f9f9f9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {post.images?.length > 0 ? (
                  <img
                    src={post.images[0]}
                    alt="Post"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  // <CardContent sx={{ width: "100%" }}>
                  //   <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray", mb: 1 }}>
                  //     Article
                  //   </Typography>
                  //   <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                  //     {post.content?.slice(0, 120) || ""}...
                  //   </Typography>
                  // </CardContent>
                  <CardContent sx={{ width: "100%", px: 2, py: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontStyle: "italic", color: "gray", mb: 1 }}
                  >
                    Article
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.7,
                      fontWeight: 400,
                      fontSize: "1rem",
                      color: "#333",
                      fontFamily: `"Georgia", "Times New Roman", serif`
                    }}
                  >
                    {post.content?.slice(0, 120) || ""}...
                  </Typography>
                </CardContent>
                

                )}
              </Box>

              {/* Caption */}
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>{post.caption}</Typography>
              </CardContent>

              {/* Post Actions */}
              <CardActions sx={{ justifyContent: "space-between", mt: "auto" }}>
                <IconButton>
                  <FavoriteBorder />
                  <Typography variant="body2">{post.likes.length}</Typography>
                </IconButton>

                <IconButton>
                  <ChatBubbleOutline />
                  <Typography variant="body2">{post.comments.length}</Typography>
                </IconButton>

                <IconButton
                  onClick={() => handleDeleteClick(post._id)}
                  color="error"
                  disabled={loading}
                >
                  {loading && selectedPostId === post._id ? (
                    <CircularProgress size={24} />
                  ) : (
                    <DeleteIcon />
                  )}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 4, color: "gray" }}>
        No posts yet.
      </Typography>
    )}
  </div>
)}


      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="error" autoFocus disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Post deleted successfully"
      />
      {/* <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
  onClose={() => setSnackbarOpen(false)}
  message="Post deleted successfully"
  anchorOrigin={{ vertical: "top", horizontal: "center" }} // Moves Snackbar to the top
/> */}


    </>


            


            {/* {selectedTab === "saved" && (
              <div>
                <h3>Saved Posts</h3>
                {savedPosts.length > 0 ? (
                  <Grid container spacing={2}>
                    {savedPosts.map((post) => (
                      <Grid item xs={12} sm={6} md={4} key={post._id}>
                        <Card className="post-card">
                          {post.images?.[0] ? (
                            <img src={post.images[0]} alt="Saved" className="post-image" />
                          ) : (
                            <CardContent>
                              <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>Article</Typography>
                              <Typography variant="body1">
                                {post.content?.slice(0, 100) || ""}...
                              </Typography>
                            </CardContent>
                          )}
                          <CardContent>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                              {post.caption}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <p>No saved posts yet.</p>
                )}
              </div>
            )} */}
            {selectedTab === "saved" && (
  <div>
    <Typography variant="h5" sx={{ mb: 2 }}>Saved Posts</Typography>

    {savedPosts.length > 0 ? (
      <Grid container spacing={2}>
        {savedPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card className="post-card" sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
              {/* Post Header */}
              <CardHeader
                avatar={
                  <Avatar
                    src={`http://localhost:5000/files/${post.postedBy?.profilePicture}` || "/default-avatar.png"}
                    alt={post.postedBy?.username || "User"}
                  />
                }
                title={post.postedBy?.username || "Unknown User"}
                subheader={new Date(post.createdAt).toLocaleString()}
              />

              {/* Post Content with fixed height */}
              <Box sx={{ height: 250, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f9f9f9" }}>
                {post.images?.[0] ? (
                  <img
                    src={post.images[0]}
                    alt="Saved Post"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  // <CardContent sx={{ width: "100%" }}>
                  //   <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray", mb: 1 }}>
                  //     Article
                  //   </Typography>
                  //   <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                  //     {post.content?.slice(0, 120) || ""}...
                  //   </Typography>
                  // </CardContent>
                  <CardContent sx={{ width: "100%", px: 2, py: 1 }}>
  <Typography
    variant="subtitle2"
    sx={{ fontStyle: "italic", color: "gray", mb: 1 }}
  >
    Article
  </Typography>
  <Typography
    variant="body1"
    sx={{
      lineHeight: 1.7,
      fontWeight: 400,
      fontSize: "1rem",
      color: "#333",
      fontFamily: `"Georgia", "Times New Roman", serif`
    }}
  >
    {post.content?.slice(0, 120) || ""}...
  </Typography>
</CardContent>

                  
                )}
              </Box>

              {/* Caption */}
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {post.caption}
                </Typography>
              </CardContent>

              {/* Post Actions */}
              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <FavoriteBorder fontSize="small" color="action" />
                  <Typography variant="body2">{post.likesCount}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <ChatBubbleOutline fontSize="small" color="action" />
                  <Typography variant="body2">{post.commentsCount}</Typography>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 4, color: "gray" }}>
        No saved posts yet.
      </Typography>
    )}
  </div>
)}




            {selectedTab === "followers" && (
              <div>
                <h3>Followers</h3>
                {followers.length > 0 ? (
                  followers.map((follower) => (
                    <div key={follower._id} className="user-card">
                      <img
                        src={follower.profilePicture ? `http://localhost:5000/files/${follower.profilePicture}` : "/default-avatar.png"}
                        alt="Avatar"
                      />
                      <p>{follower.username}</p>
                      <button onClick={() => handleFollowToggle(follower._id, "followers")}>
                        {follower.isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No followers yet.</p>
                )}
              </div>
            )}

            {selectedTab === "following" && (
              <div>
                <h3>Following</h3>
                {following.length > 0 ? (
                  following.map((user) => (
                    <div key={user._id} className="user-card">
                      <img
                        src={user.profilePicture ? `http://localhost:5000/files/${user.profilePicture}` : "/default-avatar.png"}
                        alt="Avatar"
                      />
                      <p>{user.username}</p>
                      <button onClick={() => handleFollowToggle(user._id, "following")}>
                        {user.isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Not following anyone yet.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);
}

