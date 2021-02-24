import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));