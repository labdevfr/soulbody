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
            <Cards panties={slips}/>
    );
};

export default Panties;