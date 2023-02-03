import React from 'react';
import {useRoutes} from 'react-router-dom'
import Main from "../Pages/Main/Main";
import Stringy from "../Pages/Stringy/Stringy";
import Slipy from "../Pages/Slipy/Slipy";
import Kolgotky from "../Pages/Kolgotky/Kolgotky";
import ExtendedCard from "../Pages/ExtendedCard/ExtendedCard";
import All from "../Pages/All/All";
import Cart from "../Pages/Cart/Cart";
import FormPage from "../Pages/FormPage/FormPage";


const AppRouter = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Main><All/></Main>
        },
        {
            path: '/panties',
            element: <Main><Stringy/></Main>
        },
        {
            path: '/slips',
            element: <Main><Slipy/></Main>
        },
        {
            path: '/tights',
            element: <Main><Kolgotky/></Main>
        },
        {
            path: '/panties/:id',
            element: <ExtendedCard type={'panties'}/>
        },
        {
            path: '/slips/:id',
            element: <ExtendedCard type={'slips'}/>
        },
        {
            path: '/tights/:id',
            element: <ExtendedCard type={'tights'}/>
        },
        {
            path: '/cart',
            element: <Cart/>
        },
        {
            path: '/ordering',
            element: <FormPage/>
        },
    ])
    return (
        <>
            {routes}
        </>
    );
};

export default AppRouter;
