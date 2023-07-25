import { faGift, faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Badge, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import { cartProps } from 'utils/interface';
import { deleteFromCart, loadCard } from './CartSlice';

function Cart() {
    const dispatch = useDispatch();

    const [carts, setCarts] = useState<cartProps[]>([]);
    const cartsStore = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        const cartsJson = localStorage.getItem('carts');
        if (cartsJson) {
            dispatch(loadCard(JSON.parse(cartsJson)));
        }
        // // Lấy cart từ localStorage
        // const cartsJson = localStorage.getItem('carts');
        // if (cartsJson) setCarts(JSON.parse(cartsJson));
    }, []);

    useEffect(() => {
        setCarts(cartsStore);
    }, [cartsStore]);

    const handleDeleteItem = (id: string) => {
        dispatch(deleteFromCart(id));
    };

    return (
        <div className="mx-auto mt-3" style={{ maxWidth: '40rem' }}>
            <h4 className="mb-3 text-center text-root">Giỏ hàng</h4>
            {carts.map((cart, index) => (
                <div key={index}>
                    <div className="d-flex position-relative">
                        <Image src={cart.image} alt="anh" style={{ width: '10rem' }}></Image>
                        <div className="ms-3">
                            <Link
                                to={cart.url}
                                className="mb-2 text-dark fw-bolder hover-underline"
                            >
                                {cart.name}
                            </Link>
                            <div className="d-flex justify-content-between">
                                <div className="mb-2 fw-medium text-root">{cart.price}</div>
                                <Badge
                                    pill
                                    bg="light"
                                    text="dark"
                                    className="d-flex align-items-center justify-content-around"
                                    style={{ width: '7rem' }}
                                >
                                    <div style={{ cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faMinus} className="p-1" />
                                    </div>
                                    <Form.Control
                                        defaultValue={cart.quantity}
                                        style={{ width: '2rem', height: '1.5rem' }}
                                    />
                                    <div style={{ cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faPlus} className="p-1" />
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
                            <div className="ms-4 hover-underline">{cart.promotion}</div>
                        </div>
                        <div
                            className="position-absolute end-0 top-0"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteItem(cart._id)}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Cart;
