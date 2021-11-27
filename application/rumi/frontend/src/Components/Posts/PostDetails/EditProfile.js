import React from 'react';
import axios from 'axios';
import configData from "../../../Configs/config.json";

import { Link, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
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
        //const[username,setUsername] = React.useState('');
        const[password,setPassword] = React.useState('');
        const[email,setEmail] = React.useState('');
        const[description,setDescription] =React.useState('');
        const[gender,setGender] = React.useState('');
        const[school,setSchool] = React.useState('');
        const[major,setMajor] = React.useState('');
        const[smoker,setSmoker] = React.useState('');
        const[pets,setPets] = React.useState('');
       // const[originalUsername,getOriginalUsername] = React.useState('');
        const originalUsername=Cookies.get('username');
        // const handleOriginalUseraname = (e) =>{
        //   getOriginalUsername(e.target.value);
        // }
        // const handleUsername = (e) =>{
        
        //     setUsername(Cookies.get("username"));
        //     }
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
        email:email,
        password: password,
        description: description,
        gender: gender,
        school: school,
        major: major,
        smoker: smoker,
        pets: pets,   
        originalUsername:originalUsername,    
          };
        const handlePost = () => {
            axios.post(configData.SERVER_URL + "users/update", data)
           // .then(document.write(json));
        .then((response) =>{
        alert(response.data);
    
        })
        }
    
      return (
        <div>
          <h1>Edit Details</h1>
          <form>
          <label>Set new data for {originalUsername} </label>
         <br/>
          <label>Email </label>
          <input value = {email} defaultValue={null}  onChange={handleEmail}/>
          <br/>
          <label>Password </label>
          <input value = {password} defaultValue={null}  onChange={handlePassword}/>
          <br/>
          <label>Description </label>
          <input value = {description} defaultValue={null}  onChange={handleDescription}/>
          <br/>
          <label>gender </label>
          <input value = {gender}  defaultValue={null} onChange={handleGender}/>
          <br/>
          <label>school </label>
          <input value = {school}  defaultValue={null} onChange={handleSchool}/>
          <br/>
          <label>major </label>
          <input value = {major} defaultValue={null}  onChange={handleMajor}/>
          <br/>
          <label>smoker </label>
          <input value = {smoker}  defaultValue={null} onChange={handleSmoker}/>
          <br/>
          <label>pets </label>
          <input value = {pets} defaultValue={null}  onChange={handlePets}/>
          <br/>
          <button onClick={history.goBack}>Cancel</button>
          <button onClick={handlePost}>Save</button>
          <br/>
          </form>
        </div>
      );
    };

export default EditProfile