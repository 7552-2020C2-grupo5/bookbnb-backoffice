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
import TablePagination from "@material-ui/core/TablePagination";
import {Container} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

function ConfirmationModal({isOpen, handleCancel, handleConfirmation, description, title}) {
    return (
        <Dialog
            open={isOpen}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirmation} color="primary">
                    Confirmar
                </Button>
                <Button onClick={handleCancel} color="primary" autoFocus>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
}


function UsersTable({users}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedElementId, setSelectedElementId] = useState(undefined);

    const handleClickBlock = (event) => {
        let button = event.currentTarget
        console.log(button.id);
        setSelectedElementId(button.id);
        setOpenDialog(true);
    };

    const handleConfirmation = () => {
        console.log(selectedElementId);
        setOpenDialog(false);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const headers = () => {
        return (
            ['Nombre', 'Apellido', 'Email', 'Acciones']
        )
    };

    const createRow = (user) => {
        return (
            <TableRow key={user.id}>
                <TableCell>
                    {user.first_name}
                </TableCell>
                <TableCell>
                    {user.last_name}
                </TableCell>
                <TableCell >
                    {user.email}
                </TableCell>
                <TableCell>
                    <Tooltip title="Ver">
                        <IconButton component={Link} to={"/users/" + user.id} color="primary">
                            <PersonIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Bloquear"}>
                        <IconButton onClick={handleClickBlock} color="secondary" id={user.id}>
                            <BlockIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <Container style={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers().map((header) => <TableCell key={header} width={"20%"}>{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(createRow)}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[1, 2]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <ConfirmationModal isOpen={openDialog}
                               handleCancel={handleClose}
                               description={"Está por bloquear al usuario con id " + selectedElementId}
                               title={"¿Está seguro que desea bloquear al usuario?"}
                               handleConfirmation={handleConfirmation}/>
        </Container>
    );
}



export default function UsersList() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    // When the user enters the screen, the
    useEffect(() => {
        setUsers(
            [
                {'id': 2, 'first_name': 'Janet', 'last_name': 'Weaver', 'email': 'janet.weaver@reqres.in'},
                {'id': 3, 'first_name': 'Emma', 'last_name': 'Wong', 'email': 'janet.weaver@reqres.in'},
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