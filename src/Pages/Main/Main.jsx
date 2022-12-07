import React,{useEffect} from 'react';
import classes from './Main.module.css'
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {fetchNumbers, fetchPanties} from "../../AsyncActions";

const Main = () => {
    const {cart} = useSelector(state => state)
    const {panties} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const amount = ()=>{
        return cart.reduce((acc,current)=>{
            acc += current.amount
            return acc
        },0)
    }
    useEffect(()=>{
        dispatch(fetchPanties())
        dispatch(fetchNumbers())
    },[])
    const goToCard =()=>{
        navigate(`/cart`, {
            replace: false,
        });

    }
    return (
        <div className={classes.Main}>
            <Header/>
            <div className={classes.content}>
                <div className={classes.bag}>
                    <div onClick={goToCard} className={classes.bagContainer}>
                        <svg role="img" className={classes.svgBag} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 64 64">
                            <path fill="none" strokeWidth="2" strokeMiterlimit="10" d="M44 18h10v45H10V18h10z"></path>
                            <path fill="none" strokeWidth="2" strokeMiterlimit="10"
                                  d="M22 24V11c0-5.523 4.477-10 10-10s10 4.477 10 10v13"></path>
                        </svg>
                    </div>
                    <div onClick={goToCard} className={classes.count}>{amount()}</div>
                </div>
                <div className={classes.sale}>
                    <h1 className={classes.mainTitle}>Акція - 5 трусиків за 195 грн</h1>
                    <p className={classes.mainSubTitle}>за умовами акції колір обираємо ми</p>
                </div>
                <div style={{    maxWidth: '1140px', margin: '0 auto'
                }}>
                </div>
                <div className={classes.cards}>
                    {panties?.map((item)=>{
                        if (item!==null) return <Card key={item.id} item={item}/>
                    })}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Main;