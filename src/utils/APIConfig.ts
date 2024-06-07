class APIConfig {
    static SIGNUP = '/signup';
    static GET_USER_INFO = '/get-user-info';
    static SEARCH_USER_EMAIL = '/search-user-email';
    static UPDATE_USER_INFO = '/update-user-info';

    // products
    static GET_ALL_PHONES = '/phones';
    static GET_PRODUCT_BY_SLUG = '/get-product-by-slug';
    static GET_PRODUCT_BY_TYPE = '/get-product-by-type';
    static SEARCH_PHONE_BY_NAME = '/search-phone-by-name';
    static GET_RANDOM_PRODUCT = '/get-random-product';
    static FILTER_PHONE = '/filter-phone';
    static GET_FREQUENT_PRODUCTS = '/get-frequent-products';

    // Cart
    static ADD_TO_CART = '/add-to-cart';
    static GET_CART = '/get-cart';
    static DELETE_ITEM_FROM_CART = '/delete-item-from-cart';

    // Order
    static CREATE_ORDER = '/create-order';
    static GET_ALL_ORDERS = '/get-all-orders';
    static GET_ALL_ORDERS_APP = '/get-all-orders-app';

    // Frequent
    static GET_ALL_FREQUENT = '/get-all-frequent';
    static APPLY_FPGROWTH = '/apply-fpgrowth';
    static APPLY_APRIORI = '/apply-apriori';

    // Payment
    static GET_PAYMENT_LINK = '/get-payment-link';
}

export default APIConfig;
