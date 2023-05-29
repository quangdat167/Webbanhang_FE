import { useEffect, useState } from 'react';
import * as request from 'service/getPhonesService';

interface PriceObject {
    type: string;
    price: string;
}

interface ColorObject {
    color: string;
    img: string;
}
interface Phone {
    _id: string;
    brand: string;
    name: string;
    price: Array<PriceObject>;
    specifications: Array<String>;
    images: Array<String>;
    promotion: String;
    colors: Array<ColorObject>;
    createdAt: Date;
    updatedAt: Date;
    slug: String;
}

function Home() {
    const [phones, setPhones] = useState<Phone[]>([]);
    useEffect(() => {
        const getPhones = async () => {
            const result: Phone[] = await request.getPhones();
            setPhones(result);
        };
        getPhones();
    }, []);

    return (
        <ul>
            {phones.map((phone, index) => {
                return <li key={index}>{phone.name}</li>;
            })}
        </ul>
    );
}

export default Home;
