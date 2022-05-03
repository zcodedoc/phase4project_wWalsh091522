// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { Box, Button } from "../styles";
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import Fab from '@mui/material/Fab';
// import Modal from '@mui/material/Modal';
// import Backdrop from '@mui/material/Backdrop';
// import Fade from '@mui/material/Fade';

// const style = {
//   position: 'relative',
//   top: 80,
//   marginTop: 300,
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   maxWidth: '500px',
//   minHeight: '300px',
//   backgroundColor: 'white',
//   border: '2px solid #fff',
//   borderRadius: '10px',
//   boxShadow: 24,
//   padding: '12px',
// };


// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

// function WorkoutList({ workout, onUpdateWorkout, onDeleteWorkout, currentUser }) {
//   const { id, title, description, image, sets, reps, weight, user_id} = workout;
//   const [recipes, setRecipes] = useState([]);
//   const [formData, setFormData] = useState(workout);
//   const [workouts, setWorkouts] = useState([]);
//   const [user, setuser] = useState([]);
//   const [users, setUsers] = useState(['']);
//   const [open, setOpen] = React.useState(true);
//   const [open2, setOpen2] = React.useState(true);
//   const [value, setValue] = React.useState('1');
//   const handleOpen2 = () => setOpen2(true);
//   const handleClose2 = () => setOpen2(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   var myWorkout = false;
//   console.log(currentUser?.id + "HITTING HERE");
//   if (currentUser?.id === user?.id) {
//     myWorkout = true;
//   }

//   const handleChange2 = (event, newValue) => {
//     setValue(newValue);
//   };

//   const Wrapper = styled.section`
//   width: 100%;
//   margin: 10px auto;
//   box-shadow: 0 0.055em 0.225em rgb(20 20 20 / 15%);
// `;

// function handleUpdateWorkout() {
//   // const newContent = "";
//   console.log("HITTING UPDATE")
//   fetch(`/workouts/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   })
//   .then((res) => {
//     if (res.ok) {
//       console.log(res);
//       onUpdateWorkout(workout);
//     } else {
//       res.json().then(console.log)
//     }
//   })
// }

// function handleDeleteWorkout() {
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
 
// useEffect(() => {
//   fetch("/users")
//   .then((r) => r.json())
//   .then(setUsers);
// }, []);


//  useEffect(() => {
//     fetch("/workouts")
//       .then((r) => r.json())
//       .then(setWorkouts);
//       fetch("/me")
//       .then((r) => r.json())
//       .then(setuser);

//   }, []);

// return (
//     <div style={{width: '100%'}}>
 
//     <h2 style={{marginLeft: '10%', paddingTop: '0px', paddingBottom: '20px', paddingLeft: '20px'}}>Home</h2>

//     <div>

//     </div>

    
//     <Wrapper>
      
//     <div>
              
//     </div>
//       {workouts.length > 0 ? (
//         workouts.map((workout) => (


//             <Box>
//             <div style={{display: 'flex', flexDirection: 'column'}}>
//             <div style={{width: '60%', marginLeft: '20%', padding: '5px', display: 'flex',  boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 25%)'}}>
//                 <div style={{minHeight: '100%', minWidth: '10%', marginTop: '10px'}}>
//               <img style={{border: '1.5px solid white', height: '60px', width: '60px', borderRadius: '100px', objectFit: 'cover', boxShadow:  '0 0.055em 0.225em rgb(20 20 20 / 15%)', marginLeft: '10px', marginTop: '0px'}} src={workout.user.image}></img>
//               </div>
//               <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
//               <p style={{marginLeft: '25px', width: '300px', marginTop: '12px', fontSize: '18px'}}>{user.name}</p>
//           <p style={{marginLeft: '25px', marginTop: '-15px', fontSize: '12px', color: 'grey'}}>@{user.username}</p>
//           <img style={{width: '70%', marginLeft: '5%', height: '400px', objectFit: 'cover', padding: '0px', borderRadius: '0px'}} src={workout.image}/>
//           <div >
         
    
//          <Stack style={{width: '500px', height: '50px', marginLeft: '5%', paddingLeft: '2.5%', marginTop: '0px', boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 40%)', backgroundColor: 'white', borderRadius: '0px 0px 0px 0px'}} direction="row" spacing={2}>
//          <Fab variant="extended" style={{width: '500px', marginLeft: '20px', marginTop: '10px', maxHeight: '35px',  backgroundColor: 'black', opacity: '85%',  boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 25%)', backgroundColor: 'transparent', color: 'black',}} aria-label="like">
//            <Typography style={{marginLeft: '4px', fontSize: '14px'}}>1</Typography>
//          </Fab>
//          {myWorkout ? (
//         <Button onClick={handleDeleteWorkout}>delete</Button>
      
//       ) : null}
//                       <div>
//     {/* <Box sx={{ width: '100%', typography: 'body1' }}>
//       <div value={value}>
//        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
//           {/* <List onChange={handleChange2} aria-label="lab API tabs example"> */}
//             {/* <Tab label="Item One" value="1" />
//             <Tab label="Item Two" value="2" />
//             <Tab label="Item Three" value="3" /> */}
//           {/* </List> */}
//         {/* </Box> 
//      <Stack value="1"><RecipeList/></Stack>
//         <Stack value="2"></Stack>  */}
//        {/* <TabPanel value="2">Item Two</TabPanel>
//         <TabPanel value="3">Item Three</TabPanel>  */}
//       {/* </div>
//     </Box> */}
//       {/* <Button onClick={handleOpen}>Open modal</Button> */}
//       {/* <Button onClick={handleOpen}>Open modal</Button>
//       <Button onClick={handleOpen2}>Open modal2</Button> */}
//       <Button onClick={handleOpen}>Open modal</Button>
//      <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={{backroundColor: 'white', height: '200px'}} style={style}> 
      
//           {/* <SignUpForm2/>  */}
       
//      </Box>
//         </Fade>
//       </Modal>
    
//     </div>
//          </Stack>
//          <Stack style={{width: '500px', height: '400px', marginLeft: '5%', marginTop: '0px', border: '1px solid white', boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 15%)', backgroundColor: 'white', opacity: '90%', borderRadius: '0px', padding: '0px', textAlign: 'center', marginBottom: '0px'}} direction="column" spacing={2}>
//             <Typography style={{textAlign: 'left', color: 'black', marginLeft: '5%', opacity: '100%',  fontSize: '18px', fontWeight: '400', padding: '10px',}}>{workout.title}</Typography>
//             <Typography style={{textAlign: 'left', maxWidth: '100%', marginLeft: '5%', color: 'black', fontSize: '10px', fontWeight: '250', marginTop: '-15px', padding: '10px',}}>{workout.description}</Typography>
         
//             </Stack>
//        </div>
//           </div>
        
//           <div style={{marginLeft: '60%', display: 'flex', flexDirection: 'row', width: '100px', marginTop: '10px'}}>
        
//                 </div>
          
         

           
            
//                 </div>
//                 </div>

//             </Box>
            
   
//         ))
//       ) : (
//         <>
//         <div style={{height: '400px', width: '100%', padding: '10%'}}>
//           <h2 style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>No Workouts Logged</h2>
//           <Button as={Link} to="/newworkout">
//             Make a New Post
//           </Button>
//           </div>
//         </>
//       )}
//     </Wrapper>
//     </div>
//   );
// }


// export default WorkoutList;
