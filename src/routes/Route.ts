class RouteConfig {
    static HOME = '/';
    static SIGN_IN = '/sign-in';
    static SIGN_UP = '/sign-up';
    static FORGOT_PASSWORD = '/forgot-password';
    static DASHBOARD = '/dashboard';
    static CONFIRM_INFO = '/confirm-info';
    static ORDER = '/order';
    static PHONES = '/phones';
    static BACKUPCHARGER = '/sac-dp';
    static ADAPTER = '/cu-sac';
    static CAPBLE = '/cap-sac';
    static GLASS = '/cuong-luc';
    static CASE = '/op-lung';
    static DETAIL_BACKUPCHARGER = '/sac-dp/:slug';
    static DETAIL_ADAPTER = '/cu-sac/:slug';
    static DETAIL_CAPBLE = '/cap-sac/:slug';
    static DETAIL_GLASS = '/cuong-luc/:slug';
    static DETAIL_CASE = '/op-lung/:slug';

    static ADMIN_HOME = '/admin';
    static ADMIN_ADD_PHONE = '/admin/add-phone';
    static ADMIN_MANAGE_USER = '/admin/manage-user';
    static ADMIN_MANAGE_ORDER = '/admin/manage-order';
}

export default RouteConfig;
