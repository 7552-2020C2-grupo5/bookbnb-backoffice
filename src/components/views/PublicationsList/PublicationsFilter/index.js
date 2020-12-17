import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import NumericField from "../../../common/NumericField";
import Button from "@material-ui/core/Button";
import {useStyles} from "./styles";

export function PublicationsFilter({onFiltersApplied}) {
    const [filters, setFilters] = useState({
        rooms: "",
        beds: "",
        bathrooms: "",
        price_per_night: "",
    });
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
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography clasyasName={classes.heading}>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.root}>
                        <form className={classes.form}>
                            <Box className={classes.filtersContainer}>
                                <NumericField variant="outlined" label="Habitaciones" onChange={handleInputChange}
                                              value={filters.rooms} name="rooms" type="number"/>
                                <NumericField variant="outlined" label="Camas" onChange={handleInputChange}
                                              value={filters.beds} name="beds" type="number"/>
                                <NumericField variant="outlined" label="Baños" onChange={handleInputChange}
                                              value={filters.bathrooms} name="bathrooms" type="number"/>
                                <NumericField variant="outlined" label="Precio por noche" onChange={handleInputChange}
                                              value={filters.price_per_night} name="price_per_night" type="text"
                                              prefix="$"/>
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