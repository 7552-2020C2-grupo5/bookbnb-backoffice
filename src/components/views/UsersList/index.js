import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Loader from "../../common/Loader";
import {DataTable} from "../../common/DataTable";
import {app} from "../../../app/app";
import {Container} from "@material-ui/core";
import SectionTitle from "../../common/SectionTitle";
import {UsersFilter} from "../../common/UsersFilter";
import VisibilityIcon from "@material-ui/icons/Visibility";


export default function UsersList() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [notification, setNotification] = useState({message: "", isError: false, open: false});

    const [filters, setFilters] = useState({
        first_name: "",
        last_name: "",
        email: "",
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
            setUsers(response.users());
        }
        setLoading(false);
    };

    const getUsers = useCallback((filtersToApply={}) => {
        app.apiClient().getAllUsers(handleResponse, filtersToApply);
    }, []);

    const handleReload = useCallback(() => {
        setLoading(true);
        getUsers(filters);
    }, [getUsers, filters]);

    const handleBlockUser = useCallback((response) => {
        if (response.hasError()) {
            setNotification({message: response.description(), isError: true, open: true});
        } else {
            handleReload()
        }
    }, [handleReload]);

    const blockUser = useCallback((userId) => {
        app.apiClient().blockUser(userId, handleBlockUser);
    }, [handleBlockUser]);

    useEffect(() => {
        setLoading(true);
        getUsers();
    }, [getUsers]);

    const columns = () => {
        return ([
            {field: 'first_name', type: 'text', headerName: 'Nombre', width: "20%"},
            {field: 'last_name', type: 'text', headerName: 'Apellido', width: "20%"},
            {field: 'email', type: 'text', headerName: 'Mail', width: "20%"},
            {field: 'status', type: 'text', headerName: 'Estado', width: "20%"},
            {field: 'id', type: 'actions', headerName: 'Acciones', width: "20%",
                actions: [
                    {type: "view", urlViewElement: app.routes().users + '/', idField: 'id', icon: VisibilityIcon,
                        checkBlockedField: "blocked"},
                    {type: "block", checkBlockedField: "blocked", idField: "id"}
                ]
            }
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
                <UsersFilter handleFiltersApplied={handleReload} filters={filters}
                             handleValueChanged={handleFilterValueChanged}/>
                <DataTable rows={users} columns={columns()}
                           modalTitle={"¿Está seguro que desea bloquear al usuario?"}
                           modalDescription={"Un usuario bloqueado no podrá acceder a la plataforma"}
                           handleBlock={blockUser}
                />
            </Container>
        );
    }

    return (
        <Layout content={content()} notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}