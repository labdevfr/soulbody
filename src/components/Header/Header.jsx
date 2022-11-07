import React from 'react';
import classes from './Header.module.css'

const Header = () => {
    return (
        <div className={classes.Header}>
            <div className={classes.HeaderImage}>
                <div className={classes.blockTitle}>
                    <h1 className={classes.title}>SOUL&BODY</h1>
                    <p className={classes.subTitle}>будь власною музою</p>
                </div>

            </div>
        </div>
    );
};

export default Header;