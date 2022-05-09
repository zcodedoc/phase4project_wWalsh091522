import React, { useState } from "react";
import "./Post.css";
import { Box, Button } from "../styles";
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
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


function Post({workout, comments, currentUser,  onUpdateWorkout, onDeleteWorkout, handleUpdateWorkoutList, getNewComments }) {
  console.log(comments);
    const { id, title, description, image, sets, reps, weight, likes, user_id} = workout;

    const [formData, setFormData] = useState(workout);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checked, setChecked] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);
    const [postLikes, setPostLikes] = useState(workout.likes);
    const [isCommentedOn, setIsCommentedOn] = React.useState(false);
    const [postComments, setPostComments] = useState(workout.comments.length);
    const [openModal, setOpen] = React.useState(false);
    const [openComment, setOpenComment] = React.useState(false);
    const [comment, setComment] = useState();
    const [errors, setErrors] = useState([]);
    const [localComments, setLocalComments] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const handleModalClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const open2 = Boolean(anchorEl);
    var myWorkout = false;
      if (currentUser?.id === workout.user?.id) {
        myWorkout = true;
      }

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
 

    function handleUpdateWorkout() {
      console.log("HITTING UPDATE Function to patch request")
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
          // onUpdateWorkout(workout);
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
        
        console.log(r.json())
        setIsLoading(false);
        if (r.ok) {
          getNewComments();
          setComment("");
          setIsCommentedOn(true);
          setPostComments((prev) => prev+1);
          let newComment = {
            comment,
            user_id: currentUser.id,
            workout_id: id,
          }
          localComments.push(newComment)
          console.log("HITTING THIS SECTION COMMS")
          console.log(comments)
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
    async function breakoutLikes() {
      setPostLikes((prev) => prev+1);
      console.log(postLikes)
      return true;
    }
    function handleUpdateWorkoutLikes(e) {
     

     
      if (isLiked) {
       
        
        
        setFormData({
          ...formData,
          likes: postLikes
         
        });
       
        setPostLikes((prev) => prev-1);
        
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
         
        } else {
          res.json().then(console.log)
        }
      })
      setIsLiked(false);
      
      }
      else {
        let newlikes = postLikes + 1
        
        console.log("HITTING HERE NOW")
       
        breakoutLikes();
        
       
        console.log(postLikes + 1)
        setIsLiked(true);
         
          fetch(`/workouts/${id}/like`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({likes: postLikes + 1}),
          })
          .then((res) => {
            if (res.ok) {
              console.log(res);
              
            } else {
              res.json().then(console.log)
            }
          })
       
        
        
        
        
      

        
        
      }


      
      console.log(postLikes)
      
    }



      function handleChange(e) {
        console.log("HITTING THIS CHANGE FUNCTION")
        console.log(e.target);
        let test = e.target;
        console.log(test.type);
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
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
        console.log(localComments)
    return (
        <div>
            <Box style={{display: 'flex', flexDirection: 'row', marginLeft: '10%'}}>
              <>
                <div style={{display: 'flex', marginLeft: '20%', marginTop: '10px', marginBottom: '20px'}}>
                  <Grid sx={{ flexGrow: 1 }}  container spacing={1}> 
                    <Grid item xs={4}>
        
                        <div style={{ boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 20%)', minWidth: '900px', marginLeft: '15%',}}>
                          <div style={{padding: '20px', maxHeight: '100px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)', display: 'flex'}}>
                    
                            <img 
                                style={{objectFit: 'cover', padding: '10px', border: '1px solid white',  marginLeft: '30px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px', borderRadius: '50px'}}
                                src={workout.user.image}
                            />
                            <div style={{display: 'flex', flexDirection: 'column',}}>
                              <Typography style={{marginTop: '15px', fontSize: '16px', fontWeight: '350', textTransform: 'capitalize'}}>{workout.user.name}</Typography>
                              <Typography style={{marginTop: '0px', fontSize: '16px', fontWeight: '350'}}>@{workout.user.username}</Typography>
      
                            </div>
                            {myWorkout ? (
                               <>
                          <Button onClick={handleClick2} style={{height: '40px', marginLeft: '550px', marginTop: '10px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)',}}><MoreHorizIcon/></Button>
           
                            <Menu
                            style={{marginTop: '5px', marginRight: '30px'}}
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open2}
                                onClose={handleClose2}
                                MenuListProps={{
                                  'aria-labelledby': 'basic-button',
                                }}
                                >
                               <div style={{  marginTop: '0px', marginRight: '0px', marginLeft: '-5px', padding: '0%', paddingLeft: '0%', width: '150px', height: '110px', border: '0px solid red'}} >
                                <div style={{marginTop: '5px', height: '50px', marginLeft: '7.5%', width: '85%', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', borderRadius: '10px', padding: '0px', display: 'flex', cursor: 'pointer' }}>
                                    <ModeEditOutlineRoundedIcon style={{height: '25px', width: '25px', marginTop: '10px', marginLeft: '20px', border: '0px solid black',  }}/>
                                    <span style={{height: '25px', width: '45px', fontSize: '18px', marginTop: '12px', marginLeft: '5px', marginLeft: '10px', paddingRight: '0px', border: '0px solid red', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'}} onClick={handleOpenModal}>Edit</span>
                                </div>
                                <div style={{marginTop: '5px', height: '50px', marginLeft: '7.5%', width: '85%', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', borderRadius: '10px', padding: '0px', display: 'flex', cursor: 'pointer'}}>
                                    <DeleteRoundedIcon style={{height: '25px', width: '25px', marginTop: '10px', marginLeft: '20px'  }}/>
                                    <span style={{height: '25px', width: '45px', fontSize: '18px', marginTop: '12px', marginLeft: '5px', marginLeft: '10px', paddingRight: '0px', border: '0px solid red', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'}} onClick={handleDeleteWorkout}>Delete</span>
                                </div>
                              </div>
                              </Menu>
                              </>
                               ) : null}
                        </div>

                        <div style={{boxShadow: '0.0em 0.0em 0.1em 0.0em rgb(10 10 10 / 40%)',}}>
                            <img style={{objectFit: 'contain', minHeight: '300px', maxWidth: '100%'}}src={image}/>
                            <div style={{boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 20%)', display: 'flex', flexDirection: 'column', minWidth: '900px', marginLeft: '0%', marginTop: '-20%'}}>  
                                <Typography style={{marginLeft: '100px', marginTop: '20px', fontSize: '24px', fontWeight: '300', padding: '10px', textTransform: 'capitalize', color: 'white'}}>{workout.title}</Typography>
                                <Typography style={{marginLeft: '110px', marginTop: '-10px', fontSize: '18px', fontWeight: '300', padding: '10px', color: 'white'}}>{workout.description}</Typography>
                                <div style={{boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 10%)', display: 'flex',  marginLeft: '120px', paddingLeft: '0px',}}>
                                    <Fab variant="extended" style={{backgroundColor: 'white', color: 'black', border: '1px solid white', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                                      <Typography style={{marginRight: '0px'}}>{workout.sets} sets</Typography>
                                    </Fab>
                                    <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                                      <Typography style={{marginRight: '0px'}}>{workout.reps} reps</Typography>
                                    </Fab> 

                                    <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                                      <Typography style={{marginRight: '0px'}}>{workout.weight}lbs</Typography>    
                                    </Fab>
                                </div>
                            </div>
                        </div>
                  
                          <div style={{border: '0px solid black', padding: '10px', marginTop: '0px'}}>
                          {isLiked ? (
                            <Fab onClick={handleUpdateWorkoutLikes} variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '100px'}}>
                              <FavoriteIcon style={{color: 'red'}} />
                            <Typography style={{marginRight: '0px', marginLeft: '5px', fontSize: '18px'}}>{postLikes}</Typography>
                          </Fab>
                          )
                          : 
                          <Fab onClick={handleUpdateWorkoutLikes} variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '100px'}}>
                            <FavoriteBorderIcon/>
                            <Typography style={{marginRight: '0px', marginLeft: '5px', fontSize: '18px'}}>{postLikes}</Typography>
                          </Fab> 
                          }
                            

                            

                            <ClickAwayListener>
                              <Fab onClick={handleClickComment} type="button" variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '100px'}}>
                              {isCommentedOn ? ( 
                              <ModeCommentOutlinedIcon/> 
                              ) : (
                                <ModeCommentIcon />)}
                                <Typography style={{marginRight: '0px', marginLeft: '5px', fontSize: '18px'}}>{postComments}</Typography> 
                              </Fab> 
                            </ClickAwayListener>
                            {openComment ? (
                              <Box>
                                <Typography style={{fontSize: '20px', marginLeft: '20%', marginBottom: '30px'}}>Comments</Typography>
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
                                      ) : (null)
                                    }
          
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
                                        />
                                        <Button onClick={handleSubmit} style={{marginLeft: '0px', color: 'black', border: '0px solid black', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', minWidth: '100px', maxHeight: '50px', marginTop: '10px' }}>
                                          <SendIcon  style={{marginRight: '-10px', height: '25px', width: '25px'}} className="searchIcon"/>
                                        </Button>
                        
                                    </div>
                                  </div>
                                </Box>
                              </Box>
                            ) : null}
    
                          </div>
                            
                  </div>
            
                      <div>
                        <Modal
                              aria-labelledby="transition-modal-title"
                              aria-describedby="transition-modal-description"
                              open={openModal}
                              onClose={handleModalClose}
                              closeAfterTransition
                              BackdropProps={{
                              timeout: 500,
                              }}
                              
                          >
                              <Fade in={openModal}>
                                <Box sx={style} style={{opacity: '100%', backgroundColor: 'white', height: '90%', width: '70%', marginLeft: '15%', marginTop: '2.5%', borderRadius: '20px', backgroundColor: 'white', border: '0px solid black'}}>
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
                                                      <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                                                        <Typography style={{marginRight: '0px'}}>{workout.reps} reps</Typography>
                                                      </Fab> 
                                                      <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                                                        <Typography style={{marginRight: '0px'}}>{workout.weight}lbs</Typography>    
                                                      </Fab>
                                                  </div>
                                          </div>
                                        </div>  
                                        <div style={{border: '0px solid red', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 5%)',  minWidth: '50%',}}>
                                            <div style={{maxHeight: '90px', border: '0px solid red', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 10%)', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
                                                  > 
                                
                                                    <CloseIcon sx={{ mr: 1, marginLeft: '10px', border: '0px solid red' }} />
                                      
                                                  </Button>
                                              </div>
                                            <div>
                                                <form onSubmit={handleUpdateWorkout}>
                                                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '50px'}}>
                                                      <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}} >Title</Typography>
                                                            <input
                                                            style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                                                              type="text"
                                                              id="title"
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
                                                      
                                                        style={{boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)',  width: '40%', marginLeft: '50%', backgroundColor: 'black', color: 'white'}} 
                                                        onClick={handleUpdateWorkoutList }
                                                          type="submit"
                                                         
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
                    </Grid>  
                 </Grid> 
               </div>
               </>
          </Box>
        </div>
    );
}

export default Post;