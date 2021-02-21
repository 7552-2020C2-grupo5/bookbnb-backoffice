import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));