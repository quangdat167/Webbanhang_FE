import Axios from 'axios';
export const ENDPOINT = process.env.REACT_APP_BASE_URL;

export const POST: any = (data: { baseURL?: string; url: string; params: any }) => {
    return new Promise((resolve, reject) => {
        Axios({
            baseURL: data.baseURL ?? ENDPOINT,
            url: data.url,
            method: 'POST',
            data: data.params,
        })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(response.status);
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
};

export const GET: any = (data: { url: string; baseURL?: string; params?: any }) => {
    return new Promise((resolve, reject) => {
        Axios({
            baseURL: data.baseURL ?? ENDPOINT,
            url: data.url,
            method: 'GET',
            params: data.params,
        })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(response.status);
                }
            })
            .catch((e) => reject(e));
    });
};
