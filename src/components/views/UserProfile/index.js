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


export default function UserProfile(props) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const classes = useStyles();


    const handleResponseGetUser = (response) => {
        setUser(response.content());
        setLoading(false);
    }

    const handleClickOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        setLoading(true);
        app.apiClient().profileData(props.match.params.id, handleResponseGetUser);
    }, [props.match.params.id]);

    const content = () => {
        if (loading) {
            return(
                <Loader/>
            );
        }
        return (
            <Container>
                <Card className={classes.root}>
                    <CardContent>
                        <UserAvatar name={user.first_name} surname={user.last_name} avatarSrc={user.avatar}/>
                    </CardContent>
                    <Divider/>
                    <CardContent>
                        <UserData name={user.first_name} surname={user.last_name} email={user.email}
                                  registerDate={getDateStringFrom(user.register_date)}/>
                    </CardContent>
                    <CardContent className={classes.buttonContainer}>
                        <Button onClick={handleClickOpenModal} color="primary" variant="contained">
                            Cargar Saldo
                        </Button>
                    </CardContent>
                </Card>
                <AddMoneyToWalletModal isOpen={modalOpen} handleCancel={handleCloseModal}
                                       handleConfirmation={handleCloseModal}/>
            </Container>
        );
    }

    return (
        <Layout content={content()}/>
    );
}