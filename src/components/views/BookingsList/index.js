import React, {useCallback, useEffect, useState} from "react";
import {app} from "../../../app/app";
import Loader from "../../common/Loader";
import {Container} from "@material-ui/core";
import SectionTitle from "../../common/SectionTitle";
import {DataTable} from "../../common/DataTable";
import Layout from "../../common/Layout";
import HouseIcon from '@material-ui/icons/House';
import PersonIcon from "@material-ui/icons/Person";
import {getISODateStringFrom} from "../../../utils";
import BookingsFilter from "./BookingsFilter";

export default function BookingsList() {
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [notification, setNotification] = useState({message: "", isError: false, open: false});
    const [filters, setFilters] = useState({
        bookingDate: null,
        bookingStatus: "",
        initialDate: null,
        finalDate: null,
    });

    const handleFilterValueChanged = (name, value) => {
        setFilters({...filters, [name]: value});
    };

    const onNotificationClosed = () => {
        setNotification({...notification, open: false})
    };

    const handleResponse = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(), isError: true, open: true});
        } else {
            setBookings(response.bookings());
        }
        setLoading(false);
    };

    const getBookings = useCallback((filters= {}) => {
        app.apiClient().bookings(filters, handleResponse);
    }, []);



    const handleReload = useCallback(() => {
        const filtersToApply =  {
            booking_date: getISODateStringFrom(filters.bookingDate),
            initial_date: getISODateStringFrom(filters.initialDate),
            final_date: getISODateStringFrom(filters.finalDate),
            booking_status: filters.bookingStatus,
        };
        setLoading(true);
        getBookings(filtersToApply);
    }, [getBookings, filters]);

    useEffect(() => {
        setLoading(true);
        getBookings();
    }, [getBookings]);

    const columns = () => {
        return ([
            {field: 'initialDate', type: 'date', headerName: 'Fecha de inicio', width: "20%"},
            {field: 'finalDate', type: 'date', headerName: 'Fecha de finalización', width: "20%"},
            {field: 'bookingDate', type: 'date', headerName: 'Fecha de reserva', width: "20%"},
            {field: 'totalPrice', type: 'text', headerName: 'Monto', width: "10%"},
            {field: 'bookingStatus', type: 'text', headerName: 'Estado', width: "10%"},
            {field: 'id', type: 'actions', headerName: 'Acciones', width: "20%",
                actions: [
                    {type: "view", urlViewElement: app.routes().publications + '/', idField: 'publicationId',
                        icon: HouseIcon, title: "Ver publicación"},
                    {type: "view", urlViewElement: app.routes().users + '/', idField: 'tenantId',
                        icon: PersonIcon, title: "Ver inquilino"},
                ]
            }
        ]);
    };

    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return (
            <Container>
                <SectionTitle title="Listado de transacciones de reservas" />
                <BookingsFilter handleFiltersApplied={handleReload} filters={filters}
                                    handleValueChanged={handleFilterValueChanged}/>
                <DataTable rows={bookings} columns={columns()}/>
            </Container>
        );
    }

    return (
        <Layout content={content()} notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}