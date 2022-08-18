import React, { useState, useEffect } from "react";
import { Button, FormField,} from "../styles";
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import Fab from '@mui/material/Fab';


function EditWorkoutModal({workout, currentUser, handleUpdateWorkoutList, handleModalClose, handleUpdateWorkoutLocal, handleTagUpdate }) {
  // const { id, title, description, image, sets, reps, weight, likes, user_id} = workout;
      const [openModal, setOpen] = React.useState(true);
      const [workoutState, setWorkoutState] = useState(workout);
      const [tags, setTags] = useState([]);
      const [workoutTags, setWorkoutTags] = useState([]);
      const [origWorkoutTags, setOrigWorkoutTags] = useState([]);
      const [deleteTags, setDeleteTags] = useState([]);
      const [isChanged, setIsChanged] = useState(false);
      const [isDeleteClicked, setIsDeleteClicked] = useState(false);
      const [isTagChanged, setIsTagChanged] = useState(false);
      const [isAddClicked, setIsAddClicked] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      // const [errors, setErrors] = useState([]);
     
      const handleTagChange = (event, index) => {
        let obj = tags.find(tag => tag.id === event.target.value);
        setIsTagChanged(true);
        // console.log(isTagChanged);
        let newTag = {
          id: event.target.value,
          name: obj.name,
          image: ""
        }
        let updateTags = [...workoutTags];
        updateTags[index].tag = newTag;
        updateTags[index].tag_id = obj.id;
        setWorkoutTags(updateTags);
        return;
      }

      const handleDeleteTag = (event, index) => {
        event.preventDefault();
        setIsDeleteClicked(true);
        // console.log({isDeleteClicked})
        let newTags = [...workoutTags];
        let destroyTags = [...deleteTags];
        const delTags = newTags.splice(index, 1);
        let obj = origWorkoutTags.find(tag => tag.id === delTags[0].id);
        if (obj) {
          destroyTags.push(delTags[0].id.toString());
        }
        // console.log(destroyTags)
        // console.log(isDeleteClicked)
        setDeleteTags(destroyTags);
        setWorkoutTags(newTags);       
      };

      function handleChange(e) {
        setIsChanged(true);
        // console.log({isChanged})
        setWorkoutState({
        ...workoutState,
        [e.target.id]: e.target.value,
        });
      }

      useEffect(() => {
        fetch("/tags")
        .then((r) => r.json())
        .then(setTags);
        fetch("/workout_tags")
        .then((r) => r.json())
        .then((tags) => {
          let localWorkoutTags = []
          tags.map((tag) => {
            if (tag.workout_id === workout.id) {
              localWorkoutTags.push(tag);
            }
          })
          setWorkoutTags(localWorkoutTags);
          setOrigWorkoutTags(localWorkoutTags);
          });
      }, []);
 
      function handleUpdateWorkout(e) {
        e.preventDefault();
        // console.log({isChanged})
        // console.log({isDeleteClicked})
        // console.log({isAddClicked})
        if (isChanged) {
          updateWorkout();
        }
        handleUpdateWorkoutLocal(workoutState);
        updateWorkoutTags();
      }

      function workoutTagDelete() {
        fetch(`/workout/workout_tags/destroy_mult`, {
          method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_list: deleteTags,
            }),
            })
            .then((r) => {
            setIsLoading(false);
            if (r.ok) {
              // console.log("delete workout_tag ok")
              // return;
            } else {
              r.json().then((err) => console.log(err));
              // return;
            }
          });
      }

 
      function updateWorkoutTags() {
        if (isDeleteClicked) {
          workoutTagDelete();
          // console.log('is delete clicked and workout tag delete ran')
        }
        if (isTagChanged) {
          // console.log("tag was changed")
          workoutTags.forEach((workout_tag) => {
            let obj = origWorkoutTags.find(tag => tag.id === workout_tag.id);
            // console.log(obj, workout_tag)
            if (obj && isTagChanged) {
              fetch(`/workout/workout_tags/${workout_tag.id}`, {
                method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: workout_tag.id,
                    tag_id: workout_tag.tag_id,
                  }),
                  })
                  .then((r) => {
                  setIsLoading(false);
                  if (r.ok) {
                    // console.log("update workout_tag ok")
                  } else {
                    r.json().then((err) => console.log(err));
                  }
                });
            }
          })}
          if (isAddClicked) {
            // console.log(" add tag was clicked")
            workoutTags.forEach((workout_tag) => {
              let obj = origWorkoutTags.find(origWorkoutTag => origWorkoutTag.id === workout_tag.id);
              // console.log(obj, workout_tag)
              if (!obj) {
                fetch(`/workout_tags`, {
                  method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      tag_id: workout_tag.tag_id,
                      workout_id: workout_tag.workout_id
                    }),
                    })
                    .then((r) => {
                    setIsLoading(false);
    
                    if (r.ok) {
                      // console.log("create workout_tag ok")
                    } else {
                      r.json().then((err) => console.log(err));
                    }
                  });
                }
              }
            )
          }
        
          handleTagUpdate(workoutTags);
          handleLocalModalClose();  
      }

      function handleLocalModalClose() {
        // setDeleteTags([]);
        handleModalClose()
      }

      function updateWorkout() {
        fetch(`/workouts/${workout.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: workoutState.id,
            title: workoutState.title,
            description: workoutState.description,
            image: workoutState.image,
            sets: workoutState.sets,
            reps: workoutState.reps,
            weight: workoutState.weight,
            likes: workoutState.likes,
            user_id: workoutState.user.id
          }),
        })
          .then((res) => {
            if (res.ok) {
              // console.log("workout update ok")
              // console.log('hitting')
            } else {
              res.json().then(console.log)
            }
          });
      }

      function handleAddTag(e) {
        e.preventDefault();
        setIsAddClicked(true);
        // console.log({isAddClicked});

        let newTag = {
          id: -1,
          tag: tags[0],
          tag_id: tags[0].id,
          workout: workout,
          workout_id: workout.id
        } 
        let addTags = [...workoutTags];
        addTags.push(newTag);

        return setWorkoutTags(addTags);
      };
      
      
      return (
          <div>
            <div style={{display: 'flex', marginTop: '0px', height: '100%', border: '0px solid black', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 5%)',}} open={openModal}>
              <div style={{border: '0px solid red', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 5%)',  minWidth: '100%',}}>
                <div style={{maxHeight: '90px', border: '0px solid red', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 10%)', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '5px', borderRadius: '0px'}}>
                  <Typography style={{marginLeft: '20px', height: '40px', fontSize: '18px', fontWeight: '300', padding: '10px', border: '0px solid black', width: '300px', textAlign: 'left', }}  >Edit Post</Typography>
                    <Button onClick={handleLocalModalClose} sx={{ width: '5%', marginTop: '0%', marginLeft: '0%', mr: 1, backgroundColor:'#ffffff', color: '#black',}} style={{height: '40px', marginLeft: '100px', marginTop: '2.5px', border: '0px solid red'}}> 
                        <CloseIcon sx={{ mr: 1, marginLeft: '10px', border: '0px solid red' }} />
                    </Button>
                </div>
                <div style={{border: '0px solid red', display: 'flex'}}>
                  <div style={{maxWidth: '50%', boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 10%)',}}>
                    <div style={{padding: '10px',  maxHeight: '100px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)', display: 'flex'}}>
                      <img style={{objectFit: 'cover', padding: '10px', border: '1px solid white',  marginLeft: '30px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px', borderRadius: '50px'}} src={currentUser.image}/>
                        <div style={{display: 'flex', flexDirection: 'column',}}>
                          <Typography style={{marginTop: '15px', fontSize: '16px', fontWeight: '350', textTransform: 'capitalize'}}>{workout.user.name}</Typography>
                          <Typography style={{marginTop: '0px', fontSize: '16px', fontWeight: '350'}}>@{workout.user.username}</Typography>
                        </div>
                    </div>
                    <Stack style={{display: 'flex', flexDirection: 'row', maxWidth: '100%', minHeight: '0px', maxHeight: '50px', border: '0px solid black', boxShadow: ' 0px 0px 8px -4px rgba(0, 0, 0, 0.68)',  overflow: 'scroll'}} direction="row" spacing={1}>
                        {workoutTags.length > 0 ? (
                            workoutTags.map((workout_tag, index) => ( 
                              <Chip icon={<FitnessCenterOutlinedIcon/>}
                                  key={index}
                                  style={{boxShadow: '0px 0px 16px -4px rgba(0, 0, 0, 0.68)', padding: '12px', border: '0px solid blue',backgroundColor: 'white',  marginTop: '10px', marginLeft: '20px',marginBottom: '10px',marginRight: '0px',borderRadius: '20px'}}
                                  label={workout_tag.tag.name}
                                  deleteIcon={<DeleteIcon />}
                              /> 
                                ))
                                ) : (null)}   
                    </Stack>
                    <div style={{boxShadow: 'inset 0.0em 0.0em 0.1em 0.0em rgb(10 10 10 / 80%)', border: '0px solid red'}}>
                      <img style={{objectFit: 'cover', maxHeight: '300px', minWidth: '100%'}}src={workoutState.image}/>
                    </div>
                    <div style={{boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 20%)', minHeight: '400px', display: 'flex', flexDirection: 'column'}}>  
                      <Typography style={{marginLeft: '50px', marginTop: '20px', fontSize: '24px', fontWeight: '300', padding: '10px', textTransform: 'capitalize'}}>{workoutState.title}</Typography>
                      <Typography style={{marginLeft: '50px', marginTop: '-10px', fontSize: '18px', fontWeight: '300', padding: '10px'}}>{workoutState.description}</Typography>
                      <div style={{boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 0%)', marginTop: '20px', display: 'flex',  marginLeft: '50px', paddingLeft: '0px',}}>
                        <Fab variant="extended" style={{backgroundColor: 'white', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 30%)', marginTop: '5px', marginBottom: '20px', marginRight: '30px', height: '40px', padding: '0px', width: '120px'}}>
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
                  <form style={{border: '0px solid red', width: '50%'}} onSubmit={handleUpdateWorkout}>
                    <div style={{border: '0px solid red', width: '100%', marginLeft: '0%'}}>
                      <div style={{border: '0px solid blue',boxShadow: '0.0em 0.0em 0.1em 0.0em rgb(10 10 10 / 0%)', marginTop: '0px', display: 'flex', width: '80%', marginLeft: '10%'}}>
                        <Typography style={{fontSize: '18px', border: '0px solid red', width: '100%', height: '50%', marginTop: '5%',  marginLeft: '10%', paddingLeft: '0%', paddingRight: '0%', marginBottom: '0px'}} >Tags</Typography> 
                        {workoutTags.length < 3 ? (
                          <Button onClick={(e) => handleAddTag(e)} style={{boxShadow: '0px 0px 16px -4px rgba(0, 0, 0, 0.68)', padding: '5px', backgroundColor: 'white', margin: '10px', borderRadius: '50px', display: 'flex', minWidth: '120px', height: '50px', justifyContent: 'center',  marginTop: '10px', marginLeft: '0px'}}>
                          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                            <Typography style={{padding: '4px', fontSize: '16px', border: '0px solid black', height: '25px', marginLeft: '-5px', textTransform: 'uppercase'}}>Add</Typography>
                            <AddIcon style={{padding: '4px', marginLeft: '-5px', border: '0px solid black', height: '25px',}} />
                          </div>
                        </Button>
                        ) : null}
                        
                      </div>
                      <div>
                        <Stack style={{display: 'flex', flexDirection: 'column', maxWidth: '100%', marginLeft: '10%', border: '0px solid black', boxShadow: '0.0em 0.0em 0.1em 0.0em rgb(10 10 10 / 0%)'}} direction="row" spacing={1}>
                          {workoutTags.map((workout_tag, index) => (
                            <FormField key={index} style={{ width: '90%',  marginTop: '0px', marginLeft: '0%', display: 'flex', flexDirection: 'row',  justifyContent: 'space-around', marginBottom: '10px', padding: '0px', border: '0px solid black'}}>
                              <TextField 
                                style={{padding: '0px', width: '250px'}}
                                id="outlined-basic"
                                select
                                label={workout_tag.tag.name}
                                value={workout_tag.tag.id}
                                onChange={(event) => {handleTagChange(event, index)}}
                              >
                              {tags.map((tag) => (
                                  <MenuItem style={{display: 'flex', flexDirection: 'column', margin: '5px', height: '40px'}} key={tag.name} value={tag.id}>{tag.name}</MenuItem>
                                ))}
                              </TextField>
                              <Button style={{boxShadow: '0px 0px 16px -4px rgba(0, 0, 0, 0.68)', padding: '4px', backgroundColor: 'white', margin: '10px', borderRadius: '10px', display: 'flex', width: '100px', height: '50px', justifyContent: 'center',  marginTop: '2.5px',}} onClick={(event) => {handleDeleteTag(event, index)}}>
                                <Typography style={{padding: '4px'}}><DeleteIcon /></Typography>
                              </Button>
                            </FormField>
                          ))}
                        </Stack> 
                      </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}} >Title</Typography>
                        <input
                            style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="text"
                            id="title"
                            placeholder={workoutState.title}
                            value={workoutState.title}
                            onChange={handleChange}
                        />
                      </div>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}}>Description</Typography>
                        <input
                            style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="text"
                            id="description"
                            placeholder={workoutState.description}
                            value={workoutState.description}
                            onChange={handleChange}
                        />
                      </div>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}}>Image</Typography>
                          <input
                            style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="text"
                            id="image"
                            placeholder={workoutState.image}
                            value={workoutState.image}
                            onChange={handleChange}
                          />
                      </div>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}} >Sets</Typography>
                          <input
                            style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="number"
                            id="sets"
                            placeholder={workoutState.sets}
                            value={workoutState.sets}
                            onChange={handleChange}
                          />
                      </div>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}} >Reps</Typography>
                          <input
                            style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '20px'}} 
                            type="number"
                            id="reps"
                            placeholder={workoutState.reps}
                            value={workoutState.reps}
                            onChange={handleChange}
                          />
                      </div>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Typography style={{fontSize: '18px', border: '0px solid red', width: '60%', marginLeft: '10%', marginRight: '-10%', marginBottom: '10px'}}  >Weight</Typography>
                          <input
                            style={{ boxShadow: '0.0em 0.0em 0.2em -0em rgb(10 10 10 / 30%)', padding: '0px', border: '0px solid black', width: '60%', height: '30px', borderRadius: '8px', fontSize: '16px', paddingLeft: '15px', marginLeft: '-30%', marginBottom: '40px'}} 
                            type="number"
                            id="weight"
                            placeholder={workoutState.weight}
                            value={workoutState.weight}
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
          </div>
);
}

export default EditWorkoutModal;