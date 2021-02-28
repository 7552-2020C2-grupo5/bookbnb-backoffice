import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import UserAvatar from "./UserAvatar";
import Container from "@material-ui/core/Container";
import Loader from "../../common/Loader";
import UserData from "./UserData";
import {useStyles} from "./styles";
import {app} from "../../../app/app";
import {getDateStringFrom} from "../../../utils";
import Button from "@material-ui/core/Button";
import {AddMoneyToWalletModal} from "./AddMoneyToWalletModal";
import UserBankInformation from "./UserBankInformation";
import Metrics from "../Home/Metrics";
import Typography from "@material-ui/core/Typography";


export default function UserProfile(props) {
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [notification, setNotification] = useState({message: "", isError: false, open: false});

    const classes = useStyles();

    const onNotificationClosed = () => {
        setNotification({...notification, open: false})
    };

    const handleResponseGetUser = (response) => {
        if (response.hasError()) {
            setNotification({message: response.description(),
                isError: true, open: true});
            setUser(undefined);
        } else {
            setUser(response.content());
        }
        setLoading(false);
    }

    const handleClickOpenModal = () => {
        setModalOpen(true);
    }

    const handleAddMoneyToWallet = (response) => {

    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        //TODO: Manejar errores
        setLoading(true);
        app.apiClient().profileData(props.match.params.id, handleResponseGetUser);
    }, [props.match.params.id]);

    const userProfileContent = () => {
        if (user !== undefined) {
            return (
                <React.Fragment>
                    <Card className={classes.root}>
                        <CardContent>
                            <UserAvatar name={user.first_name} surname={user.last_name} avatarSrc={user.avatar}/>
                        </CardContent>
                        <Divider/>
                        <CardContent>
                            <UserData name={user.first_name} surname={user.last_name} email={user.email}
                                      registerDate={getDateStringFrom(user.register_date)}/>
                        </CardContent>
                        <CardContent>
                            <UserBankInformation walletAddress={user.address} moneyInEth={user.ETH}
                                                 moneyInUsd={user.USD} moneyInEur={user.EUR}/>
                        </CardContent>
                        <CardContent className={classes.buttonContainer}>
                            <Button onClick={handleClickOpenModal} color="primary" variant="contained">
                                Cargar Saldo
                            </Button>
                        </CardContent>
                    </Card>
                    <AddMoneyToWalletModal isOpen={modalOpen} handleCancel={handleCloseModal}
                                           handleConfirmation={handleCloseModal}/>
                </React.Fragment>
            );
        }
        return <Typography variant="h4">El usuario no existe o se encuentra bloqueado</Typography>
    }

    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return (
            <Container>
                {userProfileContent()}
            </Container>
        );
    }

    return (
        <Layout content={content()} notification={notification} onNotificationClosed={onNotificationClosed}/>
    );
}