import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Loader from "../../common/Loader";
import {PublicationImages} from "./PublicationImages";
import {PublicationInfo} from "./PublicationInfo";
import {useStyles} from "./styles";
import {PublicationTitle} from "./PublicationTitle";
import {app} from "../../../app/app";
import {getDateStringFrom} from "../../../utils";
import Typography from "@material-ui/core/Typography";

export default function Publication(props) {
    const [publication, setPublication] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const [notification, setNotification] = useState({message: "", isError: false, open: false});


    const handleResponse = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(),
                isError: true, open: true});
            setPublication(undefined);
        } else {
            setPublication(response.content());
        }
        setLoading(false);
    }

    useEffect(() => {
        //TODO: Manejar errores
        setLoading(true);
        app.apiClient().getPublication(props.match.params.id, handleResponse);
    }, [props.match.params.id]);

    const publicationImages = () => {
        const images = [];
        for (const image of publication.images) {
            images.push(image.url);
        }
        return images;
    };

    const publicationDate = () => {
        return getDateStringFrom(publication.publication_date);
    }

    const publicationContent = () => {
        if (publication !== undefined) {
            return (
                <Card className={classes.root}>
                    <CardContent>
                        <PublicationTitle description={publication.description}
                                          title={publication.title}/>
                    </CardContent>
                    <CardContent className={classes.images}>
                        <PublicationImages images={publicationImages()}/>
                    </CardContent>
                    <CardContent>
                        <PublicationInfo bathrooms={publication.bathrooms} beds={publication.beds}
                                         pricePerNight={publication.price_per_night} rooms={publication.rooms}
                                         description={publication.description} publishDate={publicationDate()}
                                         latitude={publication.loc.latitude} longitude={publication.loc.longitude}
                        />
                    </CardContent>
                </Card>
            );
        }
        return <Typography variant="h4">No se pudo cargar la publicación</Typography>
    }

    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return (
            <Container>
                {publicationContent()}
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}