import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {useMediaQuery} from "@material-ui/core";
import theme from "../../../theme";

export function ConfirmationModal({isOpen, handleCancel, handleConfirmation, description, title}) {
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirmation} color="primary">
                    Confirmar
                </Button>
                <Button onClick={handleCancel} color="secondary" autoFocus>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
}