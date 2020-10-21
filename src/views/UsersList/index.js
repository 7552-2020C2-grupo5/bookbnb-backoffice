import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BlockIcon from '@material-ui/icons/Block';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

export default function UsersList() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    // When the user enters the screen, the
    useEffect(() => {

    });

    const content = () => {
        if (loading) {
            return(
                <Box>
                    <CircularProgress></CircularProgress>
                </Box>
            );
        }
        return(
            <TableContainer>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Ari
                            </TableCell>
                            <TableCell>
                                Vergara
                            </TableCell>
                            <TableCell>
                                avergara
                            </TableCell>
                            <TableCell width={"20%"}>
                                <IconButton color="primary" onClick={() => alert("HOLA")}>
                                    <PersonIcon/>
                                </IconButton>
                                <IconButton color="secondary" aria-label="add an alarm">
                                    <BlockIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <Layout content={content()}/>
    );
}