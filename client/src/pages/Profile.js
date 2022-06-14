import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Post from "../components/Post";

function Profile({user, setUser}) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
      fetch("/me")
      .then((r) => r.json())
      .then(setUser);

  }, []);

  return (
      <div style={{width: '80%', marginLeft: '10%', display: 'flex',}}>
          <div style={{width: '100%', marginTop: '-5%'}}>
              <Divider style={{width: '75%', marginLeft: '5%', border: '0px', marginTop: '15px', marginBottom: '15px'}} />
          </div>
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
                          <p style={{ width: '500px', marginLeft: '150px', marginTop: '10px', fontSize: '24px', textTransform: 'capitalize' }}>{user.name}</p>
                          <p style={{marginLeft: '150px', marginTop: '-15px', fontSize: '16px'}}>@{user.username}</p>
                        <div style={{width: '300px', marginTop: '-20px', marginBottom: '20px', marginLeft: '160px', height: '100%',  padding: '10px', paddingLeft: '0px', borderRadius: '10px'}}>
                          <Typography style={{fontSize: '14px', marginLeft: '0px', fontWeight: '300'}}>Bio 
                          <br/>
                          {user.bio}
                          </Typography>
                        </div>
                      </div>
                      
                  </div>
                  <div style={{border: '0px solid black', width: '300px', marginTop: '-50px', marginBottom: '20px', marginLeft: '160px', height: '100%',  padding: '10px', paddingLeft: '0px', borderRadius: '10px'}}>
                          <Typography style={{fontSize: '24px', marginLeft: '0px', fontWeight: '300', marginTop: '100px'}}>Your Posts
                      
                          ({user.workouts.length})
                          </Typography>
                         
                        </div>
                        {/* <div style={{border: '0px solid black', marginTop: '5px', marginBottom: '20px', width: '70%', marginLeft: '12.5%'}}>
                          <Divider style={{color: 'black', backgroundColor: 'black', height: '1px'}}/>
                        </div> */}
                        
                        {user.workouts.map((workout) => (
                          <div>
                            <img style={{minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', objectFit: 'cover'}} src={workout.image}/>
                            <p>{workout.title}</p>
                            </div>
                             ))}
              </div>
          </Wrapper>
      </div>
  );
}

const Wrapper = styled.section`
  min-width: 100%;
  margin-right: 0%;
  // margin: 10px auto;
  box-shadow: 0 0.055em 0.225em rgb(20 20 20 / 15%);
`;

export default Profile;