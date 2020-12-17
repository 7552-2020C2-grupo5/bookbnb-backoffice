import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Loader from "../../common/Loader";
import {DataTable} from "../../common/DataTable";
import axios from "axios";
import {app} from "../../../app/app";
import {Container} from "@material-ui/core";
import SectionTitle from "../../common/SectionTitle";


export default function UsersList() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const handleResponse = (responseData) => {
        setUsers(responseData);
        setTimeout(() => setLoading(false), 1000);
    }

    // When the user enters the screen, the
    useEffect(() => {
        setLoading(true);
        app.apiClient().users().then(handleResponse)
    }, []);

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
                <SectionTitle title="Listado de usuarios" />
                <DataTable rows={users} columns={columns()}
                           modalTitle={"¿Está seguro que desea bloquear al usuario?"}
                           modalDescription={"Un usuario bloqueado no podrá acceder a la plataforma"}
                           urlViewElement={app.routes().users + '/'}/>
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}