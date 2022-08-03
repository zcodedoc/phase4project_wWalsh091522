import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import Typography from '@mui/material/Typography';


function Profile({user, setUser}) {
  const [workouts, setWorkouts] = useState([]);
  const [workoutTags, setWorkoutTags] = useState('');
  const [comments, setComments] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open2 = Boolean(anchorEl);
 
  const getTags = (workout_id) => {
    let workout_tag;
    workoutTags.map(tag => {
      if (tag.workout_id === workout_id) {
        workout_tag = tag;
      }
    })
    return workout_tag;
  }


  useEffect(() => {
    fetch("/workouts/")
      .then((r) => r.json())
      .then(setWorkouts);
      fetch("/workout_tags")
      .then((r) => r.json())
      .then(setWorkoutTags);
      fetch("/comments")
      .then((r) => r.json())
      .then(setComments);
      fetch("/me")
      .then((r) => r.json())
      .then(setUser);
  }, []);
  

  return (
      <div style={{width: '80%', marginLeft: '10%', display: 'flex'}}>
        <Wrapper>
          <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginLeft: '0px', paddingTop: '0px',}}>
            <div style={{width: '100%', height: '25%', display: 'flex', flexDirection: 'row'}}>
              <img style={{objectFit: 'cover', padding: '10px', marginBottom: '-30px', marginTop: '50px', height: '200px', width: '100%', marginLeft: '0%'}} src={user.header}/>
            </div>
            <div style={{ width: '100%', marginLeft: '0%', marginTop: '2%', padding: '0px', display: 'flex',  boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 15%)'}}>
              <div style={{minHeight: '100%', marginTop: '-5%', marginLeft: '10%', minWidth: '40%'}}>
                <img style={{marginLeft: '35%', padding: '0px', maxHeight: '100px', border: '2.5px solid white', minWidth: '100px', objectFit: 'cover', borderRadius: '100px'}} src={user.image}></img>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: '-300px', marginTop: '0px'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginLeft: '0px', marginTop: '0px'}}>
                  <p style={{ width: '500px', marginLeft: '150px', marginTop: '10px', fontSize: '24px', textTransform: 'capitalize' }}>{user.name}</p>
                </div>
                <p style={{marginLeft: '150px', marginTop: '-15px', fontSize: '16px'}}>@{user.username}</p>
                <div style={{width: '300px', marginTop: '-20px', marginBottom: '20px', marginLeft: '160px', height: '100%',  padding: '10px', paddingLeft: '0px', borderRadius: '10px'}}>
                  <Typography style={{fontSize: '14px', marginLeft: '0px', fontWeight: '300'}}>Bio 
                  <br/>
                    {user.bio}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
  );
}

const Wrapper = styled.section`
  min-width: 100%;
  margin-right: 0%;
  box-shadow: 0 0.055em 0.225em rgb(20 20 20 / 15%);
`;

export default Profile;