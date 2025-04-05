
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
import CommentsModal from "../components/post/CommentsModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";





const CardPost = () => {
  const [posts, setPosts] = useState([]);
  const {user}=useAuth();


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


const [openComments, setOpenComments] = useState(null); // Track which post's comments are open
//const [openComments, setOpenComments] = useState(null);


return(
  <div>

  
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
      {/* {post.images.length > 0 && (
  <Swiper
    navigation
    modules={[Navigation]}
    style={{
      width: "20%",
      height: "500px",
      borderRadius: "10px",
      overflow: "hidden",
    }}
  >
    {post.images.map((img, index) => (
      <SwiperSlide key={index} style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        width: "100%", 
        height: "100%" 
      }}>
        <img 
          src={img} 
          alt={`Post Image ${index + 1}`} 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures proper fit like Instagram
            borderRadius: "10px",
          }} 
        />
      </SwiperSlide>
    ))}
  </Swiper>
)} */}

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
            {/* <Stack alignItems="center">
              <IconButton>
                <ChatBubbleOutline />
                {post.comments.length}
              </IconButton>
              <Typography variant="caption"> Comments</Typography>
            </Stack> */}

<Stack alignItems="center">
<IconButton onClick={() => setOpenComments(post._id)}>
  <ChatBubbleOutline />
</IconButton>
<Typography variant="caption">{post.comments.length} Comments</Typography>

{/* Render Comments Modal */}
{openComments === post._id && (
  <CommentsModal
    open={true}
    handleClose={() => setOpenComments(null)}
    post={post}
    user={user}
    setPost={(updatedPost) => {
      const updatedPosts = posts.map((p) =>
        p._id === updatedPost._id ? updatedPost : p
      );
      setPosts(updatedPosts);
    }}
  />
)}
</Stack>





            {/* Comment Section */}
            {/* <Stack alignItems="center">
                  <IconButton onClick={() => setOpenComments(post._id)}>
                    <ChatBubbleOutline />
                  </IconButton>
                  <Typography variant="caption">{post.comments.length} Comments</Typography>
                </Stack> */}
           

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

                  {/* Comments Modal */}
          {/* {openComments === post._id && (
            <CommentsModal
              open={true}
              handleClose={() => setOpenComments(null)}
              post={post}
              user={user}
              setPost={(updatedPost) => {
                const updatedPosts = posts.map((p) =>
                  p._id === updatedPost._id ? updatedPost : p
                );
                setPosts(updatedPosts);
              }}
            />
          )} */}


  </Stack>
))}

  </div>
)
}

export default CardPost;

