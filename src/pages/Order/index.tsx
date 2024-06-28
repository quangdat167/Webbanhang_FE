import { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import { deleteItemFromCart } from 'service/cart.service';
import { convertToVND, formatNumberWithCommas } from 'utils';
// import { addToCart, deleteFromCart } from './CartSlice';
import moment from 'moment';
import { addOrders } from 'redux/reducer/order';
import { getAllOrdersApi } from 'service/order.service';
import './style.scss';
import Config from 'utils/Config';

function Order() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    // const [carts, setCarts] = useState<ICartItem[]>([]);
    const ordersState = useSelector((state: RootState) => state.orderState);

    const getCartFunc = async () => {
        let result = await getAllOrdersApi({ userId: userInfo._id });
        if (result) {
            result = result.sort(
                (a: any, b: any) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            );
            dispatch(addOrders(result));
        }
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

    return (
        <div className="mx-auto mt-3 cart-wrapper" style={{ maxWidth: '40rem' }}>
            <h4 className="mb-3 text-center text-root">Đơn hàng</h4>
            <div className="cart-content-wrapper">
                {ordersState?.map((order) => {
                    const totalPrice = formatNumberWithCommas(
                        order.products.reduce(
                            (value, prod) =>
                                prod.price ? value + prod.price * prod.quantity : value,
                            0,
                        ),
                    );
                    return (
                        <div className="mb-3 p-3 border rounded-2 overflow-hidden ">
                            {order?.products?.map((cart, index) => {
                                const imageShow = cart.productInfo?.colors?.find(
                                    (color) => color.color === cart.color,
                                )?.img;
                                let newPrice = '';
                                if (cart.productInfo?.type === Config.PRODUCT_TYPE.PHONE) {
                                    let price = cart.productInfo?.prices?.find(
                                        (price) => price.type === cart.type,
                                    )?.price;

                                    newPrice = formatNumberWithCommas(price);
                                } else {
                                    convertToVND(cart.productInfo?.price);
                                }

                                return (
                                    <div key={index}>
                                        <div className="d-flex  position-relative align-items-center">
                                            <Image
                                                src={imageShow}
                                                alt="anh"
                                                style={{ width: 160, height: 160 }}
                                            ></Image>
                                            <div className="ms-5 w-100">
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
                                                </div>
                                                <div className="mb-2">
                                                    <div>Số lượng: {cart.quantity}</div>
                                                    {cart.type ? (
                                                        <div>Phân loại: {cart.type}</div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {cart.color ? (
                                                        <div>Màu sắc: {cart.color}</div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {index !== order?.products.length - 1 && <hr />}
                                    </div>
                                );
                            })}

                            <div className="mt-4">
                                {order.orderCode ? (
                                    <div className="d-flex justify-content-start">
                                        <div>Mã đơn hàng: {order.orderCode}</div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className="d-flex justify-content-start">
                                    <div>
                                        Ngày đặt hàng:{' '}
                                        {moment(order.createdAt).format(' HH:mm:ss DD-MM-YYYY')}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <div>Trạng thái: {order.status}</div>
                                </div>
                                <div className="d-flex justify-content-start fw-medium text-root">
                                    Tổng tiền: {totalPrice}
                                </div>
                            </div>

                            {/* <hr /> */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Order;
