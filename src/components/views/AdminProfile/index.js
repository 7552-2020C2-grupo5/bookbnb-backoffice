import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Loader from "../../common/Loader";
import {useStyles} from "./styles";
import {app} from "../../../app/app";
import {formatUTCDateString} from "../../../utils";
import UserData from "../UserProfile/UserData";
import UserAvatar from "../UserProfile/UserAvatar";


export default function AdminProfile(props) {
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(true);
    const classes = useStyles();


    const handleResponse = (response) => {
        setAdmin(response.content());
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        app.apiClient().getAdminProfile(props.match.params.id, handleResponse);
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
                        <UserAvatar name={admin.first_name} surname={admin.last_name} avatarSrc={""}/>
                    </CardContent>
                    <Divider/>
                    <CardContent>
                        <UserData name={admin.first_name} surname={admin.last_name} email={admin.email}
                                  registerDate={formatUTCDateString(admin.register_date)}/>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}