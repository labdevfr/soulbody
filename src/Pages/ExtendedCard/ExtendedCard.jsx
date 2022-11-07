import React,{useState,useEffect} from 'react';
import classes from './ExtendedCard.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {getOne} from "../../MocData";
import close from '../../assets/close.svg'
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../store/user/userReducer";
import {SIZES} from "../../utils/constants";
import cartCheck from '../../assets/shopping-cart.png'
import CartModal from "../../components/CartModal/CartModal";
import {fetchPantyById} from "../../AsyncActions";
import CarouselComponent from "../../components/ Carousel/Carousel";
import SelectContainer from "../../components/UI/Select/Select";



const ExtendedCard = () => {
    const [activeSizeIndex, setActiveSize] = useState(null);
    const [errorSize, setErrorSize] = useState(false);
    const [modals,setModals] = useState([])
    const {cart} = useSelector(state => state)
    const {panty} = useSelector(state => state)
    const dispatch = useDispatch()
    const [isColor,setColor] = useState('notColor')
    const navigate = useNavigate()
    const params = useParams()
    const [e,setE]=useState(false)
    const [isBool,setBool] = useState(false)
    const goBack =()=>{
        navigate(-1);
    }
    const goToCart =()=>{
        navigate(`/cart`, {
            replace: false,
        });
    }
    useEffect(()=>{
        dispatch(fetchPantyById(params.id))
    },[])

    const onSizeSelect = (index) => {
        console.log(index)
        setActiveSize(index);
        setErrorSize(false)
    };
    const addToCart =()=>{
        const newCart = {
            id: panty.id+SIZES[activeSizeIndex],
            name: panty.name,
            price: panty.price,
            image: panty.image,
            amount: 1,
            size: SIZES[activeSizeIndex]
        }
        if (!newCart.size) setErrorSize(true)
        else {
            setErrorSize(false)
            dispatch(addProduct(newCart))
            setModals((prevState)=>{
                return [...prevState,newCart]
            })
        }

    }
    const deleteModal = (cart) =>{
        setModals((prevState)=>{
            return modals.filter(item=>item.id!==cart.id)
        })
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
                    <div className={classes.ExtendedColors}>Кольори : червоний, синій, білий</div>
                    <div className={classes.IsColor}>
                        <p>
                            <label>
                                <input value={'Color'} onClick={(e)=>setColor(e.target.value)} type="radio" checked={isColor==='Color'} className={classes.RadioColor} name={'radio-group'}/>
                                <span className={classes.radioText}>Вибрати колір</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input value={'notColor'} onClick={(e)=>setColor(e.target.value)} type="radio" checked={isColor==='notColor'} className={classes.RadioColor} name={'radio-group'}/>
                                <span className={classes.radioText}>Колір на наш розсуд</span>
                            </label>

                        </p>
                    </div>
                    <SelectContainer/>
                    <div>

                    </div>
                    <div className={classes.ExtendedSelector}>
                        <ul>
                            {SIZES.map((item,index)=>(
                                <li className={activeSizeIndex ===index && classes.active} onClick={()=>onSizeSelect(index)}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={classes.ExtendedSize}>
                        <span>Розмірний ряд</span>
                        <ul>
                            <li>XS - 86-90 см</li>
                            <li>S - 91-94 см</li>
                            <li>M - 95-99 см</li>
                            <li>L - 100-104 см </li>
                        </ul>
                    </div>
                    <div className={classes.ExtendedPrice}>
                        {isColor==='Color'? <span>Ціна: {panty.price} грн</span>:
                        <span>Ціна: <span className={classes.pricemin}>{panty.price}грн</span> <span className={classes.red}>{panty.price-panty.discount} грн</span></span>}
                    </div>
                    <div className={classes.ExtendedSend}>
                        {errorSize && (<span className={classes.ExtendedError}>Розмір не вибраний</span>)}
                        {e ?  <div onClick={goToCart} className={classes.ExtendedCheck}>
                            <button>
                                <img className={classes.ImgCheck} src={cartCheck} alt=""/>
                                <span>В кошику</span>
                            </button>
                        </div> : <button onClick={addToCart} className={classes.ExtendedBtn}>Купити</button> }

                    </div>
                </div>
            </div>
            <div className={classes.ModalList}>
                {modals.map(item=>(<CartModal deleteItem={deleteModal} card={item}/>))}
            </div>
        </div>
    );
};

export default ExtendedCard;