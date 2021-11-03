import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Team from "./Components/Team/Team";
import Home from "./Components/Home/Home";
import Rooms from "./Components/Posts/Listings/Rooms";
import Roommates from "./Components/Posts/Listings/Roommates";
import RoomDetails from "./Components/Posts/PostDetails/RoomDetails";
import RoommateDetails from "./Components/Posts/PostDetails/RoommateDetails";
import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Registeration";
import CreatePost from "./Components/Posts/CreatePost/CreatePost";
import Error from "./Components/Error/Error";
import Alex from "./Components/Team/TeamMembers/alex";
import Nakulan from "./Components/Team/TeamMembers/nakulan";
import Jasmine from "./Components/Team/TeamMembers/jasmine";
import Joshua from "./Components/Team/TeamMembers/josh";
import Anmol from "./Components/Team/TeamMembers/anmol";
import Alan from "./Components/Team/TeamMembers/alan";
import Rasul from "./Components/Team/TeamMembers/rasul";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <Router>
            <div className="app">
                <ToastContainer />
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/rooms" exact component={Rooms} />
                    <Route path="/roommates" exact component={Roommates} />
                    <Route path="/team" exact component={Team} />
                    <Route path="/createpost" exact component={CreatePost} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/post/:id" exact component={RoomDetails} />
                    <Route path="/user/:id" exact component={RoommateDetails} />
                    <Route path="/team/alex" exact component={Alex} />
                    <Route path="/team/nakulan" exact component={Nakulan} />
                    <Route path="/team/jasmine" exact component={Jasmine} />
                    <Route path="/team/josh" exact component={Joshua} />
                    <Route path="/team/anmol" exact component={Anmol} />
                    <Route path="/team/alan" exact component={Alan} />
                    <Route path="/team/rasul" exact component={Rasul} />
                    <Route path="*" component={Error} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
