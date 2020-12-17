import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

function NumberFormatCustom(props) {
    const { inputRef, onChange, prefix, type, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            prefix={prefix}
            allowNegative={false}
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function NumericField(props) {
    return (
        <TextField
            {...props}
            InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: {prefix: props.prefix, type: props.type}
            }}
            style={{margin: "5px"}}
        />
    );
}