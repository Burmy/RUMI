import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Team from "./Components/Team/Team";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/team" exact component={Team} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
