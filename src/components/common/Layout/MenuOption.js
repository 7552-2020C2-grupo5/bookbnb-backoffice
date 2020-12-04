import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

export default function MenuOption({icon: Component, text, route}) {
    return (
        <ListItem button component={Link} to={route} key={route}>
            <ListItemIcon>
                <Component/>
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    )
};
