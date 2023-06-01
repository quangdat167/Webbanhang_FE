interface PriceObject {
    type: string;
    price: string;
}

interface ColorObject {
    color: string;
    img: string;
}

interface PhoneObject {
    _id: string;
    brand: string;
    name: string;
    prices: PriceObject[];
    specifications: string[];
    description: string[];
    images: string[];
    promotion: String;
    colors: ColorObject[];
    createdAt: Date;
    updatedAt: Date;
    slug: string;
}

export default PhoneObject;
