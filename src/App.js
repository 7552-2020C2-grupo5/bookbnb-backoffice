import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import UsersList from "./components/views/UsersList";
import UserProfile from "./components/views/UserProfile";
import {app} from "./app/app";
import PublicationsList from "./components/views/PublicationsList";
import Publication from "./components/views/Publication";
import Login from "./components/views/Login";
import Home from "./components/views/Home";
import PrivateRoute from "./components/common/PrivateRoute";
import NewAdmin from "./components/views/NewAdmin";
import AdminsList from "./components/views/AdminsList";
import AdminProfile from "./components/views/AdminProfile";

export default function App() {
    const routes = app.routes();

    return (
        <Router>
            <Route exact path={routes.login} component={Login}/>
            <PrivateRoute exact path={routes.home} component={Home}/>
            <PrivateRoute exact path={routes.users} component={UsersList}/>
            <PrivateRoute exact path={routes.userProfile} component={UserProfile}/>
            <PrivateRoute exact path={routes.publications} component={PublicationsList}/>
            <PrivateRoute exact path={routes.publication} component={Publication}/>
            <PrivateRoute exact path={routes.admins} component={AdminsList}/>
            <PrivateRoute exact path={routes.newAdmin} component={NewAdmin}/>
            <PrivateRoute exact path={routes.adminProfile} component={AdminProfile}/>
        </Router>
    );
}