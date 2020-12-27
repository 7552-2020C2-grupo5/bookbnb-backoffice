import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Loader from "../../common/Loader";
import {DataTable} from "../../common/DataTable";
import {app} from "../../../app/app";
import {Container} from "@material-ui/core";
import SectionTitle from "../../common/SectionTitle";
import {PublicationsFilter} from "./PublicationsFilter";


export default function PublicationsList() {
    const [loading, setLoading] = useState(false);
    const [publications, setPublications] = useState([]);

    const handleResponse = (responseData) => {
        debugger;
        setPublications(responseData);
        setTimeout(() => setLoading(false), 1000);
    }

    const getPublications = useCallback((filters={}) => {
        app.apiClient().publications(filters).then(handleResponse);
    }, []);

    useEffect(() => {
        setLoading(true);
        getPublications();
    }, [getPublications]);

    const columns = () => {
        return ([{field: 'title', type: 'text', headerName: 'Título', width: "20%"},
            {field: 'description', type: 'text', headerName: 'Descripción', width: "25%"},
            {field: 'rooms', type: 'text', headerName: 'Habitaciones', width: "5%"},
            {field: 'beds', type: 'text', headerName: 'Camas', width: "5%"},
            {field: 'bathrooms', type: 'text', headerName: 'Baños', width: "5%"},
            {field: 'price_per_night', type: 'text', headerName: 'Precio por noche', width: "10%"},
            {field: 'publication_date', type: 'date', headerName: 'Fecha de publicación', width: "10%"},
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
                <SectionTitle title="Listado de publicaciones" />
                <PublicationsFilter onFiltersApplied={getPublications}/>
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