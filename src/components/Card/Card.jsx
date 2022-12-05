import React from 'react';
import classes from './Card.module.css'
import {useNavigate} from 'react-router-dom'
import Carousel from "../ Carousel/Carousel";

const Card = ({item}) => {
    const navigate = useNavigate()
    const goToCard =()=>{
        navigate(`/product/${item.UnId}`, {
            replace: false,
        });
    }
    return (
        <div onClick={goToCard} className={classes.card}>
            <img className={classes.cardImage} src={item.image[0]} alt=""/>
            <div className={classes.infoCard}>
                <h1 className={classes.titleCard}>{item.name}</h1>
                <p className={classes.priceCard}>{item.price}грн</p>
            </div>
            <button className={classes.btn}>Переглянути</button>
        </div>
    );
};

export default Card;