import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import {DataTableCell} from "./DataTableCell";
import {Container} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {ConfirmationModal} from "../ConfirmationModal";

export function DataTable({rows, columns, urlViewElement, handleBlock, modalDescription, modalTitle}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedElementId, setSelectedElementId] = useState(undefined);

    const handleClickBlock = (event) => {
        let button = event.currentTarget;
        console.log(button.id);
        setSelectedElementId(button.id);
        setOpenDialog(true);
    };

    const handleConfirmBlock = () => {
        // handleBlock();
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

    const createRow = (row) => {
        return (
            <TableRow>
                {columns.map((column) =>
                    <DataTableCell row={row}
                                   column={column}
                                   handleClickBlock={handleClickBlock}
                                   urlViewElement={urlViewElement}/>)}
            </TableRow>
        );
    };

    return (
        <Container style={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
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
                rowsPerPageOptions={[1, 5, 10]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <ConfirmationModal isOpen={openDialog}
                               handleCancel={handleClose}
                               description={modalDescription}
                               title={modalTitle}
                               handleConfirmation={handleConfirmBlock}/>
        </Container>
    );
}