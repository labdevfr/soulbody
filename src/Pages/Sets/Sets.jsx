import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSets} from "../../AsyncActions";
import classes from "./Sets.module.css";
import Cards from "../../components/Cards/Cards";

const Sets = () => {
    const {sets} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchSets())
    },[])
    return (
        <Cards panties={sets}/>
    );
};

export default Sets;