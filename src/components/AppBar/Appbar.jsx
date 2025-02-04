import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Toolbar from "@mui/material/Toolbar";
import logo from '../../assets/images/21.1.png';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";




export default function NavBar() {
  const [darkMode, setDarkMode] = React.useState(false); //dark mode k liye

  const handleSearchChange = (event) => {
    const query = event.target.value;
    console.log("Search query:", query);
  };

  const handleLogoClick = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  React.useEffect(() =>{
    if (darkMode) {
      document.body.style.backgroundColor = '#333'; //dark bg color
      document.body.style.color = 'white';//jab parenge toh white rahega
    } else {
      document.body.style.backgroundColor = 'white'; //dark bg color
      document.body.style.color = 'black';
    }

  }, [darkMode]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="green">
        <Toolbar>
          <Box  sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}
          onClick={handleLogoClick} //click handler
          >
          <img 
          src={logo} 
          alt="LOGO" 
          style ={{  width: '50px', height:'50px'}} /> {/*logo ka size.*/}
          </Box>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            INSIGHT
          </Typography>
          {/*Search ke liye hai ye */}
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
