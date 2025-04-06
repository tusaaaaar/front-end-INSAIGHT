// // import React from 'react';
// // import {
// //   Dialog, DialogTitle, DialogContent, Avatar,
// //   Typography, Grid, Card, CardMedia, CardContent
// // } from '@mui/material';

// // const ProfilePopup = ({ open, onClose, profileData }) => {
// //   if (!profileData) return null;

// //   const { user, posts, followersCount, followingCount, postCount } = profileData;

// //   return (
// //     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
// //       <DialogTitle>{user.username}'s Profile</DialogTitle>
// //       <DialogContent>
// //         <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
// //           <Avatar src={`http://localhost:5000/files/${user.profilePicture}`} sx={{ width: 80, height: 80 }} />
// //           <div>
// //             <Typography variant="h6">{user.name}</Typography>
// //             <Typography variant="body2">{user.bio}</Typography>
// //             <Typography variant="body2">Posts: {postCount}</Typography>
// //             <Typography variant="body2">Followers: {followersCount}</Typography>
// //             <Typography variant="body2">Following: {followingCount}</Typography>
// //           </div>
// //         </div>

// //         <Typography variant="h6" gutterBottom>Posts</Typography>
// //         <Grid container spacing={2}>
// //           {posts.map((post) => (
// //             <Grid item xs={12} sm={6} md={4} key={post._id}>
// //               <Card>
// //                 {post.images.length > 0 && (
// //                   <CardMedia
// //                     component="img"
// //                     height="200"
// //                     image={post.images[0]}
// //                            // <CardMedia component="img" image={post.images[0]} height="400" />
                    
// //                     alt="Post"
// //                   />
// //                 )}
// //                 <CardContent>
// //                   <Typography variant="body2" gutterBottom>{post.caption}</Typography>
// //                   <Typography variant="caption" color="textSecondary">
// //                     {post.likes.length} Likes • {post.comments.length} Comments
// //                   </Typography>
// //                 </CardContent>
// //               </Card>
// //             </Grid>
// //           ))}
// //         </Grid>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default ProfilePopup;

// import React from 'react';
// import {
//   Dialog, DialogContent, Avatar, Typography,
//   Grid, Box, Divider
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// const ProfilePopup = ({ open, onClose, profileData }) => {
//   if (!profileData) return null;

//   const { user, posts, followersCount, followingCount, postCount } = profileData;

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogContent sx={{ p: 3 }}>
//         {/* Compact Header */}
//         <Box display="flex" alignItems="center" gap={4} mb={3}>
//           <Avatar
//             src={`http://localhost:5000/files/${user.profilePicture}`}
//             sx={{
//               width: 80,
//               height: 80,
//               border: '2px solid #ddd'
//             }}
//           />
//           <Box flex={1}>
//             <Typography variant="h6" fontWeight={600}>
//               {user.username}
//             </Typography>
//             {user.bio && (
//               <Typography variant="body2" color="text.secondary" mt={0.5}>
//                 {user.bio}
//               </Typography>
//             )}
//             <Box display="flex" gap={3} mt={1.5}>
//               <Typography variant="caption">
//                 <strong>{postCount}</strong> posts
//               </Typography>
//               <Typography variant="caption">
//                 <strong>{followersCount}</strong> followers
//               </Typography>
//               <Typography variant="caption">
//                 <strong>{followingCount}</strong> following
//               </Typography>
//             </Box>
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 3 }} />

//         {/* Posts Grid */}
//         <Grid container spacing={2}>
//           {posts.map((post) => (
//             <Grid item xs={12} sm={6} md={4} key={post._id}>
//               <Box
//                 sx={{
//                   position: 'relative',
//                   width: '100%',
//                   aspectRatio: '1 / 1',
//                   overflow: 'hidden',
//                   borderRadius: 2,
//                   boxShadow: 1,
//                   '&:hover .overlay': {
//                     opacity: 1
//                   }
//                 }}
//               >
//                 <img
//                   src={post.images[0]}
//                   alt="Post"
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                 />
//                 <Box
//                   className="overlay"
//                   sx={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     bgcolor: 'rgba(0,0,0,0.4)',
//                     color: '#fff',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: 2,
//                     opacity: 0,
//                     transition: 'opacity 0.3s ease'
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <FavoriteIcon fontSize="small" />
//                     <Typography>{post.likes.length}</Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <ChatBubbleOutlineIcon fontSize="small" />
//                     <Typography>{post.comments.length}</Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProfilePopup;







import React from 'react';
import {
  Dialog, DialogContent, Avatar, Typography,
  Grid, Box, Divider
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const ProfilePopup = ({ open, onClose, profileData }) => {
  if (!profileData) return null;

  const { user, posts, followersCount, followingCount, postCount } = profileData;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: 3 }}>
        {/* Compact Profile Header */}
        <Box display="flex" alignItems="center" gap={4} mb={3}>
          <Avatar
            src={`http://localhost:5000/files/${user.profilePicture}`}
            sx={{
              width: 80,
              height: 80,
              border: '2px solid #ddd'
            }}
          />
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600}>
              {user.username}
            </Typography>
            {user.bio && (
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {user.bio}
              </Typography>
            )}
            <Box display="flex" gap={3} mt={1.5}>
              <Typography variant="caption">
                <strong>{postCount}</strong> posts
              </Typography>
              <Typography variant="caption">
                <strong>{followersCount}</strong> followers
              </Typography>
              <Typography variant="caption">
                <strong>{followingCount}</strong> following
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Posts */}
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: 1,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  bgcolor: '#fff'
                }}
              >
                {/* MEDIA POST */}
                {post.images && post.images.length > 0 ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '1 / 1',
                      '&:hover .overlay': {
                        opacity: 1
                      }
                    }}
                  >
                    <img
                      src={post.images[0]}
                      alt="Post"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      className="overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0,0,0,0.4)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <FavoriteBorderIcon />
                        <Typography>{post.likes.length}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <ChatBubbleOutlineIcon  />
                        <Typography>{post.comments.length}</Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  // ARTICLE POST
                  <Box p={2} display="flex" flexDirection="column" flex={1}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
                      {post.caption || "Untitled"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {post.content?.slice(0, 100) || "No content"}...
                    </Typography>
                    {/* <Box mt={1} display="flex" justifyContent="space-between">
                      <Typography variant="caption">{post.likes.length} likes</Typography>
                      <Typography variant="caption">{post.comments.length} comments</Typography>
                    </Box> */}
<Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
  <Box display="flex" alignItems="center" gap={0.5}>
    <FavoriteBorderIcon  />
    <Typography variant="caption" >
      {post.likes.length} likes
    </Typography>
  </Box>
  <Box display="flex" alignItems="center" gap={0.5}>
    <ChatBubbleOutlineIcon  />
    <Typography variant="caption" >
      {post.comments.length} comments
    </Typography>
  </Box>
</Box>


                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePopup;

