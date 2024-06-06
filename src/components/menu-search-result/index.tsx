import { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { getRandomPhoneApi } from 'service/product.service';
import { convertToVND, getMinPrice } from 'utils';
import Config from 'utils/Config';
import { IPhone, IProductItem } from 'utils/interface';
function MenuSearchResult({
    items,
    show,
    setShow,
    showRecomment,
    setShowRecomment,
}: {
    items: IPhone[];
    show: boolean;
    setShow: Function;
    showRecomment: boolean;
    setShowRecomment: Function;
}) {
    const [recomPhone, setRecmPhone] = useState([] as IProductItem[]);

    const getRandomPhoneFunc = async () => {
        const result = await getRandomPhoneApi({ limit: 3 });
        if (result.length) {
            setRecmPhone(result);
        }
    };

    useEffect(() => {
        show && getRandomPhoneFunc();
    }, [show]);
    return show ? (
        <>
            <div className="menu-search-result">
                {items.length > 0 && !showRecomment ? (
                    items.map((phone, index) => (
                        <div
                            key={index}
                            className="item-phone-search"
                            onClick={() => {
                                window.open(`/phones/${phone.slug}`, '_self');
                            }}
                        >
                            <Image
                                src={
                                    phone.type === Config.PRODUCT_TYPE.PHONE && phone.colors
                                        ? phone.colors[0]?.img
                                        : phone?.images[0]
                                }
                                alt="img"
                                rounded
                                className="image-preview"
                            />
                            <div className="main-content">
                                <div className="name">{phone.name}</div>
                                <div className="price">
                                    {phone.type === Config.PRODUCT_TYPE.PHONE
                                        ? getMinPrice(phone)
                                        : convertToVND(phone.price)}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="recoment-wrapper">
                        <div className="recoment-title">Đề xuất</div>
                        {recomPhone.map((phone, index) => (
                            <a
                                key={index}
                                className="item-phone-search"
                                // onClick={() => {
                                //     window.open(`/${phone.type}/${phone.slug}`, '_self');
                                // }}
                                href={`/${phone.type}/${phone.slug}`}
                                style={{ color: '#222' }}
                            >
                                <Image
                                    src={
                                        phone.type === Config.PRODUCT_TYPE.PHONE && phone.colors
                                            ? phone.colors[0]?.img
                                            : phone?.images[0]
                                    }
                                    alt="img"
                                    rounded
                                    className="image-preview"
                                />
                                <div className="main-content">
                                    <div className="name">{phone.name}</div>
                                    <div className="price">
                                        {phone.type === Config.PRODUCT_TYPE.PHONE
                                            ? getMinPrice(phone)
                                            : convertToVND(phone.price)}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
            <div
                className="header-overlay"
                onClick={() => {
                    setShow(false);
                }}
            ></div>
        </>
    ) : (
        <></>
    );
}

export default MenuSearchResult;
