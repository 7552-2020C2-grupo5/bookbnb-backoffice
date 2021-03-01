import Grid from "@material-ui/core/Grid";
import TimeSeriesLineChart from "../TimeSeriesLineChart";
import TimeSeriesBarChart from "../TimeSeriesBarChart";
import React from "react";

export default function Metrics({metrics}) {
    return (
        <Grid container direction="column" justify="center" >
            <Grid container direction="row" justify="center" spacing={2}>
                <Grid item xs={12} md={6}>
                    <TimeSeriesLineChart legendLabel={"Cantidad de usuarios"}
                                         metricData={metrics.usersDuringHistory} title={"Usuarios en el tiempo"}
                                         color="rgb(255,99,132)"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TimeSeriesBarChart legendLabel={"Cantidad de usuarios"}
                                        metricData={metrics.newUsersPerDay}
                                        title={"Usuarios nuevos por día"} color="rgb(255,99,132)"/>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" spacing={2}>
                <Grid item xs={12} md={6}>
                    <TimeSeriesLineChart legendLabel={"Cantidad de publicaciones"}
                                         metricData={metrics.publicationsDuringHistory}
                                         title={"Publicaciones en el tiempo"}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TimeSeriesBarChart legendLabel={"Cantidad de publicaciones"}
                                        metricData={metrics.newPublicationsPerDay}
                                        title={"Publicaciones nuevos por día"}/>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" spacing={2}>
                <Grid item xs={12} md={6}>
                    <TimeSeriesBarChart legendLabel={"Cantidad de transacciones"}
                                        metricData={metrics.transactionsAcceptedPerDay}
                                        title={"Transacciones aceptadas por día"}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TimeSeriesBarChart legendLabel={"Monto"}
                                        metricData={metrics.totalAmountInTransactionsPerDay}
                                        title={"Monto total en transacciones por día"}/>
                </Grid>
            </Grid>
        </Grid>
    );
}