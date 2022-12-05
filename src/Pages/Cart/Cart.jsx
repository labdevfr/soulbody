import React,{useState} from 'react';
import classes from './Cart.module.css'
import {useSelector,useDispatch} from "react-redux";
import close from '../../assets/close.svg'
import {increaseAmount,decreaseAmount,deleteProduct} from "../../store/user/userReducer";
import {useNavigate} from "react-router-dom";
import { CSSTransition,TransitionGroup } from 'react-transition-group';

const Cart = () => {
    const {cart} = useSelector(state => state)
    const {CartCount} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [carts,setCarts] = useState([...cart])
    const [errorSale,setErrorSale] = useState(false)
    const [showAlert,setShowAlert] = useState(false)
    console.log(cart)
    const increase = (id)=>{
        dispatch(increaseAmount(id))
    }
    const decrease = (id,count)=>{
        if (count>1) dispatch(decreaseAmount(id))
    }
    const deleteItem = (id,count)=>{
        dispatch(deleteProduct({id,count}))
    }
    const amount = ()=>{
        return cart.reduce((acc,current)=>{
            acc += current.amount * current.price
            return acc
        },0)
    }
    const sale = () =>{
        return cart.reduce((acc,current)=>{
            if (current.color ==='Мікс'){
                acc+=current.amount
            }
            return acc
        },0)
    }
    const goBack =()=>{
        navigate(-1);
    }
    const goForm = ()=>{
        if (sale()===0 ||sale()>=5){
            navigate(`/ordering`, {
                replace: false,
            });
        }
        else{
            setShowAlert(true)
        }
    }
    return (
        <div className={classes.Cart}>
            <div className={classes.CartTitle}>
                <img src="https://irwhite-room.herokuapp.com/static/media/cart-basket.dcd5168086a25b3307ba9f5524ca6e70.svg" alt=""/>
                <h1 className={classes.Title}>Корзина</h1>
            </div>
            {/*<h1 className={classes.CartSubtitle}>Акція діє від 5 трусиків</h1>*/}
            <div className={classes.CartContainer}>
                {!cart.length ? <>
                    <img className={classes.CartImg}  src="https://cdn-icons-png.flaticon.com/512/3142/3142578.png" alt=""/>
                    <h1 className={classes.InnerTitle}>Кошик порожній</h1>
                    <p className={classes.InnerText}>Але це ніколи не пізно виправити :)</p>
                </> :
                    <div className={classes.ProductWrap}>
                        <div className={classes.ProductsList}>
                            <TransitionGroup component={'ul'}>
                                {cart.map(item=>(
                                    <CSSTransition
                                        key={item.id}
                                        timeout={1000}
                                        classNames={{
                                            enterActive: classes.EnterActive,
                                            exitActive: classes.ExitActive
                                        }}
                                    >
                                        <div className={classes.ProductItem}>
                                            <div className={classes.ProductImage}>
                                                <img src={item.image} alt=""/>
                                            </div>
                                            <div className={classes.ProductInfo}>
                                                <div className={classes.ProductTitle}>
                                                    <h1 className={classes.ProductName}>{item.name}</h1>
                                                    <p className={classes.ProductSize}>Розмір: {item.size}</p>
                                                    <p className={classes.ProductSize}>Колір: {item.color}</p>
                                                </div>
                                                <div className={classes.ProductNav}>
                                                    <div className={classes.ProductAmount}>
                                                        <button onClick={()=>decrease(item.id,item.amount)} className={classes.ProductBtn}>
                                                            <span>-</span>
                                                        </button>
                                                        <span>{item.amount}</span>
                                                        <button onClick={()=>increase(item.id)} className={classes.ProductBtn}>
                                                            <span>+</span>
                                                        </button>
                                                    </div>
                                                    <div className={classes.ProductPrice}>
                                                        {item.color==='Мікс'?
                                                            <span><span className={classes.pricemin}>{(item.price+10)*item.amount}грн</span> <span className={classes.red}>{item.price*item.amount} грн</span></span>:
                                                            <span>{item.price*item.amount} грн</span>}
                                                    </div>
                                                    <button onClick={()=>deleteItem(item.id,item.amount)} className={classes.ProductDelete}>
                                                        x
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </CSSTransition>

                                ))}
                            </TransitionGroup>
                        </div>
                        <CSSTransition
                            in={showAlert}
                            timeout={1000}
                            unmountOnExit
                            classNames={{
                                enterActive: classes.EnterActiveAlert,
                                exitActive: classes.ExitActiveAlert
                            }}>
                            <div className={classes.alert}>
                                <span>Оберіть ще {5-sale()} акційні трусики</span>
                                <button className={classes.alertBtn} onClick={()=>setShowAlert(false)}>
                                    <img src={close} alt=""/>
                                </button>
                            </div>
                        </CSSTransition>
                        <div className={classes.ProductsDetails}>
                            <span className={classes.ProductsDetailsTitle}>
                                <span>Вибрано товарів: <b>{CartCount}шт.</b></span>
                            </span>
                            <span className={classes.price}>Сума замовлення: <b>{amount()} грн</b></span>
                        </div>
                        <div className={classes.CartError}>
                            {errorSale && <span>Оберіть ще {5-sale()} трусиків</span>}
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