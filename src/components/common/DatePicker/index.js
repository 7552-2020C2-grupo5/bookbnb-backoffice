import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import 'date-fns';
import React from "react";
import {useStyles} from "./styles";

export default function DatePickerInput({value, handleChange, label, name=undefined, clearable=false}) {
    const classes = useStyles();

    const handleDateChange = (dateValue) => {
        if (name === undefined) {
            handleChange(dateValue);
        } else {
            handleChange(name, dateValue);
        }
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                className={classes.picker}
                autoOk={true}
                disableToolbar
                inputVariant="outlined"
                variant="dialog"
                format="dd/MM/yyyy"
                label={label}
                value={value}
                onChange={handleDateChange}
                clearable={clearable}
                cancelLabel="Cancelar"
                clearLabel="Borrar"
                okLabel="Confirmar"
            />
        </MuiPickersUtilsProvider>
    );
}