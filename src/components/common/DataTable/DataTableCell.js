import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import BlockIcon from "@material-ui/icons/Block";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import {getDateStringFrom} from "../../../utils";

export function DataTableCell({row, column, handleClickBlock}) {
    const renderActions = (actions) => {
        return actions.map((action) => {
            if (action.type === "view") {
                return renderViewAction(action, action.icon);
            } else if (action.type === "block") {
                return renderBlockAction(action);
            }
        })
        // return (
        //     <div>
        //         <Tooltip title="Ver">
        //             <IconButton component={Link} to={urlViewElement + row[column.field]} color="primary">
        //                 <VisibilityIcon/>
        //             </IconButton>
        //         </Tooltip>
        //         {showBlockOption ?
        //             <Tooltip title={"Bloquear"}>
        //                 <IconButton onClick={handleClickBlock} color="secondary" id={row[column.field]}>
        //                     <BlockIcon/>
        //                 </IconButton>
        //             </Tooltip>
        //             :
        //             <React.Fragment/>
        //         }
        //     </div>
        // )
    };

    const renderViewAction = (action, Component) => {
        const title = action?.title || "Ver"
        return (
            <Tooltip title={title} key={row[action.idField] + action.urlViewElement}>
                <IconButton component={Link} to={action.urlViewElement + row[action.idField]} color="primary">
                    < Component />
                </IconButton>
            </Tooltip>
        );
    };

    const renderBlockAction = (action) => {
        // if (!row[action.checkBlockedField]) {
        //     return <React.Fragment/>
        // }
        return (
            <Tooltip title={"Bloquear"} key={row[action.idField] + action.type}>
                <IconButton onClick={handleClickBlock} color="secondary" id={row[action.idField]}>
                    <BlockIcon/>
                </IconButton>
            </Tooltip>
        );
    };

    const renderText = () => {
        return (row[column.field])
    };

    const renderDate = () => {
        return (getDateStringFrom(row[column.field]));
    }

    const content = () => {
        if (column.type === 'actions') {
            return (
                <div>
                    { renderActions(column.actions) }
                </div>
            );
        } else if (column.type === 'date') {
            return renderDate();
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