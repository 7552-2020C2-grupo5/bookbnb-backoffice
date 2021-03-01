import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useStyles} from "./styles";

export default function SelectInput({options, label, handleChange, value, name, inputRef=undefined,
                                        error=undefined}) {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={handleChange}
                label={label}
                name={name}
                inputRef={inputRef}
                error={error}
            >
                <MenuItem value="">
                    <em>Ninguno/a</em>
                </MenuItem>
                {options.map(option => <MenuItem key={option.text + option.value}
                                                 value={option.value}>{option.text}</MenuItem>)}
            </Select>
        </FormControl>
    );
}