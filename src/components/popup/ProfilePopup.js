import React from 'react';
import { Dialog, DialogTitle, DialogContent, Avatar, Typography, Grid } from '@mui/material';

const ProfilePopup = ({ open, onClose, profileData }) => {
  if (!profileData) return null;

  const { user, posts, followersCount, followingCount, postCount } = profileData;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{user.username}'s Profile</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Avatar src={`http://localhost:5000/files/${user.profilePicture}`} sx={{ width: 80, height: 80 }} />
          <div>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2">{user.bio}</Typography>
            <Typography variant="body2">Posts: {postCount}</Typography>
            <Typography variant="body2">Followers: {followersCount}</Typography>
            <Typography variant="body2">Following: {followingCount}</Typography>
          </div>
        </div>

        <Grid container spacing={2} mt={2}>
          {posts.map((post) => (
            <Grid item xs={4} key={post._id}>
              <img
                src={`http://localhost:5000/files/${post.image}`}
                alt="Post"
                style={{ width: '100%', borderRadius: 8 }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePopup;
