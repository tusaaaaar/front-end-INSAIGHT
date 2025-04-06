import React from "react";
import './login.css'
import logo from '../../assets/images/LOGO.png'
import { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'
import PasswordStrengthBar from "react-password-strength-bar";
import { useAuth } from "../../context/AuthContext";



const Login = () => {

  const [isSignUp, setIsSignUp] = useState(true); // this will lead the change in login and signin
  
  const handleType = (count) => {
    console.log(count); // Access the word count during typing
  };

  const handleDone = () => {
    console.log("Done after 5 loops!"); // When done after all loops
  };




  return(
  <div className="login"
  >
    <div className="left">

      <div className="loginleft1">
      { /*<img src={collage} alt="collagee" /> */}

      </div>
      <div className="loginleft2">

      <div className='App'>
      <h1 style={{ paddingTop: 'rem', margin: 'auto 0',fontFamily:'Poppins',fontSize: 'clamp(2rem, 6vw, 60px)', fontWeight: 'normal' }}>
      Life is simple{' '}
        <span style={{ color: '#F08C8C', fontWeight: 'normal' }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={['Imagine', 'Create', 'Explore', 'Evolve']}
            loop={Infinity}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
            onLoopDone={handleDone}
            onType={handleType}
          />
        </span>
      </h1>
    </div>  

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
        <div className="input-row">
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
        <div className="input-full">
          <input 
            type="text" 
            placeholder="Mail" 
            className="infoin" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-full">
          <input 
            type="text" 
            placeholder="Create a USERNAME" 
            className="infoin" 
            name="username" 
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
      <div  className="password-container">
        <div className="password-fields">
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
             <div className="strength-bar-wrapper">
                <PasswordStrengthBar password = {formData.password}/>
             </div>
          </div>   
      </div>
       

        {
           errorMessage && (
                <div className="alert alert-danger">
                       {errorMessage}
                </div>
             )
         }


       

        <div className="signup-button">
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
  
  /*React useState for  changing the name*/
  const[greeting,setGreeting] = useState("Brother");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
 
  const {login} = useAuth();


  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };  
  const handleUsernameBlur = () => {
    if(formData.username.trim()!==""){
      setGreeting(formData.username);
      setAnimate(false); // Remove animation class
      setTimeout(() => setAnimate(true), 10);
    }

};
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      
      // login(formData);
      login(response.data.user);

      navigate('/home');
      // alert('Login successful!');
      console.log("user repsonse login ",response.data.user)

      // console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="loginRight">
      <form className="info authentication" onSubmit={handleLogin}>
      <div className="greetingBox">
        <h3>Welcome Back </h3>
        <h2 className={`${animate ? 'swipe' : ''}`}>{greeting}!</h2>
      </div>
      <div>
          <input
            type="text"
            placeholder="User Name"
            className="infoin"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleUsernameBlur}
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



