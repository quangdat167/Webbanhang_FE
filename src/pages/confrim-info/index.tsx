import { useEffect, useState } from 'react';
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { pushSnackbar } from 'redux/reducer/snackbar';
import { RootState } from 'redux/store';
import RouteConfig from 'routes/Route';
import { changUserInfoApi } from 'service/authen.service';
import { createOrderApi } from 'service/order.service';
import { formatNumberWithCommas } from 'utils';
import { IProduct } from 'utils/interface';

function ConfirmInfo() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const productsCart = useSelector((state: RootState) => state.cart.products);
    const [phone, setPhone] = useState(userInfo.phone);
    const [address, setAddress] = useState(userInfo.address);
    const [loading, setLoading] = useState<Boolean>(false);
    const [totalPrice, setTotalPrice] = useState('');

    useEffect(() => {
        if (userInfo) {
            if (userInfo.phone) {
                setPhone(userInfo.phone);
            }
            if (userInfo.address) {
                setAddress(userInfo.address);
            }
        }
    }, [userInfo.email]);

    const changeUserInfoFunc = async () => {
        if (
            (userInfo.phone !== phone && phone.length) ||
            (userInfo.address !== address && address.length)
        )
            await changUserInfoApi({
                userId: userInfo._id,
                phone: userInfo.phone !== phone && phone.length ? phone : undefined,
                address: userInfo.address !== address && address.length ? address : undefined,
            });
    };

    const createOrderFunc = async () => {
        let productSend: IProduct[] = [];
        productsCart.forEach((prod) =>
            productSend.push({
                phoneId: prod.phoneId,
                color: prod.color,
                quantity: prod.quantity,
                type: prod.type,
                price: prod.productInfo?.prices.find((price) => price.type === prod.type)?.price,
            }),
        );

        await createOrderApi({
            userId: userInfo._id,
            products: productSend,
        });

        setTimeout(() => {
            window.open(RouteConfig.ORDER, '_self');
        }, 3000);
    };

    const handleSubmitForm = (e: any) => {
        e.preventDefault();
        changeUserInfoFunc();
        dispatch(
            pushSnackbar({
                content: 'Đặt hàng thành công',
            }),
        );
        createOrderFunc();
    };

    useEffect(() => {
        if (productsCart?.length) {
            console.log(2);
            console.log('productsCart: ', productsCart);

            setTotalPrice(
                formatNumberWithCommas(
                    productsCart.reduce((value, prod) => {
                        let totalPrice = 0;
                        prod.productInfo?.prices.forEach((price) => {
                            if (price.type === prod.type) {
                                totalPrice = prod.quantity * price.price;
                            }
                        });
                        // console.log('value: ', value);
                        return value + totalPrice;
                    }, 0),
                ),
            );
        }
    }, [productsCart]);

    console.log('Total: ', totalPrice);

    return (
        <div className="mx-auto px-2" style={{ maxWidth: '30rem', marginTop: 100 }}>
            <h2 className="text-center">Xác nhận thông tin</h2>
            <Form className="mt-3 d-flex flex-column" onSubmit={handleSubmitForm}>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Control
                        required
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-2 " controlId="formBasicPassword">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <div className="my-3 ">
                    {productsCart?.map((cart, index) => {
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
                                        <div className="mb-2 text-dark fw-bolder hover-underline">
                                            {cart.productInfo?.name}
                                        </div>
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
                            </div>
                        );
                    })}

                    <div className="mt-3">
                        <div className="d-flex justify-content-end fw-medium text-root">
                            Phí giao hàng: {'0 đ'}
                        </div>
                        <div className="d-flex justify-content-end fw-medium text-root">
                            Tông tiền: {totalPrice}
                        </div>
                    </div>

                    <hr />
                </div>

                <Button
                    className="mt-3 py-3 w-75 border rounded-pill align-self-center "
                    variant="danger"
                    type="submit"
                >
                    {loading ? (
                        <Spinner animation="border" variant="light" className="fs-5" />
                    ) : (
                        <span>Đặt hàng</span>
                    )}
                </Button>
            </Form>
        </div>
    );
}

export default ConfirmInfo;
