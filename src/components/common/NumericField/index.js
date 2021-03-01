import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

function NumberFormatCustom(props) {
    const { inputRef, onChange, prefix, type, decimalScale, ...other } = props;

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
            decimalScale={decimalScale}
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

function NumericField(props) {
    const inputProps = {
        prefix: props.prefix,
        type: props.type,
        decimalScale: props.decimalscale
    };
    return (
        <TextField
            {...props}
            InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: inputProps
            }}
            style={{margin: "5px"}}
        />
    );
}

export function DecimalField(props) {
    return <NumericField {...props} decimalscale={5}/>
}

export function PositiveIntegerField(props) {
    return <NumericField {...props} decimalscale={0}/>
}