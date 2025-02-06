import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import Avatar from '@mui/material/Avatar';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Toolbar from "@mui/material/Toolbar";
import logo from '../../assets/images/insaight.png';
import PROFILE from '../../assets/images/ProfileImage.JPG';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./Appbar.css";

export default function NavBar() {
  const [darkMode, setDarkMode] = React.useState(false); // for dark mode toggle
  const [anchorEl, setAnchorEl] = React.useState(null); // for menu anchor
  const open = Boolean(anchorEl);

  // Dark mode handling
  React.useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = '#333'; // dark mode bg color
      document.body.style.color = 'white'; // text color
    } else {
      document.body.style.backgroundColor = 'white'; // light mode bg color
      document.body.style.color = 'black'; // text color
    }
  }, [darkMode]);

  // Search handling
  const handleSearchChange = (event) => {
    const query = event.target.value;
    console.log("Search query:", query);
  };

  // Dark mode toggle
  const handleLogoClick = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Menu handling
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="green">
        <Toolbar className="icons">
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }} onClick={handleLogoClick}>
            <img src={logo} alt="LOGO" style={{ width: '50px', height: '50px' }} />
          </Box>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            INSIGHT
          </Typography>

          {/* Search bar */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            onChange={handleSearchChange}
            sx={{
              marginRight: 2,
              backgroundColor: "white",
              borderRadius: 1,
              width: "30%",
            }}
          />

          <Button color="inherit" component={Link} to="/home">
            <HomeSharpIcon />
            Home
          </Button>
          <Button color="inherit" component={Link} to="/Profile">
            <AccountCircleSharpIcon />
            Profile
          </Button>

          {/* Profile menu */}
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Avatar alt="Profile image" src={PROFILE} />
            Me
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                handleLogoClick(); // Toggle dark mode
                handleClose(); // Close the menu
              }}
            >
              Mode
            </MenuItem>

            <MenuItem
              onClick={() => {
                console.log("Logging out..."); // Perform logout functionality
                handleClose(); // Close the menu
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
  