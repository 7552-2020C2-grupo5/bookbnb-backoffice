import Container from "@material-ui/core/Container";
import Carousel from "react-material-ui-carousel";
import Box from "@material-ui/core/Box";
import React from "react";
import {useStyles} from "./styles";

export function PublicationImages({images}) {
    const classes = useStyles();

    return (
        <Container>
            <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
                {images.map((imgSrc) => {
                    return (
                        <Box key={imgSrc} className={classes.container}>
                            <img src={imgSrc} alt="" className={classes.image}/>
                        </Box>
                    );
                })}
            </Carousel>
        </Container>
    );
}