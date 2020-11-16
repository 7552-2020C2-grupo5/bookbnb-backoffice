import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Loader from "../../common/Loader";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import StaticField from "../../common/StaticField";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

function PublicationInfo({rooms, beds, bathrooms, pricePerNight}) {
    return (
        <Grid container direction="row">
            <Grid item md={3} xs={6}>
                <StaticField label='Habitaciones' value={rooms}/>
            </Grid>
            <Grid item md={3} xs={6}>
                <StaticField label='Camas' value={beds}/>
            </Grid>
            <Grid item md={3} xs={6}>
                <StaticField label='Baños' value={bathrooms}/>
            </Grid>
            <Grid item md={3} xs={6}>
                <StaticField label='Precio por noche' value={pricePerNight}/>
            </Grid>
        </Grid>
    );
}


export default function Publication(props) {
    const [publication, setPublication] = useState({});
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    const onResponse = (response) => {
        debugger;
        setPublication(response.data);
        setTimeout(() => setLoading(false), 1000);
    }

    useEffect(() => {
        setLoading(true);
        axios.get("https://bookbnb5-publications.herokuapp.com/v1/publication/" + props.match.params.id)
            .then(onResponse);
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
                        <Typography variant={'h4'} gutterBottom>
                            {publication.title}
                        </Typography>
                    </CardContent>
                    <CardContent>

                    </CardContent>
                    <CardContent>
                        <PublicationInfo bathrooms={publication.bathrooms} beds={publication.beds}
                                         pricePerNight={publication.price_per_night} rooms={publication.rooms}/>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}