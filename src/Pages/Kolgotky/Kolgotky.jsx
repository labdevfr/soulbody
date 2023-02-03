import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchKolgotky} from "../../AsyncActions";
import Cards from "../../components/Cards/Cards";

const Kolgotky = () => {
    const {kolgotky} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchKolgotky())
    },[])
    return (
        <Cards panties={kolgotky}/>
    );
};

export default Kolgotky;