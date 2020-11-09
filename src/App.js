import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import UsersList from "./views/UsersList";
import UserProfile from "./views/UserProfile";

export default function App() {
    return (
        <Router>
            <Route exact path={'/'} component={UsersList}/>
            <Route exact path={'/users/:id'} component={UserProfile}/>
        </Router>
    );
}