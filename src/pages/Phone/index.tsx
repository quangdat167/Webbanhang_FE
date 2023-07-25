/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Phone.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faGift } from '@fortawesome/free-solid-svg-icons';
import ButtonBuy from 'components/ButtonBuy/buttonBuy';
import { PriceObject, cartProps, colorProps, phoneProps } from 'utils/interface';
import axios from 'axios';
import Url from 'utils/url';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from 'pages/Cart/CartSlice';
import { RootState } from 'redux/store';

const cx = classNames.bind(styles);

function PhonePage() {
    const carts = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const [phone, setPhone] = useState<phoneProps | null>(null);
    const { slug } = useParams<{ slug: string }>();
    const [indexCarousel, setIndexCarousel] = useState<number>(0);
    const [phonePrice, setPhonePrice] = useState<PriceObject>({} as PriceObject);
    const [phoneColor, setPhoneColor] = useState<colorProps>({} as colorProps);

    useEffect(() => {
        const fetchPhone = async () => {
            try {
                if (slug) {
                    const result = await axios.get(Url(`phones/${slug}`));
                    setPhone(result.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchPhone();
    }, [slug]);

    useEffect(() => {
        if (phone) {
            setPhonePrice(phone.prices[phone.prices.length - 1]);
            setPhoneColor(phone.colors[0]);
        }
    }, [phone]);

    useEffect(() => {
        localStorage.setItem('carts', JSON.stringify(carts));
    }, [carts]);

    const handleSelectCarousel = (selectedIndex: number) => {
        setIndexCarousel(selectedIndex);
    };

    if (!phone) {
        return <h2>Loading...</h2>;
    }

    // Thêm vào giỏ hàng
    const handleAddToCart = () => {
        const phoneAddToCart: cartProps = {
            _id: phone._id,
            name: phone.name,
            type: phonePrice.type,
            image: phoneColor?.img!,
            price: phonePrice.price,
            color: phoneColor.color,
            promotion: phone.promotion,
            url: `/phones/${phone.slug}`,
            quantity: 1,
        };
        dispatch(addToCart(phoneAddToCart));
    };

    return (
        <Container style={{ maxWidth: 1200 }} className="mt-4">
            <div className="d-flex">
                <h4 className="fw-700">{phone.name}</h4>
                <Link to="/" className="ms-auto">
                    Tất cả điện thoại
                </Link>
            </div>
            <hr />

            <Row className="row-cols-sm-1 row-cols-md-2">
                <Col md={5} lg={7} className="h-100">
                    <Carousel
                        activeIndex={indexCarousel}
                        onSelect={handleSelectCarousel}
                        interval={3000}
                        indicators={false}
                    >
                        {phone.images.map((img, index) => (
                            <Carousel.Item key={index}>
                                <img className="d-block w-50 mx-auto" src={img} alt={img} />
                                {/* <div className="carousel-image w-100 overflow-x-auto mb-4">
                                    <img
                                        src={img}
                                        alt={img}
                                        data-bs-slide-to={index}
                                        className={cx('image-swipe', 'border rounded-3')}
                                    />
                                </div> */}
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className={cx('list-image-swipe', ' mt-2 mb-1 w-100  overflow-x-auto ')}>
                        {phone.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={img}
                                onClick={() => setIndexCarousel(index)}
                                className={cx(
                                    'image-swipe',
                                    'border rounded-3',
                                    `${indexCarousel === index ? 'border-danger' : ''}`,
                                )}
                            />
                        ))}
                    </div>

                    {/* {{! Đặc điểm nổi bật }} */}
                    <div className="mt-2 pt-2 pe-2 mb-2 bg-body-secondary bg-opacity-75 border rounded-3">
                        <h5 className="text-center text-danger fw-bold">ĐẶC ĐIỂM NỔI BẬT</h5>
                        <ul>
                            {phone.description.map((item, index) => (
                                <li key={index} className="fw-normal">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>

                {/* {{! Cột bên phải }} */}
                <Col md={7} lg={5} className="h-100">
                    <p className="card-text text-danger fs-5 fw-bold">{phonePrice.price}</p>

                    {/* {{! Khung chọn loại bộ nhớ }} */}
                    <div className="options-price">
                        {phone.prices.map((price, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    setPhonePrice(price);
                                }}
                                variant="outline-light"
                                className={`fs-12 px-2 py-2 mb-2 me-2 border text-dark ${
                                    phonePrice.price === price.price
                                        ? 'border-danger'
                                        : 'border-dark-subtle'
                                }
                                 `}
                                style={{ width: 'calc(33.33333% - 0.7rem)' }}
                            >
                                <span className="fw-medium">{price.type}</span>
                                <br />
                                {price.price}
                            </Button>
                        ))}
                    </div>

                    {/* {{! Khung chọn màu }} */}
                    <h6 className="my-2">Chọn màu để xem giá</h6>
                    <div className="options-color mt-1">
                        {phone.colors.map((color, index) => (
                            <Button
                                key={index}
                                onClick={() => setPhoneColor(color)}
                                variant="outline-light"
                                className={cx(
                                    'fs-12',
                                    'px-1 py-2 mb-2 me-2 btn border text-dark',
                                    `${
                                        phoneColor?.color === color.color
                                            ? 'border-danger'
                                            : 'border-dark-subtle'
                                    }`,
                                )}
                                style={{ width: 'calc(33.33333% - 0.7rem)' }}
                            >
                                <img src={color.img} alt={color.color} style={{ width: '2rem' }} />
                                <span className="fw-semibold">{color.color}</span>
                            </Button>
                        ))}
                    </div>

                    {/* {{! Khung khuyến mãi }} */}
                    <div className="promotion border border-danger-subtle rounded-3 mt-2">
                        <div className="py-2 ps-2 fw-700 text-danger bg-danger-subtle">
                            <FontAwesomeIcon icon={faGift} style={{ color: '#d70018' }} />
                            <span className="ms-2">Khuyến mãi</span>
                        </div>
                        <a
                            href="#"
                            type="button"
                            className={cx('hover-underline', 'p-3 small text-body')}
                        >
                            {phone.promotion}
                        </a>
                    </div>

                    {/* {{! Button buy, add to cart }} */}
                    <div className="mt-4">
                        <Row className="g-2">
                            <Col xs={8}>
                                <ButtonBuy />
                            </Col>
                            <Col xs={4}>
                                <Button
                                    variant="outline-danger"
                                    className=" w-100 h-100 d-flex flex-column align-items-center "
                                    onClick={handleAddToCart}
                                >
                                    <FontAwesomeIcon className="mt-1 fs-5" icon={faCartPlus} />

                                    <p className="mt-1 fs-12 mb-0"> Thêm vào giỏ</p>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default PhonePage;
