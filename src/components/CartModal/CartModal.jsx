import React from 'react';
import classes from './CartModal.module.css'
import {useNavigate} from "react-router-dom";

const CartModal = ({card,deleteItem}) => {
    const navigate = useNavigate()
    const goToCart =()=>{
        navigate(`/cart`, {
            replace: false,
        });
    }
    return (
        <div className={classes.modal}>
            <div className={classes.ModalTop}>
                <h1 className={classes.ModalTitle}>Товар додан в корзину</h1>
                <button onClick={()=>deleteItem(card)} className={classes.ProductDelete}>x</button>
            </div>
            <div className={classes.ModalBody}>
                <img className={classes.ModalImg} src={card.image} alt=""/>
                <div className={classes.ModalInfo}>
                    <h1 className={classes.Name}>{card.name}</h1>
                    <p className={classes.size}>Розмір: {card.size}</p>
                    <p className={classes.size}>Колір: {card.color}</p>
                </div>
            </div>
            <div className={classes.ModalButtons}>
                <button onClick={()=>deleteItem(card)}>Продовжити</button>
                <button onClick={goToCart}>В корзину</button>
            </div>
        </div>
    );
};

export default CartModal;