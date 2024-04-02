import APIConfig from 'utils/APIConfig';
import { POST } from 'utils/url';

export const getBackupChargeApi = (args: { limit: number; skip: number; sortby: string }) => {
    return POST({
        url: APIConfig.GET_BACKUP_CHARGE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAdapterApi = (args: { limit: number; skip: number; sortby: string }) => {
    return POST({
        url: APIConfig.GET_ADAPTER,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getCapbleApi = (args: { limit: number; skip: number; sortby: string }) => {
    return POST({
        url: APIConfig.GET_CAPBLE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getCaseApi = (args: { limit: number; skip: number; sortby: string }) => {
    return POST({
        url: APIConfig.GET_CASE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
export const getGlassApi = (args: { limit: number; skip: number; sortby: string }) => {
    return POST({
        url: APIConfig.GET_GLASS,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
