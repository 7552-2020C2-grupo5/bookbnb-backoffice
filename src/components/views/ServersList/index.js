import React, {useCallback, useEffect, useState} from "react";
import {app} from "../../../app/app";
import Loader from "../../common/Loader";
import SectionTitle from "../../common/SectionTitle";
import {DataTable} from "../../common/DataTable";
import Layout from "../../common/Layout";
import {useStyles} from "./styles";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import {Fab} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export default function ServersList() {
    const [loading, setLoading] = useState(false);
    const [servers, setServers] = useState([]);
    const [notification, setNotification] = useState({message: "", isError: false, open: false});
    const history = useHistory();

    // const [blockedServerId, setBlockedServerId] = useState(0);
    // const [serverOptions, setServerOptions] = useState([]);

    const classes = useStyles();

    const onNotificationClosed = () => {
        setNotification({...notification, open: false})
    };

    const handleGetServersResponse = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(), isError: true, open: true});
        } else {
            setServers(response.servers());
        }
        setLoading(false);
    };

    const getServers = useCallback(() => {
        app.apiClient().getServers(handleGetServersResponse);
    }, []);

    const handleBlockServer = useCallback((response) => {
        if (response.hasError()) {
            setNotification({message: response.description(), isError: true, open: true});
        } else {
            setLoading(true);
            getServers();
        }
    }, [getServers]);

    const blockServer = useCallback((serverId) => {
        app.apiClient().blockServer(serverId, handleBlockServer);
    }, [handleBlockServer]);

    const handleClickNewServer = () => {
        history.push(app.routes().newServer);
    }

    useEffect(() => {
        setLoading(true);
        getServers();
        // app.apiClient().getOptionsForServer(handleGetOptionsForServer);
    }, [getServers]);

    const columns = () => {
        return ([
            {field: 'serverName', type: 'text', headerName: 'Nombre', width: "20%"},
            {field: 'createdAt', type: 'date', headerName: 'Fecha de creación', width: "20%"},
            {field: 'status', type: 'text', headerName: 'Estado', width: "20%"},
            {field: 'id', type: 'actions', headerName: 'Acciones', width: "20%",
                actions: [
                    {type: "block", checkBlockedField: "isBlocked", idField: "id"}
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
                <SectionTitle title="Listado de servidores" />
                <DataTable rows={servers} columns={columns()}
                           modalTitle={"¿Está seguro que desea bloquear el servidor?"}
                           modalDescription={"No se podrá acceder al servidor bloqueado"}
                           handleBlock={blockServer}/>
                <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleClickNewServer}>
                    <AddIcon />
                </Fab>
            </Container>
        );
    }

    return (
        <Layout content={content()} notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}