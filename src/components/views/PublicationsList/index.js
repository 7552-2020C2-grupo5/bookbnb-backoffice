import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Loader from "../../common/Loader";
import {DataTable} from "../../common/DataTable";
import axios from "axios";
import {app} from "../../../app/app";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Container, Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import NumericField from "../../common/NumericField";
import SectionTitle from "../../common/SectionTitle";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

function Filter({onFiltersApplied}) {
    const [filters, setFilters] = useState({
        rooms: "",
        beds: "",
        bathrooms: "",
        price_per_night: "",
    });

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        },
        filtersContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }));

    const classes = useStyles();

    const handleInputChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        });
    };

    const handleClick = () => {
        onFiltersApplied(filters);
    };

    return (
        <Box>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>Filtros</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.root}>
                    <form className={classes.form}>
                        <Box className={classes.filtersContainer}>
                            <NumericField variant="outlined" label="Habitaciones" onChange={handleInputChange}
                                          value={filters.rooms} name="rooms"/>
                            <NumericField variant="outlined" label="Camas" onChange={handleInputChange}
                                          value={filters.beds} name="beds"/>
                            <NumericField variant="outlined" label="Baños" onChange={handleInputChange}
                                          value={filters.bathrooms} name="bathrooms"/>
                            <NumericField variant="outlined" label="Precio por noche" onChange={handleInputChange}
                                          value={filters.price_per_night} name="price_per_night" prefix="$"/>
                        </Box>
                    </form>
                </div>
            </AccordionDetails>
            <AccordionActions>
                <Button onClick={handleClick} color="primary" variant="contained">Aplicar</Button>
            </AccordionActions>
        </Accordion>
        </Box>
    );
}

export default function PublicationsList() {
    const [loading, setLoading] = useState(false);
    const [publications, setPublications] = useState([]);

    const handleResponse = (responseData) => {
        setPublications(responseData);
        setTimeout(() => setLoading(false), 1000);
    }

    const getPublications = useCallback((filters={}) => {
        app.apiClient().publications(filters).then(handleResponse)
    }, []);

    useEffect(() => {
        setLoading(true);
        getPublications();
    }, [getPublications]);

    const columns = () => {
        return ([{field: 'title', type: 'text', headerName: 'Título', width: "20%"},
            {field: 'description', type: 'text', headerName: 'Descripción', width: "30%"},
            {field: 'rooms', type: 'text', headerName: 'Habitaciones', width: "5%"},
            {field: 'beds', type: 'text', headerName: 'Camas', width: "5%"},
            {field: 'bathrooms', type: 'text', headerName: 'Baños', width: "5%"},
            {field: 'price_per_night', type: 'text', headerName: 'Precio por noche', width: "15%"},
            {field: 'id', type: 'actions', headerName: 'Acciones', width: "20%"}
        ])
    };

    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return(
            <Container>
                <SectionTitle title="Listado de publicaciones" />
                <Filter onFiltersApplied={getPublications}/>
                <DataTable rows={publications} columns={columns()}
                           modalTitle={"¿Está seguro que desea bloquear la publicación?"}
                           modalDescription={"No se podrá acceder ni reservar una publicación bloqueada."}
                           urlViewElement={app.routes().publications + '/'}/>
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}