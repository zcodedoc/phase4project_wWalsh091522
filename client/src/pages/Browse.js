import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import Post from "../components/Post";
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Browse({user, setUser}) {
    const [workouts, setWorkouts] = useState([]);
    const [workoutTags, setWorkoutTags] = useState('');
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const open2 = Boolean(anchorEl);

    function handleUpdateWorkoutList(updatedWorkout) {
      const updatedWorkoutsArray = workouts?.map((workout) => {
        return workout.id === updatedWorkout.id ? updatedWorkout : workout;
      });
      setWorkouts(updatedWorkoutsArray);
    }

    function handleDeleteWorkout(deletedWorkout) {
      setWorkouts((workouts) =>
        workouts.filter((workout) => workout.id !== deletedWorkout.id)
      );
    }
 
    // const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //   ...theme.typography.body2,
    //   padding: theme.spacing(1),
    //   textAlign: 'center',
    //   color: theme.palette.text.secondary,
    // }));

    // const handleChange = (event) => {
    //   setSpacing(Number(event.target.value));
    // };

    const getComments = (workout_id) => {
      let currComments = []
      comments.map(comment => {
        if (comment.workout_id === workout_id) {
          currComments.push(comment);
        }
      })
      return currComments;
    }

    const getTags = (workout_id) => {
      let workout_tag;
      workoutTags.map(tag => {
        if (tag.workout_id === workout_id) {
          workout_tag = tag;
        }
      })
      return workout_tag;
    }

    const getNewComments = () => {
      fetch("/comments")
      .then((r) => r.json())
      .then(setComments);
    }

    const handleClick = (tag) => {
      console.info('You clicked the Chip.'+{tag});
    };
  
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
      fetch("/workout_tags")
      .then((r) => r.json())
      .then(setWorkoutTags);
      fetch("/tags")
      .then((r) => r.json())
      .then(setTags);
    }, []);

  return (
      <Wrapper>
        {tags.map((tag) => ( 
          <div style={{width: '80%',marginTop: '0%',  marginLeft: '10%', border: '0px solid red', display: 'flex', flexDirection: 'column'}}>
            <div style={{width: '100%', marginLeft: '0%', marginTop: '0%', border: '0px solid black',  display: 'flex'}}>
              <Link style={{color: 'black', textDecoration: 'none',}} to='/tags' className="link">
                <Button style={{border: '0px solid red', height: '50px', minWidth: '120px', marginTop: '35px', marginRight: '60px', display: 'flex',  padding: '12px', marginLeft: '10px', justifyContent: 'center', boxShadow: '0px 0px 16px -4px rgba(0, 0, 0, 0.68)',borderRadius: '50px' }}><ArrowBackIcon style={{border: '0px solid black', marginRight:'5px'}} /><Typography style={{marginLeft: '0px', border: '0px solid black'}}>Back</Typography></Button>
              </Link>
              <Typography style={{marginLeft: '0%', width: '50%', paddingLeft: '0px',  marginTop: '2.5%', marginBottom: '2.5%', padding: '10px', border: '0px solid black', fontSize: '20px'}}>Displaying all posts for "{tag.name}"</Typography>
            </div>
            <Wrapper2>
              <div style={{width: '100%', marginLeft: '0%', border: '0px solid red', maxWidth: '100%', marginTop: '0%', display: 'flex', border: '0px solid red'}}>
                <div style={{minWidth: '20%',display: 'flex', height: '50px', marginLeft: '0%', border: '0px solid blue', maxWidth: '100%', marginTop: '0%', padding: '5px'}}>
                  {tags.map((tag) => (
                    <div style={{width: '100%', marginLeft: '0%', marginTop: '0%', border: '0px solid black'}}>
                      <Chip 
                        icon={<FitnessCenterOutlinedIcon/>}
                        key={tag.id}
                        style={{
                          boxShadow: '0px 0px 16px -4px rgba(0, 0, 0, 0.68)', 
                          padding: '20px', 
                          backgroundColor: 'white', 
                          margin: '10px', 
                          borderRadius: '20px'
                        }}
                        label={ 
                          <div style={{border: '0px solid black', display: 'flex'}}>
                            <p style={{border: '0px solid black'}}>{tag.name}</p> 
                            <p style={{border: '0px solid black', marginLeft: '5px'}}>({tag.workout_tags.length})</p>
                          </div>
                        }
                        onClick={handleClick}
                      > 
                      </Chip>
                    </div>
                  ))} 
                </div>
              </div>
            </Wrapper2>
              {workouts.length > 0 ? (
                workouts.map((workout) => (
                  <div style={{border: '0px solid black',  boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 0%)', maxWidth: '60%'}}> 
                    <Post 
                      key={workout.id}
                      workout={workout}
                      handleUpdateWorkoutList={handleUpdateWorkoutList}
                      onDeleteWorkout={handleDeleteWorkout}
                      username={user.username}
                      userimage={user.image}
                      currentUser={user}
                      comments={getComments(workout.id)}
                      getNewComments={getNewComments}
                      workout_tag={getTags(workout.id)}
                    />
                  </div>
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
          </div>
        ))} 
      </Wrapper>
  );
}

const Wrapper = styled.section`
  min-width: 100%;
  margin-top: 5%;
  margin-left: 0%;
  background-color: white;
  box-shadow: 0 0.055em 0.225em rgb(20 20 20 / 15%);
`;

const Wrapper2 = styled.section`
  max-width: 100%;
  margin-bottom: 50px;
  margin-top: 0%;
  margin-left: 0%;
  overflow: scroll;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0.055em 0.225em rgb(20 20 20 / 15%);
`;

export default Browse;