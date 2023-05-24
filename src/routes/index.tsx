import React from 'react';

import Home from '../pages/Home';
import Phone from '../pages/Phone';
import Authen from '../pages/Authen';

interface RouteConfig {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType | null;
}

// public routes
const publicRoutes: RouteConfig[] = [
    { path: '/', component: Home },
    { path: '/phone', component: Phone },
    { path: '/authen', component: Authen, layout: null },
];

const privateRoutes: RouteConfig[] = [];

export { publicRoutes, privateRoutes };
