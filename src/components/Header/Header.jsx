import React from 'react';
import classes from './Header.module.css'
import {useNavigate} from 'react-router-dom'

const Header = ({setActive}) => {
    const navigate = useNavigate()
    const goHome =()=>{
        navigate(`/`, {
            replace: false,
        });
    }
    return (
        <div className={classes.Header}>
            <div className={classes.HeaderImage}>
                <div onClick={goHome} className={classes.blockTitle}>
                    <h1 className={classes.title}>SOUL&BODY</h1>
                    <p className={classes.subTitle}>будь власною музою</p>
                </div>
            </div>

        </div>
    );
};

export default Header;