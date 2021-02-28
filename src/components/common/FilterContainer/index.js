import React from "react";
import Box from "@material-ui/core/Box";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, TextField} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useStyles} from "./styles";


export function FilterContainer(props) {
    const classes = useStyles();

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
                    {props.children}
                </AccordionDetails>
                <AccordionActions>
                    <Button onClick={props.handleFiltersApplied} color="primary" variant="contained">Aplicar</Button>
                </AccordionActions>
            </Accordion>
        </Box>
    );
}