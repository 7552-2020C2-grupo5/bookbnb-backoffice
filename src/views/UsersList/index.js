import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import BlockIcon from '@material-ui/icons/Block';
import PersonIcon from '@material-ui/icons/Person';
import Loader from "../../components/Loader";
import {Link} from "react-router-dom";

function UsersTable({users}) {
    const headers = () => {
        return (
            ['Nombre', 'Apellido', 'Email', 'Acciones']
        )
    };

    const row = (user) => {
        return (
            <TableRow key={user.id}>
                <TableCell>
                    {user.name}
                </TableCell>
                <TableCell>
                    {user.surname}
                </TableCell>
                <TableCell>
                    {user.email}
                </TableCell>
                <TableCell width={"20%"}>
                    <IconButton component={Link} to={"/users/" + user.id} color="primary">
                        <PersonIcon/>
                    </IconButton>
                    <IconButton color="secondary">
                        <BlockIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers().map((header) => <TableCell key={header}>{header}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(row)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default function UsersList() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    // When the user enters the screen, the
    useEffect(() => {
        setUsers(
            [
                {'id': 2, 'name': 'Janet', 'surname': 'Weaver', 'email': 'janet.weaver@reqres.in'},
                {'id': 3, 'name': 'Emma', 'surname': 'Wong', 'email': 'janet.weaver@reqres.in'},
            ]
        );
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return(
            <UsersTable users={users}/>
        );
    }

    return (
        <Layout content={content()}/>
    );
}