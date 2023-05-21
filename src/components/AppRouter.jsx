import React from 'react';
import {useRoutes} from 'react-router-dom'
import Main from "../Pages/Main/Main";
import Sale from "../Pages/Sale/Sale";
import Panties from "../Pages/Panties/Panties";
import Kolgotky from "../Pages/Kolgotky/Kolgotky";
import ExtendedCard from "../Pages/ExtendedCard/ExtendedCard";
import Sets from "../Pages/Sets/Sets";
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
            path: '/sale',
            element: <Main><Sale/></Main>
        },
        {
            path: '/panties',
            element: <Main><Panties/></Main>
        },
        {
            path: '/sets',
            element: <Main><Sets/></Main>
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
            path: '/sets/:id',
            element: <ExtendedCard type={'sets'}/>
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
