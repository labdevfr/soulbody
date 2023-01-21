import React, {useEffect, useState} from 'react';
import classes from './FormPage.module.css'
import Input from "../../components/UI/Input/Input";
import Select from 'react-select';
import {useSelector,useDispatch} from "react-redux";
import check from '../../assets/icon/check1.png'
import {cleanOrder} from "../../store/user/userReducer";
import {AddNumber} from "../../AsyncActions";
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {deliveryDataOne,userData,deliveryDataTwo} from '../../utils/InfoFormData'


const colourStyles = {
    container: (styles) => ({...styles, maxWidth: '300px', width: '100%', fontSize: '12px'}),
    placeholder: (styles) => ({ ...styles, color: '#fff' }),
    singleValue: (styles) => ({...styles, color: '#797878'})
}

const options = [
    {
        label: 'Нова пошта',
        value: '0'
    },
    {
        label: 'Укрпошта',
        value: '1'
    }
]

const useValidation = (value,validations) => {
    const [isEmpty,setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [inputValid, setInputValid] = useState(false)


    useEffect(()=>{
        for (let validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true): setMinLengthError(false)
                    break
                case 'notRequared':
                    setInputValid(true)
                    break
                case 'isEmpty' :
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                default:
                    return
            }
        }
    },[value])

    useEffect(()=>{
        if (isEmpty || minLengthError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    },[isEmpty,minLengthError])

    return {
        isEmpty,
        minLengthError,
        inputValid
    }
}

const useInput = (initialValue,validations,isRequired) =>{
    const [value,setValue] = useState(initialValue)
    const [isDirty,setDirty] = useState(false)

    const valid = useValidation(value,validations,isRequired)
    const onChange = (e) =>{
        setValue(e.target.value)
    }
    const onBlur = (e) =>{
        setDirty(true)
    }
    return {
        value,
        setValue,
        onChange,
        onBlur,
        isDirty,
        ...valid

    }

}

const FormPage = () => {

    const dispatch = useDispatch()

    const initialValue = {
        name: useInput('',{isEmpty: true}),
        secondName: useInput('',{isEmpty: true}),
        instagram: useInput('',{isEmpty: true}),
        phone: useInput('',{isEmpty: true, minLength: 9}),
        region: useInput('',{isEmpty: true}),
        town: useInput('',{isEmpty: true}),
        postOffice: useInput('',{isEmpty: true}),
        note: useInput('',{notRequared: true}),
    }

    const isForm = () =>{
        return initialValue.name.inputValid && initialValue.secondName.inputValid &&
            initialValue.instagram.inputValid && initialValue.phone.inputValid && initialValue.town.inputValid && initialValue.region.inputValid &&
            initialValue.postOffice.inputValid
    }

    const {cart,orders,CartCount} = useSelector(state => state)
    const [sendForm,setSendForm] = useState(false)
    const [delivery,setDelivery] = useState({
        label: 'Нова пошта',
        value: '0'
    })
    const navigate = useNavigate()
    const sum = ()=>{
        return cart.reduce((acc,current)=>{
            acc += current.amount * current.price
            return acc
        },0)
    }
    const goToCart =()=>{
        navigate(`/`, {
            replace: false,
        });
    }

    const goBack =()=>{
        navigate(-1);
    }
    const onChange = (newValue)=>{
        setDelivery(newValue)
        initialValue.postOffice.setValue('')
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if (!isForm()){
           initialValue.name.onBlur(e)
           initialValue.secondName.onBlur(e)
           initialValue.instagram.onBlur(e)
           initialValue.phone.onBlur()
           initialValue.town.onBlur()
           initialValue.region.onBlur()
           initialValue.postOffice.onBlur()
        }
        else {
            let token = "5456045053:AAG-nYSdOG47_HVS5XpUd_55rNCWWuAFpP8";

            let chat_id = "-1001601209711";
            const title = `<b>Замовлення №${orders+1}</b>`
            let items = ''
            cart.forEach(item=>{items += `--- ${item.name} Розмір: ${item.size} Кількість: ${item.amount} Колір: ${item.color} \n`
            })
            let fields = [
                title,
                '<b>Імя</b>: ' + initialValue.name.value,
                '<b>Прізвеще</b>: ' + initialValue.secondName.value,
                '<b>Instagram</b>: ' + initialValue.instagram.value,
                '<b>Телефон</b>: ' + initialValue.phone.value,
                '<b>Область</b>: ' + initialValue.region.value,
                '<b>Місто</b>: ' + initialValue.town.value,
                `<b>${delivery.label}</b>: ` + initialValue.postOffice.value,
                '<b>Примітки</b>: ' + initialValue.note.value,
                '<b>Замовленні товари</b>: ',
                items,
                '<b>Загальна кількість</b>: ' + CartCount,
                '<b>Сума</b>: ' + sum() + ' грн',

            ]
            let my_text=''
            fields.forEach(field => {
                my_text += field + '\n'
            })
            let url = `https://api.telegram.org/bot${token}/sendMessage`;
            axios.post(url,{
                chat_id: chat_id,
                parse_mode: 'html',
                text: my_text

            })
            setSendForm(true)
            dispatch(AddNumber(orders+1))
            dispatch(cleanOrder())
        }
    }


    return (
        <div className={classes.Form}>
            {!sendForm && <h1 className={classes.FormTitle}>Оформлення замовлення</h1>}
            {!sendForm ?
                <div className={classes.wraper}>
                    <form>
                        <div className={classes.cont}>
                            <h1 className={classes.titleBlock}>Ваші контактні дані</h1>
                            <div className={classes.UserData}>
                                {userData.map((item)=>(<Input
                                    key={item.name}
                                    id={item.name}
                                    name={item.name}
                                    label={item.label}
                                    onBlur={(e)=>initialValue[item.name].onBlur(e)}
                                    value={initialValue[item.name].value}
                                    onChange={(e)=>initialValue[item.name].onChange(e)}
                                    error={initialValue[item.name].isDirty &&
                                        !initialValue[item.name].inputValid
                                    }
                                    // helperText={formik.touched[item.name] && formik.errors[item.name]}
                                />))}

                            </div>
                            <h1 className={[classes.titleBlock,classes.num].join(' ')}>Доставка</h1>
                            <div className={classes.deliveryData}>
                                {deliveryDataOne.map((item)=>{
                                    return (<Input
                                        key={item.name}
                                        id={item.name}
                                        name={item.name}
                                        label={item.label}
                                        onBlur={(e)=>initialValue[item.name].onBlur(e)}
                                        value={initialValue[item.name].value}
                                        onChange={(e)=>initialValue[item.name].onChange(e)}
                                        error={initialValue[item.name].isDirty &&
                                            !initialValue[item.name].inputValid
                                        }
                                    />)
                                }
                                )}
                            </div>
                            <div style={{ width: '100%', marginBottom: '20px'}} className={classes.deliveryData}>
                                <Select
                                    placeholder={'Доставка'}
                                    options={options}
                                    onChange={onChange}
                                    value={delivery}
                                    styles={colourStyles}
                                />
                            </div>
                            <div className={classes.deliveryData}>
                                {deliveryDataTwo.map((item)=>{
                                        return (<Input
                                            key={item.name}
                                            id={item.name}
                                            name={item.name}
                                            label={item.label[delivery.value]}
                                            onBlur={(e)=>initialValue[item.name].onBlur(e)}
                                            value={initialValue[item.name].value}
                                            onChange={(e)=>initialValue[item.name].onChange(e)}
                                            error={initialValue[item.name].isDirty &&
                                                !initialValue[item.name].inputValid
                                            }
                                        />)
                                    }
                                )}
                            </div>
                            <div className={classes.btns}>
                                <button onClick={goBack} type={'button'} className={classes.BtnBack}>Повернутись до кошика</button>
                                <button onClick={(e)=>handleSubmit(e)} className={classes.FormSubmit} type="submit">Замовлення підтвержую</button>
                            </div>

                        </div>
                    </form>

                    <div className={classes.FormCart}>
                        <h1 className={classes.FormCartTitle}>Ваше замовлення</h1>
                        <div className={classes.FormCartContent}>
                            {cart.map(item=>(
                                <div key={item.id} className={classes.CartItem}>
                                    <img className={classes.CartImg} src={item.image} alt=""/>
                                    <div className={classes.CartInfo}>
                                        <h1 className={classes.Name}>{item.name}</h1>
                                        <p className={classes.size}>Розмір: {item.size}</p>
                                        <p className={classes.size}>Колір: {item.color}</p>
                                        <span>{item.amount} шт.</span>
                                    </div>
                                </div>))}
                            <div className={classes.Total}>
                                <span>Всього</span>
                                <span className={classes.Amount}>{sum()+' ₴'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className={classes.SuccessOrder}>
                    <img src={check} alt=""/>
                    <h1 className={classes.SuccessTitle}>Дякуємо за замовлення.</h1>
                    <h3 className={classes.SuccessSubTitle}>Ми зв'яжемося з Вами найближчим часом!</h3>
                    <button onClick={goToCart}>Продовжити покупки</button>
                </div>
            }


        </div>
    );
};

export default FormPage;