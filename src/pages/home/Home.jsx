import React from "react";
import "./Home.css" 
import Post from "../../components/post/Post.jsx";
const Home=() =>{
    return (
    <div className="home">
        <div className="leftside">profile and all </div>
        <div className="post">Post should come here <Post/></div>
        <div className="rightside">some notifications regarding eco enstine  </div>

    </div>
    )
};

export default Home;