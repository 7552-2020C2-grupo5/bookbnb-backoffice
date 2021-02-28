import React, {useCallback, useEffect, useState} from "react";
import Layout from "../../common/Layout";
import TimeSeriesBarChart from "./TimeSeriesBarChart";
import Grid from "@material-ui/core/Grid";
import TimeSeriesLineChart from "./TimeSeriesLineChart";
import SectionTitle from "../../common/SectionTitle";
import Container from "@material-ui/core/Container";
import {useStyles} from "./styles";
import DatePickerInput from "../../common/DatePicker";
import Button from "@material-ui/core/Button";
import {subDays} from 'date-fns'
import {app} from "../../../app/app";
import Loader from "../../common/Loader";
import Metrics from "./Metrics";


export default function Home() {
    const [initialDate, setInitialDate] = useState(subDays(new Date(), 7));
    const [lastDate, setLastDate] = useState(new Date());
    const [metrics, setMetrics] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({message: "", isError: false, open: false});
    const classes = useStyles();

    const onNotificationClosed = () => {
        setNotification({...notification, open: false})
    };

    const handleApplyDatesFilter = () => {
        if (initialDate >= lastDate) {
            setNotification({message: "La fecha de inicio debe ser menor a la de fin",
                isError: true, open: true});
        } else {
            setLoading(true);
            getMetrics(initialDate, lastDate);
        }
    }

    const handleResponse = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(),
                isError: true, open: true});
            setMetrics(undefined)
        } else {
            let obtainedMetrics = response.metrics();
            setMetrics(obtainedMetrics);
        }
        setLoading(false);
    }

    const getMetrics = useCallback((startDate, endDate) => {
        app.apiClient().getMetrics(startDate, endDate, handleResponse);
    }, []);

    useEffect(() => {
        setLoading(true);
        getMetrics(new Date(), new Date());
    }, [getMetrics]);

    const metricsContent = () => {
        if (metrics !== undefined) {
            return (
                <Metrics metrics={metrics}/>
            );
        }
        return <React.Fragment/>
    }


    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return (
            <Container>
                <SectionTitle title={"Métricas"}/>

                <form>
                    <Grid direction="row" justify="flex-start" container className={classes.datesContainer} spacing={2}>
                        <Grid item xs={6} md={3}>
                            <DatePickerInput label="Inicio" value={initialDate} handleChange={(date) => setInitialDate(date)}/>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <DatePickerInput label="Fin" value={lastDate} handleChange={(date) => setLastDate(date)}/>
                        </Grid>
                        <Grid item xs={6} md={3} className={classes.applyButton}>
                            <Button onClick={handleApplyDatesFilter} color="primary" variant="contained">
                                Aplicar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {metricsContent()}
            </Container>
        );
    };

    return (
        <Layout content={content()} notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}