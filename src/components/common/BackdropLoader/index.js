import {Backdrop, CircularProgress, Container} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

export default function BackdropLoader() {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}