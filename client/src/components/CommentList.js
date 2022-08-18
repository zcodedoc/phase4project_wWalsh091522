import React, { useState } from "react";
import { Button, Box } from "../styles";
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';

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

function CommentList({workout, comments, currentUser, onDeleteComment, getNewComments, handleUpdateCommCount}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [open, setOpen] = React.useState(Boolean(anchorEl2));
    const [comment, setComment] = useState(workout.comment);
    const [commentState, setCommentState] = useState('');
    const [isCommentedOn, setIsCommentedOn] = React.useState(false);
    const [postComments, setPostComments] = useState(comments.length);
    const [errors, setErrors] = useState([]);

    const handleClick = (event) => {
        setAnchorEl2(event.currentTarget);
        setOpen(true)
      };

    const handleClose = () => {
      setAnchorEl(null);
      setOpen(false);
    };


    function handleSubmit(e) {
      e.preventDefault();
      fetch(`/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          workout_id: workout.id,
          comment: commentState
          }),
        }).then((r) => {
          if (r.ok) {
            getNewComments();
            handleUpdateCommCount(1);
            setCommentState("");
            setIsCommentedOn(true);
            setPostComments((prev) => prev+1);
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }


      function handleDeleteComment(e, comment) {
        e.preventDefault();
        fetch(`/comments/${comment}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
            // console.log(comment);
            onDeleteComment(comment);
            handleClose();
            handleUpdateCommCount(-1);
            getNewComments();
            } else {
            res.json().then(console.log)
            }
        })
        }
     

    return (
          <div>
            <Box>
              <Typography style={{fontSize: '20px', marginLeft: '20%', marginBottom: '30px'}}>Comments</Typography>
                  {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: '20%', maxWidth: '60%', maxHeight: '80px', borderRadius: '10px', marginBottom: '10px', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 20%)'}}>
                          <img style={{objectFit: 'cover', padding: '10px', border: '1px solid white',  marginLeft: '30px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px', borderRadius: '50px', marginLeft: '10%'}} src={comment.user.image}/>
                          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <Typography style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 0%)', padding: '0px', border: '0px solid black', minWidth: '200px', height: '20px', marginTop: '25px', borderRadius: '8px', fontSize: '14px', paddingLeft: '5px', marginLeft: '2.5%', marginRight: '10%', marginBottom: '-5px'}} >@{comment.user.username}</Typography>
                            <Typography style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 0%)', padding: '10px', border: '0px solid black', minWidth: '200px', height: '20px', marginTop: '0px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '2.5%', marginRight: '10%', marginBottom: '20px'}} >{comment.comment}</Typography>
                          </div>
                          <>
                            <div>
                            <Button onClick={handleClick} style={{height: '40px', width: '50px', border: '0px solid black', marginLeft: '0%', marginTop: '10px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)',}}><MoreHorizIcon/></Button>
                                <Menu
                                    style={{marginTop: '5px', marginRight: '30px'}}
                                    id="basic-menu"
                                    anchorEl={anchorEl2}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}>
                                  <div style={{  marginTop: '0px', marginRight: '0px', marginLeft: '0px', padding: '0%', paddingLeft: '0%', width: '150px', height: '55px', border: '0px solid red'}} >
                                    <div style={{marginTop: '5px', marginBottom: '5px', height: '50px', marginLeft: '7.5%', width: '85%', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 10%)', borderRadius: '10px', padding: '0px', display: 'flex', cursor: 'pointer'}}>
                                        <DeleteRoundedIcon style={{height: '25px', width: '25px', marginTop: '10px', marginLeft: '20px'  }}/>
                                        <span style={{height: '25px', width: '45px', fontSize: '18px', marginTop: '12px', marginLeft: '5px', marginLeft: '10px', paddingRight: '0px', border: '0px solid red', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'}} onClick={(e) => handleDeleteComment(e, comment.id)}>Delete</span>
                                    </div>
                                  </div>
                                </Menu>
                                </div>
                          </> 
                        </div>
                      ))
                  ) : (null)}
                
                <Box sx={styles}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                        <img style={{objectFit: 'cover', padding: '10px', border: '1px solid white',  marginLeft: '30px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px', borderRadius: '50px', marginLeft: '20%'}} src={currentUser.image}/>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                          <input
                              style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', minWidth: '100%', height: '50px', marginTop: '10px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '10%', marginRight: '10%', marginBottom: '20px'}} 
                              type="text"
                              id="title"
                              name="title"
                              placeholder="Comment"
                              value={commentState}
                              onChange={(e) => setCommentState(e.target.value)}
                          />
                          <Fab onClick={handleSubmit} style={{marginLeft: '0px', color: 'black', backgroundColor: 'transparent', border: '0px solid black', boxShadow: ' 0.1em 0.0em 0.25em -0.1em rgb(10 10 10 / 40%)', minWidth: '80px', maxHeight: '60px', marginTop: '10px' }} variant="extended">
                            <SendIcon style={{marginRight: '-10px', height: '25px', width: '25px'}} className="searchIcon"/>
                          </Fab>
                        </div>
                    </div>
                </Box>
            </Box>
          </div>
        
    );
  }        
export default CommentList;