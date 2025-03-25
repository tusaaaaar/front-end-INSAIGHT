import React from "react";
import "./Home.css";
import Post from "../../components/post/CreatePost.js";
import CardPost from "../../PostCard/CardPost.js";
import AllUsers from "../../components/sugested_user/AllUsers.js";
import Eco from "../../components/ecoclub/Eco.jsx";

const Home = () => {
  return (
    <div className="home">
      <div className="leftside">
      <div className="makepos">
          <Post />
        </div>
        <AllUsers />
      </div>

      <div className="post">
        <div className="recent">
          <CardPost />
        </div>
      </div>

      <div className="rightside">
        <Eco />
      </div>
    </div>
  );
};

export default Home;
