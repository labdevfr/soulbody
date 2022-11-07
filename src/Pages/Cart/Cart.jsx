import React,{useState} from 'react';
import classes from './Cart.module.css'
import {useSelector,useDispatch} from "react-redux";
import close from '../../assets/close.svg'
import {increaseAmount,decreaseAmount,deleteProduct} from "../../store/user/userReducer";
import {logDOM} from "@testing-library/react";
import {useNavigate} from "react-router-dom";



const Cart = () => {
    const {cart} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [carts,setCarts] = useState([...cart])
    const increase = (id)=>{
        dispatch(increaseAmount(id))
    }
    const decrease = (id)=>{
        dispatch(decreaseAmount(id))
    }
    const deleteItem = (id)=>{
        dispatch(deleteProduct(id))
    }
    const amount = ()=>{
        return cart.reduce((acc,current)=>{
            acc += current.amount * current.price
            return acc
        },0)
    }
    const numbers =()=>{
        return cart.reduce((acc,current)=>{
            acc+=current.amount
            return acc
        },0)
    }
    const goBack =()=>{
        navigate(-1);
    }
    const goForm = ()=>{
        navigate(`/ordering`, {
            replace: false,
        });
    }
    return (
        <div className={classes.Cart}>
            <div className={classes.CartTitle}>
                <img src="https://irwhite-room.herokuapp.com/static/media/cart-basket.dcd5168086a25b3307ba9f5524ca6e70.svg" alt=""/>
                <h1 className={classes.Title}>Кошик</h1>
            </div>
            <div className={classes.CartContainer}>
                {!cart.length ? <>
                    <img className={classes.CartImg}  src="https://cdn-icons-png.flaticon.com/512/3142/3142578.png" alt=""/>
                    <h1 className={classes.InnerTitle}>Кошик порожній</h1>
                    <p className={classes.InnerText}>Але це ніколи не пізно виправити :)</p>
                </> :
                    <div className={classes.ProductWrap}>
                        <div className={classes.ProductsList}>
                            {cart.map(item=>(
                                <div className={classes.ProductItem}>
                                    <div className={classes.ProductImage}>
                                        <img src={item.image} alt=""/>
                                    </div>
                                    <div className={classes.ProductInfo}>
                                        <div className={classes.ProductTitle}>
                                            <h1 className={classes.ProductName}>{item.name}</h1>
                                            <p className={classes.ProductSize}>Розмір: {item.size}</p>
                                        </div>
                                        <div className={classes.ProductAmount}>
                                            <button onClick={()=>decrease(item.id)} className={classes.ProductBtn}>
                                                <span>-</span>
                                            </button>
                                            <span>{item.amount}</span>
                                            <button onClick={()=>increase(item.id)} className={classes.ProductBtn}>
                                                <span>+</span>
                                            </button>
                                        </div>
                                        <div className={classes.ProductPrice}>
                                            <span>{item.price*item.amount} грн</span>
                                        </div>
                                        <button onClick={()=>deleteItem(item.id)} className={classes.ProductDelete}>
                                            x
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={classes.ProductsDetails}>
                            <span>Вибрано товарів: <b>{numbers()}шт</b></span>
                            <span className={classes.price}>Сума замовлення: <b>{amount()}</b></span>
                        </div>
                        <div className={classes.ProductButtons}>
                            <button onClick={goBack} className={classes.CartBack}>Повернутись назад</button>
                            <button onClick={goForm} className={classes.CartOrder}>Оформити замовлення</button>
                        </div>
                    </div>
                }
            </div>

        </div>
    );
};

export default Cart;