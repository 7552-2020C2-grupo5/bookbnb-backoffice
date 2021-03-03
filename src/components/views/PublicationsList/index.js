import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Loader from "../../common/Loader";
import {DataTable} from "../../common/DataTable";
import {app} from "../../../app/app";
import {Container} from "@material-ui/core";
import SectionTitle from "../../common/SectionTitle";
import {PublicationsFilter} from "./PublicationsFilter";
import VisibilityIcon from '@material-ui/icons/Visibility';


export default function PublicationsList() {
    const [loading, setLoading] = useState(false);
    const [publications, setPublications] = useState([]);
    const [notification, setNotification] = useState({message: "", isError: false, open: false});
    const [filters, setFilters] = useState({
        rooms: "",
        beds: "",
        bathrooms: "",
        price_per_night_max: "",
        price_per_night_min: "",
    });

    const handleFilterValueChanged = (name, value) => {
        setFilters({...filters, [name]: value});
    }

    const onNotificationClosed = () => {
        setNotification({...notification, open: false})
    };

    const handleResponse = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(), isError: true, open: true});
        } else {
            setPublications(response.publications());
        }
        setLoading(false);
    }

    const getPublications = useCallback((filters= {}) => {
        app.apiClient().getAllPublications(handleResponse, filters);
    }, []);

    const handleReload = useCallback(() => {
        setLoading(true);
        getPublications(filters);
    }, [getPublications, filters]);

    const blockPublication = useCallback((publicationId) => {
        app.apiClient().blockPublication(publicationId, getPublications);
    }, [getPublications]);

    useEffect(() => {
        setLoading(true);
        getPublications();
    }, [getPublications]);

    const columns = () => {
        return ([{field: 'title', type: 'text', headerName: 'Título', width: "10%"},
            {field: 'description', type: 'text', headerName: 'Descripción', width: "20%"},
            {field: 'rooms', type: 'text', headerName: 'Habitaciones', width: "5%"},
            {field: 'beds', type: 'text', headerName: 'Camas', width: "5%"},
            {field: 'bathrooms', type: 'text', headerName: 'Baños', width: "5%"},
            {field: 'price_per_night', type: 'text', headerName: 'Precio por noche (ETH)', width: "5%"},
            {field: 'publication_date', type: 'date', headerName: 'Fecha de publicación', width: "10%"},
            {field: 'status', type: 'text', headerName: 'Estado', width: "10%"},
            {field: 'id', type: 'actions', headerName: 'Acciones', width: "20%",
                actions: [
                    {type: "view", urlViewElement: app.routes().publications + '/', idField: 'id', icon: VisibilityIcon,
                        checkBlockedField: "blocked"},
                    {type: "block", checkBlockedField: "blocked", idField: "id"}
                ]
            }
        ]);
    };

    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return (
            <Container>
                <SectionTitle title="Listado de publicaciones" />
                <PublicationsFilter handleFiltersApplied={handleReload} filters={filters}
                                    handleValueChanged={handleFilterValueChanged}/>
                <DataTable rows={publications} columns={columns()}
                           modalTitle={"¿Está seguro que desea bloquear la publicación?"}
                           modalDescription={"No se podrá acceder ni reservar una publicación bloqueada."}
                           handleBlock={blockPublication}
                />
            </Container>
        );
    }

    return (
        <Layout content={content()} notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}