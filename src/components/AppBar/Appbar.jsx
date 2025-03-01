  // import * as React from "react";
  // import { useState, useEffect } from "react";
  // import { Link, useNavigate } from "react-router-dom";
  // import axios from "axios";

  // import AppBar from "@mui/material/AppBar";
  // import Box from "@mui/material/Box";
  // import Toolbar from "@mui/material/Toolbar";
  // import Typography from "@mui/material/Typography";
  // import Button from "@mui/material/Button";
  // import TextField from "@mui/material/TextField";
  // import IconButton from "@mui/material/IconButton";
  // import SearchIcon from "@mui/icons-material/Search";
  // import HomeSharpIcon from '@mui/icons-material/HomeSharp';
  // import Menu from "@mui/material/Menu";
  // import MenuItem from "@mui/material/MenuItem";
  // import DehazeIcon from "@mui/icons-material/Dehaze";
  // import "./Appbar.css";
  // import { useAuth } from "../../context/AuthContext";
  // import logo from "../../assets/images/insaight.png";

  // export default function NavBar() {
  //   const [darkMode, setDarkMode] = useState(false);
  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const open = Boolean(anchorEl);
  //   const { user, logout } = useAuth();
  //   const navigate = useNavigate();

  //   // **Search State (Moved from UserSearch)**
  //   const [query, setQuery] = useState("");
  //   const [users, setUsers] = useState([]);

  //   // **Fetch Users When Typing**
  //   useEffect(() => {
  //     if (query.length > 1) {
  //       const fetchUsers = async () => {
  //         try {
  //           const response = await axios.get(`http://localhost:5000/search?query=${query}`);
  //           setUsers(response.data);
  //         } catch (error) {
  //           console.error("Error fetching users", error);
  //         }
  //       };
  //       fetchUsers();
  //     } else {
  //       setUsers([]);
  //     }
  //   }, [query]);

  //   // **Dark Mode Toggle**
  //   useEffect(() => {
  //     document.body.style.backgroundColor = darkMode ? "#333" : "white";
  //     document.body.style.color = darkMode ? "white" : "black";
  //   }, [darkMode]);

  //   // **Handle Logout**
  //   const handleLogout = () => {
  //     logout();
  //     setUsers([]);  
  //     setQuery("");
  //     navigate("/login"); // Redirect to login after logout
  //   };

  //   return (
  //     <Box sx={{ flexGrow: 1 }}>
  //       <AppBar position="static" sx={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
  //         <Toolbar className="icons">
  //           {/* Logo */}
  //           <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }} onClick={() => setDarkMode(!darkMode)}>
  //             <img src={logo} alt="LOGO" style={{ width: "50px", height: "50px" }} />
  //           </Box>

  //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  //             INSIGHT
  //           </Typography>

  //           {/* **Search Bar** */}
  //           <div className="search-container">
  //             <TextField
  //               label="Search"
  //               variant="outlined"
  //               size="small"
  //               value={query}
  //               onChange={(e) => setQuery(e.target.value)}
  //               className="search-field"
                
  //               slotProps={{
  //                 input: {
  //                   endAdornment: (
  //                     <IconButton 
  //                       onClick={() => console.log("Search query:", query)} 
  //                     >
  //                       <SearchIcon className="search-icon"/>
  //                     </IconButton>
  //                   ),
  //                 },
  //               }}
  //             />
  //           </div>


  //           {/* **Search Results Dropdown** */}

  //               {users.length > 0 && (
  //                 <div className="search-dropdown">
  //                   {users.map((user) => (
  //                     <div key={user._id} className="search-result-item">
  //                       <img src={`http://localhost:5000/files/${user.profilePicture}`} alt="Profile" className="search-avatar" />
  //                       <span>{user.username}</span>
  //                     </div>
  //                   ))}
  //                 </div>
  //               )}

  //           {/* **Home & Profile Buttons** */}
  //           <Button color="inherit" component={Link} to="/home">
  //             <HomeSharpIcon />
  //             Home
  //           </Button>
  //           <Button color="inherit" component={Link} to="/Profile">
  //             {user.username}
  //           </Button>

  //           {/* **Menu Button** */}
  //           <Button id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)} startIcon={<DehazeIcon />} />

  //           {/* **Dropdown Menu** */}
  //           <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} MenuListProps={{ "aria-labelledby": "basic-button" }}>
  //             <MenuItem onClick={() => setDarkMode(!darkMode)}>Dark Mode</MenuItem>
  //             <MenuItem onClick={handleLogout}>Logout</MenuItem>
  //           </Menu>
  //         </Toolbar>
  //       </AppBar>
  //     </Box>
  //   );
  // }




  import * as React from "react";
  import { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";

  import AppBar from "@mui/material/AppBar";
  import Box from "@mui/material/Box";
  import Toolbar from "@mui/material/Toolbar";
  import Typography from "@mui/material/Typography";
  import Button from "@mui/material/Button";
  import TextField from "@mui/material/TextField";
  import IconButton from "@mui/material/IconButton";
  import SearchIcon from "@mui/icons-material/Search";
  import HomeSharpIcon from '@mui/icons-material/HomeSharp';
  import Menu from "@mui/material/Menu";
  import MenuItem from "@mui/material/MenuItem";
  import DehazeIcon from "@mui/icons-material/Dehaze";
  import "./Appbar.css";
  import { useAuth } from "../../context/AuthContext";
  import logo from "../../assets/images/insaight.png";

  export default function NavBar() {
    const [darkMode, setDarkMode] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // **Search State (Moved from UserSearch)**
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    // **Fetch Users When Typing**
    useEffect(() => {
      if (query.length > 1) {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/search?query=${query}`);
            setUsers(response.data);
          } catch (error) {
            console.error("Error fetching users", error);
          }
        };
        fetchUsers();
      } else {
        setUsers([]);
      }
    }, [query]);

    // **Dark Mode Toggle**
    useEffect(() => {
      document.body.style.backgroundColor = darkMode ? "#333" : "white";
      document.body.style.color = darkMode ? "white" : "black";
    }, [darkMode]);

    // **Handle Logout**
    const handleLogout = () => {
      logout();
      setUsers([]);  
      setQuery("");
      navigate("/login"); // Redirect to login after logout
    };

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
          <Toolbar className="icons">
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }} onClick={() => setDarkMode(!darkMode)}>
              <img src={logo} alt="LOGO" style={{ width: "50px", height: "50px" }} />
            </Box>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              INSIGHT
            </Typography>

            {/* **Search Bar** */}
            <div className="search-container">
                <TextField
                  variant="outlined"
                  lable="Search"
                  size="small"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-field"
                  slotProps={{
                    input: {
                       endAdornment: (
                        <IconButton 
                        onClick={() => console.log("Search query:", query)}
                        >
                          <SearchIcon className="search-icon"/>
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
                        <span>{user.username}</span>
                        <div className="result-icon">
                        <SearchIcon />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>



            {/* **Search Results Dropdown** */}
{/* 
                {users.length > 0 && (
                  <div className="search-dropdown">
                    {users.map((user) => (
                      <div key={user._id} className="search-result-item">
                        <img src={`http://localhost:5000/files/${user.profilePicture}`} alt="Profile" className="search-avatar" />
                        <span>{user.username}</span>
                      </div>
                    ))}
                  </div>
                )} */}

            {/* **Home & Profile Buttons** */}
            <Button color="inherit" component={Link} to="/home">
              <HomeSharpIcon />
              Home
            </Button>
            <Button color="inherit" component={Link} to="/Profile">
              {user.username}
            </Button>

            {/* **Menu Button** */}
            <Button id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)} startIcon={<DehazeIcon />} />

            {/* **Dropdown Menu** */}
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} MenuListProps={{ "aria-labelledby": "basic-button" }}>
              <MenuItem onClick={() => setDarkMode(!darkMode)}>Dark Mode</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
