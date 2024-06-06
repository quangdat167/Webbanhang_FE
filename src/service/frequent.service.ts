import APIConfig from 'utils/APIConfig';
import { GET, POST } from 'utils/url';

export const getAllFrequentProdApi = async (args: {}) => {
    return await POST({
        url: APIConfig.GET_ALL_FREQUENT,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const applyFPGrowth = async (args: {}) => {
    return await POST({
        url: APIConfig.APPLY_FPGROWTH,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const applyApriori = async (args: {}) => {
    return await POST({
        url: APIConfig.APPLY_APRIORI,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
