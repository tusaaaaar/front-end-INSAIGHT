import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Avatar, Box, Grid } from "@mui/material";
import {  CardMedia } from "@mui/material";

import CardActions from "@mui/joy/CardActions";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import axios from "axios";
// import { useAuth } from "../context/AuthContext";
import { useAuth } from "../../context/AuthContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LockIcon from "@mui/icons-material/Lock";



export default function Profile() {
  const { user,fetchUserData} = useAuth(); // Get user from AuthContext
  // const [updatedData, setUpdatedData] = useState(user || {}); // Store entire user object
  console.log("user details from useauth in profile component  ",user);

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(""); // Profile pic preview state
  const [userData, setUserData] = useState({});
  const [passwordOpen,setPasswordOpen] = useState(false);
  const [currentPassword,setCurrentPassword]=useState("");
  const [typedPassword,setTypedPassword]=useState("")
  const [newPassword,setNewPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  const[passwordError,setPasswordError]=useState("");


//for posts,saved posts,followers,following toggle
  const [selectedTab, setSelectedTab] = useState("posts"); // Default: Show posts
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);


  const [zoomed, setZoomed] = useState(false);
  

  // Handle avatar click
const handleAvatarClick = () => setZoomed(!zoomed);
 
  // // Fetch user data from backend
  // useEffect(() => {
  //   if (user?.username) {
  //     axios
  //       .get(`http://localhost:5000/users/${encodeURIComponent(user.username)}`)
  //       .then((response) => {
  //         setUserData(response.data.user);
  //         // setOriginalUserData(response.data.user);
  //         console.log("Frontend has user data ",response.data.user);
  //         // console.log("user pass ",user.password);
  //         setCurrentPassword(user.password);
       
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



  //ftech data from backend ....included gridfs
  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:5000/users/${encodeURIComponent(user._id)}`) // Use user._id instead of user.username
        .then(async (response) => {
          setUserData(response.data.user);
  
          if (response.data.user.profilePicture) {
            console.log("Check what is sent to backend:", response.data.user.profilePicture);
            try {
              const imageResponse = await axios.get(
                `http://localhost:5000/files/${response.data.user.profilePicture}`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(imageResponse.data);
              setPreview(imageUrl);
              console.log("Image URL is:", imageUrl);
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
  }, [user, userData.profilePicture]); // Ensure it refetches when profilePicture changes
  
  
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        if (selectedTab === "posts") {
          // const res = await axios.get(`http://localhost:5000/user/${user._id}/posts`);
          // setPosts(res.data);
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


const handleFollowToggle = async (targetId, listType) => {
  try {
    console.log("Sending backend details for follow/unfollow", user._id, targetId);
    const res = await axios.post(`http://localhost:5000/follow/${user._id}/${targetId}`);

    if (listType === "following") {
      // Update "Following" list
      setFollowing((prevState) =>
        prevState.map((u) =>
          u._id === targetId ? { ...u, isFollowing: res.data.isFollowing } : u
        ).filter((u) => res.data.isFollowing || u._id !== targetId) // Remove if unfollowed
      );

    //     //  Refetch userData to get updated followers and following list
    // const updatedUserRes = await axios.get(`http://localhost:5000/users/${encodeURIComponent(user._id)}`);
    // setUserData(updatedUserRes.data);  // Update userData state with latest data

    } else if (listType === "followers") {
      // Update "Followers" list
      setFollowers((prevState) =>
        prevState.map((u) =>
          u._id === targetId ? { ...u, isFollowing: res.data.isFollowing } : u
        )
      );

      //  //  Refetch userData to get updated followers and following list
      //  const updatedUserRes = await axios.get(`http://localhost:5000/users/${encodeURIComponent(user._id)}`);
      //  setUserData(updatedUserRes.data);  // Update userData state with latest data

    }
    
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



  // Handle file selection
  const handleFileChange = (event) => {
    console.log("picture got selected ");
    const file = event.target.files[0];
    setSelectedFile(file);


    // setUpdatedData({ ...updatedData, [e.target.name]: e.target.value }); //added

    // Show preview immediately
    if (file) {
      setPreview(URL.createObjectURL(file)); 
    }
  };

//handle password pop save
const handleSavePassword = async ()=>{

    setPasswordError("");
  if (newPassword !== confirmPassword) {
    setPasswordError("New password and confirm password do not match.");
    return;
  }

console.log("PAssword typed to verify with hashed password ",typedPassword);
try{
  const response= await axios.post(`http://localhost:5000/users/${encodeURIComponent(user.username)}/verify-password`,{
     password:typedPassword
  });

  if(response.status===200){
    console.log("PAssword verified successfully!");
    console.log(response.data.message);
    setPasswordOpen(false);
    setPasswordError("");
    // setNewPassword("");
    // setConfirmPassword("");
  }
  else{
    setPasswordError(response.data.message || "Failed to update password.")
  }
}catch(error){
  setPasswordError("Please enter correct password");
  // console.log(error);
}


};

// Close password popup and reset error
const handleClosePasswordPopup = () => {
  setPasswordOpen(false);
  setPasswordError(""); // Clear error when closing the popup
};


  // // Handle Save Profile Changes

  // const handleSave = () => {
  //   const formData = new FormData();
  //   formData.append("username", userData.username);
  //   formData.append("email", userData.email);
  //   formData.append("bio", userData.bio);
  
  //   if (selectedFile) {
  //     formData.append("profilePicture", selectedFile);
  //   }

  //   //password
  //   if (newPassword){
  //     console.log("new password is ",newPassword);
  //     formData.append("password",newPassword);
  //   }
  
  //   axios.put(`http://localhost:5000/users/${encodeURIComponent(user.username)}`, formData, {
  //     headers: { "Content-Type": "multipart/form-data" }
  //   })
  //   .then(response => {
  //     console.log("Profile updated successfully:", response.data);
  //     const updatedUser = response.data.user;
  //     setPreview(`http://localhost:5000${updatedUser.profilePicture}`);
  //     setUserData(updatedUser);
  //     setOpen(false);

  //     setNewPassword("");
  //     setConfirmPassword("");
  //     setPasswordError("");
  //     setTypedPassword("");
  //   })
  //   .catch(error => {
  //     console.error("Error updating profile:", error);
  //   });
  // };


  //handle save changes ....gridfs
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("id",userData._id);
    console.log("user id is ",userData._id)
    formData.append("email", userData.email);
    formData.append("bio", userData.bio);

   
    if (selectedFile) {
      formData.append("profilePicture", selectedFile); // Send the selected file
    }
    if(newPassword)
    {
      formData.append("password",newPassword);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${encodeURIComponent(userData._id)}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      console.log("Profile updated successfully:", response.data);
      await fetchUserData(userData._id);// Update global state in AuthContext
      setUserData(response.data.user);
      setOpen(false);
  
      if (response.data.user.profilePicture) {
        // Fetch updated profile picture from GridFS
        const imageResponse = await axios.get(
          `http://localhost:5000/files/${response.data.user.profilePicture}`,
          { responseType: "blob" }
        );
        const imageUrl = URL.createObjectURL(imageResponse.data);
        console.log("ImageResponse.data",imageUrl);
        setPreview(imageUrl);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };






  if (!user) {
    return <Typography variant="h6">Loading user data...</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#9de2ff", minHeight: "100vh", py: 5 }}>
      <Grid container justifyContent="center">
        <Grid item lg={9} xl={7}>
          <Card sx={{ borderRadius: 3 }}>
           

                       {/* Profile Header (Instagram-like) */}
                        <Box sx={{ backgroundColor: "#000", height: "200px", display: "flex", alignItems: "center", px: 3 }}>
                        
                          <Avatar
                          src={preview}
                          sx={{
                            width: 120,
                            height: 120,
                            border: "3px solid white",
                            cursor: "pointer",
                            transition: "transform 0.3s",
                            "&:hover": { transform: "scale(1.05)" }
                          }}
                          onClick={handleAvatarClick}
                        />


                          {/* for zooming the avatar on click */}
                            {zoomed && (
                              <Box
                                sx={{
                                  position: "fixed",
                                  top: 0,
                                  left: 0,
                                  width: "100vw",
                                  height: "100vh",
                                  backdropFilter: "blur(6px)",
                                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  zIndex: 1500,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  transition: "all 0.3s ease",
                                }}
                                onClick={() => setZoomed(false)}
                              >
                                <Avatar
                                  src={preview}
                                  sx={{
                                    width: 300,
                                    height: 300,
                                    border: "6px solid #fff",
                                    borderRadius: "50%",
                                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                                    transition: "transform 0.4s ease",
                                    "&:hover": {
                                      transform: "scale(1.05)",
                                    },
                                  }}
                                />
                              </Box>
                            )}






                          {/* Username & Bio */}
                          <Box sx={{ ml: 3, color: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            {/* Username */}
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                              {userData.username}
                            </Typography>

                            {/* User Bio */}
                            <Typography variant="body2" sx={{ mt: 1, color: "#ccc", maxWidth: "300px", wordWrap: "break-word" }}>
                              {userData.bio || "No bio available"}
                            </Typography>
                          </Box>

                          {/* Edit Profile Button */}
                          <Button
                            variant="outlined"
                            sx={{
                              ml: "auto",
                              color: "white",
                              borderColor: "white",
                              textTransform: "none",
                              "&:hover": {
                                borderColor: "#aaa",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                              },
                            }}
                            onClick={() => setOpen(true)}
                          >
                            Edit Profile
                          </Button>
                        </Box>




            {/* Edit Profile Pop-up */}
            {open && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
              >
                <Card variant="outlined" sx={{ maxWidth: "100%", bgcolor: "white", p: 2 }}>
                  <Typography level="title-lg">Edit Profile</Typography>
                  <Divider />
                  <CardContent sx={{ display: "flex", gap: 1.5 }}>
                     <CardContent  sx={{display:"flex",justifyContent:"center",alignContent:"center"}}>
                         <CardContent >
                                {/* Avatar Upload */}
                              <FormControl>
                                <FormLabel>Profile Picture</FormLabel>
                                <Avatar src={preview} sx={{ width: "20vh", height: "20vh" }} />
                                <Button sx={{}} variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                                  Upload
                                  <input type="file" hidden onChange={handleFileChange} />
                                </Button>
                              </FormControl>

                         </CardContent>
                        

                     </CardContent>

                    <CardContent sx={{display:"grid"}}>
                          <CardContent sx={{display:"grid"}}>
                              <FormControl>
                              <FormLabel>Name</FormLabel>
                              <Input name="username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Email</FormLabel>
                              <Input name="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Bio</FormLabel>
                              <Input name="bio" value={userData.bio} onChange={(e) => setUserData({ ...userData, bio: e.target.value })} />
                            </FormControl>
                          </CardContent>

                          {/* for changing password */}
                          <CardContent>
                            <CardActions>
                            <Button variant="outlined" startIcon={<LockIcon />} onClick={() => setPasswordOpen(true)}>Change Password</Button>
                            </CardActions>
                         

                          </CardContent>

                    </CardContent>
                        
                        
                  </CardContent>
                  <CardActions>
                    <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="solid" color="primary" onClick={handleSave}>Save</Button>
                  </CardActions>
                </Card>
              </Box>

            )}


             {/* Change Password Pop-up */}
             {passwordOpen && (
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                  }}
                >
                  <Card variant="outlined"      sx={{ width:"60vh", minHeight: 300, bgcolor: "white", p: 4, borderRadius: 3 }}>
                    <Typography variant="h6">Change Password</Typography>
                    <Divider sx={{ my: 2 }} />

                    <FormControl>
                      <FormLabel>Current Password</FormLabel>
                      <Input name="password" type="password" onChange={(e)=>setTypedPassword(e.target.value)}/>
                    </FormControl>

                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <Input name="newPassword" type="password"   onChange={(e)=>setNewPassword(e.target.value)}  />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input name="confirmPassword" type="password"   onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </FormControl>

                    {passwordError && <Typography color="error">{passwordError}</Typography>}


                    <CardActions>
                      <Button variant="outlined" onClick={handleClosePasswordPopup}>Cancel</Button>
                      <Button variant="contained" color="success"  onClick={handleSavePassword}>Save</Button>
                    </CardActions>
                  </Card>
                </Box>
              )}

            {/* Profile Stats */}
            {/* <CardContent sx={{ backgroundColor: "#f8f9fa", textAlign: "center" }}>
              <Grid container justifyContent="space-around">
                <Grid item>
                  <Typography variant="h5">{userData?.posts?.length }</Typography>
                  <Typography variant="body2" color="text.secondary">Posts</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{userData?.followers?.length}</Typography>
                  <Typography variant="body2" color="text.secondary">Followers</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{userData.following?.length}</Typography>
                  <Typography variant="body2" color="text.secondary">Following</Typography>
                </Grid>
              </Grid>
            </CardContent> */}

          </Card>



             <Card sx={{ width: "100%", margin: "auto", textAlign: "center" }}>
              {/* Profile Stats */}
              <CardContent sx={{ backgroundColor: "#f8f9fa" }}>
                <Grid container justifyContent="space-around">
                  <Grid item>
                    <Typography
                      variant="h5"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setSelectedTab("posts")}
                    >
                      {userData?.posts?.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Posts
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="h5"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setSelectedTab("saved")}
                    >
                        {userData?.savedPosts?.length}
                      {/* {savedPosts.length} */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Saved
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="h5"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setSelectedTab("followers")}
                    >
                      {userData?.followers?.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Followers
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="h5"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setSelectedTab("following")}
                    >
                      {userData?.following?.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Following
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>

              {/* Dynamic Content Section */}
              <CardContent>
                {/* {selectedTab === "posts" && (
                  <div>
                    <h3>Your Posts</h3>
                    {posts.length > 0 ? (
                      posts.map((post) => <p key={post._id}>{post.content}</p>)
                    ) : (
                      <p>No posts yet.</p>
                    )}
                  </div>
                )} */}

                {/* {selectedTab === "posts" && (
                    <div>
                      <h3>Your Posts</h3>
                      {posts.length > 0 ? (
                        posts.map((post) => (
                          <div key={post._id} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                            <p><strong>{post.caption}</strong></p>
                            {post.images.length > 0 &&
                              post.images.map((img, index) => (
                                <img key={index} src={img} alt="Post" width="100%" style={{ borderRadius: "8px" }} />
                              ))}
                          </div>
                        ))
                      ) : (
                        <p>No posts yet.</p>
                      )}
                    </div>
                  )} */}

                  {/* {selectedTab === "posts" && (
                      <div>
                        <h3>Your Posts</h3>
                        {posts.length > 0 ? (
                          posts.map((post) => (
                            <Card key={post._id} sx={{ maxWidth: 400, marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
                              {post.images.length > 0 && (
                                <CardMedia
                                  component="img"
                                  height="300"
                                  image={post.images[0]} // Display the first image if multiple
                                  alt="Post Image"
                                  sx={{ objectFit: "cover" }}
                                />
                              )}
                              <CardContent>
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                  {post.caption}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <p>No posts yet.</p>
                        )}
                      </div>
                    )} */}

              {/* {selectedTab === "posts" && (
                  <div>
                    <h3>Your Posts</h3>
                    {posts.length > 0 ? (
                      <Grid container spacing={2}> 
                        {posts.map((post) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                              {post.images.length > 0 && (
                                <CardMedia
                                  component="img"
                                  height="300"
                                  image={post.images[0]} // Display first image
                                  alt="Post Image"
                                  sx={{ objectFit: "cover" }}
                                />
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
                      <p>No posts yet.</p>
                    )}
                  </div>
                )} */}


{selectedTab === "posts" && (
  <div>
    <h3>Your Posts</h3>
    {posts.length > 0 ? (
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              {post.images && post.images.length > 0 ? (
                <CardMedia
                  component="img"
                  height="300"
                  image={post.images[0]} // Display first image
                  alt="Post Image"
                  sx={{ objectFit: "cover" }}
                />
              ) : (
                // Render article content if no images
                <CardContent>
                  <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
                    Article
                  </Typography>
                  <Typography variant="body1">
                    {post.content?.length > 100
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
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
      <p>No posts yet.</p>
    )}
  </div>
)}


{selectedTab === "saved" && (
  <div>
    <h3>Saved Posts</h3>
    {savedPosts.length > 0 ? (
      <Grid container spacing={2}>
        {savedPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              {post.images && post.images.length > 0 ? (
                <CardMedia
                  component="img"
                  height="300"
                  image={post.images[0]} // Display first image
                  alt="Post Image"
                  sx={{ objectFit: "cover" }}
                />
              ) : (
                // Render article content if no images
                <CardContent>
                  <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
                    Article
                  </Typography>
                  <Typography variant="body1">
                    {post.content?.length > 100
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
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
)}









                {/* {selectedTab === "saved" && (
                  <div>
                    <h3>Saved Posts</h3>
                    {savedPosts.length > 0 ? (
                      savedPosts.map((post) => <p key={post._id}>{post.content}</p>)
                    ) : (
                      <p>No saved posts yet.</p>
                    )}
                  </div>
                )} */}

                {selectedTab === "followers" && (
                  <div>
                    <h3>Followers</h3>
                    {followers.length > 0 ? (
                      followers.map((follower) => (
                        // <p key={follower._id}>{follower.username}</p>
                        <div key={follower._id} className="user-card">
                        <img
                          src={follower.profilePicture ? `http://localhost:5000/files/${follower.profilePicture}` : "/default-avatar.png"}
                          alt="Avatar"
                        />
                        <p>{follower.username}</p>
                         {/* <button
                          // onClick={() => handleFollowToggle(follower._id, follower.isFollowing)}
                          className={follower.isFollowing ? "following" : "follow"}
                        > */}
                        <button onClick={() => handleFollowToggle(follower._id, "followers")}>
                          {follower.isFollowing ? "following" : "Follow"}
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
                      following.map((followingUser) => (
                        // <p key={followingUser._id}>{followingUser.username}</p>
                        <div key={followingUser._id} className="user-card">
                        <img
                          src={followingUser.profilePicture ? `http://localhost:5000/files/${followingUser.profilePicture}` : "/default-avatar.png"}
                          alt="Avatar"
                        />
                        <p>{followingUser.username}</p>
                        {/* <button
                          // onClick={() => handleFollowToggle(u._id, u.isFollowing)}
                          className={followingUser.isFollowing ? "following" : "follow"}
                        >
                          {followingUser.isFollowing ? "following" : "follow"}
                        </button> */}
                        {/* <button
                         onClick={() => handleFollowToggle(followingUser._id)}
                        className={followingUser.isFollowing ? "following" : "follow"}
                      > */}
                      <button onClick={() => handleFollowToggle(followingUser._id, "following")}>
                        {followingUser.isFollowing ? "Following" : "Follow"}
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







