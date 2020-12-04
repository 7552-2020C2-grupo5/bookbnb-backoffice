import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import React from "react";

export function PublicationTitle({description, title}) {
    return (
        <Grid container direction="column" style={{textAlign: "center"}}>
            <Grid item md={12} xs={12}>
                <Typography variant={'h4'} gutterBottom>
                    {title}
                </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
                <Typography variant="body1" display="block">
                    {description}
                </Typography>
            </Grid>
        </Grid>
    )
}