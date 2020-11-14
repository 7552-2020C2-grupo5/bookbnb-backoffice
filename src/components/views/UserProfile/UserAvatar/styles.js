import makeStyles from "@material-ui/core/styles/makeStyles";

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
        textAlign: 'center',
        paddingLeft: theme.spacing(2)
    },
    avatar: {
        height: 100,
        width: 100
    }
}));

export default useStyles;