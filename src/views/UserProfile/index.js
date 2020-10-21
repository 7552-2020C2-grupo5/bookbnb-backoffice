import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import UserAvatar from "./UserAvatar";
import StaticField from "../../components/StaticField";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContetn: 'center',
    },
}));


export default function UserProfile(props) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        console.log(props.match.params.id);
        axios.get("https://reqres.in/api/users/" + props.match.params.id)
            .then((response) => {
            setUser(response.data.data);
            setLoading(false);
        });
    });

    const content = () => {
        if (loading) {
            return(
                <Box>
                    <CircularProgress/>
                </Box>
            );
        }
        return (
            <Card classeName={classes.root}>
                <CardContent>
                    <UserAvatar user={user}/>
                </CardContent>
                <Divider/>
                <CardContent>
                    <Grid container direction="row">
                        <Grid item md={4} xs={12}>
                            <StaticField label='Nombre' value={user.first_name}/>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <StaticField label='Apellido' value={user.last_name}/>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <StaticField label='Email' value={user.email}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    return (
        <Layout content={content()}/>
    );
}