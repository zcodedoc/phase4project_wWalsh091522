import React, { useEffect, useState } from "react"; 
import {  Switch, Route } from "react-router-dom";
import NavBar from './NavBar';
import Login from '../pages/Login';
import Feed from '../pages/Feed';
import WorkoutList from '../pages/WorkoutList';
import Profile from '../pages/Profile';
import NewWorkouts from '../pages/NewWorkouts';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

function App() {
  
  const [user, setUser] = useState(null);
  const [value, setValue] = React.useState('1');

  const handleChange2 = ( event, newValue ) => {
    setValue(newValue);
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleClick = () => {
    console.info('You clicked the Chip');
  }

  const handleDelete = () => {
    console.info('You clicked on the delete icon');
  }

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  },[]);

  
  function handleLogin(user) {
    setUser(user);
    
  }
  
  function handleLogout() {
    setUser(null);
  }


  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <>
    <NavBar user={user} setUser={setUser}/>
    <main style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
      <Switch>
      <Route path='/newworkout'>
        <NewWorkouts user={user} setUser={setUser}/>
      </Route>
      <Route path='/profile'>
        <Profile user={user} setUser={setUser}/>
      </Route>
      <Route path='/'>
       <Feed user={user} setUser={setUser}/>
        {/* <WorkoutList user={user} setUser={setUser}/> */}
      </Route>
      </Switch>
    </main>
  
    </>
  );
}

export default App;
