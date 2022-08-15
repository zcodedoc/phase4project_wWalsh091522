import React, { useState, useEffect } from "react";
import "./Post.css";
import EditWorkoutModal from "./EditWorkoutModal";
import CommentList from "./CommentList";
import {Box, Button} from "../styles";
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useHistory } from "react-router";


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

function Post({workout,  comments, currentUser, onDeleteWorkout, handleUpdateWorkoutList, onDeleteComment, getNewComments, workout_tag }) {
    const { id, title, description, image, sets, reps, weight, likes, user_id} = workout;
    const [workoutState, setWorkoutState] = useState(workout);
    const [workoutTags, setWorkoutTags] = useState(workout.tags);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLiked, setIsLiked] = React.useState(false);
    const [postLikes, setPostLikes] = useState(workout.likes);
    const [isCommentedOn, setIsCommentedOn] = React.useState(false);
    const [postComments, setPostComments] = useState(workout.comments.length);
    const [openModal, setOpen] = React.useState(false);
    const [openModal2, setOpen2] = React.useState(false);
    const [openComment, setOpenComment] = React.useState(false);
    const [errors, setErrors] = useState([]);
    const [tags, setTags] = useState([]);
    const [target, setTarget] = useState('');
    const history = useHistory();
    const handleModalClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const open2 = Boolean(anchorEl);

    useEffect(() => {
    fetch("/tags")
      .then((r) => r.json())
      .then(setTags)
      .then(
      );
    }, []);

    function handleUpdateWorkoutLocal(updatedWorkout) {
      setWorkoutState(updatedWorkout);
    }

    var myWorkout = false;
    if (currentUser.id === workout.user.id) {
      myWorkout = true;
    }

    const handleClick2 = (event) => {
      setAnchorEl(event.currentTarget);
    };

    function handleOpenModal() {
      setOpen(!openModal)
    }

    const handleClose2 = () => {
      setAnchorEl(null);
    };

    const handleClickComment = () => {
      setOpenComment((prev) => !prev);
    };
  
    const handleUpdateCommCount = (comment_count) => {
      setPostComments(postComments + comment_count)
    }

    async function breakoutLikes() {
      setPostLikes((prev) => prev+1);
      return true;
    }

    function handleUpdateWorkoutLikes(e) {
      if (isLiked) {
        setWorkoutState({
          ...workoutState,
          likes: postLikes
        });
        setPostLikes((prev) => prev-1);
        fetch(`/workouts/${id}/like`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workoutState),
        })
        .then((res) => {
          if (res.ok) {
                <>
                </>
          } 
          else {
            res.json().then(console.log)
          }
        })
        setIsLiked(false);
        }
      else {
        let newlikes = postLikes + 1
        breakoutLikes();
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
    }

    function handleDeleteWorkout() {
      fetch(`/workouts/${id}`, {
        method: "DELETE",
      })
      .then((res) => {
        if (res.ok) {
          onDeleteWorkout(workout);
        } else {
          res.json().then(console.log)
          }
      })
    }

    function handleTagUpdate(newTags){
      let slimTags = []
      newTags.map((tag) => {
        let upTag = tag.tag
        slimTags.push(upTag);

      })
      setWorkoutTags(slimTags)
    }

    return (
          <div>
            <>
              <div style={{display: 'flex', marginLeft: '20%', marginTop: '10px', marginBottom: '20px'}}>
                <Grid sx={{ flexGrow: 1 }}  container spacing={1}> 
                  <Grid item xs={4}>
                    <div style={{ boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 20%)', minWidth: '900px', marginLeft: '40%',}}>
                      <div style={{padding: '20px', maxHeight: '100px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)', display: 'flex'}}>
                        <div style={{display: 'flex', flexDirection: 'column', border: '0px solid black', paddingLeft: '20px', paddingRight: '20px'}}>
                          <img style={{objectFit: 'cover', padding: '0px', border: '1px solid white', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 40%)', marginLeft: '30px', minHeight: '60px', maxHeight: '60px', minWidth: '60px', maxWidth: '60px', borderRadius: '50px'}} src={workout.user.image}/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', border: '0px solid black'}}>
                          <div style={{display: 'flex', flexDirection: 'column',}}>
                            <Typography style={{marginTop: '10px', fontSize: '18px', fontWeight: '350', textTransform: 'capitalize'}}>{workout.user.name}</Typography>
                            <Typography style={{marginTop: '0px', fontSize: '16px', fontWeight: '350'}}>@{workout.user.username}</Typography>
                          </div>
                        </div>
                        {myWorkout ? (
                              <>
                                <Button onClick={handleClick2} style={{height: '50px', width: '100px', border: '0px solid black', marginLeft: '60%', marginTop: '10px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)',}}><MoreHorizIcon/></Button>
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
                                        <div style={{marginTop: '0px', marginRight: '0px', marginLeft: '0px', padding: '0%', paddingLeft: '0%', width: '150px', height: '110px', border: '0px solid red'}} >
                                          <div style={{marginTop: '5px', marginBottom: '5px', height: '50px', marginLeft: '7.5%', width: '85%', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 5%)', borderRadius: '10px', padding: '0px', display: 'flex', cursor: 'pointer' }}>
                                            <ModeEditOutlineRoundedIcon style={{height: '25px', width: '25px', marginTop: '10px', marginLeft: '20px', border: '0px solid black',  }}/>
                                            <span style={{height: '25px', width: '45px', fontSize: '18px', marginTop: '12px', marginLeft: '5px', marginLeft: '10px', paddingRight: '0px', border: '0px solid red', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'}} onClick={handleOpenModal}>Edit</span>
                                          </div>
                                          <Divider/>
                                          <div style={{marginTop: '5px', marginBottom: '5px', height: '50px', marginLeft: '7.5%', width: '85%', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 5%)', borderRadius: '10px', padding: '0px', display: 'flex', cursor: 'pointer'}}>
                                            <DeleteRoundedIcon style={{height: '25px', width: '25px', marginTop: '10px', marginLeft: '20px'  }}/>
                                            <span style={{height: '25px', width: '45px', fontSize: '18px', marginTop: '12px', marginLeft: '5px', marginLeft: '10px', paddingRight: '0px', border: '0px solid red', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'}} onClick={handleDeleteWorkout}>Delete</span>
                                          </div>
                                        </div>
                                    </Menu>
                              </>
                          ) : null}
                      </div>
                      <Stack style={{boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 20%)', border: '0px solid red', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10%'}} direction="row" spacing={1}>
                         {workoutTags.length > 0 ? (
                           workoutTags.map((tag, index) => ( 
                            <Chip icon={<FitnessCenterOutlinedIcon/>} 
                              key={index}
                              style={{
                                  boxShadow: '0px 0px 16px -4px rgba(0, 0, 0, 0.68)', 
                                  padding: '12px', 
                                  backgroundColor: 'white', 
                                  margin: '10px', 
                                  borderRadius: '20px'
                              }}
                              label={tag.name}
                            /> 
                           ))
                          ) : (
                          <>
                           <div style={{height: '0px', width: '600px', padding: '0%', border: '0px solid black', display: 'flex'}}></div>
                          </>
                          )}
                      </Stack>
                      <div style={{boxShadow: '0.0em 0.0em 0.1em 0.0em rgb(10 10 10 / 40%)',}}>
                        <img style={{objectFit: 'contain', minHeight: '500px', maxHeight: '500px', minWidth: '100%', maxWidth: '100%', paddingBottom: '0px'}}src={workoutState.image}/>
                          <div style={{boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 20%)', display: 'flex', flexDirection: 'column', minWidth: '900px', marginLeft: '0%', marginTop: '0%', backgroundColor: 'white', opacity: '100%'}}>  
                            <Typography style={{marginLeft: '100px', marginTop: '20px', fontSize: '24px', fontWeight: '300', padding: '10px', textTransform: 'capitalize', color: 'black'}}>{workoutState.title}</Typography>
                            <Typography style={{marginLeft: '100px', marginTop: '-10px', fontSize: '18px', fontWeight: '300', padding: '10px', color: 'black'}}>{workoutState.description}</Typography>
                            <div style={{boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)', display: 'flex',  marginLeft: '120px', paddingLeft: '0px',}}>
                              <Fab variant="extended" style={{backgroundColor: 'white', color: 'black', border: '1px solid white', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                                <Typography style={{marginRight: '0px'}}>{workoutState.sets} sets</Typography>
                              </Fab>
                              <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                                <Typography style={{marginRight: '0px'}}>{workoutState.reps} reps</Typography>
                              </Fab> 
                              <Fab variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
                                <Typography style={{marginRight: '0px'}}>{workoutState.weight}lbs</Typography>    
                              </Fab>
                            </div>
                          </div>
                      </div>
                      <div style={{border: '0px solid black', padding: '10px', marginTop: '10px', paddingLeft: '50px'}}>
                        {isLiked ? (
                          <Fab onClick={handleUpdateWorkoutLikes} variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '100px'}}>
                            <FavoriteIcon style={{color: 'red'}} />
                            <Typography style={{marginRight: '0px', marginLeft: '5px', fontSize: '18px'}}>{postLikes}</Typography>
                          </Fab>
                          ) : 
                          <Fab onClick={handleUpdateWorkoutLikes} variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '100px'}}>
                             <FavoriteBorderIcon/>
                             <Typography style={{marginRight: '0px', marginLeft: '5px', fontSize: '18px'}}>{postLikes}</Typography>
                          </Fab> 
                        }
                        <Fab onClick={handleClickComment} type="button" variant="extended" style={{backgroundColor: 'white',boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '100px'}}>
                           {!isCommentedOn ? ( 
                            <ModeCommentOutlinedIcon/> 
                            ) : (
                            <ModeCommentIcon />
                            )}
                          <Typography style={{marginRight: '0px', marginLeft: '5px', fontSize: '18px'}}>{postComments}</Typography> 
                        </Fab> 
                            {openComment ? (
                              <CommentList comments={comments} workout={workout} currentUser={currentUser} getNewComments={getNewComments} onDeleteComment={onDeleteComment} handleUpdateCommCount={handleUpdateCommCount}/>        
                            ) : null}
                      </div>
                    </div>
                    <div>
                      <Modal
                        open={openModal}
                        onClose={handleModalClose}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Box sx={style} style={{opacity: '100%', backgroundColor: 'white', height: '90%', width: '70%', marginLeft: '15%', marginTop: '2.5%', borderRadius: '20px', backgroundColor: 'white', border: '0px solid black', overflow: 'scroll'}}>
                          <EditWorkoutModal workout={workoutState} currentUser={currentUser} handleUpdateWorkoutList={handleUpdateWorkoutList} handleModalClose={handleModalClose} handleUpdateWorkoutLocal={handleUpdateWorkoutLocal} handleTagUpdate={handleTagUpdate}/>
                        </Box>
                      </Modal>
                    </div> 
                  </Grid>  
                </Grid> 
              </div>
            </>
          </div>
    );
}

export default Post;