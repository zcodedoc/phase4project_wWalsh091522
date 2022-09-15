import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tag from "../components/Tag";
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from "react-router";
import TextField from '@mui/material/TextField';


const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 3.5,
    borderRadius: '20px'
  };

function Tags({user, setUser}) {
const [tagName, setTagName] = useState("");
const [open, setOpen] = useState("");
const [errors, setErrors] = useState([]);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const history = useHistory();

function createTag() {
    fetch("/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: tagName
        }),
      }).then((r) => {
        if (r.ok) {
          setOpen(false);
          history.push("/");
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
    });
}
return (
        <div style={{width: '100%', display: 'flex'}}>
            <Wrapper>
                <div style={{width: '100%', marginLeft: '0%', marginTop: '0%', border: '0px solid black', display: 'flex'}}>
                    <h2 style={{marginLeft: '10%', width: '15%',  paddingLeft: '0px',  marginTop: '2.5%', marginBottom: '5%', padding: '10px', border: '0px solid black'}}>Browse By Tag</h2>
                    <Fab onClick={setOpen} style={{color: 'white', backgroundColor: '#1877f2', padding: '10px', boxShadow: '0 0.055em 0.225em rgb(20 20 20 / 25%)', height: '90%', width: '10%', marginTop: '2.5%', border: '0px solid red', marginLeft: '0%',}} variant="extended">
                      <AddIcon sx={{ mr: 1 }} />
                      <Typography style={{fontSize: '14px'}}>
                        Create Tag
                      </Typography>
                    </Fab>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <Box sx={style}>
                          <div style={{display: 'flex', justifyContent: 'space-between', height: '60px', marginBottom: '20px' }}>
                            <h3 style={{marginLeft: '20px', textAlign: 'center'}} >Create Tag</h3>
                              <Button onClick={handleClose} style={{ width: '5%', marginTop: '0%', marginLeft: '0%', mr: 1, backgroundColor:'#ffffff', color: '#black' }} variant="extended">
                                <CloseIcon sx={{ mr: 1, marginLeft: '10px' }} />
                              </Button>    
                          </div>
                          <div style={{border: '0px solid red', marginTop: '5px', marginBottom: '20px'}}>
                            <TextField label="Name" variant="outlined" 
                                style={{maxWidth: '50%', marginLeft: '0%', borderRadius: '10px'}}
                                type="text"
                                id="tagName"
                                value={tagName} 
                                onChange = {(e) => setTagName(e.target.value)}
                            />
                          </div>
                          <Button style={{backgroundColor: 'black', color: 'white'}} onClick={createTag}>Submit</Button>
                        </Box>
                      </Fade>
                    </Modal>
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