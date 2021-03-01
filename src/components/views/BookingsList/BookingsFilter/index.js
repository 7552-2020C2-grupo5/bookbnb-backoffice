import React from "react";
import {FilterContainer} from "../../../common/FilterContainer";
import DatePickerInput from "../../../common/DatePicker";
import Grid from "@material-ui/core/Grid";
import SelectInput from "../../../common/SelectInput";

export default function BookingsFilter({filters, handleValueChanged, handleFiltersApplied}) {
    const handleInputChange = (event) => {
        handleValueChanged(event.target.name, event.target.value);
    };

    const statusOptions = () => {
        return [
            {text: "Aceptada", value: "ACCEPTED"},
            {text: "Rechazada", value: "REJECTED"},
            {text: "Pendiente", value: "PENDING"},
        ]
    }

    return (
        <FilterContainer handleFiltersApplied={handleFiltersApplied}>
            <form>
                <Grid direction="row" justify="flex-start" container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <DatePickerInput label="Mín. fecha de inicio" value={filters.initialDate} name="initialDate"
                                         handleChange={handleValueChanged} clearable={true}/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <DatePickerInput label="Máx. fecha de fin" value={filters.finalDate} name="finalDate"
                                         handleChange={handleValueChanged} clearable={true}/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <DatePickerInput label="Fecha de reserva" value={filters.bookingDate} name="bookingDate"
                                         handleChange={handleValueChanged} clearable={true}/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <SelectInput options={statusOptions()} value={filters.bookingStatus} name="bookingStatus"
                                     handleChange={handleInputChange}/>
                    </Grid>
                </Grid>
            </form>
        </FilterContainer>
    );
}