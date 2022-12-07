import React,{useState,useEffect} from 'react';
import classes from './ExtendedCard.module.css'
import {useNavigate, useParams} from "react-router-dom";
import close from '../../assets/close.svg'
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../store/user/userReducer";
import {SIZES} from "../../utils/constants";
import CartModal from "../../components/CartModal/CartModal";
import {fetchPantyById} from "../../AsyncActions";
import CarouselComponent from "../../components/ Carousel/Carousel";
import SelectContainer from "../../components/UI/Select/Select";
import {CSSTransition,TransitionGroup} from 'react-transition-group'



const ExtendedCard = () => {
    const [activeSize, setActiveSize] = useState(null);
    const [errorSize, setErrorSize] = useState(false);
    const [errorColor, setColorSize] = useState(false);
    const [modals,setModals] = useState([])
    const {panty} = useSelector(state => state)
    const dispatch = useDispatch()
    const [isColor,setIsColor] = useState('notColor')
    const navigate = useNavigate()
    const params = useParams()
    const [color,setColor] =useState('')
    const goBack =()=>{
        navigate(-1);
    }
    useEffect(()=>{
        dispatch(fetchPantyById(params.id))
    },[])

    const onSizeSelect = (index) => {
        setActiveSize(index);
        setErrorSize(false)
    };
    const onChangeColor = (newValue)=>{
       setColor(newValue)
        setColorSize(false)
    }
    const onChangeRadio = (e) =>{
        setIsColor(e.target.value)
        setColor('')
        setActiveSize(null)
    }
    const addToCart =()=>{
        const newCart = {
            id: panty.id+activeSize+color.value,
            name: panty.name,
            price: isColor ==='Color'? panty.price : panty.price - panty.discount,
            image: panty.image,
            amount: 1,
            sale: isColor ==='Color',
            color: color? color.label : 'Мікс',
            size: activeSize
        }
        if (!activeSize || (!color && isColor ==='Color') ){
            setErrorSize(!activeSize)
            setColorSize(!!(!color && isColor ==='Color'))
        }
        else{
            setErrorSize(false)
            setColorSize(false)
            dispatch(addProduct(newCart))
            setColor('')
            setModals((prevState)=>{
                return [...prevState,newCart]
            })
        }

    }
    const deleteModal = (cart) =>{
        setModals(()=>{
            return modals.filter(item=>item.id!==cart.id)
        })
    }
    const deleteAllModals = () => {
        setModals([])
    }

    return (
        <div className={classes.ExtendedCard}>
            <div className={classes.ExtendedNav}>
                <button onClick={goBack} className={classes.ExtendedLink}>До каталогу</button>
                <button onClick={goBack} className={classes.ExtendedClose}>
                    <img src={close} alt=""/>
                </button>
            </div>
            <div className={classes.ExtendedContainer}>
                <div className={classes.slider}>
                    {/*<img className={classes.sliderImage} src={panty.image} alt=""/>*/}
                    <CarouselComponent img={panty.image}/>
                </div>
                <div className={classes.ExtendedInfo}>
                    <h1 className={classes.ExtendedTitle}>{panty.name}</h1>
                    <div className={classes.ExtendedSelector}>
                        <ul>
                            {SIZES.map((item,index)=>(
                                <li key={index} className={`${activeSize ===item && classes.active} ${!panty.sizes.includes(item) && classes.disabled}`} onClick={()=>onSizeSelect(item)}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={classes.IsColor}>
                        <p>
                            <label>
                                <input value={'Color'} onChange={(e)=>onChangeRadio(e)} type="radio" checked={isColor==='Color'} className={classes.RadioColor} name={'radio-group'}/>
                                <span className={classes.radioText}>Вибрати колір</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input value={'notColor'} onChange={(e)=>onChangeRadio(e)} type="radio" checked={isColor==='notColor'} className={classes.RadioColor} name={'radio-group'}/>
                                <span className={classes.radioText}>Акція (колір на наш розсуд)</span>
                            </label>

                        </p>
                    </div>
                    <SelectContainer color={color} onChange={onChangeColor} colors={panty.colors} isColor={isColor!=='Color'}/>
                    <div className={classes.ExtendedSize}>
                        <span>Розмірний ряд:</span>
                        <ul>
                            <li>XS - 81-86 см</li>
                            <li>S - 87-92 см</li>
                            <li>M - 93-97 см</li>
                            <li>L - 98-105 см </li>
                        </ul>
                    </div>
                    <div className={classes.ExtendedPrice}>
                        {isColor==='Color'? <span>Ціна: {panty.price} грн</span>:
                        <span>Ціна: <span className={classes.pricemin}>{panty.price}грн</span> <span className={classes.red}>{panty.price-panty.discount} грн</span></span>}
                    </div>
                    <div className={classes.ExtendedSend}>
                        {errorSize && (<span className={classes.ExtendedError}>Розмір не вибраний</span>)}
                        {errorColor && (<span className={classes.ExtendedError}>Колір не вибраний</span>)}
                        <button style={{marginBottom: '20px'}} onClick={addToCart} className={classes.ExtendedBtn}>Додати в кошик</button>
                    </div>
                </div>
            </div>
            <div className={classes.ModalList}>
                {modals.length>1 && <div>
                    <button onClick={deleteAllModals} className={classes.closeAll}>
                        [ Закрити Все ]
                    </button>
                </div>}
                <TransitionGroup>
                    {modals?.map(item=>(
                        <CSSTransition
                            key={item.id}
                            timeout={500}
                            classNames={{
                                enter: classes.EnterActive,
                                exitActive: classes.ExitActive
                            }}>
                            <CartModal deleteItem={deleteModal} card={item}/>
                        </CSSTransition>
                        ))}
                </TransitionGroup>
            </div>
        </div>
    );
};

export default ExtendedCard;