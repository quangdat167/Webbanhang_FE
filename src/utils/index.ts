import { IPhone } from './interface';

export function getMinPrice(phone: IPhone): string | undefined {
    const prices = phone?.prices?.map((priceObject) => priceObject.price);

    if (prices?.length === 0) {
        return undefined; // No prices available
    }

    const minPrice = formatNumberWithCommas(Math.min(...prices));
    return minPrice;
}

export function formatNumberWithCommas(number: any) {
    return number?.toLocaleString('vi-VN') + ' đ';
}

export function getDetailsByName(phone: IPhone, name: string) {
    const technicalInfo = phone.technical_infos.find((info) => info.name === name);
    return technicalInfo?.details;
}

export function getInfosByTitle(phone: IPhone, title: string, name?: string) {
    for (const info of phone.technical_infos) {
        const result = name
            ? info.name === name && info.details.find((detail) => detail.title === title)
            : info.details.find((detail) => detail.title === title);

        if (result) {
            return result.infos;
        }
    }

    return [];
}

export function scrollToTop(smooth = false) {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto',
    });
}
