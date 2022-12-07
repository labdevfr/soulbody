import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import classes from './Carousel.module.css'

const CarouselComponent = ({img}) => {
    return (
        <Carousel  autoPlay={true} >
            {img?.map((item)=>(
                <div key={item} className={classes.item}>
                    <img src={item} alt="Panty"/>
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;