import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function NewWorkouts({ user, setUser }) {
  const [target, setTarget] = useState(0);
  const [target2, setTarget2] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagOption, setTagOption] = useState('');
  const [workoutId, setWorkoutId] = useState();
  const [workouts, setWorkouts] = useState([]);
  const history = useHistory();

  const handleChange = (event) => {
    setTarget(event.target.value);
  };

  useEffect(() => {
    fetch(`/tags`)
      .then((r) => r.json())
      .then(setTags);
      fetch(`/workouts`)
      .then((r) => r.json())
      .then((r) => setWorkoutId(r[r.length - 1].id + 1)
        );
    }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    createWorkout();
    createWorkoutTag();
  }

  function createWorkout() {
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
         createWorkoutTag();
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    }).then(() => {
      console.log("HITTING HERE")
    });
  }

  function createWorkoutTag() {
    fetch("/workout_tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag_id: target,
        workout_id: workoutId,
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
                    <div style={{marginLeft: '10px',  boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 25%)', padding: '20px', width: '90%', height: '90%',}}>
                        <img style={{width: '100%', height: '400px', objectFit: 'cover', padding: '5px', borderRadius: '20px'}} src={image}/>
                        <h1 style={{marginLeft: '40px', padding: '0px'}}>{title}</h1>
                        <h1 style={{marginLeft: '40px', padding: '0px'}}>{description}</h1>
                        <Typography style={{marginLeft: '10px', padding: '0px'}}>
                          <p style={{marginTop: '-10px', marginLeft: '30px', padding: '10px',  fontSize: '18px'}}>By 
                          <img style={{border: '1px solid white', boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 45%)', marginBottom: '-10px',marginLeft: '10px', height: '35px', minWidth: '35px', borderRadius: '20px'}}src={user.image}/> @{user.username}</p>
                        </Typography>
                        <div style={{marginLeft: '40px'}}>
                            <div style={{ height: '300px', marginBottom: '80px'}}>
                                <h2>Stats</h2>
                                    <Stack style={{marginLeft: '5px', marginTop: '5px'}} spacing={4} direction="row">
                                        <Button style={{height: '50px', minWidth: '120px', maxWidth: '120px',   boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)'}}><Typography style={{fontSize: '18px', marginLeft: '-10px'}}>{sets} Sets</Typography></Button>
                                        <Button style={{height: '50px', minWidth: '120px', maxWidth: '120px', boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)'}} ><Typography style={{fontSize: '18px', marginLeft: '-10px'}}>{reps} Reps</Typography></Button>
                                        <Button style={{height: '50px', minWidth: '120px', maxWidth: '120px',   boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 15%)'}}><Typography style={{fontSize: '18px', marginLeft: '0px'}}>{weight}lbs</Typography></Button>
                                    </Stack>
                            </div>
                        </div>
                    </div>
                </WrapperChild2>
                <WrapperChild style={{marginRight: '0px'}}>
                    <div style={{marginLeft: '0px', marginTop: '0px',  boxShadow:' 0 0.055em 0.225em rgb(20 20 20 / 25%)', padding: '20px', width: '90%', height: '90%', paddingLeft: '30px'}}>
                        <h2 style={{width: '50%', marginLeft: '12%', marginTop: '30px'}}>Create Workout</h2>
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
                            <FormField style={{ width: '50%',  marginTop: '25px', marginLeft: '12%'}}>
                                <Label  style={{paddingBottom: '10px'}} htmlFor="title">Target(primary)</Label>
                                <TextField
                                  style={{padding: '10px', width: '300px'}}
                                  id="outlined-basic"
                                  select
                                  value={target}
                                  onChange={handleChange}
                                >
                                {tags.map((tag) => (
                                <MenuItem style={{display: 'flex', flexDirection: 'column', margin: '5px', height: '40px'}} key={tag.name} value={tag.id}>
                                  {tag.name}
                                </MenuItem>
                                ))}
                                </TextField>
                            </FormField>
                            <FormField style={{ width: '60%',  marginTop: '40px', marginLeft: '12%'}}>
                                <Button color="primary" >
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
        </div>
  );
}

const Wrapper = styled.section`
  max-width: 100%;
  margin-left: 0px;
  margin-top: 50px;
  padding-left: 0px;
  display: flex;
  gap: 0px;
  
`;

const WrapperChild = styled.div`
padding: 20px;
width: 50%;
`;

const WrapperChild2 = styled.div`
 padding: 20px;
 width: 50%;
`;
export default NewWorkouts;
