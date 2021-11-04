import React, { Component } from "react";
import "./Navbar.css";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Link, useHistory} from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import UserProfile from "../../helpers/UserProfile";
import Axios from "axios";


export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.isLoggedIn();
        this.renderLoginRoutes();
    }
    
    state = {
        isOpen: false
       
    };
    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
       
    };
    //this func doesnt update when hitting logout button
    isLoggedIn(){
        if(localStorage.getItem('user')!=null){
            return true;
        }else{
         return false;
        }
     }
 renderLoginRoutes(){
     if(this.isLoggedIn=true){
         return <Link classname="nav-links" onClick={this.logout} to="/"> Log out </Link>
     }else {
         return <Link className="nav-links" to="/login">LogIn</Link>
         
         
         
         }
 }
 renderRegister(){
     if(this.isLoggedIn=false){
         return <Link className="nav-links" to="/register">SignUp</Link>
     }
     return null;
 }
 logout(){
     UserProfile.setName="";
     localStorage.clear();
     console.log(localStorage.getItem('user'));
     Axios.post("http://localhost:3001/users/logout")
     .then((res)=>{
     console.log(res);
     });
     //this.isLoggedIn();
    // window.location.reload(true);
 }
    render() {
        
        return (
            <div>
                <div className="demo-only">SFSU Software Engineering Project CSC 648-848, Fall 2021. For Demonstration Only</div>
                <div className="navbar">
                    <div className="resp-nav-links">
                        <Link className="nav-links" to="/">
                            Home
                        </Link>
                        <Link className="nav-links" to="/team">
                            About
                        </Link>
                    </div>
                    <div className="logo-div">
                        <Link to="/">
                            <div className="logo"></div>
                            RUMI
                        </Link>
                    </div>
                    <div className="resp-nav-links">
                        <Link className="nav-links" to="/createpost">
                            Create
                        </Link>
                        {this.renderLoginRoutes()}
                        {this.renderRegister()}
                    </div>

                    <div className="hamburger" onClick={this.handleToggle}>
                        <HiOutlineMenuAlt3 />
                    </div>
                </div>
            </div>
        );
    }
   
    
    
}
