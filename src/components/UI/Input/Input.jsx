import React from 'react';
import classes from './Input.module.css'

const Input = ({style,id,name,label,value,onChange,error,helperText}) => {
    console.log(name,error)
    return (
        <div className={classes.Input}>
            <label className={classes.label} htmlFor="email">{label}</label>
            <input
                className={classes.InputItem}
                id={id}
                name={name}
                onChange={onChange}
                value={value}
                style={style}
            />
        </div>
    );
};

export default Input;