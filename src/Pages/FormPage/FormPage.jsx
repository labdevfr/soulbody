import React,{useEffect} from 'react';
import classes from './FormPage.module.css'
import { useFormik } from 'formik';
import Input from "../../components/UI/Input/Input";
import {useSelector,useDispatch} from "react-redux";
import * as yup from "yup";
import {AddNumber} from "../../AsyncActions";
import axios from 'axios'
import {useNavigate} from "react-router-dom";

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

const FormPage = () => {
    const dispatch = useDispatch()
    const {cart,orders} = useSelector(state => state)
    const navigate = useNavigate()
    const sum = ()=>{
        return cart.reduce((acc,current)=>{
            acc += current.amount * current.price
            return acc
        },0)
    }
    const goBack =()=>{
        navigate(-1);
    }
    const numbers =()=>{
        return cart.reduce((acc,current)=>{
            acc+=current.amount
            return acc
        },0)
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
            console.log(process.env.REACT_APP_TOKEN)
            dispatch(AddNumber(orders+1))
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
                '<b>Загальна кількість</b>: ' + numbers(),
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
        }
    });
    const userData = [
        {
            name: "name",
            label: "Ім'я",
        },
        {
            name: "secondName",
            label: "Прізвище",
        },
        {
            name: "instagram",
            label: "Ваш інстаграм",
        },
        {
            name: "phone",
            label: "Телефон",
        },
        {
            name: "email",
            label: "Email",
        },
    ];
    const deliveryData = [
        {
            name: "region",
            label: "Область",
        },
        {
            name: "town",
            label: "Місто",
        },
        {
            name: "postOffice",
            label: "Відділення нової пошти",
        },
        {
            name: "note",
            label: "Примітка...",
        },
    ]
    console.log(formik.touched.name)

    return (
        <div className={classes.Form}>
            <h1 className={classes.title}>Soul&Body</h1>
            <div className={classes.wraper}>
                <form onSubmit={formik.handleSubmit}>
                    <h1 className={classes.FormTitle}>Оформлення замовлення</h1>
                    <div className={classes.cont}>
                        <h1 className={classes.titleBlock}>Ваші контактні дані</h1>
                        <div className={classes.UserData}>
                            {userData.map((item)=>(<Input
                                key={item.name}
                                style={{ marginBottom: "30px" }}
                                id={item.name}
                                name={item.name}
                                label={item.label}
                                value={formik.values[item.name]}
                                onChange={formik.handleChange}
                                error={{touched: formik.touched.name,
                                    isError:Boolean(formik.errors[item.name])}
                            }
                                helperText={formik.touched[item.name] && formik.errors[item.name]}
                                />))}
                        </div>
                        <h1 className={[classes.titleBlock,classes.num].join(' ')}>Доставка</h1>
                        <div className={classes.deliveryData}>
                            {deliveryData.map((item)=>(<Input
                                key={item.name}
                                style={{ marginBottom: "30px" }}
                                id={item.name}
                                name={item.name}
                                label={item.label}
                                value={formik.values[item.name]}
                                onChange={formik.handleChange}
                                error={{touched: formik.touched[item.name],
                                    isError:Boolean(formik.errors[item.name])}}
                                helperText={formik.touched[item.name] && formik.errors[item.name]}
                            />))}
                        </div>
                    </div>
                    <button onClick={goBack} type={'button'} className={classes.BtnBack}>Повернутись до кошика</button>
                    <button className={classes.FormSubmit} type="submit">Замовлення підтвержую</button>
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

        </div>
    );
};

export default FormPage;