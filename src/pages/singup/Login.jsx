import React from "react";
import './login.css'
import logo from '../../assets/images/LOGO.png'
import collage from '../../assets/images/collage2.png'
import collage1 from '../../assets/images/collagee 1.png'
import { useState } from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from './Home.jsx';
import {  useNavigate } from "react-router-dom";

// import { useAuth } from "./context/AuthContext";
// import { useAuth } from "../../context/authContext";
// import { useAuth } from "../../context/authContext";
import { useAuth } from "../../context/AuthContext";



const Login = () => {

  const [isSignUp, setIsSignUp] = useState(true); // this will lead the change in login and signin

  




  return(
  <div className="login"
  >
    <div className="left">

      <div className="loginleft1">
        <img src={collage} alt="collagee" /> 

      </div>
      <div className="loginleft2">
        
        <img src={collage1} alt="collagee" /> 



        {/* <img src={logo} alt="sitelogo" />
        <div className="name">
          <h2>Share your creativity and stand out.</h2>
          <img src={campus} alt="baground" />
        </div> */}

      </div>

    </div>


    <div className="right">
      <img src={logo} alt="sitelogo" /> 
      {isSignUp ? <Loginalready toggleForm={() => setIsSignUp(false)} /> : <SignUp toggleForm={() => setIsSignUp(true)} />}
    </div>

  </div>

  );
};









function SignUp( {toggleForm} ) {
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    email: '',
    username: '',
    password: '',
    confirmpassword: ''
  });


  const [errorMessage,setErrorMessage] = useState();


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
   
       setErrorMessage("Passwords do not match!");


      // alert("Passwords do not match!");
      return;
    }
    const { confirmpassword, ...dataToSend } = formData;

    try {
      const response = await axios.post('http://localhost:5000/signup', dataToSend);
      

      
      console.log(response.data);
      toggleForm();
      alert('Sign up successful!');

      setErrorMessage("");
    } catch (error) {
      console.error(error);
      alert('Sign up failed. Please try again.');
    }
  };


  return (
    <div className="loginRight">
      
      
      
      {/* <form className="info authentication"> */}
      <form className="info authentication" onSubmit={handleSignUp}>
        <h3>Sign Up</h3>
        <div>
          <input 
            type="text" 
            placeholder="Name" 
            className="infoin" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
          />
          <input 
            type="text" 
            placeholder="Reg. No" 
            className="infoin" 
            name="registrationNo" 
            value={formData.registrationNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Mail" 
            className="infoin" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Create a USERNAME" 
            className="infoin" 
            name="username" 
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Password" 
            className="infoin" 
            name="password" 
            value={formData.password}
            onChange={handleInputChange}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="infoin" 
            name="confirmpassword" 
             value={formData.confirmpassword}
            onChange={handleInputChange}
           
          />
        </div>

        {
           errorMessage && (
                <div className="alert alert-danger">
                       {errorMessage}
                </div>
             )
         }




        <div>
          <button className=" button infoButton" type="submit">Signup</button>
        </div>

       
       

  

        <div >
          Already have account.{" "}
          <span onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>
            Login!
          </span>
        </div>
        
      </form>
    </div>
  );
}

function Loginalready({ toggleForm }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
 
  const {login} = useAuth();



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      
      login(formData);


      navigate('/home');
      // alert('Login successful!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="loginRight">
      <form className="info authentication" onSubmit={handleLogin}>
        <h3>Log In</h3>
        <div>
          <input
            type="text"
            placeholder="User Name"
            className="infoin"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="infoin"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button className="button infoButton" type="submit">
            Login
          </button>
        </div>

        <div>
          Don't have an account?{" "}
          <span onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>
            Sign Up!
          </span>
        </div>
        
      </form>
    </div>
  );
}

export default Login;



