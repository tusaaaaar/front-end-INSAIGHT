// import { useState } from "react";
// import { TextField, Button } from "@mui/material";
// import { CloudUpload, Article } from "@mui/icons-material";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import "./Post.css"; // CSS for this component

// const CreatePost = () => {
//   const { user } = useAuth();
//   const [postType, setPostType] = useState("image");
//   const [caption, setCaption] = useState("");
//   const [images, setImages] = useState([]);
//   const [article, setArticle] = useState("");

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("caption", caption);
//     formData.append("userId", user._id);

//     if (postType === "image") {
//       images.forEach((image) => formData.append("images", image));
//     } else {
//       formData.append("content", article);
//     }

//     try {
//       await axios.post("http://localhost:5000/posts/create", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Post Created Successfully!");
//       // Clear inputs
//       setCaption("");
//       setImages([]);
//       setArticle("");
//     } catch (error) {
//       console.error("Error creating post", error);
//     }
//   };

//   return (
//     <div className="create-post-container">
//       <div className="create-post-header">
//         <button
//           className={postType === "image" ? "toggle-btn active" : "toggle-btn"}
//           onClick={() => setPostType("image")}
//         >
//           <CloudUpload /> Upload Image
//         </button>
//         <button
//           className={postType === "article" ? "toggle-btn active" : "toggle-btn"}
//           onClick={() => setPostType("article")}
//         >
//           <Article /> Write Article
//         </button>
//       </div>

//       <TextField
//         fullWidth
//         label="Caption"
//         value={caption}
//         onChange={(e) => setCaption(e.target.value)}
//         className="input-field"
//       />

//       {postType === "image" ? (
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//           className="file-input"
//         />
//       ) : (
//         <TextField
//           fullWidth
//           multiline
//           rows={4}
//           label="Write your article..."
//           value={article}
//           onChange={(e) => setArticle(e.target.value)}
//           className="input-field"
//         />
//       )}

//       <Button variant="contained" fullWidth className="submit-btn" onClick={handleSubmit}>
//         Post
//       </Button>
//     </div>
//   );
// };

// export default CreatePost;



// import React, { useState } from "react";
// import { Tooltip,IconButton  } from "@mui/material";
// import { CloudUpload, Article, Add } from "@mui/icons-material";
// import { useAuth } from "../../context/AuthContext";
// import axios from "axios";
// import "./Post.css"; // Put CSS here

// const CreatePost = () => {
//   const { user } = useAuth();
//   const [postType, setPostType] = useState("image");
//   const [caption, setCaption] = useState("");
//   const [images, setImages] = useState([]);
//   const [article, setArticle] = useState("");
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("caption", caption);
//     formData.append("userId", user._id);
//     if (postType === "image") {
//       images.forEach((image) => formData.append("images", image));
//     } else {
//       formData.append("content", article);
//     }

//     try {
//       await axios.post("http://localhost:5000/posts/create", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Post Created Successfully!");
//       // Reset form
//       setCaption("");
//       setImages([]);
//       setArticle("");
//       setIsPopupOpen(false);
//     } catch (error) {
//       console.error("Error creating post", error);
//     }
//   };

//   return (
//     <>
//       {/* Floating '+' Button */}
      
//       <Tooltip title="Create Post" arrow>
//           <IconButton  className="fab-button" onClick={() => setIsPopupOpen(true)} color="primary">
//             <Add />
//           </IconButton >
//       </Tooltip>

//       {/* Popup Overlay */}
//       {isPopupOpen && (
//         <div className="popup-overlay">
//           <div className="popup-container">
//             <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
//               &times;
//             </button>
//             <h2>Create Post</h2>

//             {/* Toggle Buttons */}
//             <div className="toggle-buttons">
//               <button
//                 onClick={() => setPostType("image")}
//                 className={postType === "image" ? "active" : ""}
//               >
//                 <CloudUpload /> Image
//               </button>
//               <button
//                 onClick={() => setPostType("article")}
//                 className={postType === "article" ? "active" : ""}
//               >
//                 <Article /> Article
//               </button>
//             </div>

//             {/* Caption Input */}
//             <input
//               type="text"
//               placeholder="Caption..."
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//             />

//             {/* Content Upload */}
//             {postType === "image" ? (
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             ) : (
//               <textarea
//                 rows="4"
//                 placeholder="Write your article..."
//                 value={article}
//                 onChange={(e) => setArticle(e.target.value)}
//               />
//             )}

//             {/* Submit Button */}
//             <button className="submit-btn" onClick={handleSubmit}>
//               Post
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CreatePost;


// import React, { useState } from "react";
// import { Tooltip, IconButton, CircularProgress } from "@mui/material";
// import { CloudUpload, Article, Add } from "@mui/icons-material";
// import { useAuth } from "../../context/AuthContext";
// import axios from "axios";
// import "./Post.css"; // Put CSS here

// const CreatePost = () => {
//   const { user } = useAuth();
//   const [postType, setPostType] = useState("image");
//   const [caption, setCaption] = useState("");
//   const [images, setImages] = useState([]);
//   const [article, setArticle] = useState("");
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [loading, setLoading] = useState(false); // NEW: Loading state

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async () => {
//     if (loading) return; // Prevent multiple clicks
//     setLoading(true); // Start loading

//     const formData = new FormData();
//     formData.append("caption", caption);
//     formData.append("userId", user._id);
//     if (postType === "image") {
//       images.forEach((image) => formData.append("images", image));
//     } else {
//       formData.append("content", article);
//     }

//     try {
//       await axios.post("http://localhost:5000/posts/create", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Post Created Successfully!");

//       // Reset form
//       setCaption("");
//       setImages([]);
//       setArticle("");
//       setIsPopupOpen(false);
//     } catch (error) {
//       console.error("Error creating post", error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <>
//       {/* Floating '+' Button */}
//       <Tooltip title="Create Post" arrow>
//         <IconButton
//           className="fab-button"
//           onClick={() => setIsPopupOpen(true)}
//           color="primary"
//         >
//           <Add />
//         </IconButton>
//       </Tooltip>

//       {/* Popup Overlay */}
//       {isPopupOpen && (
//         <div className="popup-overlay">
//           <div className="popup-container">
//             <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
//               &times;
//             </button>
//             <h2>Create Post</h2>

//             {/* Toggle Buttons */}
//             <div className="toggle-buttons">
//               <button
//                 onClick={() => setPostType("image")}
//                 className={postType === "image" ? "active" : ""}
//               >
//                 <CloudUpload /> Image
//               </button>
//               <button
//                 onClick={() => setPostType("article")}
//                 className={postType === "article" ? "active" : ""}
//               >
//                 <Article /> Article
//               </button>
//             </div>

//             {/* Caption Input */}
//             <input
//               type="text"
//               placeholder="Caption..."
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//             />

//             {/* Content Upload */}
//             {postType === "image" ? (
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             ) : (
//               <textarea
//                 rows="4"
//                 placeholder="Write your article..."
//                 value={article}
//                 onChange={(e) => setArticle(e.target.value)}
//               />
//             )}

//             {/* Submit Button */}
//             <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
//               {loading ? <CircularProgress size={20} color="inherit" /> : "Post"}
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CreatePost;




import React, { useState } from "react";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
import { CloudUpload, Article, Add, Delete } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./Post.css"; // Put CSS here
import { Snackbar, Alert } from "@mui/material";
import { TextField, Button, Grid, Card, CardMedia, Typography,Stack, Box  } from "@mui/material";


const CreatePost = () => {
  const { user } = useAuth();
  const [postType, setPostType] = useState("image");
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [article, setArticle] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  //for snackbar
   // Snackbar State
   const [snackbarOpen, setSnackbarOpen] = useState(false);
   const [snackbarMessage, setSnackbarMessage] = useState("");
 
   // Handle Snackbar Close
   const handleSnackbarClose = () => {
     setSnackbarOpen(false);
   };





  //  Handle multiple image selection
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  //  Remove selected image
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // const handleSubmit = async () => {
  //   if (loading) return;
  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append("caption", caption);
  //   formData.append("userId", user._id);
  //   if (postType === "image" && images.length > 0) {
  //     images.forEach((image) => formData.append("images", image));
  //   } else {
  //     formData.append("content", article);
  //   }

  //   try {
  //     await axios.post("http://localhost:5000/posts/create", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     alert("Post Created Successfully!");

  //     // Reset form
  //     setCaption("");
  //     setImages([]);
  //     setArticle("");
  //     setIsPopupOpen(false);
  //   } catch (error) {
  //     console.error("Error creating post", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("userId", user._id);
    if (postType === "image" && images.length > 0) {
      images.forEach((image) => formData.append("images", image));
    } else {
      formData.append("content", article);
    }

    try {
      await axios.post("http://localhost:5000/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Show Snackbar Instead of Alert
      setSnackbarMessage("Post Created Successfully!");
      setSnackbarOpen(true);

      // Reset form
      setCaption("");
      setImages([]);
      setArticle("");
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error creating post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Tooltip title="Create Post" arrow>
      <IconButton className="fab-button" onClick={() => setIsPopupOpen(true)} color="primary">
        <Add />
      </IconButton>
    </Tooltip>

    {isPopupOpen && (
      <div className="popup-overlay">
        <div className="popup-container">
          <button className="close-btn" onClick={() => setIsPopupOpen(false)}>&times;</button>
          <h2>Create Post</h2>

          {/* Toggle Buttons */}
          <div className="toggle-buttons">
            <button onClick={() => setPostType("image")} className={postType === "image" ? "active" : ""}>
              <CloudUpload /> Image
            </button>
            <button onClick={() => setPostType("article")} className={postType === "article" ? "active" : ""}>
              <Article /> Article
            </button>
          </div>

          <input type="text" placeholder="Caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />

          {/* {postType === "image" ? (
            <>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} />
              <div className="file-list">
                {images.map((image, index) => (
                  <div key={index} className="file-item">
                    <span>{image.name}</span>
                    <IconButton className="remove-btn" onClick={() => removeImage(index)}>
                      <Delete />
                    </IconButton>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <textarea rows="4" placeholder="Write your article..." value={article} onChange={(e) => setArticle(e.target.value)} />
          )} */}

          

{postType === "image" ? (
  <>
    {/* Styled Upload Button */}
    <input
      type="file"
      multiple
      accept="image/*"
      id="upload-images"
      style={{ display: "none" }}
      onChange={handleImageChange}
    />
    <label htmlFor="upload-images">
      <Button
        variant="contained"
        component="span"
        startIcon={<CloudUpload />}
        sx={{
          width: "50%",
          mb: 2,
          textTransform: "none",
          backgroundColor: "#0095f6",
          "&:hover": { backgroundColor: "#0080d6" },
        }}
      >
        Select Images
      </Button>
    </label>

    {/* Image Previews */}
    <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: 1 }}>
      {images.map((image, index) => (
        <Box key={index} sx={{ position: "relative", width: 80, height: 80 }}>
          <img
            src={URL.createObjectURL(image)}
            alt={image.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: -5,
              right: -5,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            }}
            onClick={() => removeImage(index)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Stack>
  </>
) : (
  <TextField
    fullWidth
    multiline
    rows={3}
    placeholder="Write something..."
    value={article}
    onChange={(e) => setArticle(e.target.value)}
    variant="outlined"
    sx={{ mt: 2 }}
  />
)}

          <button className="submit-btn" onClick={handleSubmit} disabled={loading || (!caption && !images.length && !article)}>
            {loading ? <CircularProgress size={20} color="inherit" /> : "Post"}
          </button>
        </div>
      </div>
    )}

    {/* Snackbar for Success Message */}
    <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={handleSnackbarClose} severity="success" variant="filled">
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </>
  );
};

export default CreatePost;
