class RouteConfig {
    static HOME = '/phone';
    static SIGN_IN = '/sign-in';
    static SIGN_UP = '/sign-up';
    static CART = '/cart';
    static FORGOT_PASSWORD = '/forgot-password';
    static DASHBOARD = '/dashboard';
    static CONFIRM_INFO = '/confirm-info';
    static ORDER = '/order';
    static PHONES = '/phone';
    static BACKUPCHARGER = '/backup-charge';
    static ADAPTER = '/adapter';
    static CAPBLE = '/capble';
    static GLASS = '/glass';
    static CASE = '/case';
    static DETAIL_PHONE = '/phone/:slug';
    static DETAIL_BACKUPCHARGER = '/backup-charge/:slug';
    static DETAIL_ADAPTER = '/adapter/:slug';
    static DETAIL_CAPBLE = '/capble/:slug';
    static DETAIL_GLASS = '/glass/:slug';
    static DETAIL_CASE = '/case/:slug';

    static ADMIN_HOME = '/admin';
    static ADMIN_ADD_PHONE = '/admin/add-phone';
    static ADMIN_MANAGE_USER = '/admin/manage-user';
    static ADMIN_MANAGE_ORDER = '/admin/manage-order';
    static ADMIN_MANAGE_FREQUENT_PRODUCT = '/admin/manage-frequent-product';
}

export default RouteConfig;
