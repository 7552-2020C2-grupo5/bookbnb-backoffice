import React, {useCallback, useEffect, useState} from 'react';
import {app} from "../../../app/app";
import {DataTable} from "../../common/DataTable";
import SectionTitle from "../../common/SectionTitle";
import Container from "@material-ui/core/Container";
import Loader from "../../common/Loader";
import Layout from "../../common/Layout";


export default function AdminsList() {
    const [loading, setLoading] = useState(false);
    const [admins, setAdmins] = useState([]);

    const handleResponse = (response) => {
        setAdmins(response.content());
        setLoading(false);
    }

    const getAdmins = useCallback((filters=undefined) => {
        app.apiClient().getAdmins(handleResponse)
    }, []);


    // When the user enters the screen, the
    useEffect(() => {
        setLoading(true);
        getAdmins();
    }, [getAdmins]);

    const columns = () => {
        return ([{field: 'first_name', type: 'text', headerName: 'Nombre', width: "20%"},
            {field: 'last_name', type: 'text', headerName: 'Apellido', width: "20%"},
            {field: 'email', type: 'text', headerName: 'Mail', width: "20%"},
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
                <SectionTitle title="Listado de administradores" />
                <DataTable rows={admins} columns={columns()}
                           urlViewElement={app.routes().admins + '/'}
                />
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}