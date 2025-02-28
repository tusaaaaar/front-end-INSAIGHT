import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Avatar, Box, Grid } from "@mui/material";
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
            {/* Profile Header */}
            {/* <Box sx={{ backgroundColor: "#000", height: "200px", display: "flex", alignItems: "center", px: 3 }}>
              <Avatar
                src={preview}
                sx={{ width: 120, height: 120, border: "3px solid white" }}
              />
              <Box sx={{ ml: 3, color: "white" }}>
                <Typography variant="h5">{userData.username}</Typography>
              </Box>
              <Button variant="outlined" sx={{ ml: "auto", color: "white", borderColor: "white" }} onClick={() => setOpen(true)}>
                Edit Profile
              </Button>
            </Box> */}

                       {/* Profile Header (Instagram-like) */}
                        <Box sx={{ backgroundColor: "#000", height: "200px", display: "flex", alignItems: "center", px: 3 }}>
                          {/* User Avatar */}
                          {/* <Avatar
                            src={preview}
                            sx={{ width: 120, height: 120, border: "3px solid white", cursor: "pointer" }}
                            onClick={handleAvatarClick}
                          /> */}
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
                            {/* <Button variant="outlined" onClickChangePassword={()=>setPasswordOpen(true)}>Change Password</Button> */}
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
            <CardContent sx={{ backgroundColor: "#f8f9fa", textAlign: "center" }}>
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
            </CardContent>

            {/* About Section */}
            {/* <CardContent>
              <Typography variant="h6">About</Typography>
              <Box sx={{ backgroundColor: "#f8f9fa", p: 2, borderRadius: 2 }}>
                <Typography variant="body2">{userData.bio || "No bio available"}</Typography>
              </Box>
            </CardContent> */}

               
           
           


          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
