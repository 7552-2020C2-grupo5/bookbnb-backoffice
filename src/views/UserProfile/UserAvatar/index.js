import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 20
    },
    avatar: {
        height: 100,
        width: 100
    }
}));

export default function UserAvatar({user}) {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Avatar
                className={classes.avatar}
                src={user.avatar}
            />
            <Box className={classes.info}>
                <Typography>{user.first_name}</Typography>
                <Typography>{user.last_name}</Typography>
            </Box>
        </Box>
    );
}