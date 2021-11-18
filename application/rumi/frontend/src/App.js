import { useState, React } from "react";
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
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./Helpers/AuthContext";
import ProtectedRoute from "./Helpers/ProtectedRoute";
import DashboardComponent from "./Components/Dashboard/dashboard";
//import Chat from "./Components/Chat/Chat"
import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-pBBNyIuWIEs-fQl60G-fvyfoKyobDC4",
  authDomain: "csc648rumi.firebaseapp.com",
  projectId: "csc648rumi",
  storageBucket: "csc648rumi.appspot.com",
  messagingSenderId: "807183421594",
  appId: "1:807183421594:web:1c5c2ee1b2efb53b9a0f23",
  measurementId: "G-B7GP0DS5CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
    const [authState, setAuthState] = useState(false);
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <Router>
                <div className="app">
                    <ToastContainer />
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/rooms" exact component={Rooms} />
                        <Route path="/roommates" exact component={Roommates} />
                        <Route path="/team" exact component={Team} />
                        <ProtectedRoute path="/createpost" exact component={CreatePost} />
                        <Route path="/dashboard" exact component={DashboardComponent} />
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
        </AuthContext.Provider>
    );
}

export default App;
