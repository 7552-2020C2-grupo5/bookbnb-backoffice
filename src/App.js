import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import UsersList from "./views/UsersList";
import UserProfile from "./views/UserProfile";

export default function App() {
    return (
        <div className="App">
            <Router>
                <Route exact path={'/users'} component={UsersList}/>
                <Route exact path={'/users/:id'} component={UserProfile}/>
            </Router>
        </div>
    );
}

