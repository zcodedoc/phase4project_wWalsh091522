import React, { useEffect, useState } from "react"; 
import { Switch, Route } from "react-router-dom";
import NavBar from './NavBar';
import Login from '../pages/Login';
import Feed from '../pages/Feed';
import Tags from '../pages/Tags';
import Profile from '../pages/Profile';
import NewWorkouts from '../pages/NewWorkouts';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    setLoading(false);
  },[]);

  
  function handleLogin(user) {
    setUser(user);
  }
  if (isLoading) return <div>loading</div>;
  if (!user && !isLoading) return <Login onLogin={handleLogin} />;
  

  return (
    <>
    <NavBar user={user} setUser={setUser}/>
    <main style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
      <Switch>
          <Route path='/browse'>
            <Tags user={user} setUser={setUser}/>
          </Route>
          <Route path='/newworkout'>
            <NewWorkouts user={user} setUser={setUser}/>
          </Route>
          <Route path='/profile'>
            <Profile user={user} setUser={setUser}/>
          </Route>
          <Route path='/'>
            <Feed user={user} setUser={setUser}/>
          </Route> 
      </Switch>
    </main>
    </>
  );
}

export default App;
