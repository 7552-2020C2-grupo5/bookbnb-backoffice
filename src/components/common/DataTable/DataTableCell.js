import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import BlockIcon from "@material-ui/icons/Block";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

export function DataTableCell({row, column, handleClickView, handleClickBlock}) {
    const renderActions = () => {
        return (
            <div>
                <Tooltip title="Ver">
                    <IconButton component={Link} to={"/users/" + row[column.field]} color="primary">
                        <PersonIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Bloquear"}>
                    <IconButton onClick={handleClickBlock} color="secondary" id={row[column.field]}>
                        <BlockIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        )
    };

    const renderText = () => {
        return (row[column.field])
    };

    const content = () => {
        if (column.type === 'actions') {
            return renderActions();
        } else {
            return renderText();
        }
    };

    return (
        <TableCell>
            {content()}
        </TableCell>
    );
}