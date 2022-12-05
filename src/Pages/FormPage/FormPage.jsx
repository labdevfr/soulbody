import React, {useEffect, useState} from 'react';
import classes from './FormPage.module.css'
import { useFormik } from 'formik';
import Input from "../../components/UI/Input/Input";
import Select from 'react-select';
import {useSelector,useDispatch} from "react-redux";
import * as yup from "yup";
import check from '../../assets/icon/check1.png'
import {cleanOrder} from "../../store/user/userReducer";
import {AddNumber} from "../../AsyncActions";
import axios from 'axios'
import {useNavigate} from "react-router-dom";


const colourStyles = {
    container: (styles) => ({...styles, maxWidth: '300px', width: '100%', fontSize: '12px'}),
    placeholder: (styles) => ({ ...styles, color: '#fff' }),
    singleValue: (styles) => ({...styles, color: '#797878'})
}

const validationSchema = yup.object({
    instagram: yup
        .string("Введите ваш Instagram")
        .required("Поле является обязательным для заполнения"),
    name: yup
        .string("Введите ваше имя")
        .required("Поле является обязательным для заполнения"),
    secondName: yup
        .string("Введите вашу фамилию")
        .required("Поле является обязательным для заполнения"),
    phone: yup
        .string("Введите номер телефона")
        .min(9, "Phone should be of minimum 9 characters length")
        .required("Поле является обязательным для заполнения"),
    email: yup
        .string("Введите номер телефона")
        .min(9, "Phone should be of minimum 9 characters length")
        .required("Поле является обязательным для заполнения"),
    region: yup
        .string("Введите вашу область")
        .required("Поле является обязательным для заполнения"),
    town: yup
        .string("Введите ваш город")
        .required("Поле является обязательным для заполнения"),
    postOffice: yup
        .string("Введите отделение Новой Почты")
        .required("Поле является обязательным для заполнения"),
    note: yup.string("Укажите ваш комментарий"),
});

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

const FormPage = () => {
    const dispatch = useDispatch()
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
    const goToPay =()=>{
        navigate(`/ordering`, {
            to: 'https://www.liqpay.ua/uk/checkout/sandbox_i27864137641'
        });
    }

    const goBack =()=>{
        navigate(-1);
    }
    const formik = useFormik({
        initialValues: {
            instagram: '',
            name: '',
            secondName: '',
            phone: '',
            email:'',
            region: '',
            town: '',
            postOffice: '',
            note: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const title = `<b>Замовлення №${orders+1}</b>`
            let items = ''
            cart.forEach(item=>{
                items += `--- ${item.name} Розмір: ${item.size} Кількість: ${item.amount} \n`
            })
            let fields = [
                title,
                '<b>Імя</b>: ' + values.name,
                '<b>Прізвеще</b>: ' + values.secondName,
                '<b>Instagram</b>: ' + values.instagram,
                '<b>Email</b>: ' + values.email,
                '<b>Телефон</b>: ' + values.phone,
                '<b>Область</b>: ' + values.region,
                '<b>Місто</b>: ' + values.town,
                '<b>Нова пошта</b>: ' + values.postOffice,
                '<b>Примітки</b>: ' + values.note,
                '<b>Замовленні товари</b>: ',
                items,
                '<b>Загальна кількість</b>: ' + CartCount,
                '<b>Сума</b>: ' + sum() + ' грн',

            ]
            let my_text=''
            fields.forEach(field => {
                my_text += field + '\n'
            })
            let url = `https://api.telegram.org/bot${process.env.REACT_APP_TOKEN}/sendMessage`;
            axios.post(url,{
                chat_id: process.env.REACT_APP_CHAT_ID,
                parse_mode: 'html',
                text: my_text

            })
            setSendForm(true)
            dispatch(AddNumber(orders+1))
            dispatch(cleanOrder())
            goToPay()
        }
    });
    const onChange = (newValue)=>{
        setDelivery(newValue)
        formik.values.postOffice=''
    }
    const userData = [
        {
            name: "name",
            label: "Ім'я*",
        },
        {
            name: "secondName",
            label: "Прізвище*",
        },
        {
            name: "instagram",
            label: "Ваш інстаграм*",
        },
        {
            name: "phone",
            label: "Телефон*",
        },
        {
            name: "email",
            label: "Email*",
        },
    ];
    const deliveryDataOne = [
        {
            name: "region",
            label: "Область*",
            disabled: true
        },
        {
            name: "town",
            label: "Місто*",
            disabled: false
        },
    ]
    const deliveryDataTwo = [
        {
            name: "postOffice",
            label: ["Відділення нової пошти*","Індекс Укрпошти"],
            disabled: false
        },
        {
            name: "note",
            label: ["Примітка...","Примітка..."],
            disabled: false
        },
    ]

    return (
        <div className={classes.Form}>
            {!sendForm && <h1 className={classes.FormTitle}>Оформлення замовлення</h1>}
            {!sendForm ?
                <div className={classes.wraper}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={classes.cont}>
                            <h1 className={classes.titleBlock}>Ваші контактні дані</h1>
                            <div className={classes.UserData}>
                                {userData.map((item)=>(<Input
                                    key={item.name}
                                    id={item.name}
                                    name={item.name}
                                    label={item.label}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[item.name]}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.touched[item.name]) &&
                                        Boolean(formik.errors[item.name])
                                    }
                                    helperText={formik.touched[item.name] && formik.errors[item.name]}
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
                                        onBlur={formik.handleBlur}
                                        value={formik.values[item.name]}
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.touched[item.name]) &&
                                            Boolean(formik.errors[item.name])
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
                                            onBlur={formik.handleBlur}
                                            value={formik.values[item.name]}
                                            onChange={formik.handleChange}
                                            error={Boolean(formik.touched[item.name]) &&
                                                Boolean(formik.errors[item.name])
                                            }
                                        />)
                                    }
                                )}
                            </div>
                            <div className={classes.btns}>
                                <button onClick={goBack} type={'button'} className={classes.BtnBack}>Повернутись до кошика</button>
                                <button className={classes.FormSubmit} type="submit">Замовлення підтвержую</button>
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