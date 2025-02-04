import React from 'react'
import "./Post.css"
import Postshare from '../postshare/PostShare.jsx'
import Postcard from '../postcard/Postcard.jsx'
const Post = () => {
  return (
    <div className="postcolumn">
      <Postshare/>
      <Postcard/>
      <Postcard/>
      <Postcard/>
      <Postcard/>
      

    </div>
  )
}

export default Post;
