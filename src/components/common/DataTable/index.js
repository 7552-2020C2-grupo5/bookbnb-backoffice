import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import {DataTableCell} from "./DataTableCell";
import {Container, Paper} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {ConfirmationModal} from "../ConfirmationModal";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    table: {
        minWidth: 1000,
    },
    root: {
        minWidth: 1200,
        width: "100%",
        overflowX: "auto"
    }
});

export function DataTable({rows, columns, urlViewElement, handleBlock, modalDescription, modalTitle}) {
    const rowsPerPageOptions = [5, 10, 20];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedElementId, setSelectedElementId] = useState(undefined);

    const classes = useStyles();

    const handleClickBlock = (event) => {
        let button = event.currentTarget;
        setSelectedElementId(button.id);
        setOpenDialog(true);
    };

    const showBlockOption = () => {
        return handleBlock !== undefined;
    }

    const handleConfirmBlock = () => {
        if (handleBlock) {
            handleBlock(selectedElementId);
        }
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

    const createRow = (row) => {
        return (
            <TableRow key={row.id}>
                {columns.map((column) =>
                    <DataTableCell row={row}
                                   key={row.id + column.field}
                                   column={column}
                                   showBlockOption={showBlockOption()}
                                   handleClickBlock={handleClickBlock}
                                   urlViewElement={urlViewElement}/>)}
            </TableRow>
        );
    };

    return (
        // <Container style={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
        <Paper className={classes.root}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) =>
                                <TableCell key={column.field} width={column.width}>{column.headerName}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(createRow)}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {showBlockOption() ?
                <ConfirmationModal isOpen={openDialog}
                                   handleCancel={handleClose}
                                   description={modalDescription}
                                   title={modalTitle}
                                   handleConfirmation={handleConfirmBlock}/>
                                   :
                <React.Fragment/>
            }
        </Paper>
        // </Container>
    );
}