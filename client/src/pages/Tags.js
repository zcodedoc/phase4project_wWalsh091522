import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Tag from "../components/Tag";


function Tags({user, setUser}) {
    const [workouts, setWorkouts] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch("/workouts")
          .then((r) => r.json())
          .then(setWorkouts);
          fetch("/tags")
          .then((r) => r.json())
          .then(setTags);
          fetch("/me")
          .then((r) => r.json())
          .then(setUser);
    
      }, []);

return (
        <div style={{width: '100%', display: 'flex'}}>
            <Wrapper>
                <div style={{width: '100%', marginLeft: '0%', marginTop: '0%', border: '0px solid black'}}>
                    <h2 style={{marginLeft: '10%', width: '50%',  paddingLeft: '0px',  marginTop: '2.5%', marginBottom: '5%', padding: '10px', border: '0px solid black'}}>Browse By Target Muscle Group</h2>
                </div>
                <Tag user={user} setUser={setUser} />
            </Wrapper>
        </div>
);
}

const Wrapper = styled.section`
min-width: 100%;
min-height: 100%;
margin-top: 5%;
margin-left: 0%;
background-color: white;
box-shadow: 0 0.055em 0.225em rgb(20 20 20 / 15%);
`;

export default Tags;