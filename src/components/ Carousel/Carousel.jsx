import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel,CarouselProps } from 'react-responsive-carousel';
import classes from './Carousel.module.css'

const CarouselComponent = ({img}) => {
    console.log(img)
    return (
        <Carousel  autoPlay={true} >
            <div  className={classes.item}>
                <img src={img} />
            </div>
            <div className={classes.item}>
                <img src={img} />
            </div>
            <div className={classes.item}>
                <img className={classes.item} src={img} />
            </div>
        </Carousel>
    );
};

export default CarouselComponent;