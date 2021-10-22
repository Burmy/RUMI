import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Team from "./Components/Team/Team";
import Home from "./Components/Home/Home";
import Rooms from "./Components/Listings/Rooms";
import Roommates from "./Components/Listings/Roommates";
import Members from "./Components/Team/Members";
import Posts from "./Components/Posts/Posts";
import Login from "./Components/Forms/Login/Login";
import Register from "./Components/Forms/Registeration/Registeration";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/rooms" exact component={Rooms} />
                    <Route path="/roommates" exact component={Roommates} />
                    <Route path="/team" exact component={Team} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/post/:id" exact component={Posts} />
                </Switch>
                <Route path="/team/:member" exact component={Members} />
            </div>
        </Router>
    );
}

export default App;
