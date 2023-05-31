import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as getPhonesService from 'service/getPhonesService';

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
    prices: PriceObject[];
    specifications: string[];
    images: string[];
    promotion: String;
    colors: ColorObject[];
    createdAt: Date;
    updatedAt: Date;
    slug: string;
}

function PhonePage() {
    const [phone, setPhone] = useState<Phone | null>(null);
    const { slug } = useParams<{ slug: string }>();
    useEffect(() => {
        const fetchPhone = async () => {
            try {
                if (slug) {
                    const result: Phone = await getPhonesService.getPhone(slug);
                    setPhone(result);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchPhone();
    }, [slug]);

    if (!phone) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>{phone.name}</h1>
        </div>
    );
}

export default PhonePage;
