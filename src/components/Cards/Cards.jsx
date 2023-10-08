import React from 'react';
import classes from "./Cards.module.css"
import Card from "../Card/Card";

const Cards = ({panties}) => {
    return (
        <div className={classes.cards}>
            {panties.reverse()?.map((item)=>(item!==null && <Card key={item.id} item={item}/>))}
        </div>
    );
};

export default Cards;