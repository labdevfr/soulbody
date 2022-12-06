import React from 'react';
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <div className={classes.Footer}>
            <div className={classes.container}>
                <p className={classes.rightText}>© 2022 Soul&Body. All rights Reserved. </p>
            </div>
        </div>
    );
};

export default Footer;