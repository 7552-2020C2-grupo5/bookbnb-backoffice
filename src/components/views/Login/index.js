import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {useStyles} from "./styles";
import Notification from "../../common/Notification";
import {app} from "../../../app/app";

export default function Login() {
    const [userInfo, setUserInfo] = useState({email: '', password: ''});
    const [notification, setNotification] = useState({message: "", isError: false, open: false});
    let history = useHistory();
    const classes = useStyles();

    const handleInputChange = (event) => {
        const inputName = event.target.id;
        let newUserInfo = userInfo;
        newUserInfo[inputName] = event.target.value;
        setUserInfo(newUserInfo);
    };

    const onNotificationClosed = () => {
        setNotification({...notification, open: false})
    };

    const handleResponse = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(), isError: true, open: true});
        } else {
            app.loginUser(response.token());
            //TODO: Descomentar la de arriba y comentar la de abajo
            // app.loginUser("AUTH_FAKE");
            history.push(app.routes().home);
        }
    };

    const handleClick = () => {
        // app.loginUser("token");
        // history.push(app.routes().home);
        app.apiClient().loginAdmin(userInfo, handleResponse);
    };

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box style={{marginTop: "50%"}}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5">Iniciar sesión</Typography>
                        <form noValidate>
                            <TextField required fullWidth margin="normal" id="email" label="Mail"
                                       variant="outlined" onChange={handleInputChange}/>
                            <TextField required fullWidth margin="normal" id="password" label="Contraseña"
                                type="password" variant="outlined" onChange={handleInputChange}/>

                            <Notification open={notification.open} message={notification.message}
                                          isError={notification.isError} onNotificationClosed={onNotificationClosed}/>

                            <Button fullWidth margin="normal" color="primary" variant="contained" onClick={handleClick}>
                                Ingresar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}