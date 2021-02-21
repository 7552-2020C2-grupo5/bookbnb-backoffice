import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import {CardContent, TextField} from "@material-ui/core";
import React, {useCallback, useState} from "react";
import Layout from "../../common/Layout";
import SectionTitle from "../../common/SectionTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useStyles} from "./styles";
import {app} from "../../../app/app";
import {useHistory} from "react-router-dom";

export default function NewAdmin() {
    const [administratorData, setAdministratorData] = useState({
        first_name: "",
        last_name: "",
        password: "",
        email: "",
    });
    const [notification, setNotification] = useState({message: "", isError: false, open: false});
    const classes = useStyles();
    const history = useHistory();

    const onNotificationClosed = () => {
        setNotification({...notification, open: false})
    };

    const handleInputChange = (event) => {
        setAdministratorData({
            ...administratorData,
            [event.target.name]: event.target.value,
        });
    };

    const adminDataIsValid = useCallback(() => {
        const requiredFields = ['first_name', 'last_name', 'password', 'email'];
        const allFieldsCompleted = requiredFields.every(field => administratorData[field] !== "");
        return !allFieldsCompleted;
    }, [administratorData])

    const handleResponse = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(), isError: true, open: true});
        } else {
            history.push(app.routes().admins);
        }
    };

    const handleClick = () => {
        app.apiClient().newAdmin(administratorData, handleResponse);
    };

    const content = () => {
        return (
            <Container>
                <Card>
                    <CardContent>
                        <SectionTitle title="Alta de administrador"/>
                    </CardContent>
                    <CardContent>
                        <form className={classes.form} noValidate>
                            <TextField variant="outlined" label="Nombre" onChange={handleInputChange}
                                          value={administratorData.firstName} name="first_name" required/>
                            <TextField variant="outlined" label="Apellido" onChange={handleInputChange}
                                       value={administratorData.lastName} name="last_name" required/>
                            <TextField variant="outlined" label="Email" onChange={handleInputChange}
                                       value={administratorData.email} name="email" required/>
                            <TextField variant="outlined" label="Password" onChange={handleInputChange}
                                       value={administratorData.password}  type="password" name="password"/>
                        </form>
                    </CardContent>
                    <CardContent className={classes.buttonContainer}>
                        <Button type={"submit"} onClick={handleClick} color="primary" variant="contained"
                                disabled={adminDataIsValid()}>
                            Crear
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        );
    };

    return (
        <Layout content={content()}  notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}