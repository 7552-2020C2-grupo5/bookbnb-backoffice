import React from 'react';
import clsx from 'clsx';
import {useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from "@material-ui/icons/Person";
import HouseIcon from '@material-ui/icons/House';
import {useHistory} from 'react-router-dom';
import {app} from "../../../app/app";
import MenuOption from "./MenuOption";
import {Button, Hidden} from "@material-ui/core";
import Notification from "../Notification";
import makeStyles from "@material-ui/core/styles/makeStyles";
import BarChartIcon from '@material-ui/icons/BarChart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
// import useStyles from './styles'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        [theme.breakpoints.up('lg')]: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    appContent: {
        margin: 10
    },
    logout: {
        float: "right"
    }
}));

export default function Layout(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleCloseNotification = () => {
        if (props.onNotificationClosed !== undefined) {
            props.onNotificationClosed();
        }
    }

    const notificationContent = () => {
        if (props.notification !== undefined) {
            return <Notification open={props.notification.open} message={props.notification.message}
                                 isError={props.notification.isError} onNotificationClosed={handleCloseNotification}/>
        }
    };

    const handleLogOut = () => {
        app.logoutUser();
    };

    const handleClickLogout = () => {
        debugger;
        app.apiClient().adminLogout(handleLogOut);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <MenuOption icon={BarChartIcon} text={'Métricas'} route={app.routes().home} />
                <MenuOption icon={PersonIcon} text={'Usuarios'} route={app.routes().users} />
                <MenuOption icon={HouseIcon} text={'Publicaciones'} route={app.routes().publications} />
                <MenuOption icon={PersonIcon} text={'Administradores'} route={app.routes().admins} />
                <MenuOption icon={MenuBookIcon} text={'Reservas'} route={app.routes().bookings} />
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        BookBnb
                    </Typography>
                    <Button onClick={handleClickLogout}>Cerrar sesión</Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden lgUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.appContent}>
                    {props.content}
                    {notificationContent()}
                </div>

            </main>
        </div>
    );
}


// export default function Layout({content, notification=undefined, onNotificationClosed=undefined}) {
//     const classes = useStyles();
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);
//     let history = useHistory();
//
//     const handleCloseNotification = () => {
//         if (onNotificationClosed !== undefined) {
//             onNotificationClosed();
//         }
//     }
//
//     const notificationContent = () => {
//         if (notification !== undefined) {
//             return <Notification open={notification.open} message={notification.message}
//                                  isError={notification.isError} onNotificationClosed={handleCloseNotification}/>
//         }
//     };
//
//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };
//
//     const handleDrawerClose = () => {
//         setOpen(false);
//     };
//
//     const handleLogOut = () => {
//         app.logoutUser();
//         history.push("/")
//     };
//
//     return (
//         <div className={classes.root}>
//             <CssBaseline />
//             <AppBar
//                 position="fixed"
//                 className={clsx(classes.appBar, {
//                     [classes.appBarShift]: open,
//                 })}
//             >
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         onClick={handleDrawerOpen}
//                         edge="start"
//                         className={clsx(classes.menuButton, open && classes.hide)}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" noWrap>
//                         BookBnb
//                     </Typography>
//                     <Button onClick={handleLogOut}>Cerrar sesión</Button>
//                 </Toolbar>
//             </AppBar>
//             <Drawer
//                 className={classes.drawer}
//                 variant="persistent"
//                 anchor="left"
//                 open={open}
//                 classes={{
//                     paper: classes.drawerPaper,
//                 }}
//             >
//                 <div className={classes.drawerHeader}>
//                     <IconButton onClick={handleDrawerClose}>
//                         {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//                     </IconButton>
//                 </div>
//                 <Divider />
//                 <List>
//                     <MenuOption icon={PersonIcon} text={'Usuarios'} route={app.routes().users} />
//                     <MenuOption icon={HouseIcon} text={'Publicaciones'} route={app.routes().publications} />
//                     <MenuOption icon={PersonIcon} text={'Administradores'} route={app.routes().admins} />
//                 </List>
//             </Drawer>
//             <main
//                 className={clsx(classes.content, {
//                     [classes.contentShift]: open,
//                 })}
//             >
//                 <div className={classes.drawerHeader} />
//                 {content}
//                 {notificationContent()}
//             </main>
//         </div>
//     );
// }