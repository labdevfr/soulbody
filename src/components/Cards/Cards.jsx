import React from 'react';
import classes from "./Cards.module.css"
import Card from "../Card/Card";

const Cards = ({panties}) => {
    return (
        <div className={classes.cards}>
            {panties?.map((item)=>{
                if (item!==null) return <Card key={item.id} item={item}/>
            })}
        </div>
    );
};

export default Cards;