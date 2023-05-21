import React,{useEffect,useState} from 'react';
import classes from './CardCollection.module.css'
import {useNavigate} from 'react-router-dom'

const CardCollection = ({item,index}) => {
    const navigate = useNavigate()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const goToCard =()=>{
        navigate(`/${item.path}`, {
            replace: false,
        });
    }
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Прибрати прослуховувач події при розмонтуванні компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    let imageSrc;
    if (screenWidth < 750 && item.imagemob) {
        imageSrc = item.imagemob;
    }
    else {
        imageSrc = item.image
    }
    const styleClass = 'cardCollection'+ index
    return (
        <div onClick={goToCard} className={[classes[styleClass],classes.cardCollection].join(' ')}>
            <img src={imageSrc} alt=""/>
        </div>
    );
};

export default CardCollection;