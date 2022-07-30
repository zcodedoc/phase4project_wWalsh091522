import React, { useState, useEffect } from "react";
import "./Post.css";
import Typography from '@mui/material/Typography';

function Tag(tag) {
    const { id, name} = tag;
    const [tags, setTags] = useState([]);
    const [workouts, setWorkouts] = useState([]);

      
  useEffect(() => {
    fetch(`/tags`)
      .then((r) => r.json())
      .then(setTags);
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);

    return (
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{border: '0px solid black', overflow: 'scroll', padding: '0px', maxWidth: '80%', marginLeft: '10%', display: 'flex', flexDirection: 'row', maxHeight: '100%'}}>
                {tags.length > 0 ? (
                  tags.map((tag) => (
                  <div style={{marginLeft: '10px', height: '100px', maxWidth: '70%',  marginLeft: '5%', backgroundColor: "white", padding: '0px', height: '300px', border: '0px solid black', marginBottom: '50px'}}>
                    <div style={{height: '200px', border: '0px solid black', borderRadius: '10px'}}>
                      <img style={{border: '0px solid black',  minHeight: '150px',maxHeight: '150px', minWidth: '150px', maxWidth: '150px', objectFit: 'cover', borderRadius: '100px'}} src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"></img>
                    </div>
                    <div style={{boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 40%)',  borderRadius: '100px', padding: '50px', marginTop: '-200px', marginBottom: '20px', minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px'}}>
                      <div style={{boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 40%)', borderRadius: '4px', display: 'flex', marginTop: '10px', padding: '0px', justifyContent: 'center', backgroundColor: 'black', opacity: '80%', minWidth: '140px', marginLeft: '-90%', textAlign: 'center'}}>
                          <div style={{border: '0px solid red', display: 'flex', flexDirection: 'row', padding: '10px', marginLeft: '0px'}}>
                            <Typography style={{color: 'white', fontSize: '12px', marginRight: '0px'}}>{tag.name}</Typography>
                            <Typography style={{color: 'white', fontSize: '12px'}}>({tag.workout_tags.length})</Typography>
                          </div>
                      </div>
                    </div>
              </div>
              ))
              ) : (null)
            }
    
             
            </div>
        </div>
    );
}
export default Tag;
