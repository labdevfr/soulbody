import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSlips,fetchPanties,fetchKolgotky} from "../../AsyncActions";
import Cards from "../../components/Cards/Cards";
import kolgotky from "../Kolgotky/Kolgotky";

const All = () => {
    const {slips} = useSelector(state => state)
    const {panties} = useSelector(state => state)
    const {kolgotky} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchSlips())
        dispatch(fetchPanties())
        dispatch(fetchKolgotky())
    },[])
    return (
        <Cards panties={[...panties,...slips,...kolgotky]}/>
    );
};

export default All;