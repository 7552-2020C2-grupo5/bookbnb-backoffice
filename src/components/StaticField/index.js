import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default function StaticField({label, value}) {
    return (
        <Container>
            <Typography variant="overline" display="block" gutterBottom>
                {label}
            </Typography>
            <Typography variant="body1" display="block" gutterBottom>
                {value}
            </Typography>
        </Container>
    );
}