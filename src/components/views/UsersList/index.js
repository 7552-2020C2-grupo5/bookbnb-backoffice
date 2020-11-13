import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Loader from "../../common/Loader";
import {DataTable} from "../../common/DataTable";


export default function UsersList() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    // When the user enters the screen, the
    useEffect(() => {
        setUsers(
            [
                {'id': 2, 'first_name': 'Janet', 'last_name': 'Weaver', 'email': 'janet.weaver@reqres.in'},
                {'id': 3, 'first_name': 'Emma', 'last_name': 'Wong', 'email': 'janet.weaver@reqres.in'},
            ]
        );
        setTimeout(() => setLoading(false), 1000);
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
            <DataTable rows={users} columns={columns()}
                       modalTitle={"¿Está seguro que desea bloquear al usuario?"}
                       modalDescription={"Un usuario bloqueado no podrá acceder a la plataforma"}/>
        );
    }

    return (
        <Layout content={content()}/>
    );
}