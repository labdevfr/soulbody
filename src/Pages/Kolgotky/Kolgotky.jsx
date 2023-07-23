import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchKolgotky} from "../../AsyncActions";
import Cards from "../../components/Cards/Cards";
import classes from "./Kolgotky.module.css"

const Kolgotky = () => {
    const {kolgotky} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (kolgotky.length === 0) dispatch(fetchKolgotky())
    },[])
    return (
        <>
            {kolgotky.length === 0 ? <div className={classes.fullWidth}><p>Немає в наявності</p></div>  : <Cards panties={kolgotky}/>}
        </>

    );
};

export default Kolgotky;