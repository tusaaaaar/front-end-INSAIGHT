// import React from "react";
// import './Profile.css'
// const Profile=() =>{
//     return <h1> U R in Prrrrrrrrrofile Page</h1>
// };

// export default Profile;

// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Avatar,
//   Box,
//   Grid,
//   Divider,
// } from "@mui/material";

// export default function Profile() {
//   return (
//     <Box sx={{ backgroundColor: "#e3f2fd", minHeight: "100vh", py: 5 }}>
//       <Grid container justifyContent="center">
//         <Grid item lg={8} xl={6}>
//           <Card sx={{ borderRadius: 4, boxShadow: 4, overflow: "hidden" }}>
//             {/* Profile Header */}
//             <Box
//               sx={{
//                 background: "linear-gradient(135deg, #0072ff, #00c6ff)",
//                 height: "220px",
//                 display: "flex",
//                 alignItems: "center",
//                 px: 4,
//                 position: "relative",
//               }}
//             >
//               <Avatar
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
//                 sx={{
//                   width: 130,
//                   height: 130,
//                   border: "4px solid white",
//                   position: "absolute",
//                   bottom: "-65px",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                 }}
//               />
//             </Box>

//             {/* Profile Info */}
//             <CardContent sx={{ textAlign: "center", mt: 7 }}>
//               <Typography variant="h5" fontWeight="bold">
//                 Charan
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Student | Tech Enthusiast
//               </Typography>
//               <Button
//                 variant="contained"
//                 size="small"
//                 sx={{
//                   mt: 2,
//                   backgroundColor: "#0072ff",
//                   "&:hover": { backgroundColor: "#005bbb" },
//                 }}
//               >
//                 Edit Profile
//               </Button>
//             </CardContent>

//             <Divider sx={{ my: 2 }} />

//             {/* Profile Stats */}
//             <CardContent sx={{ backgroundColor: "#f8f9fa", textAlign: "center" }}>
//               <Grid container justifyContent="space-around">
//                 {[
//                   { label: "Posts", count: 253 },
//                   { label: "Followers", count: 0 },
//                   { label: "Following", count: 0 },
//                 ].map((stat, index) => (
//                   <Grid item key={index}>
//                     <Typography variant="h5" fontWeight="bold">
//                       {stat.count}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {stat.label}
//                     </Typography>
//                   </Grid>
//                 ))}
//               </Grid>
//             </CardContent>

//             <Divider sx={{ my: 2 }} />

//             {/* About Section */}
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold">
//                 About
//               </Typography>
//               <Box sx={{ backgroundColor: "#f8f9fa", p: 2, borderRadius: 2, mt: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Passionate about technology, coding, and learning new skills.
//                 </Typography>
//               </Box>
//             </CardContent>

//             {/* Recent Posts */}
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold">
//                 Recent Posts
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 2 }}>
//                 {[
//                   "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp",
//                   "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp",
//                 ].map((src, index) => (
//                   <Grid item xs={6} key={index}>
//                     <img
//                       src={src}
//                       alt={`Recent Post ${index + 1}`}
//                       width="100%"
//                       style={{
//                         borderRadius: 12,
//                         boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
//                       }}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//             </CardContent>

//             <Box sx={{ textAlign: "center", py: 2 }}>
//               <Button variant="text" sx={{ color: "#0072ff", fontWeight: "bold" }}>
//                 View More
//               </Button>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }




import React from "react";
import { Card, CardContent, Typography, Button, Avatar, Box, Grid, Divider } from "@mui/material";
import "./Profile.css";

export default function Profile() {
  return (
    <Box className="profile-container">
      <Grid container justifyContent="center">
        <Grid item lg={8} xl={6}>
          <Card className="profile-card">
            {/* Profile Header */}
            <Box className="profile-header">
              <Avatar
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                className="profile-avatar"
              />
            </Box>

            {/* Profile Info */}
            <CardContent className="profile-info">
              <Typography variant="h5" className="profile-name">
                Charan
              </Typography>
              <Typography variant="body2" className="profile-tagline">
                Student | Tech Enthusiast
              </Typography>
              <Button variant="contained" className="edit-profile-btn">
                Edit Profile
              </Button>
            </CardContent>

            <Divider className="divider" />

            {/* Profile Stats */}
            <CardContent className="profile-stats">
              <Grid container justifyContent="space-around">
                {[
                  { label: "Posts", count: 253 },
                  { label: "Followers", count: 0 },
                  { label: "Following", count: 0 },
                ].map((stat, index) => (
                  <Grid item key={index}>
                    <Typography variant="h5" className="stat-count">
                      {stat.count}
                    </Typography>
                    <Typography variant="body2" className="stat-label">
                      {stat.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>

            <Divider className="divider" />

            {/* About Section */}
            <CardContent>
              <Typography variant="h6" className="section-title">
                About
              </Typography>
              <Box className="about-box">
                <Typography variant="body2" className="about-text">
                  Passionate about technology, coding, and learning new skills.
                </Typography>
              </Box>
            </CardContent>

            {/* Recent Posts */}
            <CardContent>
              <Typography variant="h6" className="section-title">
                Recent Posts
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {[
                  "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp",
                  "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp",
                ].map((src, index) => (
                  <Grid item xs={6} key={index}>
                    <img src={src} alt={`Recent Post ${index + 1}`} className="recent-post-img" />
                  </Grid>
                ))}
              </Grid>
            </CardContent>

            <Box className="view-more-container">
              <Button variant="text" className="view-more-btn">
                View More
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
