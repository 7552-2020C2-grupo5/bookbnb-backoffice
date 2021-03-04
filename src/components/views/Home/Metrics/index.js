import Grid from "@material-ui/core/Grid";
import TimeSeriesLineChart from "../TimeSeriesLineChart";
import TimeSeriesBarChart from "../TimeSeriesBarChart";
import React from "react";

export default function Metrics({metrics}) {
    return (
        <Grid container direction="row" justify="center" spacing={2}>
            <Grid item xs={12}>
                <TimeSeriesBarChart legendLabel={"Cantidad de usuarios"}
                                    metricData={metrics.newUsersPerDay}
                                    title={"Usuarios nuevos por día"} color="rgb(255,99,132)"/>
            </Grid>
            <Grid item xs={12}>
                <TimeSeriesBarChart legendLabel={"Cantidad de publicaciones"}
                                    metricData={metrics.newPublicationsPerDay}
                                    title={"Publicaciones nuevos por día"}/>
            </Grid>
            <Grid item xs={12}>
                <TimeSeriesBarChart legendLabel={"Monto (ETH)"}
                                    metricData={metrics.totalAmountInTransactionsPerDay}
                                    title={"Monto total en transacciones por día"}/>
            </Grid>
        </Grid>
    );
}