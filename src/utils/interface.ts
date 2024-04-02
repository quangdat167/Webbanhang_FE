import { IUserInfo } from 'redux/reducer/userinfo';

export interface IPrices {
    type: string;
    price: number;
}

export interface IColors {
    color: string;
    img: string;
}

export interface DetailOfTechnicalInfo {
    title: string;
    infos: string[];
}

export interface ITechnicalInfos {
    name: string;
    details: DetailOfTechnicalInfo[];
}

export interface IPhone {
    _id: string;
    brand: string;
    name: string;
    prices: IPrices[];
    specifications: string[];
    description: string[];
    images: string[];
    promotion: string[];
    colors: IColors[];
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    information: string;
    priority: number;
    technical_infos: ITechnicalInfos[];
    min_price?: number;
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

export interface IFilter {
    brand: string[];
    price: string[];
    type: string[];
    ram: string[];
    rom: string[];
    charging_feature: string[];
}

export interface IItem {
    _id: string;
    brand?: string;
    name: string;
    price: number;
    image: string;
    promotion: string[];
    colors?: IColors[];
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    information?: string;
    technical_infos?: DetailOfTechnicalInfo[];
    description?: String[];
}

export interface IHomeState {
    phones: IPhone[];
    loading: boolean;
    offset: number;
    totalRemaining: number;
    sortby: string;
    items: IItem[];
}
