import APIConfig from 'utils/APIConfig';
import { GET, POST } from 'utils/url';

export const getAllPhonesApi = () => {
    return GET({
        url: APIConfig.GET_ALL_PHONES,
    }).then((data: any) => {
        return data;
    });
};

export const searchPhoneByNameApi = async (args: { keyword: string }) => {
    return await POST({
        url: APIConfig.SEARCH_PHONE_BY_NAME,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getRandomPhoneApi = async (args: { limit: number }) => {
    return await POST({
        url: APIConfig.GET_RANDOM_PRODUCT,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const filterPhoneApi = async (args: {
    brand: string[];
    price: number[];
    type: string[];
    ram: string[];
    rom: string[];
    charging_feature: string[];
    sortby: string;
    skip: number;
    limit: number;
}) => {
    return await POST({
        url: APIConfig.FILTER_PHONE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getProductByTypeApi = (args: {
    limit: number;
    skip: number;
    sortby: string;
    type: string;
}) => {
    return POST({
        url: APIConfig.GET_PRODUCT_BY_TYPE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getProductBySlugApi = (args: { slug: string }) => {
    return POST({
        url: APIConfig.GET_PRODUCT_BY_SLUG,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getFrequentProductsApi = (args: { productId: string }) => {
    return POST({
        url: APIConfig.GET_FREQUENT_PRODUCTS,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAllProductsApi = (args: {}) => {
    return POST({
        url: APIConfig.GET_ALL_PRODUCTS,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
