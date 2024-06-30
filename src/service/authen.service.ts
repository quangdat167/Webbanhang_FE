import APIConfig from 'utils/APIConfig';
import Config from 'utils/Config';
import { POST } from 'utils/url';

export const loginApi = ({
    firstName,
    lastName,
    password,
    email,
}: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}) => {
    return POST({
        url: APIConfig.SIGNUP,
        params: {
            firstName,
            lastName,
            password,
            email,
            role: Config.USER_ROLE_MEMBER,
        },
    }).then((data: any) => {
        return data;
    });
};

export const getUserInfoApi = ({ email }: { email: string }) => {
    return POST({
        url: APIConfig.GET_USER_INFO,
        params: {
            email,
        },
    }).then((data: any) => {
        return data;
    });
};

export const searchUserByEmail = ({ email }: { email: string }) => {
    return POST({
        url: APIConfig.SEARCH_USER_EMAIL,
        params: {
            email,
        },
    }).then((data: any) => {
        return data;
    });
};

export const changUserInfoApi = (args: { userId: string; phone?: string; address?: string }) => {
    return POST({
        url: APIConfig.UPDATE_USER_INFO,
        params: args,
    }).then((data: any) => {
        return data;
    });
};

export const getAllUsersApi = (args: {}) => {
    return POST({
        url: APIConfig.GET_ALL_USER,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
