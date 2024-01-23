import { IUserInfo } from 'redux/reducer/userinfo';

export interface IPrices {
    type: string;
    price: number;
}

export interface IColors {
    color: string;
    img: string;
}

export interface IPhone {
    _id: string;
    brand: string;
    name: string;
    prices: IPrices[];
    specifications: string[];
    description: string[];
    images: string[];
    promotion: string;
    colors: IColors[];
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    batery: string;
    bluetooth: string;
    charging_port: string;
    chipset: string;
    cpu: string;
    display_type: string;
    gpu: string;
    memory_card: string;
    nfc: string;
    operating_system: string;
    scanning_frequency: string;
    screen_technology: string;
    sim: string;
    size: string;
    time_release: string;
    weight: string;
}

export interface IProduct {
    _id?: string;
    phoneId: string;
    color: string;
    type: string;
    quantity: number;
    productInfo?: IPhone;
    price?: number;
}

export interface ICartItem {
    _id: string;
    userId: string;
    products: IProduct[];
}

export interface IOrder {
    _id: string;
    userId: string;
    products: IProduct[];
    status: string;
    totalPrice: number;
    userInfo?: IUserInfo;
    createdAt?: Date;
}
