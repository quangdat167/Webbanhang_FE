import { IPhone } from './interface';

export function getMinPrice(phone: any) {
    const prices = phone?.prices?.map((priceObject: any) => priceObject.price);

    if (prices?.length === 0) {
        return undefined; // No prices available
    }

    const minPrice = formatNumberWithCommas(Math.min(...prices));
    return minPrice;
}

export function convertToVND(number: number) {
    const price = formatNumberWithCommas(number);
    return price;
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

export function scrollToTop(smooth = true) {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? 'smooth' : undefined,
    });
}

export function convertStringsToMinMax(arr: string[]) {
    if (arr && arr?.length) {
        // Khởi tạo mảng kết quả rỗng
        let result: any = [];

        // Duyệt qua mỗi chuỗi trong mảng đầu vào
        arr?.forEach((str) => {
            // Loại bỏ ký tự "[" ở đầu và "]" ở cuối chuỗi
            const cleanedStr = str.replace(/^\[|\]$/g, '');
            // Chuyển chuỗi thành mảng số bằng cách parse chuỗi JSON
            const array = JSON.parse(`[${cleanedStr}]`);
            // Thêm mảng số vào mảng kết quả
            result = [...result, ...array];
        });

        // Tìm phần tử min và max trong mảng kết quả
        const min = Math.min(...result);
        const max = Math.max(...result);

        // Trả về mảng chứa phần tử min và max
        return [min, max];
    } else return [];
}
