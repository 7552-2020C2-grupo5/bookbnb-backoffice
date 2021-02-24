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

export function AddMoneyToWalletModal({isOpen, handleCancel, handleConfirmation}) {
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const schema = yup.object().shape({
        amount: yup.number().positive().required()
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
        console.log(data);
        if (formIsValid()) {
            handleConfirmation();
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
                {"Carga de saldo"}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Indique el monto en ETH a cargar en la wallet del usuario"}
                    </DialogContentText>
                    <DecimalField variant="outlined" label="Monto (ETH)" name="amount"
                                  type="number" inputRef={register({ required: true})}
                                  error={isValid(errors.amount)} withDecimals={true}/>
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