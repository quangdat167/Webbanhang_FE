import axios from 'axios';
import APIConfig from 'utils/APIConfig';
import { GET, POST } from 'utils/url';

export const getAllPhones = async () => {
    try {
        const res = await axios.get('http://localhost:3010/api/phones');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getAllPhonesApi = () => {
    return GET({
        url: APIConfig.GET_ALL_PHONES,
    }).then((data: any) => {
        return data;
    });
};

// export const getPhoneApi = async (slug: string) => {
//     try {
//         const res = await axios.get(`http://localhost:3010/api/phones/${slug}`);
//         return res.data;
//     } catch (err) {
//         console.log(err);
//     }
// };

export const getPhoneApi = async ({ slug }: { slug: string }) => {
    return await POST({
        url: APIConfig.GET_PHONE_BY_SLUG,
        params: { slug },
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
        url: APIConfig.GET_RANDOM_PHONE,
        params: args,
    }).then((data: any) => {
        return data;
    });
};
