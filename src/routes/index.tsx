import React from 'react';

import { DefaultLayout } from 'components/Layout';
import HeaderOnly from 'components/Layout/HeaderOnly';
import LayoutAdmin from 'components/Layout/LayoutAdmin';
import AdminAddPhone from 'pages/Admin/admin-add-phone';
import AdminHome from 'pages/Admin/admin-home';
import AdminManageOrder from 'pages/Admin/admin-manage-order';
import Cart from 'pages/Cart';
import Home from 'pages/Home';
import Order from 'pages/Order';
import PhonePage from 'pages/Phone';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import AdapterPage from 'pages/adpater';
import BackupChargerPage from 'pages/backup-charger';
import CablePage from 'pages/cable';
import CasePage from 'pages/case';
import ConfirmInfo from 'pages/confrim-info';
import DetailAdapter from 'pages/detail-adapter';
import DetailBackupCharge from 'pages/detail-backupcharge';
import DetailCapble from 'pages/detail-capble';
import DetailCase from 'pages/detail-case';
import DetailGlass from 'pages/detail-glass';
import GlassPage from 'pages/glass';
import RouteConfig from './Route';

interface RouterConfig {
    path: string;
    component: React.ComponentType;
    layout: React.ComponentType;
}

const publicRoutes: RouterConfig[] = [
    { path: RouteConfig.PHONES, component: Home, layout: DefaultLayout },
    { path: RouteConfig.BACKUPCHARGER, component: BackupChargerPage, layout: DefaultLayout },
    { path: RouteConfig.ADAPTER, component: AdapterPage, layout: DefaultLayout },
    { path: RouteConfig.CAPBLE, component: CablePage, layout: DefaultLayout },
    { path: RouteConfig.CASE, component: CasePage, layout: DefaultLayout },
    { path: RouteConfig.GLASS, component: GlassPage, layout: DefaultLayout },
    {
        path: RouteConfig.DETAIL_BACKUPCHARGER,
        component: DetailBackupCharge,
        layout: DefaultLayout,
    },
    {
        path: RouteConfig.DETAIL_ADAPTER,
        component: DetailAdapter,
        layout: DefaultLayout,
    },
    {
        path: RouteConfig.DETAIL_CAPBLE,
        component: DetailCapble,
        layout: DefaultLayout,
    },
    {
        path: RouteConfig.DETAIL_CASE,
        component: DetailCase,
        layout: DefaultLayout,
    },
    {
        path: RouteConfig.DETAIL_GLASS,
        component: DetailGlass,
        layout: DefaultLayout,
    },
    // { path: '/phone', component: PhonePage, layout: DefaultLayout },
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
export { privateRoutes, publicRoutes };
