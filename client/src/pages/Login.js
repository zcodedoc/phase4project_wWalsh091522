import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "../styles";
import "./Login.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import logo from '../assets/logo.png';
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
   
<div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{display: 'flex', marginTop: '0%', width: '50%', height: '700px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 10%)'}}> 
      <div style={{ marginTop: '10%', height: '100px', width: '100px', textAlign: 'center', marginLeft: '100px', borderRadius: '20px',  boxShadow: '0.5em 0.5em 1em 0.125em rgb(10 10 10 / 10%)'
    }}>
     
       <Box sx={{ width: '100%', maxWidth: 500 , paddingTop: '40%'}}>
       <Typography className="logo1" style={{fontSize: '12px', marginLeft: '0px', marginTop: '0px'}}>fitnesstracker</Typography>
      
      </Box>
      
     </div><div style={{display: 'flex', marginTop: '10%', maxHeight: '100px', width: '200px'}}><Typography style={{fontSize: '32px', marginLeft: '20px', marginTop: '25px'}}>FitnessTracker</Typography></div> <div style={{marginLeft: '-42.5%', marginTop: '30%', maxHeight: '100px', width: '400px'}}><Typography style={{fontSize: '24px'}}>Log and Track Your Fitness Goals</Typography></div>
     <div style={{marginLeft: '-45%', marginTop: '35%', maxHeight: '80px', width: '400px'}}>
     {/* <Button style={{maxHeight: '50px'}}><img style={{maxHeight: '180px'}} src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fassets.stickpng.com%2Fthumbs%2F5847e95fcef1014c0b5e4822.png&f=1&nofb=1"/></Button> */}
     </div>
     </div>
    
    
    <Wrapper>
      {/* <img className="logo1" src={logo}/> */}
      <div className="logo1">fitnesstracker.</div>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
         {/* <SignUpForm2 onLogin={onLogin} /> */}
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
        </>
      )}
    </Wrapper>
    </div>
  );
}

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: black;
  margin: 8px 0 16px;
`;

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  // margin-top: 10%;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;
