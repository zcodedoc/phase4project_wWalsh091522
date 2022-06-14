import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import "./NavBar.css";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import styled from "styled-components";

function NavBar({ user, setUser }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
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
            <Link style={{color: 'black',
          textDecoration: 'none', width: '100px', height: '40px', paddingTop: '15px', textAlign: 'center', border: '0px solid black', marginRight: '2.5px'}} to='/' className="link"><MenuItem>Home</MenuItem></Link>
          <Link style={{color: 'black',
          textDecoration: 'none', width: '100px', height: '40px', paddingTop: '15px', textAlign: 'center', border: '0px solid black', marginRight: '5px'}} to='/tags' className="link"><MenuItem>Browse</MenuItem></Link>
         {/* <Link style={{color: 'black',
          textDecoration: 'none', width: '100px', height: '40px', paddingTop: '10px', textAlign: 'center', border: '0px solid black', marginRight: '5px'}} to='/browse' className="link"><MenuItem>Browse</MenuItem></Link>
         <Link style={{color: 'black',
          textDecoration: 'none', width: '100px', height: '40px', paddingTop: '10px', textAlign: 'center', border: '0px solid black', marginRight: '5px'}} to='/option1' className="link"><MenuItem>Option1</MenuItem></Link>
         <Link style={{color: 'black',
          textDecoration: 'none', width: '100px', height: '40px', paddingTop: '10px', textAlign: 'center', border: '0px solid black', marginRight: '5px'}} to='/option2' className="link"><MenuItem>Option2</MenuItem></Link>
         <Link style={{color: 'black',
          textDecoration: 'none', width: '100px', height: '40px', paddingTop: '10px', textAlign: 'center', border: '0px solid black', marginRight: '5px'}} to='/option3' className="link"><MenuItem>Option3</MenuItem></Link> */}
              {/* <div style={{border: '1px solid black'}}>
            <Link to='/tags' className="link">
                  <span className="topbarName" >tags</span>
                </Link>
                </div> */}
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
                  <img src={user.image} alt="" className="topbarImg"/>
                    <Typography className="topbarName" style={{marginLeft: '-50px', marginTop: '10px', paddingRight: '70px', fontSize: '14px', fontWeight: '300', textTransform: 'capitalize'}} >{user.name}</Typography>
                  <div className="profile">
                      <div>
                          <KeyboardArrowDownIcon onClick={handleClick2} className="icon" style={{marginLeft: '0%', height: '20px', width: '20px', color: 'black', marginLeft: '-50px',  marginTop: '12px',}} sx={{ mr: 0.5 }}/>
                              <Menu
                                  style={{marginTop: '15px', padding: '0px'}}
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open2}
                                  onClose={handleClose2}
                                  MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                  }}
                                >
                                    <div className="topbarDropdown" style={{  marginTop: '5px', marginRight: '10px', marginLeft: '0px', padding: '0px', paddingLeft: '-5%', width: '140px', height: '120px'}} >
                                        <Link style={{ color: 'black', textDecoration: 'none'}} to='/profile' className="link">
                                            <div style={{ boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 0%)', padding: '4px',  height: '40px', marginTop: '5%', marginBottom: '10%', marginLeft: '5%', borderRadius: '0px',width: '85%'}}>
                                                <img style={{borderRadius: '100px', maxHeight: '35px', minWidth: '35px', marginTop: '5px', marginLeft: '10px'}} src={user?.image} alt=""/>
                                                <Typography style={{marginLeft: '55px', marginTop: '-30px', paddingRight: '0px', fontSize: '16px', fontWeight: '300', textTransform: 'capitalize'}} >Profile</Typography>
                                            </div>
                                        </Link>
                                        <Divider/>
                                            <div style={{boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 0%)', padding: '4px', height: '40px', marginTop: '7.5%', marginBottom: '5%', marginLeft: '5%', borderRadius: '0px',width: '85%', cursor: 'pointer'}}>
                                                <LogoutIcon style={{height: '25px', width: '25px', marginTop: '5px', marginBottom: '-10px', marginLeft: '20px'}}/>
                                                <Typography onClick={handleLogoutClick} style={{marginLeft: '55px', marginTop: '-20px', paddingRight: '0px', fontSize: '16px', fontWeight: '300'}}>Logout</Typography>
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
