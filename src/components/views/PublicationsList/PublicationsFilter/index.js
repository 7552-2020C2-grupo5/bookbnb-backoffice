import React from "react";
import {DecimalField, PositiveIntegerField} from "../../../common/NumericField";
import {useStyles} from "./styles";
import {FilterContainer} from "../../../common/FilterContainer";
import Grid from "@material-ui/core/Grid";

export function PublicationsFilter({filters, handleValueChanged, handleFiltersApplied}) {
    const classes = useStyles();

    const handleInputChange = (event) => {
        handleValueChanged(event.target.name, event.target.value);
    };

    return (
        <FilterContainer handleFiltersApplied={handleFiltersApplied}>
            <form>
                <Grid direction="row" justify="flex-start" container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <PositiveIntegerField variant="outlined" label="Habitaciones" onChange={handleInputChange}
                                              value={filters.rooms} name="rooms" type="number"/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <PositiveIntegerField variant="outlined" label="Camas" onChange={handleInputChange}
                                              value={filters.beds} name="beds" type="number"/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <PositiveIntegerField variant="outlined" label="Baños" onChange={handleInputChange}
                                              value={filters.bathrooms} name="bathrooms" type="number"/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <DecimalField variant="outlined" label="Mín. precio por noche (ETH)" onChange={handleInputChange}
                                      value={filters.price_per_night_min} name="price_per_night_min" type="text"/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <DecimalField variant="outlined" label="Max. precio por noche (ETH)" onChange={handleInputChange}
                                      value={filters.price_per_night_max} name="price_per_night_max" type="text"/>
                    </Grid>
                </Grid>
            </form>
        </FilterContainer>
    );
}