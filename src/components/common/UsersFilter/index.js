import React from "react";
import {TextField} from "@material-ui/core";
import {FilterContainer} from "../FilterContainer";
import Grid from "@material-ui/core/Grid";


export function UsersFilter({filters, handleValueChanged, handleFiltersApplied}) {
    const handleInputChange = (event) => {
        handleValueChanged(event.target.name, event.target.value);
    };

    return (
        <FilterContainer handleFiltersApplied={handleFiltersApplied}>
            <form>
                <Grid direction="row" justify="flex-start" container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <TextField variant="outlined" label="Nombre" onChange={handleInputChange}
                                   defaultValue={filters.first_name} name="first_name"/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField variant="outlined" label="Apellido" onChange={handleInputChange}
                                   defaultValue={filters.last_name} name="last_name"/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField variant="outlined" label="Email" onChange={handleInputChange}
                                   defaultValue={filters.email} name="email"/>
                    </Grid>
                </Grid>
            </form>
        </FilterContainer>
    );
}