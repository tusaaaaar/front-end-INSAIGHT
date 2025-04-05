// import React, { useState } from "react";
// import { Dialog, TextField, IconButton, Typography, Avatar } from "@mui/material";
// import { Favorite, FavoriteBorder, Send } from "@mui/icons-material";
// import axios from "axios";

// const CommentsModal = ({ open, handleClose, post, user, setPost }) => {
//   const [commentText, setCommentText] = useState("");
//   const [replyText, setReplyText] = useState({});
  
//   // Handle new comment submission
//   const handleCommentSubmit = async () => {
//     if (!commentText.trim()) return;

//     try {
//       const res = await axios.post(`http://localhost:5000/posts/${post._id}/comment`, {
//         userId: user._id,
//         text: commentText,
//       });

//       setPost(res.data.post);
//       console.log("the users details of comments from backend is : ",res.data.post);
//       setCommentText("");
//     } catch (error) {
//       console.error("Error adding comment", error);
//     }
//   };

//   // Handle reply submission
//   const handleReplySubmit = async (commentId) => {
//     if (!replyText[commentId]?.trim()) return;

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/posts/${post._id}/comment/${commentId}/reply`,
//         { userId: user._id, text: replyText[commentId] }
//       );

//       setPost(res.data.post);
//       setReplyText({ ...replyText, [commentId]: "" });
//     } catch (error) {
//       console.error("Error replying to comment", error);
//     }
//   };

//   // Handle like on comment
//   const handleLikeComment = async (commentId) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/posts/${post._id}/comment/${commentId}/like`,
//         { userId: user._id }
//       );

//       setPost(res.data.post);
//     } catch (error) {
//       console.error("Error liking comment", error);
//     }
//   };



//   //delete
//   const handleDeleteComment = async (commentId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/posts/${post._id}/comment/${commentId}`,
//         { data: { userId: user._id } } // Pass userId in request body
//       );
  
//       setPost(res.data.post);
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };
  
//   const handleDeleteReply = async (commentId, replyId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/posts/${post._id}/comment/${commentId}/reply/${replyId}`,
//         { data: { userId: user._id } }
//       );
  
//       setPost(res.data.post);
//     } catch (error) {
//       console.error("Error deleting reply:", error);
//     }
//   };
  

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <div style={{ padding: "20px" }}>
//         <Typography variant="h6">Comments</Typography>

//         {/* Display Comments */}
//         <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//           {post.comments.map((comment) => (
//             <div key={comment._id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//               <Avatar src={comment.user.profilePic} alt={comment.user.username} />
//               <div style={{ marginLeft: "10px", width: "100%" }}>
//                 <Typography variant="body2" fontWeight="bold">
//                   {comment.user.username}
//                 </Typography>
//                 <Typography variant="body1">{comment.text}</Typography>
                
//                 {/* Like & Reply */}
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <IconButton onClick={() => handleLikeComment(comment._id)}>
//                     {comment.likes.includes(user._id) ? (
//                       <Favorite style={{ color: "red" }} />
//                     ) : (
//                       <FavoriteBorder />
//                     )}
//                   </IconButton>
//                   <Typography>{comment.likes.length}</Typography>

//                   <Typography
//                     variant="body2"
//                     color="primary"
//                     style={{ marginLeft: "10px", cursor: "pointer" }}
//                     onClick={() => setReplyText({ ...replyText, [comment._id]: "" })}
//                   >
//                     Reply
//                   </Typography>
//                 </div>

//                 {/* Reply Input */}
//                 {replyText[comment._id] !== undefined && (
//                   <div style={{ display: "flex", marginTop: "5px" }}>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       variant="outlined"
//                       placeholder="Write a reply..."
//                       value={replyText[comment._id]}
//                       onChange={(e) =>
//                         setReplyText({ ...replyText, [comment._id]: e.target.value })
//                       }
//                     />
//                     <IconButton onClick={() => handleReplySubmit(comment._id)}>
//                       <Send />
//                     </IconButton>
//                   </div>
//                 )}

//                 {/* Display Replies */}
//                 {comment.replies.length > 0 && (
//                   <div style={{ marginLeft: "40px", marginTop: "5px" }}>
//                     {comment.replies.map((reply) => (
//                       <div key={reply._id} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
//                         <Avatar src={reply.user.profilePic} alt={reply.user.username} />
//                         <div style={{ marginLeft: "10px" }}>
//                           <Typography variant="body2" fontWeight="bold">
//                             {reply.user.username}
//                           </Typography>
//                           <Typography variant="body1">{reply.text}</Typography>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Comment Input */}
//         <div style={{ display: "flex", marginTop: "10px" }}>
//           <TextField
//             fullWidth
//             size="small"
//             variant="outlined"
//             placeholder="Write a comment..."
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//           />
//           <IconButton onClick={handleCommentSubmit}>
//             <Send />
//           </IconButton>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default CommentsModal;







// import React, { useState, useEffect } from "react";
// import { Dialog, DialogTitle, DialogContent, TextField, Button, Stack, Avatar, Typography, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import SendIcon from "@mui/icons-material/Send";

// const CommentsModal = ({ open, handleClose, post, user, setPost }) => {
//   const [commentText, setCommentText] = useState("");
//   const [replyText, setReplyText] = useState("");
//   const [selectedCommentId, setSelectedCommentId] = useState(null); // Track which comment is being replied to

//   useEffect(() => {
//     // Fetch updated comments when modal opens
//     if (open) {
//       fetchComments();
//     }
//   }, [open]);

//   const fetchComments = async () => {
//     try {
//         const response = await fetch(`http://localhost:5000/posts/${post._id}/comments`);
//         if (!response.ok) throw new Error("Failed to fetch comments");
//       const data = await response.json();
//       setPost({ ...post, comments: data });
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handleCommentSubmit = async () => {
//     if (!commentText) return;
//     try {
//       const response = await fetch(`http://localhost:5000/posts/${post._id}/comments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id, text: commentText }),
//       });

//       const newComment = await response.json();
//       setPost({ ...post, comments: [...post.comments, newComment] });
//       setCommentText("");
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   const handleReplySubmit = async (commentId) => {
//     if (!replyText) return;
//     try {
//       const response = await fetch(`http://localhost:5000/posts/comments/${commentId}/replies`, { // ✅ Corrected
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id, text: replyText }),
//       });
  
//       if (!response.ok) throw new Error("Failed to add reply");
  
//       const updatedComment = await response.json();
  
//       setPost({
//         ...post,
//         comments: post.comments.map((comment) =>
//           comment._id === commentId ? updatedComment : comment
//         ),
//       });
  
//       setReplyText("");
//       setSelectedCommentId(null);
//     } catch (error) {
//       console.error("Error adding reply:", error);
//     }
//   };
  

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogTitle>
//         Comments
//         <IconButton onClick={handleClose} style={{ float: "right" }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Stack spacing={2}>
//           {post.comments.map((comment) => (
//             <Stack key={comment._id} spacing={1} sx={{ borderBottom: "1px solid #ddd", paddingBottom: 1 }}>
//               {/* Comment Section */}
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <Avatar src={comment.user.profilePic} />
//                 <Typography variant="subtitle2">{comment.user.username}</Typography>
//                 <Typography variant="body2">{comment.text}</Typography>
//               </Stack>

//               {/* Reply Section */}
//               {comment.replies.map((reply) => (
//                 <Stack key={reply._id} direction="row" spacing={2} sx={{ marginLeft: 4 }}>
//                   <Avatar src={reply.user.profilePic} sx={{ width: 30, height: 30 }} />
//                   <Typography variant="subtitle2">{reply.user.username}</Typography>
//                   <Typography variant="body2">{reply.text}</Typography>
//                 </Stack>
//               ))}

//               {/* Reply Input */}
//               {selectedCommentId === comment._id ? (
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                     placeholder="Write a reply..."
//                     value={replyText}
//                     onChange={(e) => setReplyText(e.target.value)}
//                   />
//                   <IconButton onClick={() => handleReplySubmit(comment._id)}>
//                     <SendIcon />
//                   </IconButton>
//                 </Stack>
//               ) : (
//                 <Button size="small" onClick={() => setSelectedCommentId(comment._id)}>
//                   Reply
//                 </Button>
//               )}
//             </Stack>
//           ))}

//           {/* Add New Comment */}
//           <Stack direction="row" spacing={1} alignItems="center">
//             <TextField
//               fullWidth
//               variant="outlined"
//               size="small"
//               placeholder="Write a comment..."
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//             />
//             <IconButton onClick={handleCommentSubmit}>
//               <SendIcon />
//             </IconButton>
//           </Stack>
//         </Stack>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CommentsModal;

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete"; //  Delete Icon




const CommentsModal = ({ open, handleClose, post, user, setPost }) => {
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [expandedReplies, setExpandedReplies] = useState({});

  

  useEffect(() => {
    if (open) fetchComments();
  }, [open]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${post._id}/comments`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      console.log("data of comments: ",data);

      setPost({ ...post, comments: data });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


  


  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      const response = await fetch(`http://localhost:5000/posts/${post._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, text: commentText }),
      });
  
      const newComment = await response.json();
     // console.log("New comment: ", newComment);
  
      //  Preserve profilePicUrl if it exists
      const updatedComment = {
        ...newComment,
        user: {
          ...newComment.user,
          profilePicUrl: `http://localhost:5000/files/${newComment.user.profilePicture}`, // Generate URL
        },
      };
  
      setPost({ ...post, comments: [...post.comments, updatedComment] });
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  



  const handleReplySubmit = async (commentId) => {
    if (!replyText.trim()) return;
    try {
      const response = await fetch(`http://localhost:5000/posts/comments/${commentId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, text: replyText }),
      });
  
      if (!response.ok) throw new Error("Failed to add reply");
  
      const updatedComment = await response.json();
  
      setPost({
        ...post,
        comments: post.comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment, // Keep existing comment data (including profilePicUrl)
                replies: updatedComment.replies, // Update only the replies
              }
            : comment
        ),
      });
  
      setReplyText("");
      setSelectedCommentId(null);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/comments/${commentId}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete comment");

      setPost({
        ...post,
        comments: post.comments.filter((comment) => comment._id !== commentId),
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleReplies = (commentId) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // const handleDeleteReply = async (commentId, replyId) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/posts/comments/${commentId}/replies/${replyId}/delete`, {
  //       method: "DELETE",
  //     });
  
  //     if (!response.ok) throw new Error("Failed to delete reply");
  
  //     setPost((prevPost) => {
  //       //  Create a new comments array with updated replies
  //       const updatedComments = prevPost.comments.map((comment) => {
  //         if (comment._id === commentId) {
  //           return {
  //             ...comment,
  //             replies: comment.replies.filter((reply) => reply._id !== replyId), //  Remove the reply
  //           };
  //         }
  //         return comment;
  //       });
  
  //       return { ...prevPost, comments: updatedComments };
  //     });
  //   } catch (error) {
  //     console.error("Error deleting reply:", error);
  //   }
  // };
  const handleDeleteReply = async (commentId, replyId) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/comments/${commentId}/replies/${replyId}/delete`, {
        method: "DELETE",
      });
  
      if (!response.ok) throw new Error("Failed to delete reply");
  
      console.log(" Reply deleted successfully from backend:", replyId);
  
      // 🔄 Manually refetch comments
      const updatedCommentsResponse = await fetch(`http://localhost:5000/posts/${post._id}/comments`);
      const updatedComments = await updatedCommentsResponse.json();
  
      setPost({ ...post, comments: updatedComments });
    } catch (error) {
      console.error(" Error deleting reply:", error);
    }
  };
  
  
  
  
  
  
 
  

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Comments
        <IconButton onClick={handleClose} style={{ float: "right" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {post.comments.map((comment) => (
            <Stack key={comment._id} spacing={1} sx={{ borderBottom: "1px solid #ddd", paddingBottom: 1 }}>
              {/* Comment Section */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={comment.user.profilePicUrl} />
                <Stack>
                  <Typography variant="subtitle2">{comment.user.username}</Typography>
                  <Typography variant="body2">{comment.text}</Typography>
                </Stack>

                {/* Delete Button (Visible Only for Comment Owner) */}
                {comment.user._id === user._id && (
                  <IconButton size="small" onClick={() => handleDeleteComment(comment._id)}>
                    <DeleteIcon sx={{fontSize:22, color: "gray" }} />
                  </IconButton>
                )}
              </Stack>

              {/* "View Replies" Button with Icon */}
              {comment.replies.length > 0 && (
                <Button
                  size="small"
                  startIcon={expandedReplies[comment._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  onClick={() => toggleReplies(comment._id)}
                  sx={{ textTransform: "none", color: "gray", alignSelf: "start", fontSize: "0.85rem" }}
                >
                  {expandedReplies[comment._id] ? "Hide replies" : `View replies (${comment.replies.length})`}
                </Button>
              )}

              {/* Reply Section (Hidden by Default with Smooth Animation) */}
              {/* <Collapse in={expandedReplies[comment._id]} timeout="auto" unmountOnExit>
                <Stack spacing={1} sx={{ marginLeft: 4 }}>
                  {comment.replies.map((reply) => (
                    <Stack key={reply._id} direction="row" spacing={2} alignItems="center">
                      <Avatar src={reply.user.profilePicUrl} sx={{ width: 30, height: 30 }} />
                      <Stack>
                        <Typography variant="subtitle2">{reply.user.username}</Typography>
                        <Typography variant="body2">{reply.text}</Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Collapse> */}
              <Collapse in={expandedReplies[comment._id]} timeout="auto" unmountOnExit>
  <Stack spacing={1} sx={{ marginLeft: 4 }}>
    {comment.replies.map((reply) => (
      <Stack key={reply._id} direction="row" spacing={2} alignItems="center">
        <Avatar src={reply.user.profilePicUrl} sx={{ width: 30, height: 30 }} />
        <Stack>
          <Typography variant="subtitle2">{reply.user.username}</Typography>
          <Typography variant="body2">{reply.text}</Typography>
        </Stack>

        {/* Delete Reply Button (Only Visible to Reply Owner) */}
        {reply.user._id === user._id && (
          <IconButton size="small" onClick={() => handleDeleteReply(comment._id, reply._id)}>
            <DeleteIcon sx={{ fontSize: 19,color: "gray" }} />
          </IconButton>
        )}
      </Stack>
    ))}
  </Stack>
</Collapse>


              {/* Reply Input */}
              {selectedCommentId === comment._id ? (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ marginLeft: 4 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <IconButton onClick={() => handleReplySubmit(comment._id)}>
                    <SendIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Button size="small" sx={{ textTransform: "none", alignSelf: "start" }} onClick={() => setSelectedCommentId(comment._id)}>
                  Reply
                </Button>
              )}
            </Stack>
          ))}

          {/* Add New Comment */}
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <IconButton onClick={handleCommentSubmit}>
              <SendIcon />
            </IconButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModal;
