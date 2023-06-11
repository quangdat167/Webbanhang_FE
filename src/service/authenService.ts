import axios from 'axios';
import UserModel from 'models/UserModel';

export const signUp = async (data: UserModel) => {
    try {
        const res = await axios.post('http://localhost:3010/api/sign-up', data);
        return res.data;
    } catch (err: any) {
        console.error(new Error(err.message));
    }
};

export const signIn = async (data: UserModel) => {
    try {
        const res = await axios.post('http://localhost:3010/api/sign-in', data);
        return res.data;
    } catch (err: any) {
        console.error(new Error(err.message));
    }
};
