import axios from 'axios';
import { userProps } from 'utils/interface';

export const signUp = async (data: userProps) => {
    try {
        const res = await axios.post('http://localhost:3010/api/sign-up', data);
        return res.data;
    } catch (err: any) {
        console.error(new Error(err.message));
    }
};

export const signIn = async (data: userProps) => {
    try {
        const res = await axios.post('http://localhost:3010/api/sign-in', data);
        return res.data;
    } catch (err: any) {
        console.error(new Error(err.message));
    }
};
