import React, { forwardRef, useEffect, useState } from "react";
import "./Post.css";
import { Box, Button } from "../styles";
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar,} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Theme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
// import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useHistory } from "react-router";
import SendIcon from '@mui/icons-material/Send';
const style = {
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 205,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 3.5,
    borderRadius: '20px'
  };

  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 205,
    bgcolor: 'background.paper',
    border: '1px solid black',
    boxShadow: 24,
    p: 3.5,
    borderRadius: '20px'
  };

  // const icon = (
  //   <Paper sx={{ m: 1, minWidth: '500px' }} elevation={4}>
  //     <Box component="svg" sx={{ width: 100, height: 100 }}>
  //       {/* <Box
  //         component="polygon"
  //         sx={{
  //           fill: (theme: Theme) => theme.palette.common.white,
  //           stroke: (theme) => theme.palette.divider,
  //           strokeWidth: 1,
  //         }}
  //         points="0,100 50,00, 100,100"
  //       > */}
  //    <div style={{maxWidth: '10%', maxHeight: '20%', display: 'flex', padding: '10px'}}>
  //       <img style={{padding: '10px', maxHeight: '60px', width: '30px', borderRadius: '50px', border: '1px solid white', objectFit: 'cover'}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0014%2F4985%2F3001%2Fproducts%2FArnold_Uno.jpg%3Fv%3D1543692780&f=1&nofb=1"/>
  //      <input style={{minWidth: '400px', marginTop: '15px', maxHeight: '50px', paddingLeft: '30px', borderRadius: '10px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 40%)', border: '0px solid'}} placeholder="Thoughts?"></input>
  //      <Button style={{minWidth: '200px', marginTop: '15px', maxHeight: '50px', paddingLeft: '30px', borderRadius: '10px', boxShadow: '0 0.25em 1em 0.125em rgb(5 10 5 / 10%)', border: '0px solid'}} >Send</Button>
  //       </div>
  //       {/* </Box> */}
   
  //     </Box>
  //   </Paper>
  // );

function Post({workout, comments, currentUser,  onUpdateWorkout, onDeleteWorkout, handleUpdateWorkoutList }) {
    // console.log(currentUser)
    const { id, title, description, image, sets, reps, weight, likes, user_id} = workout;
    // const {id, title} = comment;
    const [formData, setFormData] = useState(workout);
    // const [formData2, setFormData2] = useState(comment);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checked, setChecked] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);
    const [postLikes, setPostLikes] = useState(workout.likes);
    // const [isCommentClicked, setIsCommentClicked] = useState(false);
    // const [postComments, setPostComments] = useState(comments.sum);
    const [opena, setOpena] = React.useState(false);
    const [openModal, setOpen] = React.useState(false);
    const [openComment, setOpenComment] = React.useState(false);
    const [comment, setComment] = useState();
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const handleModalClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const open2 = Boolean(anchorEl);
    const handleClick2 = (event) => {
      setAnchorEl(event.currentTarget);
    };
    function handleOpenModal() {
      setOpen(!openModal)
    }

    function handleLike() {
      setIsLiked(true)
    }
    const handleClose2 = () => {
      setAnchorEl(null);
    };

    const handleChecked = () => {
      setChecked((prev) => !prev);
    };

    const handleClickComment = () => {
      setOpenComment((prev) => !prev);
    };
  
    const handleClickAway = () => {
      setOpenComment(false);
    };

    const styles = {
      position: 'absolute',
      top: 28,
      right: 0,
      left: 0,
      zIndex: 1,
      border: '1px solid',
      p: 1,
      bgcolor: 'background.paper',
    };

    // var isLiked = false;
    // console.log(workout?.likes > 0 + "HITTING HERE");
    // if (workout?.likes > 0) {
    //   isLiked = true;
    // }
    // console.log(workout)    

    function handleUpdateWorkout() {
      // const newContent = "";
      console.log("HITTING UPDATE Function to patch request")
      // console.log(formData.target.value);
      console.log(formData);
  
      fetch(`/workouts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          onUpdateWorkout(workout);
          // onUpdateTweet(tweet);
        } else {
          res.json().then(console.log)
        }
      })
    }

    function handleSubmit(e) {
      console.log(currentUser);
      e.preventDefault();
      setIsLoading(true);
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
      fetch(`/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          workout_id: id,
          comment
          
        }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          history.push("/");
          setComment(comment);
          // setIsCommentClicked(true);
          // setPostComments(comment.all);
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }

    function handleUpdateWorkoutLikes(e) {
      // const newContent = "";
      console.log("HITTING UPDATE Function to patch request")
      // console.log(formData.target.value);
      console.log(formData);
      debugger;
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
      fetch(`/workouts/${id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          setIsLiked(true);
          setPostLikes((prev) => prev+1);
          onUpdateWorkout(workout);

          // onUpdateTweet(tweet);
        } else {
          res.json().then(console.log)
        }
      })
    }
    // function onUpdateWorkout() {
    //     // const newContent = "";
    //     // console.log("HITTING UPDATE")
    //     fetch(`/workouts/${id}`, {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     })
    //     .then((res) => {
    //       if (res.ok) {
    //         // console.log(res);
    //         handleUpdateWorkoutList(workout);
    //         // onUpdateTweet(tweet);
    //       } else {
    //         // res.json().then(console.log)
    //       }
    //     })
    //   }

      function handleChange(e) {
        console.log(e.target);
        let test = e.target;
        console.log(test.type);
        // if (test.type === "number") {
        //   console.log(parseInt(test.value))
        //   setFormData({
        //     ...formData,
        //     [e.target.id]: parseInt(test.value),
        //   });
          
        // }
        // else {
        //   setFormData({
        //     ...formData,
        //     [e.target.id]: e.target.value,
        //   });
        // }
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
        
        
        
        // console.log(formData);
        
      }

      function handleDeleteWorkout() {
        fetch(`/workouts/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
            console.log(res);
            onDeleteWorkout(workout);
            } else {
            res.json().then(console.log)
            }
        })
        }

    return (
        <div>
            <Box style={{display: 'flex', flexDirection: 'row', marginLeft: '20px'}}>
            <>
            <div style={{display: 'flex', marginLeft: '20%', marginTop: '10px', marginBottom: '20px'}}>
            <Grid sx={{ flexGrow: 1 }}  container spacing={1}> 
            <Grid item xs={4}>
                {/* <Paper
                sx={{
                  height: 750,
                  width: 700,
                  marginLeft: 10,
                  marginBottom: 10,
                  marginTop: 0,
                  
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >*/}
              <div style={{ boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 20%)', minWidth: '900px', marginLeft: '40%',
             }}>
                 <div style={{padding: '20px', maxHeight: '100px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)', display: 'flex'}}>
                   
                  <img 
                    style={{objectFit: 'cover', padding: '10px', border: '1px solid white',  marginLeft: '30px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px', borderRadius: '50px'}}
                    src={workout.user.image}
                />
                  <div style={{display: 'flex', flexDirection: 'column',}}>
                  <Typography style={{marginTop: '15px', fontSize: '16px', fontWeight: '350', textTransform: 'capitalize'}}>{workout.user.name}</Typography>
                  <Typography style={{marginTop: '0px', fontSize: '16px', fontWeight: '350'}}>@{workout.user.username}</Typography>
                  {/* <Typography style={{marginTop: '0px', fontSize: '12px', width: '100%', fontWeight: '350'}}>Blink Fitness Penn Station</Typography> */}
                  </div>
                <Button onClick={handleClick2} style={{height: '40px', marginLeft: '550px', marginTop: '10px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)',}}><MoreHorizIcon/></Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open2}
                  onClose={handleClose2}
                  // onUpdateWorkout={handleUpdateWorkout}
                  //     onDeleteWorkout={handleDeleteWorkout}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  >
           
           
                  <div style={{height: '50px', width: '120%'}}>
                    <ModeEditOutlineRoundedIcon style={{height: '25px', width: '25px', marginTop: '10px', marginLeft: '5px'  }}/>
                    <span style={{marginLeft: '10px', paddingRight: '30px'}} onClick={handleOpenModal}>Edit</span>
                    </div>
                  <div style={{height: '50px', width: '120%'}}>
                    <DeleteRoundedIcon style={{height: '25px', width: '25px', marginTop: '10px', marginLeft: '5px'  }}/>
                    <span style={{marginLeft: '10px', paddingRight: '30px'}} onClick={handleDeleteWorkout}>Delete</span>
                  </div>
            
                </Menu>
                           </div>
                           
                           <div style={{boxShadow: '0.0em 0.0em 0.1em 0.0em rgb(10 10 10 / 40%)',}}>
                 <img style={{objectFit: 'contain', minHeight: '300px', maxWidth: '100%'}}src={image}/>
                 <div style={{boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 20%)', display: 'flex', flexDirection: 'column', minWidth: '900px', marginLeft: '0%', marginTop: '-20%'}}>  <Typography style={{marginLeft: '100px', marginTop: '20px', fontSize: '24px', fontWeight: '300', padding: '10px', textTransform: 'capitalize', color: 'white'}}>{workout.title}</Typography><Typography style={{marginLeft: '110px', marginTop: '-10px', fontSize: '18px', fontWeight: '300', padding: '10px', color: 'white'}}>{workout.description}</Typography>
              <div style={{boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 10%)', display: 'flex',  marginLeft: '120px', paddingLeft: '0px',}}>
                <Fab variant="extended" style={{backgroundColor: 'white', color: 'black', border: '1px solid white', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
              <Typography style={{marginRight: '0px'}}>{workout.sets} sets</Typography>
              </Fab>
                {/* <Divider direction='vertical' style={{border: '0.1px solid black', marginLeft: '30px', marginTop: '5px', marginRight: '50px', height: '50px'}} />  */}
                <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                        <Typography style={{marginRight: '0px'}}>{workout.reps} reps</Typography>
                        </Fab> 
                        {/* <Divider direction='vertical' style={{border: '0.1px solid black', marginLeft: '50px', marginTop: '5px', marginRight: '30px', height: '50px'}}/>  */}
                    <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                        <Typography style={{marginRight: '0px'}}>{workout.weight}lbs</Typography>    </Fab>
                        </div>
                    </div>
                 </div>
                 
                 <div style={{border: '0px solid black', padding: '10px', marginTop: '0px'}}>
                   
                 <Fab onClick={handleUpdateWorkoutLikes} variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '100px'}}>
                 {isLiked ? ( <FavoriteIcon style={{color: 'red'}} />) : (
                 <FavoriteBorderIcon/>)}<Typography style={{marginRight: '0px', marginLeft: '5px', fontSize: '18px'}}>{postLikes}</Typography>
                        </Fab> 
                        <ClickAwayListener >
                        <Fab onClick={handleClickComment} type="button" variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '100px'}}>
                         {/* <ModeCommentIcon style={{color: 'black'}}/> */}
                        <ModeCommentOutlinedIcon/> <Typography style={{marginRight: '0px', marginLeft: '5px', fontSize: '18px'}}></Typography> 
                        </Fab> 
                        
                        </ClickAwayListener>
                        {openComment ? (
                          <Box>
                            <Typography style={{fontSize: '20px', marginLeft: '20%', marginBottom: '30px'}}>Comments</Typography>
                            {/* <Box sx={style1}> */}
                              {comments.length > 0 ? (
        comments.map((comment) => (
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: '20%', maxWidth: '60%', maxHeight: '80px', borderRadius: '10px', marginBottom: '10px', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 20%)'}}>
                 <img 
                     style={{objectFit: 'cover', padding: '10px', border: '1px solid white',  marginLeft: '30px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px', borderRadius: '50px', marginLeft: '10%'}}
                     src={comment.user.image}
                 />
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Typography style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 0%)', padding: '0px', border: '0px solid black', minWidth: '200px', height: '20px', marginTop: '25px', borderRadius: '8px', fontSize: '14px', paddingLeft: '5px', marginLeft: '2.5%', marginRight: '10%', marginBottom: '-5px'}} >@{comment.user.username}</Typography>
                       <Typography style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 0%)', padding: '10px', border: '0px solid black', minWidth: '200px', height: '20px', marginTop: '0px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '2.5%', marginRight: '10%', marginBottom: '20px'}} >{comment.comment}</Typography>
  
                           </div>
                           </div>
        ))
        ) : (null  )}
         {/* </Box> */}
          <Box sx={styles}>
                           <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                <img 
                    style={{objectFit: 'cover', padding: '10px', border: '1px solid white',  marginLeft: '30px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px', borderRadius: '50px', marginLeft: '20%'}}
                    src={currentUser.image}
                />
               <div style={{display: 'flex', flexDirection: 'row'}}>
                      
                          <input
                          style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', minWidth: '100%', height: '50px', marginTop: '10px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '10%', marginRight: '10%', marginBottom: '20px'}} 
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          //   value={comment.title}
                          // onChange={handleChange}
                          />
                       <Button onClick={handleSubmit} style={{marginLeft: '0px', color: 'black', border: '0px solid black', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', minWidth: '100px', maxHeight: '50px', marginTop: '10px' }}>
         <SendIcon  style={{marginRight: '-10px', height: '25px', width: '25px'}} className="searchIcon"/>
         </Button>
                          {/* <Button onClick={handleSubmit}>submit</Button> */}
                          </div>
                          </div>
           
          </Box>
          </Box>
        ) : null}
                        {/* <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        <button type="button" onClick={handleClickComment}>
          Open menu dropdown
        </button>
        {openComment ? (
          <Box sx={styles}>
            Click me, I will stay visible until you click outside.
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener> */}
                  
      {/* <FormControlLabel
        control={<Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '100px'}}>
<ModeCommentOutlinedIcon checked={checked} onClick={handleChecked}/><Typography style={{marginRight: '0px', marginLeft: '5px', fontSize: '18px'}}>{workout.sets}</Typography>
        </Fab>}
        label="Show"
      />
   
   
 
      <Box
        sx={{
          '& > :not(style)': {
            display: 'flex',
            justifyContent: 'space-around',
            height: 120,
            width: 250,
          },
        }}
      >

        <div style={{border: '0.0px solid red'}}>
          
          <Collapse in={checked}>
       
            {icon}
    

            </Collapse>
         
        </div>
        <div>
         
        </div>
      </Box> */}
    {/* </Box> */}
                 </div>
                           
                 </div>
          
              <div >
              <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openModal}
                    onClose={handleModalClose}
                    closeAfterTransition
                    // BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    
                 >
                   <Fade in={openModal}>
                    <Box sx={style} style={{opacity: '100%', backgroundColor: 'white', height: '90%', width: '70%', marginLeft: '15%', marginTop: '2.5%', borderRadius: '20px', backgroundColor: 'white', border: '0px solid black'}}>
                    
                      {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '60px', }}>
                      <h3 style={{marginLeft: '20px', border: '0px solid black', color: 'transparent'}} >Edit Post</h3>
                        <Button onClick={handleModalClose} 
                        sx={{ 
                          width: '5%', 
                          marginTop: '0%', 
                          marginLeft: '0%', 
                          mr: 1, 
                          backgroundColor:'#ffffff', 
                          color: '#black',
                          
                        }} 
                        style={{border: '0px solid red'}}
                        // variant="extended"
                        > */}
                          
                          {/* <CloseIcon sx={{ mr: 1, marginLeft: '10px', border: '0px solid red' }} />
                                
                        </Button>
                        </div> */}
                        <div style={{display: 'flex', marginTop: '0px', height: '100%', border: '0px solid black'}}>
                        <div style={{maxWidth: '50%', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 0%)',}}>
                        <div style={{padding: '10px',  maxHeight: '100px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)', display: 'flex'}}>
                   
                   <img 
                     style={{objectFit: 'cover', padding: '10px', border: '1px solid white',  marginLeft: '30px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px', borderRadius: '50px'}}
                     src={currentUser.image}
                 />
                   <div style={{display: 'flex', flexDirection: 'column',}}>
                   <Typography style={{marginTop: '15px', fontSize: '16px', fontWeight: '350', textTransform: 'capitalize'}}>{workout.user.name}</Typography>
                   <Typography style={{marginTop: '0px', fontSize: '16px', fontWeight: '350'}}>@{workout.user.username}</Typography>
                   {/* <Typography style={{marginTop: '0px', fontSize: '12px', width: '100%', fontWeight: '350'}}>Blink Fitness Penn Station</Typography> */}
                   </div>
                   </div>
                        <div style={{boxShadow: '0.0em 0.0em 0.1em 0.0em rgb(10 10 10 / 40%)',}}>
                 <img style={{objectFit: 'cover', maxHeight: '400px', maxWidth: '100%'}}src={image}/>
                 </div>
                        <div style={{boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 20%)', minHeight: '400px', display: 'flex', flexDirection: 'column'}}>  
                        <Typography style={{marginLeft: '50px', marginTop: '20px', fontSize: '24px', fontWeight: '300', padding: '10px', textTransform: 'capitalize'}}>{workout.title}</Typography>
                        <Typography style={{marginLeft: '50px', marginTop: '-10px', fontSize: '18px', fontWeight: '300', padding: '10px'}}>{workout.description}</Typography>
              <div style={{boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)', marginTop: '20px', display: 'flex',  marginLeft: '50px', paddingLeft: '0px',}}>
                <Fab variant="extended" style={{backgroundColor: 'white', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
              <Typography style={{marginRight: '0px'}}>{workout.sets} sets</Typography>
              </Fab>
                {/* <Divider direction='vertical' style={{border: '0.1px solid black', marginLeft: '30px', marginTop: '5px', marginRight: '50px', height: '50px'}} />  */}
                <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                        <Typography style={{marginRight: '0px'}}>{workout.reps} reps</Typography>
                        </Fab> 
                        {/* <Divider direction='vertical' style={{border: '0.1px solid black', marginLeft: '50px', marginTop: '5px', marginRight: '30px', height: '50px'}}/>  */}
                    <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                        <Typography style={{marginRight: '0px'}}>{workout.weight}lbs</Typography>    </Fab>
                        </div>
                    </div>
                        </div>
                        <div style={{border: '0px solid red', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 5%)',  minWidth: '50%',}}>
                          <div style={{maxHeight: '90px', border: '0px solid red', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 10%)', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        {/* <h3 style={{marginLeft: '20px', height: '40px', padding: '10px', border: '0px solid black', width: '300px', textAlign: 'left', }} >Edit Post</h3> */}
                        <Typography style={{marginLeft: '20px', height: '40px', fontSize: '18px', fontWeight: '300', padding: '30px', border: '0px solid black', width: '300px', textAlign: 'left', }}  >Edit Post</Typography>
                        <Button onClick={handleModalClose} 
                        sx={{ 
                          width: '5%', 
                          marginTop: '0%', 
                          marginLeft: '0%', 
                          mr: 1, 
                          backgroundColor:'#ffffff', 
                          color: '#black',
                          
                        }} 
                        style={{height: '40px', marginLeft: '100px', marginTop: '15px', border: '0px solid red'}}
                        // variant="extended"
                        > 
                          
                         <CloseIcon sx={{ mr: 1, marginLeft: '10px', border: '0px solid red' }} />
                                
                        </Button>
                        </div>
                        <div >
                        <form onSubmit={handleUpdateWorkout}>
                        <div style={{display: 'flex', flexDirection: 'column', marginTop: '50px'}} className="tweetBox__input">
                          {/* <Avatar
                          style={{border: '1px solid red'}}
                          src={currentUser?.image} /> */}
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                          <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}} >Title</Typography>
                          <input
                          style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="text"
                            id="title"
                            // name="content"
                            placeholder={formData.title}
                            value={formData.title}
                          onChange={handleChange}
                          />
                          </div>
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}}>Description</Typography>
                          <input
                                     style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="text"
                            id="description"
                            // name="content"
                            placeholder={formData.description}
                            value={formData.description}
                          onChange={handleChange}
                          />
                           </div>
                           <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}}>Image</Typography>
                             <input
               style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="text"
                            id="image"
                            // name="content"
                            placeholder={formData.image}
                            value={formData.image}
                          onChange={handleChange}
                          />
                           </div>
                           <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}} >Sets</Typography>
                              <input
  style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="number"
                            id="sets"
                            // name="content"
                            placeholder={formData.sets}
                            value={formData.sets}
                          onChange={handleChange}
                          />
                           </div>
                           <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}} >Reps</Typography>
                              <input
                           style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="number"
                            id="reps"
                            // name="content"
                            placeholder={formData.reps}
                            value={formData.reps}
                          onChange={handleChange}
                          />
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}}  >Weight</Typography>
                              <input
                           style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '40px'}} 
                            type="number"
                            id="weight"
                            // name="content"
                            placeholder={formData.weight}
                            value={formData.weight}
                          onChange={handleChange}
                          />
                             </div>
                          <Button
                          style={{boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)',  width: '30%', marginLeft: '62.5%'}} 
                          onClick={handleUpdateWorkoutList }
                            type="submit"
                            className="tweetBox__tweetButton"
                          >
                            Save
                          </Button>
                        </div>                          
                        </form>
                        </div>
                        </div>
                      </div>
                 
                    </Box>
                   </Fade>
                </Modal>
                </div>
              {/* </Paper> */}
            </Grid>  
            </Grid> 
            </div>
           
                     
                   {/* <h2>a</h2>
                   <h2>a</h2>
                          </div> */}
                         </>
                    </Box>
            {/* {workout.title} */}
        </div>
    );
}

export default Post;