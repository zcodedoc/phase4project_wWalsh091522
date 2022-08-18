import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import styled from "styled-components";

function NavBar({ user, setUser }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
          <div className="topbarContainer">
            <div className="topbarLeft">
              <Link to='/' className="link">
                <span className="logo" >fitnesstracker.</span>
              </Link>
            </div>
            <div className="topbarCenter">
              <Link style={{color: 'black', textDecoration: 'none', width: '100px', height: '40px', paddingTop: '15px', textAlign: 'center', border: '0px solid black', marginRight: '2.5px'}} to='/' className="link"><MenuItem>Home</MenuItem></Link>
              <Link style={{color: 'black',textDecoration: 'none', width: '100px', height: '40px', paddingTop: '15px', textAlign: 'center', border: '0px solid black', marginRight: '5px'}} to='/browse' className="link"><MenuItem>Browse</MenuItem></Link>
            </div>
            <Box className="newpostbox" as={Link} to="/newworkout">
              <Fab style={{color: 'white', backgroundColor: '#1877f2', boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 25%)', height: '90%', height: '80%', marginTop: '5px'}} variant="extended">
                <AddIcon sx={{ mr: 1 }} />
                  <Typography style={{fontSize: '14px'}}>
                    New Post
                  </Typography>
              </Fab>
            </Box>
            <div className="right" style={{display: 'flex',paddingRight: '20px'}}>
              <Link to='/profile' className="link">
                <img src={user.image} alt="" style={{border: '1px solid white', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 40%)',}} className="topbarImg"/>
              </Link>
              <KeyboardArrowDownIcon onClick={handleClick} className="icon" style={{marginLeft: '0%', height: '20px', width: '20px', color: 'black', marginLeft: '-50px',  marginTop: '12px',}} sx={{ mr: 1.5 }}/>
              <div className="profile">
                <div>
                  <Menu
                    style={{marginTop: '15px', padding: '0px'}}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                  }}>
                    <div className="topbarDropdown" style={{  marginTop: '0px', marginRight: '0px', marginLeft: '0px', padding: '0px', paddingLeft: '-5%', width: '140px', minHeight: '120px', border: '0px solid black'}} >
                      <Link style={{ color: 'black', textDecoration: 'none'}} to='/profile' className="link">
                        <div style={{ boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 0%)', padding: '4px',  height: '40px', marginTop: '5%', marginBottom: '5%', marginLeft: '5%', borderRadius: '0px',width: '85%'}}>
                          <img style={{borderRadius: '100px', minHeight: '35px', maxHeight: '35px', minWidth: '35px', maxWidth: '35px',  marginTop: '5px', marginLeft: '5px', border: '1px solid white', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 40%)'}} src={user?.image} alt=""/>
                          <Typography style={{marginLeft: '50px', marginTop: '-35px', paddingRight: '0px', fontSize: '16px', fontWeight: '300', textTransform: 'lowercase',  border: '0px solid black'}} >@{user.username}</Typography>
                        </div>
                      </Link>
                      <Divider/>
                        <div style={{boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 0%)', padding: '4px', height: '40px', marginTop: '5%', marginBottom: '5%', marginLeft: '5%', borderRadius: '0px',width: '85%', cursor: 'pointer', display: 'flex'}}>
                          <LogoutIcon style={{height: '35px', width: '35px', marginTop: '5px', marginBottom: '-10px', marginLeft: '5px',  border: '0px solid black'}}/>
                          <Typography onClick={handleLogoutClick} style={{marginLeft: '10px', height: '35px', marginTop: '10px', paddingRight: '0px', fontSize: '16px', fontWeight: '300',  border: '0px solid black'}}>Logout</Typography>
                        </div>
                    </div>
                  </Menu>
                </div>
              </div> 
            </div>
          </div>
        </div>
  );
}

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 5px;
  
`;


export default NavBar;
