import React,{useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPanties} from "../../AsyncActions";
import classes from "./Sale.module.css";
import Cards from "../../components/Cards/Cards";

const Sale = () => {
    const {panties} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchPanties())
    },[])
    return (
        <>
            <div className={classes.sale}>
                <h1 className={classes.mainTitle}>Акція - 5 трусиків за {(panties[0]?.price - panties[0]?.discount) * 5} грн</h1>
                <p className={classes.mainSubTitle}>за умовами акції колір обираємо ми</p>
            </div>
            <Cards panties={panties}/>
        </>
    );
};

export default Sale;