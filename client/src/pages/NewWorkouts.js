import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
import Typography from '@mui/material/Typography';
// import test from './assets/test.jpg';
import Stack from '@mui/material/Stack';
// import SpeedIcon from '@mui/icons-material/Speed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import Sidebar2 from "../components/Sidebar2";

function NewWorkouts({ user, setUser }) {
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Title");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
//   const [fat, setFat] = useState("0");
//   const [minutesToComplete, setMinutesToComplete] = useState("0");
//   const [cost, setCost] = useState("0");
//   const [instructions, setInstructions] = useState(`Here's how you make it.
  


// **Test** 

//   -Step 1 : do x

//   -Step 2 : do y

//   -Step 3 : do z 

//   `);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        image,
        sets,
        reps,
        weight
        
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
    <Wrapper>
  

      <WrapperChild2 style={{marginRight: '-50px'}}>
      <div style={{marginLeft: '10px', height: '110%', boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 25%)', padding: '20px', width: '100%'}}>
        <img style={{width: '100%', height: '400px', objectFit: 'cover', padding: '5px', borderRadius: '20px'}} src={image}/>
        <h1 style={{marginLeft: '40px', padding: '0px'}}>{title}</h1>
        <h1 style={{marginLeft: '40px', padding: '0px'}}>{description}</h1>
        <Typography style={{marginLeft: '10px', padding: '0px'}}>

         
          <p style={{marginTop: '-10px', marginLeft: '30px', padding: '10px',  fontSize: '18px'}}>By 
          <img style={{border: '1px solid white', boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 45%)', marginBottom: '-10px',marginLeft: '10px', height: '35px', minWidth: '35px', borderRadius: '20px'}}src={user.image}/> @{user.username}</p>
        </Typography>
        <div style={{marginLeft: '40px'}}>
        <div style={{ height: '300px', marginBottom: '100px'}}>
        <h2>Stats</h2>

              <Stack style={{marginLeft: '5px', marginTop: '5px'}} spacing={4} direction="row">

      <Button style={{height: '50px', minWidth: '120px', maxWidth: '120px',   boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)'}}><Typography style={{fontSize: '18px', marginLeft: '-10px'}}>{sets} Sets</Typography></Button>
      <Button style={{height: '50px', minWidth: '120px', maxWidth: '120px', boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)'}} ><Typography style={{fontSize: '18px', marginLeft: '-10px'}}>{reps} Reps</Typography></Button>
      <Button style={{height: '50px', minWidth: '120px', maxWidth: '120px',   boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)'}}><Typography style={{fontSize: '18px', marginLeft: '0px'}}>{weight}lbs</Typography></Button>


    </Stack>
               
          {/* <p >{calories}calories</p>
          <p  style={{marginLeft: '10px'}}>{protein}g protein</p>
          <p  style={{marginLeft: '10px'}}>{carbs}g carbs</p>
          <p  style={{marginLeft: '10px'}}>{fat}g fat</p> */}
          {/* </div> */}
          {/* <h2>Meal Prep Time</h2> */}
          {/* <Button style={{height: '50px', minWidth: '120px', maxWidth: '120px',   boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)'}}>  <div style={{display: 'flex'}}>   <AccessTimeIcon/>
        <Typography style={{fontSize: '18px', marginLeft: '10px'}}>{minutesToComplete}m</Typography></div></Button> */}
          {/* <Button>
          <SpeedIcon/>
          <p>{minutesToComplete}m</p>
          </Button> */}
         
          {/* <h2>Cost</h2>
          <Button style={{height: '50px', minWidth: '120px', maxWidth: '120px',   boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)'}}>  <div style={{display: 'flex'}}> <AttachMoneyIcon/>
        <Typography style={{fontSize: '18px'}}>{cost}</Typography></div></Button>
       

        
          <h2>Instructions</h2>
        <ReactMarkdown >{instructions}</ReactMarkdown> */}
        </div>
        </div>
        </div>
      </WrapperChild2>
      <WrapperChild style={{marginRight: '20px'}}>
        {/* <div style={{display: 'flex', padding: '10px', flexDirection: 'row', boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 20%)', borderRadius: '10px' }}> 
        <div style={{ width: '30%'}}>
      <Link to='/profile'><img style={{border: '1px solid white', height: '100px', width: '100px'}} src={user.image} alt="" className="topbarImg"/></Link>
      </div>
      <div style={{display: 'flex', padding: '20px', marginLeft: '-40px', flexDirection: 'column',  width: '50%'}}><span style={{fontSize: '16px', fontFamily: 'sans-serif'}}>Test User</span><br/><span style={{fontSize: '12px', fontFamily: 'sans-serif'}}>@{user.username}</span><br/>
      <span style={{fontSize: '14px', fontFamily: 'sans-serif'}}>{user.bio}</span>
      </div>
      </div> */}
      <div style={{marginLeft: '30px', marginTop: '10px',  boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 15%)', padding: '20px', width: '100%', height: '100%'}}>
        <h2 style={{width: '50%', marginLeft: '12%', marginTop: '60px'}}>Create Workout</h2>
        <form onSubmit={handleSubmit}>
          <FormField style={{ width: '50%',  marginTop: '25px', marginLeft: '12%'}}>
            <Label  style={{paddingBottom: '10px'}} htmlFor="title">Title</Label>
            <Input
            style={{padding: '10px'}}
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField style={{ width: '50%',  marginTop: '25px', marginLeft: '12%'}}>
            <Label  style={{paddingBottom: '10px'}} htmlFor="description">Description</Label>
            <Input
            style={{padding: '10px'}}
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
          <FormField style={{ width: '50%',  marginTop: '25px', marginLeft: '12%'}}>
            <Label htmlFor="image">Image</Label>
            <Input
            style={{padding: '10px'}}
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </FormField>
          <FormField style={{ width: '50%',  marginTop: '25px', marginLeft: '12%'}}>
            <Label htmlFor="sets">Sets</Label>
            <Input
            style={{padding: '10px'}}
              type="number"
              id="sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </FormField>
          <FormField style={{ width: '50%',  marginTop: '25px', marginLeft: '12%'}}>
            <Label htmlFor="reps">Reps</Label>
            <Input
            style={{padding: '10px'}}
              type="number"
              id="reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </FormField>
          <FormField style={{ width: '50%',  marginTop: '25px', marginLeft: '12%'}}>
            <Label htmlFor="weight">Weight</Label>
            <Input
            style={{padding: '10px'}}
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </FormField>
        
        
       
          <FormField style={{ width: '60%',  marginTop: '40px', marginLeft: '12%'}}>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Create Workout"}
            </Button>
          </FormField>
          <FormField>
            {errors?.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
        </div>
      </WrapperChild>
    </Wrapper>
     {/* <Footer/> */}
     </div>
  );
}

const Wrapper = styled.section`
  max-width: 100%;
  margin-left: 0px;
  margin-top: 50px;
  padding-left: 0px;
  display: flex;
  gap: 24px;
  
`;

const WrapperChild = styled.div`
  flex: 1;
// border: 1px solid black;
`;

const WrapperChild2 = styled.div`
 padding: 20px;
 width: 50%;
//  border: 1px solid red;
`;
export default NewWorkouts;
