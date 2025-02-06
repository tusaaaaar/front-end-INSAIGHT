import React, { useState } from "react";
import {
  Card, CardContent, Typography, Button, Avatar, Box, Grid, Divider,
} from "@mui/material";
import EditProfile from "../../components/editprofile/EditProfile" 
import "./Profile.css";

export default function Profile() {
  // State for profile details
  const [profile, setProfile] = useState({
    name: "Charan",
    tagline: "Student | Tech Enthusiast",
    bio: "Passionate about technology, coding, and learning new skills.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
  });

  // State for modal open/close
  const [open, setOpen] = useState(false);

  return (
    <Box className="profile-container">
      <Grid container justifyContent="center">
        <Grid item lg={8} xl={6}>
          <Card className="profile-card">
            {/* Profile Header */}
            <Box className="profile-header">
              <Avatar src={profile.avatar} className="profile-avatar" />
            </Box>

            {/* Profile Info */}
            <CardContent className="profile-info">
              <Typography variant="h5" className="profile-name">
                {profile.name}
              </Typography>
              <Typography variant="body2" className="profile-tagline">
                {profile.tagline}
              </Typography>
              <Button
                variant="contained"
                className="edit-profile-btn"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </Button>
            </CardContent>

            <Divider className="divider" />

            {/* Profile Stats */}
            <CardContent className="profile-stats">
              <Grid container justifyContent="space-around">
                {[{ label: "Posts", count: 253 }, { label: "Followers", count: 0 }, { label: "Following", count: 0 }].map((stat, index) => (
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
              <Typography variant="h6" className="section-title">About</Typography>
              <Box className="about-box">
                <Typography variant="body2" className="about-text">{profile.bio}</Typography>
              </Box>
            </CardContent>

            {/* Recent Posts */}
            <CardContent>
              <Typography variant="h6" className="section-title">Recent Posts</Typography>
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
              <Button variant="text" className="view-more-btn">View More</Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Profile Modal */}
      <EditProfile open={open} setOpen={setOpen} profile={profile} setProfile={setProfile} />
    </Box>
  );
}
