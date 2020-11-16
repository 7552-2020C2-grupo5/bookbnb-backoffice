import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Loader from "../../common/Loader";
import {DataTable} from "../../common/DataTable";
import axios from "axios";
import {app} from "../../../app/app";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


export default function PublicationsList() {
    const [loading, setLoading] = useState(false);
    const [publications, setPublications] = useState([]);

    const onResponse = (response) => {
        setPublications(response.data);
        setTimeout(() => setLoading(false), 1000);
    }

    // When the user enters the screen, the
    useEffect(() => {
        setLoading(true);
        axios.get("https://bookbnb5-publications.herokuapp.com/v1/publication")
            .then(onResponse);
    }, []);

    const columns = () => {
        return ([{field: 'title', type: 'text', headerName: 'Título', width: "20%"},
            {field: 'description', type: 'text', headerName: 'Descripción', width: "30%"},
            {field: 'rooms', type: 'text', headerName: 'Habitaciones', width: "5%"},
            {field: 'beds', type: 'text', headerName: 'Camas', width: "5%"},
            {field: 'bathrooms', type: 'text', headerName: 'Baños', width: "5%"},
            {field: 'price_per_night', type: 'text', headerName: 'Precio por noche', width: "15%"},
            {field: 'id', type: 'actions', headerName: 'Acciones', width: "20%"}
        ])
    };

    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return(
            <Container>
                <Typography variant="h3" gutterBottom>Listado de publicaciones</Typography>
                <DataTable rows={publications} columns={columns()}
                           modalTitle={"¿Está seguro que desea bloquear la publicación?"}
                           modalDescription={"No se podrá acceder ni reservar una publicación bloqueada."}
                           urlViewElement={app.routes().publications + '/'}/>
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}