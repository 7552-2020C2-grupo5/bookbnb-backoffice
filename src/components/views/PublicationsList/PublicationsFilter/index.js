import React from "react";
import Box from "@material-ui/core/Box";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import {DecimalField, PositiveIntegerField} from "../../../common/NumericField";
import Button from "@material-ui/core/Button";
import {useStyles} from "./styles";

export function PublicationsFilter({filters, handleValueChanged, handleFiltersApplied}) {
    const classes = useStyles();

    const handleInputChange = (event) => {
        handleValueChanged(event.target.name, event.target.value);
    };

    return (
        <Box className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.form}>
                        <form>
                            <Box className={classes.filtersContainer}>
                                <PositiveIntegerField variant="outlined" label="Habitaciones" onChange={handleInputChange}
                                              value={filters.rooms} name="rooms" type="number"/>
                                <PositiveIntegerField variant="outlined" label="Camas" onChange={handleInputChange}
                                              value={filters.beds} name="beds" type="number"/>
                                <PositiveIntegerField variant="outlined" label="Baños" onChange={handleInputChange}
                                              value={filters.bathrooms} name="bathrooms" type="number"/>
                                <DecimalField variant="outlined" label="Mín. precio por noche (ETH)" onChange={handleInputChange}
                                              value={filters.price_per_night_min} name="price_per_night_min" type="text"/>
                                <DecimalField variant="outlined" label="Max. precio por noche (ETH)" onChange={handleInputChange}
                                              value={filters.price_per_night_max} name="price_per_night_max" type="text"/>
                            </Box>
                        </form>
                    </div>
                </AccordionDetails>
                <AccordionActions>
                    <Button onClick={handleFiltersApplied} color="primary" variant="contained">Aplicar</Button>
                </AccordionActions>
            </Accordion>
        </Box>
    );
}