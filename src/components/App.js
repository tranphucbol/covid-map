import React from 'react';
import CovidDashboard from "./CovidDashboard";
import CovidChart from "./CovidChart"
import NavBar from "./NavBar"
import {  BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <div className="container mx-auto">
            <Router basename="/covid-map">
                <NavBar />
                <Switch>
                    <Route exact path={["/map", "/"]}>
                        <CovidDashboard/>
                    </Route>
                    <Route path="/stats">
                        <CovidChart/>
                    </Route>
                </Switch>    
            </Router>
        </div>
        
    );
}

export default App;
