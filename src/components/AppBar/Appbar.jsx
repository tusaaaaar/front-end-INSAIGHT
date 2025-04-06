import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import Tooltip from '@mui/material/Tooltip';

import SearchIcon from "@mui/icons-material/Search";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
// import DehazeIcon from "@mui/icons-material/Dehaze";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import "./Appbar.css";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/insaight.png";

// import CreatePOST from "../post/CreatePost";
import ProfilePopup from "../popup/ProfilePopup";

  export default function NavBar() {
    // const [darkMode, setDarkMode] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // **Search State (Moved from UserSearch)**
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef(null);

    //name formatting function
    const formatName = (name) => {
      if (!name) return "User";
      
      // Keep original casing, slice to first word if possible
      const trimmed = name.trim();
      const firstWord = trimmed.split(" ")[0]; 
      
      return firstWord.length > 10 ? firstWord.slice(0, 9) + "…" : firstWord;
    };
    

//for popup
     const [popupOpen, setPopupOpen] = useState(false);
      const [selectedProfile, setSelectedProfile] = useState(null);
   
    useEffect(() => {
      if (query.length > 1) {
        const controller = new AbortController();
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/search?query=${query}`, {
              signal: controller.signal,
            });
            setUsers(response.data);
          } catch (error) {
            if (axios.isCancel(error)) {
              console.log("Previous request cancelled:", query);
            } else {
              console.error("Error fetching users:", error);
            }
          }
        };
  
        const timer = setTimeout(() => {
          fetchUsers();
        }, 300);
  
        return () => {
          clearTimeout(timer);
          controller.abort();
        };
      } else {
        setUsers([]);
      }
    }, [query]);
  
    // **Instant Search on Button Click**
    const handleSearchClick = async () => {
      if (query.trim().length > 0) {
        try {
          const response = await axios.get(`http://localhost:5000/search?query=${query}`);
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
      setQuery("");
    };
  
    // **Click Outside to Close Dropdown**
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setUsers([]); // 👈 Close dropdown when clicked outside
          setIsFocused(false);  
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    // **Dark Mode Toggle**
    // useEffect(() => {
    //   if (darkMode) {
    //     document.body.style.backgroundColor = "#121212"; 
    //     document.body.style.color = "#E0E0E0"; // Light text
    //   } else {
    //     document.body.style.backgroundColor = "#FFFFFF"; 
    //     document.body.style.color = "#000000"; 
    //   }
    // }, [darkMode]);

    // **Handle Logout**
    const handleLogout = () => {
      logout();
      setUsers([]);  
      setQuery("");
      navigate("/login"); // Redirect to login after logout
    };


     // Handle click on username to open profile popup
      const handleUserClick = async (userId) => {
        try {
          const res = await axios.get(`http://localhost:5000/profile/${userId}`);
          console.log("other user profile details",res.data);
          setSelectedProfile(res.data);  // ← pass entire object
          setPopupOpen(true);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
        setQuery("");
      };

    return (
      <Box  sx={{ flexGrow: 1 }}>
         {isFocused && <div className="overlay"></div>}
         <AppBar
          className={`search-wrapper ${isFocused ? "focused" : ""}`}
          position="static"
          sx={{
            background: "rgba(30, 30, 30, 0.14)",          // darker glass
            backdropFilter: "blur(14px)",
            color: "black",                               // white text for contrast
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",    // more elevated shadow
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            paddingTop: "0.4rem",                         // a little higher
            paddingBottom: "0.4rem",
          }}
        >

          <Toolbar className="icons">
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }} >
              <img src={logo} alt="LOGO" style={{ width: "50px", height: "50px" }} />
            </Box>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              INSIGHT
            </Typography>
           

            {/* **Search Bar** */}
              <div className="search-feild"  ref={searchRef}>
                <TextField
                  variant="outlined"
                  label="Search"
                  size="small"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-field"
                  onFocus={() => setIsFocused(true)} 
                  slotProps={{
                    input: {
                       endAdornment: (
                        <IconButton 
                        onClick={() => console.log("Search query:", query)}
                        >
                          <SearchIcon className="search-icon" onClick={handleSearchClick}/>
                        </IconButton>
                       
                    ),
                    },
                  }}
                        
                />
                
                {users.length > 0 && (
                  <div className="search-dropdown">
                    {users.map((user) => (
                      <div key={user._id} className="search-result-item">
                        <img src={`http://localhost:5000/files/${user.profilePicture}`} alt="Profile" className="search-avatar" />
                        <span onClick={() => handleUserClick(user._id)}>{user.username}</span>
                        {/* <span>onClick={() => handleUserClick(user._id)}</span> */}
                        <div className="result-icon">
                        <SearchIcon />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>




            {/* **Home & Profile Buttons** */}
            <Button sx={{ textTransform: "none", fontWeight: 500,fontSize: "1rem", }} color="inherit" component={Link} to="/home">
              <HomeSharpIcon />
              Home
            </Button>

            <Tooltip title={`${user.username} - Profile`}
            arrow
            slotProps={{
              tooltip: {
                sx: {
                  fontSize: '0.85rem',       // Bigger font
                  padding: '0.3rem 0.5rem', 
                }
              }
            }}
            >
              <Button sx={{ textTransform: "none", fontWeight: 500,fontSize: "1.2rem", }} color="inherit" component={Link} to="/Profile">
                {formatName(user.username)}
              </Button>
            </Tooltip>


            {/* **Logout Button** */}
            <Tooltip
                title="Logout"
                arrow
                 slotProps={{
                  tooltip: {
                    sx: {
                      fontSize: '0.85rem',       // Bigger font
                      padding: '0.3rem 0.5rem', 
                    }
                  }
                }}
              >
                <IconButton onClick={handleLogout} color="inherit">
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            {/* **Menu Button**
            <Button id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)} startIcon={<DehazeIcon />} />

          
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} MenuListProps={{ "aria-labelledby": "basic-button" }}>
              <MenuItem onClick={() => setDarkMode(!darkMode)}>Dark Mode</MenuItem>

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu> */}
          </Toolbar>
        </AppBar>


         {/* Profile Pop-up */}
              <ProfilePopup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                profileData={selectedProfile}
              />
      </Box>
    );
  }
