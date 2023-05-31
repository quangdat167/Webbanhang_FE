import React from 'react';

import Home from '../pages/Home';
import PhonePage from '../pages/Phone';
import Authen from '../pages/Authen';
import Cart from 'pages/Cart';

interface RouteConfig {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType | null;
}

// public routes
const publicRoutes: RouteConfig[] = [
    { path: '/', component: Home },
    { path: '/phone', component: PhonePage },
    { path: '/phones/:slug', component: PhonePage },
    { path: '/authen', component: Authen, layout: null },
    { path: '/cart', component: Cart },
];

const privateRoutes: RouteConfig[] = [];

export { publicRoutes, privateRoutes };
