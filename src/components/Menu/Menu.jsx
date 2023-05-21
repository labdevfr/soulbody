import React,{useEffect} from 'react';
import classes from "./Menu.module.css";
import close from '../../assets/close.svg'
import {NavLink} from "react-router-dom";
import menu from "../../assets/icon/menu_FILL0_wght400_GRAD0_opsz48.svg";

const Menu = ({active,setActive}) => {
    const activeNavStyle = ({isActive}) => {
        return {
            fontWeight: isActive? 'bold' : 'normal',
        }
    }
    const className = active? [classes.mobileNav,classes.active] : [classes.mobileNav];
    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [active]);
    const links = (className) => {
        return (<ul onClick={(e)=>e.stopPropagation()} className={classes[className]}>
            {active && <button onClick={()=>setActive((prev)=>!prev)} className={classes.closeBar}>
                <img src={close} alt=""/>
            </button>}
            <li  className={`${classes.link} ${classes.sale}`}>
                <NavLink style={activeNavStyle} to={'/sale'} onClick={()=>setActive(false)}>Акція</NavLink></li>
            <li  className={classes.link}>
                <NavLink style={activeNavStyle} to={'/panties'} onClick={()=>setActive(false)}>Трусики</NavLink></li>
            <li  className={classes.link}>
                <NavLink style={activeNavStyle} to={'/sets'} onClick={()=>setActive(false)}>Комплекти і топи</NavLink>
            </li>
            <li  className={classes.link}>
                <NavLink style={activeNavStyle} to={'/tights'} onClick={()=>setActive(false)}>Колготки</NavLink>
            </li>
        </ul>)
    }

    return (
        <nav className={classes.navbar}>
            <div className={classes.burger}>
                {!active && <button onClick={()=>setActive((prev)=>!prev)} className={classes.menu}>
                    <img src={menu} alt=""/>
                </button>}
            </div>
            {links('links')}
            <div className={className.join(' ')} onClick={()=>setActive(false)}>
                {links('mobileLinks')}
            </div>
        </nav>
    );
};

export default Menu;