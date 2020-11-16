import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

export default function UserAvatar({name, surname, avatarSrc}) {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Avatar
                className={classes.avatar}
                src={avatarSrc}
            />
            <Box className={classes.info}>
                <Typography>{name}</Typography>
                <Typography>{surname}</Typography>
            </Box>
        </Box>
    );
}