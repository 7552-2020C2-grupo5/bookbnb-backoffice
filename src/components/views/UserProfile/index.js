import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import UserAvatar from "./UserAvatar";
import Container from "@material-ui/core/Container";
import Loader from "../../common/Loader";
import UserData from "./UserData";
import {useStyles} from "./styles";
import {app} from "../../../app/app";


export default function UserProfile(props) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    const handleResponse = (responseData) => {
        debugger;
        setUser(responseData);
        setTimeout(() => setLoading(false), 1000);
    }

    useEffect(() => {
        setLoading(true);
        app.apiClient().profileData({id: props.match.params.id}).then(handleResponse);
    }, [props.match.params.id]);

    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return (
            <Container>
                <Card className={classes.root}>
                    <CardContent>
                        <UserAvatar name={user.first_name} surname={user.last_name} avatarSrc={user.avatar}/>
                    </CardContent>
                    <Divider/>
                    <CardContent>
                        <UserData name={user.first_name} surname={user.last_name} email={user.email}/>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}