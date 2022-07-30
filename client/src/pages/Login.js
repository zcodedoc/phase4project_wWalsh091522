import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "../styles";
import "./Login.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{display: 'flex', marginTop: '0%', width: '50%', height: '900px', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 10%)'}}> 
          <div style={{ marginTop: '20%', height: '100px', width: '100px', textAlign: 'center', marginLeft: '20%', borderRadius: '20px',  boxShadow: '0.5em 0.5em 1em 0.125em rgb(10 10 10 / 10%)' }}>
            <Box sx={{ width: '100%', maxWidth: 500 , paddingTop: '40%'}}>
              <Typography className="logo1" style={{fontSize: '12px', marginLeft: '0px', marginTop: '0px'}}>fitnesstracker</Typography>
            </Box>
          </div>
          <div style={{display: 'flex', marginTop: '20%', maxHeight: '100px', width: '200px', marginLeft: '2.5%'}}>
            <Typography style={{fontSize: '32px', marginLeft: '20px', marginTop: '25px'}}>FitnessTracker</Typography>
          </div> 
          <div style={{marginLeft: '-45%', marginTop: '45%', maxHeight: '100px', width: '500px'}}>
            <Typography style={{fontSize: '28px'}}>Log and Track Your Fitness Goals</Typography>
          </div>
        </div>
        <Wrapper>
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

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  margin-top: 7.5%;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;
