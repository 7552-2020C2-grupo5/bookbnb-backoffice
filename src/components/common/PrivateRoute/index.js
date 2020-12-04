import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {app} from "../../../app/app";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            app.thereIsLoggedInUser() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;