import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {useMediaQuery} from "@material-ui/core";
import theme from "../../../../theme";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {DecimalField} from "../../../common/NumericField";
import SelectInput from "../../../common/SelectInput";

export function CreateServerModal({isOpen, handleCancel, handleConfirmation, options}) {
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const schema = yup.object().shape({
        amount: yup.string().required()
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const formIsValid = () => {
        return Object.entries(errors).length === 0;
    }

    const isValid = (value) => {
        return value !== undefined;
    }

    const onSubmit = (data) => {
        if (formIsValid()) {
            handleConfirmation(data.amount);
        }
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Alta de servidor"}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Indique el servidor a dar de alta"}
                    </DialogContentText>
                    <SelectInput options={options} inputRef={}/>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="primary">
                        Confirmar
                    </Button>
                    <Button onClick={handleCancel} color="secondary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}