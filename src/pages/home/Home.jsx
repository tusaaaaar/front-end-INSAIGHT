import React from "react";
import "./Home.css" 
import Post from "../../components/post/Post.jsx";
// import CardPost from "../../components/postshare/CardPost.js";
import CardPost from "../../PostCard/CardPost.js";
import AllUsers from "../AllUsers.js";

const Home=() =>{
    return (
    <div className="home">
        <div className="leftside">profile and all
            <AllUsers/>    
         </div>
        <div className="post">Post should come here <Post/>
           <CardPost/>
        </div>
        <div className="rightside">some notifications regarding eco enstine 
           
         </div>

    </div>
    )
};

export default Home;