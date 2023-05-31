import axios from 'axios';

export const getAllPhones = async () => {
    try {
        const res = await axios.get('http://localhost:3010/api/phones');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getPhone = async (slug: string) => {
    try {
        const res = await axios.get(`http://localhost:3010/api/phones/${slug}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
