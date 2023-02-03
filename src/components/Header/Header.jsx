import React from 'react';
import classes from './Header.module.css'
import menu from '../../assets/icon/menu_FILL0_wght400_GRAD0_opsz48.svg'

const Header = ({setActive}) => {
    return (
        <div className={classes.Header}>
            <div className={classes.HeaderImage}>
                <div className={classes.blockTitle}>
                    <h1 className={classes.title}>SOUL&BODY</h1>
                    <p className={classes.subTitle}>будь власною музою</p>
                </div>
            </div>
            <button onClick={()=>setActive((prev)=>!prev)} className={classes.menu}>
                <img src={menu} alt=""/>
            </button>
        </div>
    );
};

export default Header;