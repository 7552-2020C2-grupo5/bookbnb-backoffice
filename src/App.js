import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import UsersList from "./components/views/UsersList";
import UserProfile from "./components/views/UserProfile";
import {app} from "./app/app";
import PublicationsList from "./components/views/PublicationsList";
import Publication from "./components/views/Publication";

export default function App() {
    const routes = app.routes();

    return (
        <Router>
            <Route exact path={routes.users} component={UsersList}/>
            <Route exact path={routes.userProfile} component={UserProfile}/>
            <Route exact path={routes.publications} component={PublicationsList}/>
            <Route exact path={routes.publication} component={Publication}/>
        </Router>
    );
}