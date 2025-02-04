import React, { useState, useRef } from "react";
import "./PostShare.css";
import ProfileImage from "../../assets/images/ProfileImage.JPG";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ArticleIcon from "@mui/icons-material/Article";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloseIcon from '@mui/icons-material/Close';

 
const Postshare = () => {
  const [image, setImage]= useState(null)
  const imageRef=useRef()
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image:URL.createObjectURL(img)
      })
    }
  }; 
  return (

    <div className="postshare">
       <img className="profile-image" src={ProfileImage} alt="Profile" /> 
      <div>
        <input type="text" placeholder="Got something to share?" />
        <div className="postoption">
          <div className="option" onClick={() => imageRef.current.click()}>
            <InsertPhotoIcon />
            Image
          </div>
          <div className="option">
            <ArticleIcon />
            Text
          </div>
          <div className="option">
            <RemoveRedEyeIcon />
            Views
          </div>
          <button className="button ps-button ">
            Share
          </button>
          <div style={{ display: "none" }}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}  />
          </div>
        </div>
        {image && (         // Image pr click karne pe folder khule ga
          <div className="previewImage">
            <CloseIcon onClick={() => setImage(null)} />
            <img src={(image.image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Postshare;
 