import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 600,
        height: 600,
        objectFit: 'contain',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
}));