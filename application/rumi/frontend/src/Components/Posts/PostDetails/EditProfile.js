import React from 'react';
import axios from 'axios';
import configData from "../../../Configs/config.json";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";

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
       history.goBack()
    
        })
        }
    
      return (
        <div>
          <h1>Edit Details</h1>
          <form>
          <label>Set new data for {originalUsername} </label>
          <br/>
          <label>Description </label>
          <input value = {description} defaultValue={null}  onChange={handleDescription}/>
          <br/>
          <label>school </label>
          <input value = {school}  defaultValue={null} onChange={handleSchool}/>
          <br/>
          <label>gender </label>
 
          <select value={gender} onChange={handleGender} defaultValue={null}>
                            <option>Select your Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            </select>
          <br/>
        
          <label>major </label>
          <select value={major} onChange={handleMajor} defaultValue={null}>
                            <option value="0">Select a Major</option>
                            <option value="9">Accounting</option>
                            <option value="10">Computer Science</option>
                            <option value="11">Finance</option>
                            <option value="12">Business Management</option>
                            <option value="13">Biology</option>
                            <option value="14">Economics</option>
                            <option value="15">Chinese</option>
                            <option value="16">English</option>
                            <option value="17">Law</option>
                            <option value="18">Physical Science</option>
          </select>
          <br/>
          <label>smoker </label>
          <select value={smoker} onChange={handleSmoker} defaultValue={null}>
              <option>...</option>
             <option value="1" id='smok1'>I smoke</option>
             <option value="0" id='smok2'>I dont Smoke</option>
            
          </select>
          <br/>
      
          <label>pets </label>

          <select value={pets} onChange={handlePets} defaultValue={null}>
              <option>...</option>
             <option value="1" id='pet1'>I have pets</option>
             <option value="0" id='pet2'>I dont have pets</option>
            </select>
          <br/>


          <button onClick={history.goBack}>Cancel</button>
          <button onClick={handlePost}>Save</button>
          <br/>
          </form>
        </div>
      );
    };

export default EditProfile