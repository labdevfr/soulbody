import React from 'react';
import {useRoutes} from 'react-router-dom'
import Main from "../Pages/Main/Main";
import ExtendedCard from "../Pages/ExtendedCard/ExtendedCard";
import Cart from "../Pages/Cart/Cart";
import FormPage from "../Pages/FormPage/FormPage";
import LiqPay from "../Pages/Pay/LiqPay";


const AppRouter = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Main/>
        },
        {
            path: '/product/:id',
            element: <ExtendedCard/>
        },
        {
            path: '/cart',
            element: <Cart/>
        },
        {
            path: '/ordering',
            element: <FormPage/>
        },
        {
            path: '/pay',
            element: <LiqPay/>
        }
    ])
    return (
        <>
            {routes}
        </>
    );
};

export default AppRouter;
