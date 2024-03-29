import { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { getRandomPhoneApi } from 'service/phone.service';
import { getMinPrice } from 'utils';
import { IPhone } from 'utils/interface';
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
    const [recomPhone, setRecmPhone] = useState([] as IPhone[]);

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
                                src={phone.colors[0]?.img}
                                alt="img"
                                rounded
                                className="image-preview"
                            />
                            <div className="main-content">
                                <div className="name">{phone.name}</div>
                                <div className="price">{getMinPrice(phone)}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="recoment-wrapper">
                        <div className="recoment-title">Đề xuất</div>
                        {recomPhone.map((phone, index) => (
                            <div
                                key={index}
                                className="item-phone-search"
                                onClick={() => {
                                    window.open(`/phones/${phone.slug}`, '_self');
                                }}
                            >
                                <Image
                                    src={phone.colors[0]?.img}
                                    alt="img"
                                    rounded
                                    className="image-preview"
                                />
                                <div className="main-content">
                                    <div className="name">{phone.name}</div>
                                    <div className="price">{getMinPrice(phone)}</div>
                                </div>
                            </div>
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
