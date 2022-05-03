import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { Box, Button } from "../styles";
// import Sidebar from "../components/Sidebar";
// import Sidebar2 from "../components/Sidebar2";
// import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import Fab from '@mui/material/Fab';
// import HomeIcon from '@mui/icons-material/Home';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import Paper from '@mui/material/Paper';
// import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
// import ModeCommentIcon from '@mui/icons-material/ModeComment';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import Container from '@mui/material/Container';
// import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
// import RestaurantIcon from '@mui/icons-material/Restaurant';
import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function Profile({user, setUser}) {
  const [workouts, setWorkouts] = useState([]);
  // const [user, setUser] = useState([]);

  const breadcrumbs = [
    <Link style={{textDecoration: 'none', color: 'black'}} underline="hover" key="1" color="white" href="/" onClick={handleClick}>
      Home
    </Link>,
    <Link
    style={{textDecoration: 'none', color: 'black'}} 
      underline="hover"
      key="2"
      color="inherit"
      href="/getting-started/installation/"
      onClick={handleClick}
    >
    
    </Link>

  ];



  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
      fetch("/me")
      .then((r) => r.json())
      .then(setUser);

  }, []);

  return (
    <div style={{width: '90%',  display: 'flex'}}>
  
    <div style={{minWidth: '10%', marginTop: '-10%'}}>

    </div>
    
    <div style={{width: '100%', marginTop: '-5%'}}>
  
    <Divider style={{width: '75%', marginLeft: '5%', border: '0px', marginTop: '15px', marginBottom: '15px'}} />
              </div>

    <Wrapper>
      
     {/* <Typography>Your Profile</Typography> */}
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginLeft: '0px', paddingTop: '5px',}}>
            <div style={{width: '100%', height: '25%', display: 'flex', flexDirection: 'row'}}>
   <img style={{objectFit: 'cover', padding: '10px', marginBottom: '-30px', marginTop: '50px', height: '200px', width: '100%', marginLeft: '0%'}} src={user.header}/>

                </div>
            <div style={{ width: '100%', marginLeft: '0%', marginTop: '2%', padding: '0px', display: 'flex',  boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 15%)'}}>
                <div style={{minHeight: '100%', marginTop: '-5%', marginLeft: '10%', minWidth: '40%'}}>
                  
              <img style={{marginLeft: '35%', padding: '0px', maxHeight: '100px', border: '2.5px solid white', minWidth: '100px', objectFit: 'cover', borderRadius: '100px'}} src={user.image}></img>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: '-300px', marginTop: '0px'}}>
              <p style={{ width: '500px', marginLeft: '150px', marginTop: '10px', fontSize: '24px', textTransform: 'capitalize' }}>{user.name}</p>
          <p style={{marginLeft: '150px', marginTop: '-15px', fontSize: '16px'}}>@{user.username}</p>
       
          <div style={{width: '300px', marginTop: '-20px', marginBottom: '20px', marginLeft: '160px', height: '100%',  padding: '10px', paddingLeft: '0px', borderRadius: '10px'}}><Typography style={{fontSize: '14px', marginLeft: '0px', fontWeight: '300'}}>Bio <br/>{user.bio}</Typography></div>
          </div>
         
                </div>
  
                </div>
              
    </Wrapper>
    </div>
  );
}

const Wrapper = styled.section`
  min-width: 80%;
  margin-right: 0%;
  // margin: 10px auto;
  box-shadow: 0 0.055em 0.225em rgb(20 20 20 / 15%);
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default Profile;