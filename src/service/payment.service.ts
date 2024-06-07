import APIConfig from 'utils/APIConfig';
import { IProduct } from 'utils/interface';
import { POST } from 'utils/url';

export const getPaymentLinkApi = async (args: { orderId: number }) => {
    return await POST({
        url: APIConfig.GET_PAYMENT_LINK,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
