import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, TextField} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useStyles} from "./styles";

export function UsersFilter({filters, handleValueChanged, handleFiltersApplied}) {
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
                    <Typography clasyasName={classes.heading}>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.form}>
                        <form>
                            <Box className={classes.filtersContainer}>
                                <TextField variant="outlined" label="Nombre" onChange={handleInputChange}
                                           defaultValue={filters.first_name} name="first_name"/>
                                <TextField variant="outlined" label="Apellido" onChange={handleInputChange}
                                           defaultValue={filters.last_name} name="last_name"/>
                                <TextField variant="outlined" label="Email" onChange={handleInputChange}
                                           defaultValue={filters.email} name="email"/>
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