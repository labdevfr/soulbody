import React from 'react';
import classes from './Card.module.css'
import {useNavigate} from 'react-router-dom'

const Card = ({item}) => {
    const navigate = useNavigate()
    const goToCard =()=>{
        navigate(`/${item.type}/${item.UnId}`, {
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
            <div className={classes.sizeBlock}>
                <ul>
                    {item.sizes.map((item,index)=>(<li>{item}</li>))}
                </ul>
            </div>
            <button className={classes.btn}>Переглянути</button>
        </div>
    );
};

export default Card;