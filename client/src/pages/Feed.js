import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
// import Sidebar from "../components/Sidebar";
// import Sidebar2 from "../components/Sidebar2";
// import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
// import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Post from "../components/Post";

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


function Feed({user, setUser}) {
  const [workouts, setWorkouts] = useState([]);
  const [comments, setComments] = useState([]);
  const [spacing, setSpacing] = React.useState(2);
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

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  function handleUpdateWorkoutList(updatedWorkout) {
    const updatedWorkoutsArray = workouts?.map((workout) => {
      return workout.id === updatedWorkout.id ? updatedWorkout : workout;
    });
    setWorkouts(updatedWorkoutsArray);
  }

  function handleDeleteWorkout(deletedWorkout) {
    // console.log("HITTING")
    // return;
    setWorkouts((workouts) =>
      workouts.filter((workout) => workout.id !== deletedWorkout.id)
    );
  }

//   function handleDeleteWorkout() {
//   fetch(`/workouts/${id}`, {
//     method: "DELETE",
//   }).then((res) => {
//     if (res.ok) {
//       console.log(res);
//       onDeleteWorkout(workout);
//     } else {
//       res.json().then(console.log)
//     }
//   })
// }
 
  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

//   const jsx = `
// <Grid container spacing={${spacing}}>
// `;
  // const [user, setUser] = useState([]);

  const breadcrumbs = [
    <Link style={{textDecoration: 'none', color: 'black'}} underline="hover" key="1" color="white" href="/" onClick={handleClick}>
      Feed
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
      fetch("/comments")
      .then((r) => r.json())
      .then(setComments);
      fetch("/me")
      .then((r) => r.json())
      .then(setUser);

  }, []);

  return (
    <div style={{width: '80%', display: 'flex'}}>
  
    <div style={{minWidth: '10%', marginTop: '0%'}}>
  
    </div>


    <Wrapper>
      
    <div style={{width: '100%', marginTop: '5%'}}>
    <h2 style={{marginLeft: '35%', width: '50%',  paddingLeft: '0px', }}>Feed</h2>
    
    <Divider style={{width: '75%', marginLeft: '5%', border: '0px', marginTop: '15px', marginBottom: '15px'}} />
              </div>
          {/* <div style={{width: '300px', marginTop: '-20px', marginBottom: '20px', marginLeft: '160px', height: '100%',  boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 10%)', padding: '10px', paddingLeft: '5px', borderRadius: '10px'}}><Typography style={{fontSize: '12px', marginLeft: '10px', fontWeight: '300'}}>{user.bio}</Typography></div>
         
         
                {/* </div> */}
  
                {/* </div> */}
                
    
                {workouts.length > 0 ? (
                  workouts.map((workout) => (
                    <Post 
                    key={workout?.id}
                    workout={workout}
                    handleUpdateWorkoutList={handleUpdateWorkoutList}
                    onDeleteWorkout={handleDeleteWorkout}
                    username={user?.username}
                    userimage={user?.image}
                    currentUser={user}
                    comments={comments}
                    />
          
          
                    //   <Box style={{display: 'flex', flexDirection: 'row', marginLeft: '20px'}}>
  //                   <>
  //                    <div style={{display: 'flex', marginLeft: '20%', marginTop: '100px', marginBottom: '20px'}}>
  //                          <Grid sx={{ flexGrow: 1 }}  container spacing={1}> 
  //             <Grid item xs={4}>
  //             <Paper
  //               sx={{
  //                 height: 750,
  //                 width: 700,
  //                 marginLeft: 10,
  //                 marginBottom: 10,
  //                 marginTop: 0,
                  
  //                 backgroundColor: (theme) =>
  //                   theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //               }}
  //             ><div style={{ boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 20%)',
  //            }}>
  //                <div style={{padding: '10px', maxHeight: '100px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 20%)', display: 'flex'}}>
                   
  //                 <img style={{objectFit: 'cover', padding: '10px', border: '1px solid white',  marginLeft: '30px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px', borderRadius: '50px'}}src={user.image}/>
  //                 <div style={{display: 'flex', flexDirection: 'column',}}>
  //                 <Typography style={{marginTop: '15px', fontSize: '16px', fontWeight: '350', textTransform: 'capitalize'}}>{user.name}</Typography>
  //                 <Typography style={{marginTop: '0px', fontSize: '16px', fontWeight: '350'}}>@{user.username}</Typography>
  //                 {/* <Typography style={{marginTop: '0px', fontSize: '12px', width: '100%', fontWeight: '350'}}>Blink Fitness Penn Station</Typography> */}
  //                 </div>
  //               <Button onClick={handleClick2} style={{height: '40px', marginLeft: '450px', marginTop: '10px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)',}}><MoreHorizIcon/></Button>
  //               <Menu
  //                 id="basic-menu"
  //                 anchorEl={anchorEl}
  //                 open={open2}
  //                 onClose={handleClose2}
  //                 // onUpdateWorkout={handleUpdateWorkout}
  //                 //     onDeleteWorkout={handleDeleteWorkout}
  //                 MenuListProps={{
  //                   'aria-labelledby': 'basic-button',
  //                 }}
  //                 >
           
           
  //                 <div style={{height: '50px', width: '120%'}}>
  //                   <ModeEditOutlineRoundedIcon style={{height: '25px', width: '25px', marginTop: '10px', marginLeft: '5px'  }}/>
  //                   <span style={{marginLeft: '10px', paddingRight: '30px'}} onClick={handleUpdateWorkout}>Edit</span>
  //                   </div>
  //                 <div style={{height: '50px', width: '120%'}}>
  //                   <DeleteRoundedIcon style={{height: '25px', width: '25px', marginTop: '10px', marginLeft: '5px'  }}/>
  //                   <span style={{marginLeft: '10px', paddingRight: '30px'}} onClick={handleDeleteWorkout}>Delete</span>
  //                 </div>
            
  //               </Menu>
  //                          </div>
  //                          <div style={{boxShadow: '0.0em 0.0em 0.1em 0.0em rgb(10 10 10 / 40%)',}}>
  //                <img style={{objectFit: 'contain', minHeight: '300px', maxWidth: '100%'}}src={workout.image}/></div></div>
                           
  //             <div style={{boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 20%)', display: 'flex', flexDirection: 'column'}}>  <Typography style={{marginLeft: '100px', marginTop: '20px', fontSize: '24px', fontWeight: '300', padding: '10px', textTransform: 'capitalize'}}>{workout.title}</Typography><Typography style={{marginLeft: '110px', marginTop: '-10px', fontSize: '18px', fontWeight: '300', padding: '10px'}}>{workout.description}</Typography>
  //             <div style={{boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 10%)', display: 'flex',  marginLeft: '120px', paddingLeft: '0px',}}>
  //               <Fab variant="extended" style={{backgroundColor: 'white', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
  //             <Typography style={{marginRight: '0px'}}>{workout.sets} sets</Typography>
  //             </Fab>
  //  {/* <Divider direction='vertical' style={{border: '0.1px solid black', marginLeft: '30px', marginTop: '5px', marginRight: '50px', height: '50px'}} />  */}
  //          <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
  //                 <Typography style={{marginRight: '0px'}}>{workout.reps} reps</Typography>
  //                 </Fab> 
  //                {/* <Divider direction='vertical' style={{border: '0.1px solid black', marginLeft: '50px', marginTop: '5px', marginRight: '30px', height: '50px'}}/>  */}
  //             <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
  //                 <Typography style={{marginRight: '0px'}}>{workout.weight}lbs</Typography>    </Fab>
  //                 </div>
  //             </div>
          

             
  //                 </Paper>
  //           </Grid>  </Grid> </div>
           
                     
  //                  {/* <h2>a</h2>
  //                  <h2>a</h2>
  //                         </div> */}
  //                        </>
  //                   //   </Box>
             
                  ))
                ) : (
                  <>
                  <div style={{height: '400px', width: '100%', padding: '10%'}}>
                    <h2 style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>No Workouts Logged</h2>
                    <Button as={Link} to="/newworkout">
                      Make a New Post
                    </Button>
                    </div>
                  </>
                )}
    </Wrapper>
    
    </div>
  );
}

const Wrapper = styled.section`
  min-width: 1500px;
  margin-top: 5%;
  margin-left: -27.5%;
  background-color: white;
  // margin: 10px auto;
  box-shadow: 0 0.055em 0.225em rgb(20 20 20 / 15%);
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default Feed;