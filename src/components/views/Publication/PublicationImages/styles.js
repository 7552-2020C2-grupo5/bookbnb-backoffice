import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        objectFit: 'contain',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
}));