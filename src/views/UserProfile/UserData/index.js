import Grid from "@material-ui/core/Grid";
import StaticField from "../../../components/StaticField";
import React from "react";

export default function UserData({name, surname, email}) {
    return (
        <Grid container direction="row">
            <Grid item md={4} xs={12}>
                <StaticField label='Nombre' value={name}/>
            </Grid>
            <Grid item md={4} xs={12}>
                <StaticField label='Apellido' value={surname}/>
            </Grid>
            <Grid item md={4} xs={12}>
                <StaticField label='Email' value={email}/>
            </Grid>
        </Grid>
    );
}