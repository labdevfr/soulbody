import React from 'react';
import classes from './Input.module.css'

const Input = ({style,id,name,label,value,onChange,error,helperText,onBlur}) => {
    console.log(error)
    return (
        <div className={classes.Input}>
            <label style={error ? {color: 'red'} : null} className={classes.label} htmlFor="email">{label}</label>
            <input
                className={classes.InputItem}
                id={id}
                onBlur={onBlur}
                name={name}
                style={error ? {borderColor: 'red',style} : null}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default Input;