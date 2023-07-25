export interface PriceObject {
    type: string;
    price: string;
}

export interface colorProps {
    color: string;
    img: string;
}

export interface phoneProps {
    _id: string;
    brand: string;
    name: string;
    prices: PriceObject[];
    specifications: string[];
    description: string[];
    images: string[];
    promotion: string;
    colors: colorProps[];
    createdAt: Date;
    updatedAt: Date;
    slug: string;
}

export interface userProps {
    _id?: string;
    username: string;
    password: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface cartProps {
    _id: string;
    name: string;
    image: string;
    type: string;
    price: string;
    color: string;
    quantity: number;
    promotion: string;
    url: string;
}
