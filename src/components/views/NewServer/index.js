import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import {CardContent, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Layout from "../../common/Layout";
import SectionTitle from "../../common/SectionTitle";
import Button from "@material-ui/core/Button";
import {app} from "../../../app/app";
import SelectInput from "../../common/SelectInput";
import Grid from "@material-ui/core/Grid";
import {useStyles} from "../NewAdmin/styles";
import Loader from "../../common/Loader";
import Typography from "@material-ui/core/Typography";

export default function NewServer() {
    const emptyServerName = "";
    const [loading, setLoading] = useState(true);
    const [serverOptions, setServerOptions] = useState([]);
    const [serverName, setServerName] = useState({value: emptyServerName, hasError: false});
    const [notification, setNotification] = useState({message: "", isError: false, open: false});
    const [apiKeyInfo, setApiKeyInfo] = useState({value: "", show: false});
    const classes = useStyles();

    const onNotificationClosed = () => {
        setNotification({...notification, open: false})
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setServerName({value: value, hasError: emptyServerName === value});
    };

    const handleResponse = (response) => {
        const isErrorResponse = response.hasError()
        setNotification({message: response.description(), isError: isErrorResponse, open: true});
        if (!isErrorResponse) {
            setApiKeyInfo({value: response.token(), show: true});
        }
    };

    const onSubmit = () => {
        if (validateServerName()) {
            app.apiClient().newServer(serverName.value, handleResponse);
        }
    };

    const validateServerName = () => {
        if (serverName.value === emptyServerName) {
            setServerName({...serverName, hasError:true});
            return false;
        }
        return true;
    }

    const serverNameIsValid = () => {
        return !serverName.hasError
    }

    const handleGetOptionsForServer = (response) => {
        debugger;
        if (!response.hasError()) {
            setServerOptions(response.serverOptions());
        }
        setLoading(false);
    };

    useEffect(() => {
        app.apiClient().getOptionsForServer(handleGetOptionsForServer);
    }, []);

    const apiKeyInput = () => {
        if (apiKeyInfo.show) {
            return (
                <Grid item xs={12} sm={8}>
                    <Typography variant="overline" display="block" gutterBottom>
                        API KEY
                    </Typography>
                    <Typography variant="body1" display="block" gutterBottom>
                        {apiKeyInfo.value}
                    </Typography>
                </Grid>
            );
        }
        return <React.Fragment/>
    };

    const content = () => {
        if (loading) {
            return <Loader/>
        }
        return (
            <Container>
                <Card>
                    <CardContent>
                        <SectionTitle title="Alta de administrador"/>
                    </CardContent>
                    <form noValidate>
                        <CardContent className={classes.form}>
                            <Grid container spacing={2} direction="row">
                                <Grid item xs={8} sm={4}>
                                    <SelectInput label="Servidor" handleChange={handleInputChange}
                                                 name="serverName"
                                                 options={serverOptions}
                                                 error={!serverNameIsValid()}/>
                                </Grid>
                                {apiKeyInput()}
                            </Grid>
                        </CardContent>
                    </form>
                    <CardContent className={classes.buttonContainer}>
                        <Button onClick={onSubmit} color="primary" variant="contained" disabled={apiKeyInfo.show}>
                            Crear
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        );
    };

    return (
        <Layout content={content()} notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}