import APIConfig from "utils/APIConfig";
import { POST } from "utils/url";

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
