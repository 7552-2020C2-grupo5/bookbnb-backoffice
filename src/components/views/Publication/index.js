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
import {formatUTCDateString} from "../../../utils";
import Typography from "@material-ui/core/Typography";

export default function Publication(props) {
    const [publication, setPublication] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const [notification, setNotification] = useState({message: "", isError: false, open: false});
    const [address, setAddress] = useState(undefined);

    const onNotificationClosed = () => {
        setNotification({...notification, open: false})
    };


    const handleGetLocationResponse = (response) => {
        if (!response.hasError()) {
            setAddress(response.address());
        }
        setLoading(false);
    }

    const handleGetPublicationResponse = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(),
                isError: true, open: true});
            setPublication(undefined);
            setLoading(false);
        } else {
            const content = response.content();
            setPublication(content);
            app.apiClient().getLocationFromCoordinates(content.loc.latitude, content.loc.longitude,
                handleGetLocationResponse)
        }
    }

    useEffect(() => {
        setLoading(true);
        app.apiClient().getPublication(props.match.params.id, handleGetPublicationResponse);
    }, [props.match.params.id]);

    const publicationImages = () => {
        const images = [];
        for (const image of publication.images) {
            images.push(image.url);
        }
        return images;
    };

    const publicationDate = () => {
        return formatUTCDateString(publication.publication_date);
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
                    <CardContent className={classes.info}>
                        <PublicationInfo bathrooms={publication.bathrooms} beds={publication.beds}
                                         pricePerNight={publication.price_per_night} rooms={publication.rooms}
                                         description={publication.description} publishDate={publicationDate()}
                                         latitude={publication.loc.latitude} longitude={publication.loc.longitude}
                                         address={address}
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
        <Layout content={content()} notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}