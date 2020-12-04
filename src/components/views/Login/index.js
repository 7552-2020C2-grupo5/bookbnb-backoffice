import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import {app} from "../../../app/app";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}));

export default function Login() {
    const [userInfo, setUserInfo] = useState({username: '', password: ''});
    let history = useHistory();
    const classes = useStyles();

    const handleInputChange = (event) => {
        const inputName = event.target.id;
        let newUserInfo = userInfo;
        newUserInfo[inputName] = event.target.value;
        setUserInfo(newUserInfo);
    };

    const handleClick = () => {
        app.loginUser("token");
        history.push(app.routes().home);
    };

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box style={{marginTop: "50%"}}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5">Iniciar sesión</Typography>
                        <form>
                            <TextField required fullWidth margin="normal" id="username" label="Usuario"
                                       variant="outlined" onChange={handleInputChange}/>
                            <TextField required fullWidth margin="normal" id="password" label="Contraseña"
                                type="password" variant="outlined" onChange={handleInputChange}/>
                            <Button fullWidth onClick={handleClick} color="primary" variant="contained">
                                Ingresar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}