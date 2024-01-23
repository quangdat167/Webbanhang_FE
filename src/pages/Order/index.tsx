import { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import { deleteItemFromCart } from 'service/cart.service';
import { formatNumberWithCommas } from 'utils';
// import { addToCart, deleteFromCart } from './CartSlice';
import { addOrders } from 'redux/reducer/order';
import { getAllOrdersApi } from 'service/order.service';
import './style.scss';

function Order() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    // const [carts, setCarts] = useState<ICartItem[]>([]);
    const ordersState = useSelector((state: RootState) => state.orderState);

    const getCartFunc = async () => {
        const result = await getAllOrdersApi({ userId: userInfo._id });
        if (result) {
            dispatch(addOrders(result));
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
        // dispatch(deleteFromCart(id));
        deleteItemFromCartFunc(id);
    };

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
                        <div className="mb-3 ">
                            {order?.products?.map((cart, index) => {
                                const imageShow = cart.productInfo?.colors?.find(
                                    (color) => color.color === cart.color,
                                )?.img;
                                let price = cart.productInfo?.prices?.find(
                                    (price) => price.type === cart.type,
                                )?.price;

                                const newPrice = formatNumberWithCommas(price);

                                return (
                                    <div key={index}>
                                        <div className="d-flex  position-relative align-items-center">
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
                                                </div>
                                                <div className="mb-2">
                                                    <div>Số lượng: {cart.quantity}</div>
                                                    <div>Phân loại: {cart.type}</div>
                                                    <div>Màu sắc: {cart.color}</div>
                                                </div>
                                            </div>
                                        </div>
                                        {index !== order?.products.length - 1 && <hr />}
                                    </div>
                                );
                            })}

                            <div className="mt-3">
                                <div className="d-flex justify-content-end">
                                    <div>Trạng thái: {order.status}</div>
                                </div>
                                <div className="d-flex justify-content-end fw-medium text-root">
                                    Tông tiền: {totalPrice}
                                </div>
                            </div>

                            <hr />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Order;
