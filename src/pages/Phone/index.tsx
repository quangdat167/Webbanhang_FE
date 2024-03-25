/* eslint-disable jsx-a11y/anchor-is-valid */

import { faCaretRight, faCartPlus, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonBuy from 'components/ButtonBuy/buttonBuy';
import { useEffect, useState } from 'react';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { IColors, IPhone, IPrices } from 'utils/interface';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ComparePhone from 'components/compare-phone';
import DialogTechnicalPhone from 'components/dialog-technical';
import TechnicalCommon from 'components/technical-common';
import { useDispatch, useSelector } from 'react-redux';
import { changeComparePhone1, openCompare } from 'redux/reducer/compare';
import { RootState } from 'redux/store';
import { addToCartApi } from 'service/cart.service';
import { getPhoneApi } from 'service/phone.service';
import { formatNumberWithCommas, scrollToTop } from 'utils';
import './style.scss';

function PhonePage() {
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const compareState = useSelector((state: RootState) => state.compareState);

    const carts = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const [phone, setPhone] = useState<IPhone | null>(null);
    const { slug } = useParams<{ slug: string }>();
    const [indexCarousel, setIndexCarousel] = useState<number>(0);
    const [phonePrice, setPhonePrice] = useState<IPrices>({} as IPrices);
    const [phoneColor, setPhoneColor] = useState<IColors>({} as IColors);
    const [openDialogTechnical, setOpenDialogTechnical] = useState(false);

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        const fetchPhone = async () => {
            if (slug) {
                const result = await getPhoneApi({ slug: slug });

                setPhone(result);
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
    const handleAddToCart = async () => {
        // const phoneAddToCart: ICartItem = {
        //     _id: phone._id,
        //     name: phone.name,
        //     type: phonePrice.type,
        //     image: phoneColor?.img!,
        //     price: phonePrice.price,
        //     color: phoneColor.color,
        //     promotion: phone.promotion,
        //     url: `/phones/${phone.slug}`,
        //     quantity: 1,
        // };
        if (userInfo.email) {
            await addToCartApi({
                userId: userInfo._id,
                phoneId: phone._id,
                color: phoneColor.color,
                quantity: 1,
                type: phonePrice.type,
            });
        }
        // dispatch(addToCart(phoneAddToCart));
    };

    const handleAddPhoneToCompare = () => {
        dispatch(openCompare(true));
        dispatch(changeComparePhone1(phone));
    };

    return (
        <Container style={{ maxWidth: 1200 }} className="phone-page mt-4">
            <div className="d-flex gap-2">
                <h4 className="fw-700">{phone.name}</h4>
                {/* <Link to="/" className="ms-auto">
                        Tất cả điện thoại
                    </Link> */}
                <Button variant="outline-danger" onClick={handleAddPhoneToCompare}>
                    + So sánh
                </Button>
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
                                <img
                                    className="d-block mx-auto"
                                    height={400}
                                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                                    src={img}
                                    alt={img}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className={'list-image-swipe mt-2 mb-1 w-100  overflow-x-auto '}>
                        {phone.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={img}
                                onClick={() => setIndexCarousel(index)}
                                className={
                                    'image-swipe ' +
                                    ' border rounded-3 ' +
                                    `${indexCarousel === index ? 'border-danger' : ''}`
                                }
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
                    <p className="card-text text-danger fs-5 fw-bold">
                        {formatNumberWithCommas(phonePrice.price)}
                    </p>

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
                                {formatNumberWithCommas(price.price)}
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
                                className={
                                    'fs-12 px-1 py-2 mb-2 me-2 btn border text-dark ' +
                                    `${
                                        phoneColor?.color === color.color
                                            ? 'border-danger'
                                            : 'border-dark-subtle'
                                    }`
                                }
                                style={{ width: 'calc(33.33333% - 0.7rem)' }}
                            >
                                <img src={color.img} alt={color.color} style={{ width: '2rem' }} />
                                <span className="ms-2 fw-semibold">{color.color}</span>
                            </Button>
                        ))}
                    </div>

                    {/* {{! Khung khuyến mãi }} */}
                    <div className="promotion border border-danger-subtle rounded-3 mt-2">
                        <div className="py-2 ps-2 fw-700 text-danger bg-danger-subtle">
                            <FontAwesomeIcon icon={faGift} style={{ color: '#d70018' }} />
                            <span className="ms-2">Khuyến mãi</span>
                        </div>
                        <div className="p-2">
                            {phone.promotion.map((promotion, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    type="button"
                                    className={
                                        'hover-underline ' +
                                        'pb-2 small text-body d-flex align-items-start gap-2'
                                    }
                                >
                                    <CheckCircleIcon
                                        color="success"
                                        style={{ width: 16, height: 16, marginTop: 2 }}
                                    />
                                    <div> {promotion}</div>
                                </a>
                            ))}
                        </div>
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
                    <div className="mt-4 d-flex flex-column ">
                        <div className="fs-4 fw-medium">Cấu hình Điện thoại {phone.name}</div>
                        <div className="mt-2">
                            <TechnicalCommon phone={phone} />
                        </div>
                        <Button
                            variant="outline-primary"
                            className="button-details mx-5 my-3 px-4 py-2 center gap-3"
                            onClick={() => {
                                setOpenDialogTechnical(true);
                            }}
                        >
                            <p className="mb-0 fs-7">Xem thêm cấu hình chi tiết</p>
                            <FontAwesomeIcon className="mt-1 fs-5" icon={faCaretRight} />
                        </Button>
                    </div>
                </Col>
            </Row>
            {compareState.open && <ComparePhone />}
            <DialogTechnicalPhone
                phone={phone}
                open={openDialogTechnical}
                setOpen={setOpenDialogTechnical}
            />
        </Container>
    );
}

export default PhonePage;
