import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import BlockIcon from "@material-ui/icons/Block";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import {getDateStringFrom} from "../../../utils";

export function DataTableCell({row, column, urlViewElement, handleClickBlock}) {
    const renderActions = () => {
        return (
            <div>
                <Tooltip title="Ver">
                    <IconButton component={Link} to={urlViewElement + row[column.field]} color="primary">
                        <VisibilityIcon/>
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

    const renderDate = () => {
        return (getDateStringFrom(row[column.field]));
    }

    const content = () => {
        if (column.type === 'actions') {
            return renderActions();
        } else if (column.type === 'date') {
            return renderDate();
        } else {
            return renderText();
        }
    };

    return (
        <TableCell key={row[column.field]}>
            {content()}
        </TableCell>
    );
}