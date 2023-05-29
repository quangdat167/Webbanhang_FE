import axios from 'axios';

export const getPhones = async () => {
    try {
        const res = await axios.get('http://localhost:3010/api/products');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
