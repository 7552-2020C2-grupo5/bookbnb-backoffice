import Grid from "@material-ui/core/Grid";
import StaticField from "../../../common/StaticField";
import React from "react";

export function PublicationInfo({rooms, beds, bathrooms, pricePerNight}) {
    return (
        <Grid container direction="column">
            <Grid container direction="row">
                <Grid item md={3} xs={6}>
                    <StaticField label='Habitaciones' value={rooms}/>
                </Grid>
                <Grid item md={3} xs={6}>
                    <StaticField label='Camas' value={beds}/>
                </Grid>
                <Grid item md={3} xs={6}>
                    <StaticField label='Baños' value={bathrooms}/>
                </Grid>
                <Grid item md={3} xs={6}>
                    <StaticField label='Precio por noche' value={pricePerNight}/>
                </Grid>
            </Grid>
        </Grid>
    );
}