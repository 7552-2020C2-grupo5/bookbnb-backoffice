import React from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notification({open, message, isError, onNotificationClosed }) {
    const notificationType = () => {
        return (isError) ? "error": "success";
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onNotificationClosed();
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={notificationType()}>
                {message}
            </Alert>
        </Snackbar>
    );
}