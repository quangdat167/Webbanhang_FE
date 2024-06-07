import APIConfig from 'utils/APIConfig';
import { IProduct } from 'utils/interface';
import { POST } from 'utils/url';

export const createOrderApi = async (args: {
    userId: string;
    products: IProduct[];
    orderCode: number;
}) => {
    return await POST({
        url: APIConfig.CREATE_ORDER,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAllOrdersApi = async (args: { userId: string }) => {
    return await POST({
        url: APIConfig.GET_ALL_ORDERS,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAllOrdersAppApi = async (args: {}) => {
    return await POST({
        url: APIConfig.GET_ALL_ORDERS_APP,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
