import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import Post from "../components/Post";

function Feed({user, setUser}) {
  const [workouts, setWorkouts] = useState([]);
  const [comments, setComments] = useState([]);

  function handleUpdateWorkoutList(updatedWorkout) {
    const updatedWorkoutsArray = workouts?.map((workout) => {
      if (workout.id === updatedWorkout.id) {
      }
      return workout.id === updatedWorkout.id ? updatedWorkout : workout;
    });
    setWorkouts(updatedWorkoutsArray);
  }

  function handleDeleteWorkout(deletedWorkout) {
    setWorkouts((workouts) =>
      workouts.filter((workout) => workout.id !== deletedWorkout.id)
    );
  }

  function handleDeleteComment(deletedComment) {
    setComments((comments) =>
      comments.filter((comment) => comment.id !== deletedComment.id)
    );
  }

  const getComments = (workout_id) => {
    let currComments = []
    comments.map(comment => {
      if (comment.workout_id === workout_id) {
        currComments.push(comment);
      }
    })
    return currComments;
  }

  const getNewComments = () => {
    fetch("/comments")
    .then((r) => r.json())
    .then(setComments);
  }
  
  useEffect(() => {
      fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
      fetch("/comments")
      .then((r) => r.json())
      .then(setComments);
  }, []);

  return (
      <div style={{width: '100%', display: 'flex'}}>
        <div style={{minWidth: '10%', maxWidth: '10%', marginTop: '0%'}}>
        </div>
        <Wrapper>
          <div style={{width: '80%', marginLeft: '7.5%', marginTop: '0%', border: '0px solid black'}}>
            <h2 style={{marginLeft: '32.5%', width: '50%',  paddingLeft: '0px',  marginTop: '2.5%', marginBottom: '2.5%', padding: '10px', border: '0px solid black'}}>Feed</h2>
          </div>
                {workouts.length > 0 ? (
                  workouts.map((workout) => (
                    <Post 
                        key={workout.id}
                        workout={workout}
                        handleUpdateWorkoutList={handleUpdateWorkoutList}
                        onDeleteWorkout={handleDeleteWorkout}
                        onDeleteComment={handleDeleteComment}
                        username={user.username}
                        userimage={user.image}
                        currentUser={user}
                        comments={getComments(workout.id)}
                        getNewComments={getNewComments}
                    />
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
  box-shadow: 0 0.055em 0.225em rgb(20 20 20 / 0%);
`;


export default Feed;