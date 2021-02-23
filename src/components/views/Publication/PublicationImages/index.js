import Container from "@material-ui/core/Container";
import Carousel from "react-material-ui-carousel";
import Box from "@material-ui/core/Box";
import React from "react";
import {useStyles} from "./styles";

export function PublicationImages({images}) {
    const classes = useStyles();
    if (images.length === 1) {
        return (
            <Box key={images[0]} className={classes.container}>
                <img src={images[0]} alt="" className={classes.image}/>
            </Box>
        );
    }
    if (images.length > 0) {
        return (
            <React.Fragment>
                <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
                    {images.map((imgSrc) => {
                        return (
                            <Box key={imgSrc} className={classes.container}>
                                <img src={imgSrc}/>
                            </Box>
                        );
                    })}
                </Carousel>
            </React.Fragment>
        );
    }
}