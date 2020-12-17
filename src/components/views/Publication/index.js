import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Loader from "../../common/Loader";
import {PublicationImages} from "./PublicationImages";
import {PublicationInfo} from "./PublicationInfo";
import {useStyles} from "./styles";
import {PublicationTitle} from "./PublicationTitle";
import {app} from "../../../app/app";

export default function Publication(props) {
    const [publication, setPublication] = useState({});
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    const handleResponse = (response) => {
        setPublication(response);
        setTimeout(() => setLoading(false), 1000);
    }

    useEffect(() => {
        setLoading(true);
        app.apiClient().getPublication(props.match.params.id)
            .then(handleResponse);
    }, [props.match.params.id]);

    const publicationImages = () => {
        const images = [
            'https://i2.wp.com/www.arquitour.com/wp-content/uploads/2009/02/calamuchita-20.jpg?w=749&h=891&crop',
            'https://i2.wp.com/www.arquitour.com/wp-content/uploads/2009/02/calamuchita-7.jpg?resize=590%2C391'
        ]
        return images;
    };

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
                        <PublicationTitle description={publication.description}
                                          title={publication.title}/>
                    </CardContent>
                    <CardContent>
                        <PublicationImages images={publicationImages()}/>
                    </CardContent>
                    <CardContent>
                        <PublicationInfo bathrooms={publication.bathrooms} beds={publication.beds}
                                         pricePerNight={publication.price_per_night} rooms={publication.rooms}
                                         description={publication.description}/>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}