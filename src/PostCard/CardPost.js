// /* eslint-disable jsx-a11y/anchor-is-valid */
// import * as React from 'react';
// import { useState ,useEffect } from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Avatar from '@mui/joy/Avatar';
// import Box from '@mui/joy/Box';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import CardOverflow from '@mui/joy/CardOverflow';
// import Link from '@mui/joy/Link';
// import IconButton from '@mui/joy/IconButton';
// import Input from '@mui/joy/Input';
// import Typography from '@mui/joy/Typography';
// import MoreHoriz from '@mui/icons-material/MoreHoriz';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
// import SendOutlined from '@mui/icons-material/SendOutlined';
// import Face from '@mui/icons-material/Face';
// import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
// // import ProfileImage from "../../assets/images/ProfileImage.JPG";
// //import ProfileImage from "frontend/src/assets/images/ProfileImage.JPG"
// import { useAuth } from '../context/AuthContext';

// export default function CardPost() {
//     const {user}=useAuth();
//     console.log("USers profilepic URL ",user.profilePictureUrl);

//    //for posts
//     const [posts, setPosts] = useState([]);
//     useEffect(() => {
//       const fetchFeed = async () => {
//         try {
//           const res = await axios.get(`http://localhost:5000/posts/feed/${user._id}`);
//           setPosts(res.data);
//         } catch (error) {
//           console.error("Error fetching feed posts:", error);
//         }
//       };
  
//       if (user?._id) {
//         fetchFeed();
//       }
//     }, [user]);

//     // const [profile,setProfile]=useState();
//   return (
//     <div>

    
//     <Card
//       variant="outlined"
//       sx={{ minWidth: 300, '--Card-radius': (theme) => theme.vars.radius.xs }}
//     >
//       <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
//         <Box
//           sx={{
//             position: 'relative',
//             '&::before': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               bottom: 0,
//               right: 0,
//               m: '-2px',
//               borderRadius: '50%',
//               background:
//                 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
//             },
//           }}
//         >
//           <Avatar
//             size="sm"
//             src={user.profilePictureUrl}
//             sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
//           />
//         </Box>
//         <Typography sx={{ fontWeight: 'lg' }}>{user.username}</Typography>
//         <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
//           <MoreHoriz />
//         </IconButton>
//       </CardContent>
//       <CardOverflow>
//         <AspectRatio>
//           <img  alt="" loading="lazy"   />
//           {/* <ProfileImage/> */}
//         </AspectRatio>
//       </CardOverflow>
//       <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
//         <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
//           <IconButton variant="plain" color="neutral" size="sm">
//             <FavoriteBorder />
//           </IconButton>
//           <IconButton variant="plain" color="neutral" size="sm">
//             <ModeCommentOutlined />
//           </IconButton>
//           <IconButton variant="plain" color="neutral" size="sm">
//             <SendOutlined />
//           </IconButton>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
//           {[...Array(5)].map((_, index) => (
//             <Box
//               key={index}
//               sx={[
//                 {
//                   borderRadius: '50%',
//                   width: `max(${6 - index}px, 3px)`,
//                   height: `max(${6 - index}px, 3px)`,
//                 },
//                 index === 0
//                   ? { bgcolor: 'primary.solidBg' }
//                   : { bgcolor: 'background.level3' },
//               ]}
//             />
//           ))}
//         </Box>
//         <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
//           <IconButton variant="plain" color="neutral" size="sm">
//             <BookmarkBorderRoundedIcon />
//           </IconButton>
//         </Box>
//       </CardContent>
//       <CardContent>
//         <Link
//           component="button"
//           underline="none"
//           textColor="text.primary"
//           sx={{ fontSize: 'sm', fontWeight: 'lg' }}
//         >
//           {/* 8.1M Likes */}
//         </Link>
//         <Typography sx={{ fontSize: 'sm' }}>
//           <Link
//             component="button"
//             color="neutral"
//             textColor="text.primary"
//             sx={{ fontWeight: 'lg' }}
//           >
//             {user.username}
//           </Link>{' '}
//           {/* My first POST */}
//         </Typography>
//         <Link
//           component="button"
//           underline="none"
//           startDecorator="…"
//           sx={{ fontSize: 'sm', color: 'text.tertiary' }}
//         >
//           more
//         </Link>
//         <Link
//           component="button"
//           underline="none"
//           sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
//         >
//           {/* 2 DAYS AGO */}
//         </Link>
//       </CardContent>
//       <CardContent orientation="horizontal" sx={{ gap: 1 }}>
//         <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
//           <Face />
//         </IconButton>
//         <Input
//           variant="plain"
//           size="sm"
//           placeholder="Add a comment…"
//           sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
//         />
//         <Link disabled underline="none" role="button">
//           {/* Post */}
//         </Link>
//       </CardContent>
//     </Card>





//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Avatar, IconButton } from "@mui/material";
import { FavoriteBorder, Favorite, ChatBubbleOutline, Link } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack, CardHeader } from "@mui/material";
//import {  CardMedia, CardHeader, Typography, IconButton } from "@mui/material";
import {  BookmarkBorder } from "@mui/icons-material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAuth } from '../context/AuthContext';
const CardPost = () => {
  const [posts, setPosts] = useState([]);
  const {user}=useAuth();

 
// const handleLikePost= async (postId,userId)=>{
//   console.log("So and so wants to like  a post ",userId,postId);
//    const  response = await axios.post(`http://localhost:5000/posts/user/like/${userId}/${postId}`);
//    console.log("response from like ",response.data);
//    const updatedPosts = posts.map(post =>
//     post._id === postId ? { ...post, isLiked: !post.isLiked } : post
//   );

//   setPosts(updatedPosts); 

// }
const handleLikePost = async (postId, userId) => {
  // 1. Instantly update UI
  const updatedPosts = posts.map(post => {
    if (post._id === postId) {
      return {
        ...post,
        isLiked: !post.isLiked,
        likes: post.isLiked 
          ? post.likes.filter(id => id !== userId)
          : [...post.likes, userId],
      };
    }
    return post;
  });

  setPosts(updatedPosts);

  // 2. Send request to backend to update database
  try {
    await axios.post(`http://localhost:5000/posts/user/like/${userId}/${postId}`);
  } catch (error) {
    console.log("Error liking post:", error);
  }
};

const handleSavePost = async (postId,userId)=>{
  console.log("So and so wants to save  a post ",userId,postId);
   const res = await  axios.post(`http://localhost:5000/posts/user/save/${userId}/${postId}`);
     const updatedPosts = posts.map(post =>
    post._id === postId ? { ...post, isSaved: !post.isSaved } : post
  );
  setPosts(updatedPosts); 

}

const handleUnsavePost = async(postId,userId)=>{
  const res = await  axios.post(`http://localhost:5000/posts/user/unsave/${userId}/${postId}`);
  const updatedPosts = posts.map(post =>
 post._id === postId ? { ...post, isSaved: !post.isSaved } : post
);
setPosts(updatedPosts); 
}

// useEffect(() => {
//   const fetchFeedPosts = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/posts/feed/${user._id}`);

     
     

//       setPosts(res.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   fetchFeedPosts();
// }, []);
useEffect(() => {
  const fetchFeedPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/feed/${user._id}`);
      setPosts(res.data); 
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchFeedPosts();
}, []);










  // useEffect(() => {
  //   const fetchFeed = async () => {
  //     try {
  //       console.log("made an api call for all posts with id ",user._id);

  //       const res = await axios.get(`http://localhost:5000/posts/feed/${user._id}`);
  //       console.log("Users feed posts are ",res.data);
  //       setPosts(res.data);
  //     } catch (error) {
  //       console.error("Error fetching feed posts:", error);
  //     }
  //   };

  //   if (user?._id) {
  //     fetchFeed();
  //   }
  // }, [user]);



//   return (
//     <div>
//       <h3>Home Feed</h3>
//       {posts.length > 0 ? (
//         <Grid container spacing={2} justifyContent="center" >
//           {posts.map((post) => (
//             <Grid item xs={12} sm={8} md={6} key={post._id}>
//               <Card sx={{ borderRadius: 2, boxShadow: 3, marginBottom: 3 }}>
                
//                 {/* User Info */}
//                 <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <Avatar src={post.profilePicUrl} alt={post.user.username} />
//                   <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                     {post.user.username}
//                   </Typography>
//                 </CardContent>

//                 {/* Post Image (if available) */}
//                 {post.images.length > 0 && (
//                   <CardMedia
//                     component="img"
//                     height="400"
//                     image={post.images[0]}
//                     alt="Post Image"
//                     sx={{ objectFit: "cover" }}
//                   />
//                 )}

//                 {/* Post Caption */}
//                 <CardContent>
//                   <Typography variant="body1">{post.caption}</Typography>
                  
//                   {/* Display Article Content (if available) */}
//                   {post.content && (
//                     <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray", marginTop: 1 }}>
//                       {post.content.length > 150
//                         ? `${post.content.substring(0, 150)}...`
//                         : post.content}
//                     </Typography>
//                   )}
//                 </CardContent>

//                 {/* Like & Comment Icons */}
//                 <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <IconButton>
//                     <FavoriteBorder /> {/* Change to <Favorite /> when liked */}
//                   </IconButton>
//                   <IconButton>
//                     <ChatBubbleOutline />
//                   </IconButton>
//                 </CardContent>

//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <p>No posts from followed users yet.</p>
//       )}
//     </div>
//   );
// };


return(
  <div>

  
  {/* {posts.map((post) => (
    <Stack key={post._id} spacing={2} sx={{ marginBottom: "20px" }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          avatar={<Avatar src={post.profilePicUrl} />}
          title={post.user.username}
          subheader={(post.createdAt)}
        />
        {post.images.length > 0 && (
          <CardMedia component="img" image={post.images[0]} height="400" />
        )}
        <CardContent>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {post.caption}
          </Typography>
          {post.content && (
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              {post.content}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Stack>
  ))} */}

  
{posts.map((post) => (
  <Stack key={post._id} spacing={2} sx={{ marginBottom: "20px" }}>
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardHeader
        avatar={<Avatar src={post.profilePicUrl} />}
        title={post.user.username}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      {post.images.length > 0 && (
        <CardMedia component="img" image={post.images[0]} height="400" />
      )}
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {post.caption}
        </Typography>
        {post.content && (
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            {post.content}
          </Typography>
        )}

       
        
       {/* Like, Comment & Save Section */}
          <Stack direction="row" spacing={5} sx={{ marginTop: "10px" }}>
            
            {/* Like Section */}
            <Stack alignItems="center">
              <IconButton>
                {post.isLiked ? (
                  <FavoriteIcon style={{ color: "red" }} 
                    onClick={() => handleLikePost(post._id, user._id)} 
                  />
                ) : (
                  <FavoriteBorder 
                    onClick={() => handleLikePost(post._id, user._id)} 
                  />
                )}
                {post.likes.length}
              </IconButton>
              <Typography variant="caption"> Likes</Typography>
            </Stack>

            {/* Comment Section */}
            <Stack alignItems="center">
              <IconButton>
                <ChatBubbleOutline />
                {post.comments.length}
              </IconButton>
              <Typography variant="caption"> Comments</Typography>
            </Stack>

            {/* Save Section */}
            <Stack alignItems="center">
              <IconButton>
                {post.isSaved ? (
                  <BookmarkIcon style={{ color: "grey" }} 
                    onClick={() => handleUnsavePost(post._id, user._id)}
                  />
                ) : (
                  <BookmarkBorder 
                    onClick={() => handleSavePost(post._id, user._id)}
                  />
                )}
              </IconButton>
              <Typography variant="caption">Save</Typography>
            </Stack>

          </Stack>

      </CardContent>
    </Card>
  </Stack>
))}


 
 





  </div>
)
}

export default CardPost;
