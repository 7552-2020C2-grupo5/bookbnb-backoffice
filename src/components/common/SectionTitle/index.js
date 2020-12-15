import React from 'react';
import Typography from "@material-ui/core/Typography";

export default function SectionTitle({title}) {
    return (
        <Typography variant="h3" gutterBottom>{title}</Typography>
    );
}