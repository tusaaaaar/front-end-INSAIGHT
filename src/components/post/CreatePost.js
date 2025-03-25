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



import React, { useState } from "react";
import { Tooltip,IconButton  } from "@mui/material";
import { CloudUpload, Article, Add } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./Post.css"; // Put CSS here

const CreatePost = () => {
  const { user } = useAuth();
  const [postType, setPostType] = useState("image");
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [article, setArticle] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("userId", user._id);
    if (postType === "image") {
      images.forEach((image) => formData.append("images", image));
    } else {
      formData.append("content", article);
    }

    try {
      await axios.post("http://localhost:5000/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post Created Successfully!");
      // Reset form
      setCaption("");
      setImages([]);
      setArticle("");
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <>
      {/* Floating '+' Button */}
      
      <Tooltip title="Create Post" arrow>
          <IconButton  className="fab-button" onClick={() => setIsPopupOpen(true)} color="primary">
            <Add />
          </IconButton >
      </Tooltip>

      {/* Popup Overlay */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
              &times;
            </button>
            <h2>Create Post</h2>

            {/* Toggle Buttons */}
            <div className="toggle-buttons">
              <button
                onClick={() => setPostType("image")}
                className={postType === "image" ? "active" : ""}
              >
                <CloudUpload /> Image
              </button>
              <button
                onClick={() => setPostType("article")}
                className={postType === "article" ? "active" : ""}
              >
                <Article /> Article
              </button>
            </div>

            {/* Caption Input */}
            <input
              type="text"
              placeholder="Caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            {/* Content Upload */}
            {postType === "image" ? (
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            ) : (
              <textarea
                rows="4"
                placeholder="Write your article..."
                value={article}
                onChange={(e) => setArticle(e.target.value)}
              />
            )}

            {/* Submit Button */}
            <button className="submit-btn" onClick={handleSubmit}>
              Post
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
