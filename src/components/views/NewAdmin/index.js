import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import {CardContent, TextField} from "@material-ui/core";
import React, {useState} from "react";
import Layout from "../../common/Layout";
import SectionTitle from "../../common/SectionTitle";
import Button from "@material-ui/core/Button";
import {useStyles} from "./styles";
import {app} from "../../../app/app";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

export default function NewAdmin() {
    const [administratorData, setAdministratorData] = useState({
        first_name: "",
        last_name: "",
        password: "",
        email: "",
    });

    const schema = yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required(),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
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

    // const adminDataIsValid = useCallback(() => {
    //     const requiredFields = ['first_name', 'last_name', 'password', 'email'];
    //     const allFieldsCompleted = requiredFields.every(field => administratorData[field] !== "");
    //     return !allFieldsCompleted;
    // }, [administratorData])

    const handleResponse = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(), isError: true, open: true});
        } else {
            history.push(app.routes().admins);
        }
    };

    const formIsValid = () => {
        return Object.entries(errors).length === 0;
    }

    const onSubmit = () => {
        if (formIsValid()) {
            app.apiClient().newAdmin(administratorData, handleResponse);
        }
    };

    const isValid = (value) => {
        return value !== undefined;
    }

    const content = () => {
        return (
            <Container>
                <Card>
                    <CardContent>
                        <SectionTitle title="Alta de administrador"/>
                    </CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className={classes.form}>
                                <TextField variant="outlined" label="Nombre" onChange={handleInputChange}
                                           name="first_name" inputRef={register({ required: true})}
                                           error={isValid(errors.first_name)}/>
                                <TextField variant="outlined" label="Apellido" onChange={handleInputChange}
                                           name="last_name" inputRef={register({ required: true})}
                                           error={isValid(errors.last_name)}/>
                                <TextField variant="outlined" label="Email" onChange={handleInputChange}
                                           name="email" inputRef={register({ required: true})}
                                           error={isValid(errors.email)}/>
                                <TextField variant="outlined" label="Password" onChange={handleInputChange}
                                           type="password" name="password" inputRef={register({ required: true})}
                                           error={isValid(errors.password)}/>
                        </CardContent>
                        <CardContent className={classes.buttonContainer}>
                            <Button type="submit" color="primary" variant="contained">
                                Crear
                            </Button>
                        </CardContent>
                    </form>
                </Card>
            </Container>
        );
    };

    return (
        <Layout content={content()} notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}