import React from 'react';
import classes from './Footer.module.css'
import {Link} from "react-router-dom";
import inst from '../../assets/icon/instagram.png'
import mail from '../../assets/icon/mail.png'

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