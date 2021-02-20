import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import {CardContent, TextField} from "@material-ui/core";
import React, {useState} from "react";
import Layout from "../../common/Layout";
import SectionTitle from "../../common/SectionTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export default function NewAdmin() {
    const [administratorData, setAdministratorData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
    });
    const classes = useStyles();

    const handleInputChange = (event) => {
        setAdministratorData({
            ...administratorData,
            [event.target.name]: event.target.value,
        });
    };

    const handleClick = () => {

    };

    const content = () => {
        return (
            <Container>
                <Card>
                    <CardContent>
                        <SectionTitle title="Alta de administrador"/>
                    </CardContent>
                    <CardContent>
                        <form className={classes.form}>
                            <TextField variant="outlined" label="Nombre" onChange={handleInputChange}
                                          value={administratorData.firstName} name="firstName"/>
                            <TextField variant="outlined" label="Apellido" onChange={handleInputChange}
                                       value={administratorData.lastName} name="lastName"/>
                            <TextField variant="outlined" label="Email" onChange={handleInputChange}
                                       value={administratorData.email} name="email"/>
                            <TextField variant="outlined" label="Password" onChange={handleInputChange}
                                       value={administratorData.password}  type="password" name="password"/>
                        </form>
                    </CardContent>
                    <CardContent className={classes.buttonContainer}>
                        <Button onClick={handleClick} color="primary" variant="contained">Crear</Button>
                    </CardContent>
                </Card>
            </Container>
        );
    };

    return (
        <Layout content={content()}/>
    );
}