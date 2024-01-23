import { faGift, faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Badge, Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import { deleteItemFromCart, getCartApi } from 'service/cart.service';
import { formatNumberWithCommas } from 'utils';
import { ICartItem } from 'utils/interface';
import { addToCart, deleteFromCart } from './CartSlice';
import './style.scss';
import RouteConfig from 'routes/Route';

function Cart() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    // const [carts, setCarts] = useState<ICartItem[]>([]);
    const cartsStore = useSelector((state: RootState) => state.cart);

    const getCartFunc = async () => {
        const result = await getCartApi({ userId: userInfo._id });
        if (result) {
            dispatch(addToCart(result[0]));
        }
    };

    const deleteItemFromCartFunc = async (phoneId: string) => {
        await deleteItemFromCart({ userId: userInfo._id, phoneId });
    };

    useEffect(() => {
        // const cartsJson = localStorage.getItem('carts');
        // if (cartsJson) {
        //     dispatch(loadCard(JSON.parse(cartsJson)));
        // }
        // // Lấy cart từ localStorage
        // const cartsJson = localStorage.getItem('carts');
        // if (cartsJson) setCarts(JSON.parse(cartsJson));
        userInfo.email && getCartFunc();
    }, [userInfo.email]);

    // useEffect(() => {
    //     setCarts(cartsStore);
    // }, [cartsStore]);

    const handleDeleteItem = (id: string) => {
        dispatch(deleteFromCart(id));
        deleteItemFromCartFunc(id);
    };

    return (
        <div className="mx-auto mt-3 cart-wrapper" style={{ maxWidth: '40rem' }}>
            <h4 className="mb-3 text-center text-root">Giỏ hàng</h4>
            <div className="cart-content-wrapper">
                {cartsStore?.products?.length &&
                    cartsStore?.products?.map((cart, index) => {
                        const imageShow = cart.productInfo?.colors?.find(
                            (color) => color.color === cart.color,
                        )?.img;
                        let price = cart.productInfo?.prices?.find(
                            (price) => price.type === cart.type,
                        )?.price;

                        const newPrice = formatNumberWithCommas(price);

                        return (
                            <div key={index}>
                                <div className="d-flex position-relative align-items-center">
                                    <Image
                                        src={imageShow}
                                        alt="anh"
                                        style={{ width: 160, height: 160 }}
                                    ></Image>
                                    <div className="ms-3 w-100">
                                        <Link
                                            to={`phone/${cart?.productInfo?.slug}`}
                                            className="mb-2 text-dark fw-bolder hover-underline"
                                        >
                                            {cart.productInfo?.name}
                                        </Link>
                                        <div className="mt-2 d-flex justify-content-between w-100">
                                            <div className="mb-2 fw-medium text-root">
                                                {newPrice}
                                            </div>
                                            <Badge
                                                pill
                                                bg="light"
                                                text="dark"
                                                className="d-flex align-items-center justify-content-around"
                                                style={{ width: '7rem' }}
                                            >
                                                <div style={{ cursor: 'pointer' }}>
                                                    <FontAwesomeIcon
                                                        icon={faMinus}
                                                        className="p-1"
                                                    />
                                                </div>
                                                <Form.Control
                                                    defaultValue={cart.quantity}
                                                    style={{ width: '2.3rem', height: '1.5rem' }}
                                                />
                                                <div style={{ cursor: 'pointer' }}>
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        className="p-1"
                                                    />
                                                </div>
                                            </Badge>
                                        </div>
                                        <div className="mb-2">
                                            <div>Phân loại: {cart.type}</div>
                                            <div>Màu sắc: {cart.color}</div>
                                        </div>
                                        <div className="mb-2 v-center">
                                            <FontAwesomeIcon icon={faGift} />
                                            <div className="ms-1">Chương trình khuyến mãi</div>
                                        </div>
                                        <div className="ms-4 hover-underline">
                                            {cart.productInfo?.promotion}
                                        </div>
                                    </div>
                                    <div
                                        className="position-absolute end-0 top-0"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteItem(cart.phoneId)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </div>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
            </div>
            <Link
                to={RouteConfig.CONFIRM_INFO}
                className="h-100 mt-3 fs-5 w-50 align-self-center "
                children={
                    <Button
                        variant="danger"
                        type="submit"
                        className="w-100 h-100 py-3 border rounded-pill"
                    >
                        <span>Xác nhận</span>
                    </Button>
                }
            />
        </div>
    );
}

export default Cart;
