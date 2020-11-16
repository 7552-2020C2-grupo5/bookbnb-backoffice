import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import {app} from "../../../app/app";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import React from "react";

export default function MenuOption({icon: Component, text, route}) {
    return (
        <ListItem button component={Link} to={route}>
            <ListItemIcon>
                <Component/>
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    )
};
