// import { useState } from "react";
// import axios from "axios";
// // import { useAuth } from '../context/AuthContext'; // Import useAuth

// import { useAuth } from "../../context/AuthContext";

// const CreatePost = () => {

//     const { user } = useAuth(); // Get logged-in user from AuthContext
  
//   const [caption, setCaption] = useState("");
//   const [images, setImages] = useState([]);

//   const handleFileChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();
//     formData.append("caption", caption);
//     console.log("inside create post the  id is  ",user._id);

//     formData.append("userId", user._id);
//     images.forEach((image) => formData.append("images", image));

//     try {
//       await axios.post("http://localhost:5000/posts/create", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Post created successfully!");
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <form onSubmit={handlePostSubmit}>
//       <input
//         type="text"
//         placeholder="Write a caption..."
//         value={caption}
//         onChange={(e) => setCaption(e.target.value)}
//       />
//       <input type="file" multiple onChange={handleFileChange} />
//       <button type="submit">Post</button>
//     </form>
//   );
// };

// export default CreatePost;


import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { CloudUpload, Article } from "@mui/icons-material";
import axios from "axios";
// import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useAuth } from "../../context/AuthContext";

const CreatePost = ({ userId }) => {
  const { user } = useAuth(); // Get logged-in user from AuthContext
  const [postType, setPostType] = useState("image"); // "image" or "article"
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [article, setArticle] = useState("");

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   formData.append("caption", caption);
  //   formData.append("userId", user._id);
    
  //   if (postType === "image") {
  //     images.forEach((image) => formData.append("images", image));
  //   } else {
  //     formData.append("article", article);
  //   }

  //   try {
  //     await axios.post("http://localhost:5000/posts/create", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     alert("Post Created Successfully!");
  //   } catch (error) {
  //     console.error("Error creating post", error);
  //   }
  // };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("userId", user._id);
  
    if (postType === "image") {
      images.forEach((image) => formData.append("images", image));
    } else {
      formData.append("content", article); // Fix: Send as "content", not "article"
    }
  
    try {
      await axios.post("http://localhost:5000/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post Created Successfully!");
    } catch (error) {
      console.error("Error creating post", error);
    }
  };
  

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
      <CardContent>
        <Typography variant="h5">Create Post</Typography>

        {/* Toggle between Image & Article */}
        <Button onClick={() => setPostType("image")} startIcon={<CloudUpload />} variant={postType === "image" ? "contained" : "outlined"}>
          Upload Image
        </Button>
        <Button onClick={() => setPostType("article")} startIcon={<Article />} variant={postType === "article" ? "contained" : "outlined"}>
          Write Article
        </Button>

        <TextField fullWidth label="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} sx={{ my: 2 }} />

        {postType === "image" ? (
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        ) : (
          <TextField fullWidth multiline rows={4} label="Write your article..." value={article} onChange={(e) => setArticle(e.target.value)} />
        )}

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Post
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatePost;

