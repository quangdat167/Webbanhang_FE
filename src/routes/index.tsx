import React from 'react';

import HeaderOnly from 'components/Layout/HeaderOnly';
import Home from 'pages/Home';
import PhonePage from 'pages/Phone';
import Cart from 'pages/Cart';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import RouteConfig from './Route';
import { DefaultLayout } from 'components/Layout';
import AdminHome from 'pages/Admin/admin-home';
import LayoutAdmin from 'components/Layout/LayoutAdmin';
import AdminAddPhone from 'pages/Admin/admin-add-phone';
import ConfirmInfo from 'pages/confrim-info';
import Order from 'pages/Order';
import AdminManageOrder from 'pages/Admin/admin-manage-order';

interface RouterConfig {
    path: string;
    component: React.ComponentType;
    layout: React.ComponentType;
}

const publicRoutes: RouterConfig[] = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/phone', component: PhonePage, layout: DefaultLayout },
    { path: '/phones/:slug', component: PhonePage, layout: DefaultLayout },
    { path: '/sign-up', component: SignUp, layout: HeaderOnly },
    { path: '/sign-in', component: SignIn, layout: HeaderOnly },
    { path: '/cart', component: Cart, layout: DefaultLayout },
    { path: RouteConfig.CONFIRM_INFO, component: ConfirmInfo, layout: DefaultLayout },
    { path: RouteConfig.ORDER, component: Order, layout: DefaultLayout },
];
const privateRoutes: RouterConfig[] = [
    {
        path: RouteConfig.ADMIN_HOME,
        component: AdminHome,
        layout: LayoutAdmin,
    },
    {
        path: RouteConfig.ADMIN_ADD_PHONE,
        component: AdminAddPhone,
        layout: LayoutAdmin,
    },

    {
        path: RouteConfig.ADMIN_MANAGE_ORDER,
        component: AdminManageOrder,
        layout: LayoutAdmin,
    },
];
export { publicRoutes, privateRoutes };
