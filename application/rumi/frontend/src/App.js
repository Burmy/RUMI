import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Team from "./Components/Team/Team";
import Home from "./Components/Home/Home";
import Members from "./Components/Team/Members";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/team" exact component={Team} />
                </Switch>
                <Route path="/team/:member" exact component={Members} />
            </div>
        </Router>
    );
}

export default App;
