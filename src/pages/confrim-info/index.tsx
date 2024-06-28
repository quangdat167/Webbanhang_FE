import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useEffect, useState } from 'react';
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { changUserInfoApi } from 'service/authen.service';
import { createOrderApi } from 'service/order.service';
import { getPaymentLinkApi } from 'service/payment.service';
import { convertToVND, formatNumberWithCommas, generateUniqueOrderCode } from 'utils';
import Config from 'utils/Config';
import { IProduct } from 'utils/interface';

function ConfirmInfo() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const purchaseState = useSelector((state: RootState) => state.purchaseState);
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
        purchaseState.forEach((prod) =>
            productSend.push({
                productId: prod.productId,
                color: prod.color ? prod.color : undefined,
                quantity: prod.quantity,
                type: prod.type ? prod.type : undefined,
                price:
                    prod.productInfo?.type === Config.PRODUCT_TYPE.PHONE
                        ? prod.productInfo?.prices?.find((price) => price.type === prod.type)?.price
                        : prod.productInfo?.price,
            }),
        );
        const orderCode = generateUniqueOrderCode();

        const result = await createOrderApi({
            userId: userInfo._id,
            orderCode,
            products: productSend,
        });
        if (result) {
        }
        const link = await getPaymentLinkApi({ orderId: orderCode });
        if (link) {
            window.open(link, '_self');
        }

        // setTimeout(() => {
        //     window.open(RouteConfig.ORDER, '_self');
        // }, 3000);
    };

    const handleSubmitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        changeUserInfoFunc();
        // dispatch(
        //     pushSnackbar({
        //         content: 'Đặt hàng thành công',
        //     }),
        // );
        createOrderFunc();
        setLoading(false);
    };

    useEffect(() => {
        if (purchaseState?.length) {
            setTotalPrice(
                formatNumberWithCommas(
                    purchaseState.reduce((value, prod) => {
                        let totalPrice = 0;

                        if (prod.productInfo?.type === Config.PRODUCT_TYPE.PHONE) {
                            prod.productInfo?.prices?.forEach((price) => {
                                if (price.type === prod.type) {
                                    totalPrice = prod.quantity * price.price;
                                }
                            });
                        } else if (prod.productInfo?.price) {
                            totalPrice = prod.productInfo?.price * prod.quantity;
                        }
                        // console.log('value: ', value);
                        return value + totalPrice;
                    }, 0),
                ),
            );
        }
    }, [purchaseState]);

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

                <Form.Group className=" " controlId="formBasicPassword">
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
                    {purchaseState?.map((cart, index) => {
                        const imageShow = cart.color
                            ? cart.productInfo?.colors?.find((color) => color.color === cart.color)
                                  ?.img
                            : cart.productInfo?.images[0];

                        let newPrice = '';
                        if (cart.productInfo?.type === Config.PRODUCT_TYPE.PHONE) {
                            let price = cart.productInfo?.prices?.find(
                                (price) => price.type === cart.type,
                            )?.price;

                            newPrice = formatNumberWithCommas(price);
                        } else {
                            newPrice = convertToVND(cart.productInfo?.price);
                        }

                        return (
                            <div key={index} className="mt-4">
                                <div className="mt-2 d-flex  position-relative align-items-center">
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
                                            {cart.type ? <div>Phân loại: {cart.type}</div> : <></>}
                                            {cart.color ? <div>Màu sắc: {cart.color}</div> : <></>}
                                        </div>
                                    </div>
                                </div>
                                {/* <hr /> */}
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

                <div>
                    <div className="fw-bolder">Chọn phương thức thanh toán</div>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            defaultChecked
                            label="Chuyển khoản ngân hàng qua mã QR"
                        />
                    </RadioGroup>
                </div>

                <Button
                    className="mt-5 py-3 w-75 border rounded-pill align-self-center "
                    variant="danger"
                    type="submit"
                >
                    {loading ? (
                        <Spinner animation="border" variant="light" className="fs-5" />
                    ) : (
                        <span>Thanh toán</span>
                    )}
                </Button>
            </Form>
        </div>
    );
}

export default ConfirmInfo;
