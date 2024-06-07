import axios from 'axios';
import APIConfig from 'utils/APIConfig';
import { GET, POST } from 'utils/url';

export const addToCartApi = async (args: {
    userId: string;
    productId: string;
    color?: string;
    quantity: number;
    type?: string;
}) => {
    return await POST({
        url: APIConfig.ADD_TO_CART,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getCartApi = async (args: { userId: string }) => {
    return await POST({
        url: APIConfig.GET_CART,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const deleteItemFromCart = async (args: { userId: string; phoneId: string }) => {
    return await POST({
        url: APIConfig.DELETE_ITEM_FROM_CART,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
