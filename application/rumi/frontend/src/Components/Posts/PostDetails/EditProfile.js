import React from 'react';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
const EditProfile = () => {

    let history = useHistory();
        const editValues = {
            username: "",
            email: "",
            password: "",
            description: "",
            gender: "",
            school: "",
            major: "",
            smoker: "",
            pets: "",
        };
    
        //const[email,setEmail] = React.useState('');
        const[username,setUsername] = React.useState('');
        const[password,setPassword] = React.useState('');
        const[email,setEmail] = React.useState('');
        const[description,setDescription] =React.useState('');
        const[gender,setGender] = React.useState('');
        const[school,setSchool] = React.useState('');
        const[major,setMajor] = React.useState('');
        const[smoker,setSmoker] = React.useState('');
        const[pets,setPets] = React.useState('');
        const handleUsername = (e) =>{
        
            setUsername(e.target.value);
            }
        const handlePassword = (e)=>{
        setPassword(e.target.value);
        }
        const handleEmail = (e)=>{
          setEmail(e.target.value);
        }
          const handleDescription =(e)=>{
            setDescription(e.target.value);
          };
          const handleGender =(e)=>{
            setGender(e.target.value);
          };
        const handleSchool = (e)=>{
            setSchool(e.target.value);
        }
        const handleMajor = (e)=>{
            setMajor(e.target.value);
        }
        const handleSmoker = (e)=>{
            setSmoker(e.target.value);
        }
        const handlePets = (e)=>{
            setPets(e.target.value);
        }
        const data= {
        username:username,
        email:email,
        password: password,
        description: description,
          
            
          };
        const handlePost = () => {
          const json = JSON.stringify(data)
            axios.post('/api/postListing', json)
           // .then(document.write(json));
        .then((response) =>{
        alert(response.data);
    
        })
        }
    
      return (
        <div>
          <h1>Edit Details</h1>
          <form>
          <label>Username </label>
          <input value = {username} onChange={handleUsername}/>
          <br/>
          <label>Email </label>
          <input value = {email} onChange={handleEmail}/>
          <br/>
          <label>Password </label>
          <input value = {password} onChange={handlePassword}/>
          <br/>
          <label>Description </label>
          <input value = {description} onChange={handleDescription}/>
          <br/>
          <label>gender </label>
          <input value = {gender} onChange={handleGender}/>
          <br/>
          <label>school </label>
          <input value = {school} onChange={handleSchool}/>
          <br/>
          <label>major </label>
          <input value = {major} onChange={handleMajor}/>
          <br/>
          <label>smoker </label>
          <input value = {smoker} onChange={handleSmoker}/>
          <br/>
          <label>pets </label>
          <input value = {pets} onChange={handlePets}/>
          <br/>
          <button onClick={history.goBack}>Cancel</button>
          <button onClick={handlePost}>Save</button>
          <br/>
          </form>
        </div>
      );
    };

export default EditProfile