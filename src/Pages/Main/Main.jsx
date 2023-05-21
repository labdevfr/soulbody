import React, {useEffect, useState} from 'react';
import classes from './Main.module.css'
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import {useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { useLocation } from 'react-router-dom';

const Main = ({children}) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const {cart} = useSelector(state => state)
    const navigate = useNavigate()
    const [isActive,setActive] = useState(false)
    const amount = ()=>{
        return cart.reduce((acc,current)=>{
            acc += current.amount
            return acc
        },0)
    }
    const goToCard =()=>{
        navigate(`/cart`, {
            replace: false,
        });

    }
    return (
        <div className={classes.Main}>
            <Header setActive={setActive}/>
            <div className={classes.bottomHeader}>
                <Menu active={isActive} setActive={setActive} />
                <div className={classes.bag}>
                    <div onClick={goToCard} className={classes.bagContainer}>
                        <svg role="img" className={classes.svgBag} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 64 64">
                            <path fill="none" strokeWidth="2" strokeMiterlimit="10" d="M44 18h10v45H10V18h10z"></path>
                            <path fill="none" strokeWidth="2" strokeMiterlimit="10"
                                  d="M22 24V11c0-5.523 4.477-10 10-10s10 4.477 10 10v13"></path>
                        </svg>
                    </div>
                    {amount()>0 && <div onClick={goToCard} className={classes.count}>{amount()}</div>}

                </div>
            </div>

            <div className={classes.content}>
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Main;