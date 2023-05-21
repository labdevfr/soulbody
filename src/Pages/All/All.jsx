import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSlips,fetchPanties,fetchKolgotky,fetchCollection} from "../../AsyncActions";
import Cards from "../../components/Cards/Cards";
import classes from './All.module.css'
import CardCollection from "../../components/CardCollection/CardCollection";

const All = () => {
    const {collection} = useSelector(state => state)
    const dispatch = useDispatch()
    console.log(collection)
    useEffect(()=>{
        dispatch(fetchCollection())
    },[])
    return (
        <div className={classes.collectionsContainer}>
            <h1 className={classes.CollectionTitle}>Колекція</h1>
            <div className={classes.collections}>
                {collection.map((item,index)=>{
                    return (<CardCollection index={index+1} item={item}/>)
                })}
            </div>
        </div>


    );
};

export default All;