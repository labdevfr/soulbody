import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSlips} from "../../AsyncActions";
import classes from "./Panties.module.css";
import Cards from "../../components/Cards/Cards";

const Panties = () => {
    const {slips} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchSlips())
    },[])
    return (
        <>
            <div className={classes.sale}>
                <h1 className={classes.mainTitle}>Акція - 5 трусиків за 295грн</h1>
                <p className={classes.mainSubTitle}>за умовами акції колір обираємо ми</p>
                <p className={classes.mainSubTitle2}>Якщо ж бажаєте власний колір певної моделі, то ціна за шт 70 грн✨</p>
            </div>
            <Cards panties={slips}/>
        </>

    );
};

export default Panties;