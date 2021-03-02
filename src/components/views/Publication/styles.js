import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    images: {
        display: "flex",
        justifyContent: "center"
    },
    info: {
        marginTop: 20
    },
}));