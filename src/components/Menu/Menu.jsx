import React from 'react';
import classes from "./Menu.module.css";
import close from '../../assets/close.svg'
import {NavLink} from "react-router-dom";

const Menu = ({active,setActive}) => {
    const activeNavStyle = ({isActive}) => {
        return {
            fontWeight: isActive? 'bold' : 'normal',
            textDecoration: isActive? 'none' : 'underline'
        }
    }

    return (
        <nav className={active? `${classes.navbar} ${classes.active}`: classes.navbar}>
            <button onClick={()=>setActive(prev=>!prev)} className={classes.closeBar}>
                <img src={close} alt=""/>
            </button>
            <ul className={classes.links}>
                <li onClick={()=>setActive(prev=>!prev)} className={classes.link}><NavLink style={activeNavStyle} to={'/'}>Все</NavLink></li>
                <li onClick={()=>setActive(prev=>!prev)} className={`${classes.link} ${classes.sale}`}><NavLink style={activeNavStyle} to={'/panties'}>Стрінги</NavLink></li>
                <li onClick={()=>setActive(prev=>!prev)} className={classes.link}><NavLink style={activeNavStyle}  to={'/slips'}>Сліпи</NavLink></li>
                <li onClick={()=>setActive(prev=>!prev)} className={classes.link}><NavLink style={activeNavStyle}  to={'/tights'}>Колготки</NavLink></li>
            </ul>
        </nav>
    );
};

export default Menu;