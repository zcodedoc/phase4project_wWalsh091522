import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { Button } from "../styles";
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import "./NavBar.css";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
  height: 650,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
};

function NavBar({ user, setUser }) {
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <MenuIcon style={{marginLeft: '35px', color: 'white'}} />
  <div className="topbarLeft">
   
    <Link to='/' className="link"><span className="logo" style={{marginLeft: '45px', fontWeight: '600', fontSize: '20px'}}>fitnesstracker.</span></Link>
     
    </div>
    <div className="topbarRight">
        <div className="topbarLinks">
         
        </div>
        </div>
        <div className="topbarIcons">
        
          
        </div>
       
        <div className="topbarCenter">
      
        
      </div>
      <Box  style={{ height: '90%', marginRight: '25%', textDecoration: 'none'}} sx={{ '& > :not(style)': { m: 1 } }} as={Link} to="/newworkout">
        <Fab style={{color: 'white', backgroundColor: '#1877f2', boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 25%)', height: '90%', height: '80%', marginTop: '5px'}} variant="extended">
        <AddIcon sx={{ mr: 1 }} />
        <Typography style={{fontSize: '14px'}}>
        New Post
        </Typography>
      </Fab>
        </Box>
        <div className="topbarIconItem">
         
        </div>
        <div className="topbarIconItem">
          
          </div>
        
       <div className="right" style={{display: 'flex',paddingRight: '20px'}}>
       <img style={{border: '0.1px solid white', marginLeft: '20px', marginRight: '60px', minWidth: '30px', minHeight: '30px'}} src={user.image} alt="" className="topbarImg"/>
       <Typography style={{marginLeft: '-50px', marginTop: '10px', paddingRight: '70px', fontSize: '14px', fontWeight: '300', textTransform: 'capitalize'}} >{user.name}</Typography>
       <div  className="profile">
         
       <div>
         
       <KeyboardArrowDownIcon onClick={handleClick2} className="icon" style={{marginLeft: '0%', height: '20px', width: '20px', color: 'black', marginLeft: '-50px',  marginTop: '12px',}} sx={{ mr: 0.5 }}/>
           
     
      <Menu
     
        id="basic-menu"
        anchorEl={anchorEl}
        open={open2}
        onClose={handleClose2}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div style={{  marginTop: '5px', marginRight: '10px', padding: '5px', paddingLeft: '-5%', width: '150px', height: '150px'}} >
           
            <Link style={{ color: 'black',
          textDecoration: 'none'}} to='/profile' className="link"><div style={{ boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)', padding: '4px',  height: '40px', marginTop: '5%', marginBottom: '5%', marginLeft: '5%', borderRadius: '0px',width: '85%'}}><img
          style={{borderRadius: '100px', maxHeight: '25px', minWidth: '25px', marginTop: '10px', marginLeft: '12px'}}
            src={user?.image}
            alt=""
          /><Typography style={{marginLeft: '50px', marginTop: '-30px', paddingRight: '0px', fontSize: '16px', fontWeight: '300', textTransform: 'capitalize'}} >Profile</Typography></div></Link>
            <Divider/>
              <div style={{ boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)', padding: '4px',  height: '40px', marginTop: '5%', marginBottom: '5%', marginLeft: '5%', borderRadius: '0px',width: '85%', cursor: 'pointer'}}><LogoutIcon style={{height: '30px', width: '30px', marginTop: '5px', marginBottom: '-10px', marginLeft: '15px'  }}/><Typography style={{marginLeft: '50px', marginTop: '-20px', paddingRight: '0px', fontSize: '16px', fontWeight: '300'}} onClick={handleLogoutClick}>Logout</Typography></div>
              </div>
      </Menu>
     
      
    </div>
       
          </div> 
        </div>
      
    </div>
    </div>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  height: 100%;
  width: 20%;
  // border: 1px solid black;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: black;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;
