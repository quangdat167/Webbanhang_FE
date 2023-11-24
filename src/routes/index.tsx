import React from 'react';

import HeaderOnly from 'components/Layout/HeaderOnly';
import Home from 'pages/Home';
import PhonePage from 'pages/Phone';
import Cart from 'pages/Cart';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import RouteConfig from './Route';

interface RouterConfig {
    path: string;
    component: React.ComponentType;
    layout: React.ComponentType;
}

const publicRoutes: RouteConfig[] = [
    { path: '/', component: Home },
    { path: '/phone', component: PhonePage },
    { path: '/phones/:slug', component: PhonePage },
    { path: '/sign-up', component: SignUp, layout: HeaderOnly },
    { path: '/sign-in', component: SignIn, layout: HeaderOnly },
    { path: '/cart', component: Cart },
];
const privateRoutes: RouterConfig[] = [];
export { publicRoutes, privateRoutes };
