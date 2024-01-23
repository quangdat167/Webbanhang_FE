import { IPhone } from './interface';

export function getMinPrice(phone: IPhone): string | undefined {
    const prices = phone.prices.map((priceObject) => priceObject.price);

    if (prices.length === 0) {
        return undefined; // No prices available
    }

    const minPrice = formatNumberWithCommas(Math.min(...prices));
    return minPrice;
}

export function formatNumberWithCommas(number: any) {
    return number?.toLocaleString('vi-VN') + ' đ';
}
