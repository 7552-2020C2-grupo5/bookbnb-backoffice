import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import {Typography} from "@material-ui/core";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function Loader() {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography className={classes.label}>Cargando</Typography>
            <CircularProgress color="primary"/>
        </Box>
    );
}