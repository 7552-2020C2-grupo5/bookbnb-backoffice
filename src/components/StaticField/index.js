import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Box from "@material-ui/core/Box";

export default function StaticField({label, value}) {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Typography variant="overline" display="block" gutterBottom>
                {label}
            </Typography>
            <Typography variant="body1" display="block" gutterBottom>
                {value}
            </Typography>
        </Box>
    );
}