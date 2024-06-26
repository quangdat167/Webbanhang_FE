/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { faCaretRight, faCartPlus, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery } from '@mui/material';
import ButtonBuy from 'components/ButtonBuy/buttonBuy';
import ComparePhone from 'components/compare-phone';
import DialogTechnicalPhone from 'components/dialog-technical';
import TechnicalCommonPhone from 'components/technical-common-phone';
import { PopupSignIn } from 'pages/SignIn';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeComparePhone1, openCompare } from 'redux/reducer/compare';
import { pushSnackbar } from 'redux/reducer/snackbar';
import { RootState } from 'redux/store';
import { addToCartApi } from 'service/cart.service';
import { getFrequentProductsApi, getProductBySlugApi } from 'service/product.service';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { convertToVND, formatNumberWithCommas } from 'utils';
import { IColors, IFrequentProducts, IPhone, IPrices, IProductItem } from 'utils/interface';
import './style.scss';
import { addToPurchase } from 'pages/Cart/purchaseSlice';
import DialogSuggestItems, { MODESUGGEST } from 'components/dialog-suggest-items';

function PhonePage() {
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const compareState = useSelector((state: RootState) => state.compareState);

    const carts = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const [phone, setPhone] = useState<IPhone | null>(null);
    const [frequentProducts, setFrequentProducts] = useState({} as IFrequentProducts);
    const { slug } = useParams<{ slug: string }>();
    const [indexCarousel, setIndexCarousel] = useState<number>(0);
    const [phonePrice, setPhonePrice] = useState<IPrices>({} as IPrices);
    const [phoneColor, setPhoneColor] = useState<IColors>({} as IColors);
    const [openDialogTechnical, setOpenDialogTechnical] = useState(false);
    const [widthColLeft, setWidthColLeft] = useState(0);
    const [showBtnShowMore, setShowBtnShowMore] = useState(true);
    const [showMoreDetail, setShowMoreDetail] = useState(false);
    const [openPopupSignIn, setOpenPopupSignIn] = useState(false);
    const [openDialogSuggest, setOpenDialogSuggest] = useState(false);
    const [modeSuggest, setModeSuggest] = useState(MODESUGGEST.CART);

    // useEffect(() => {
    //     scrollToTop();
    // }, []);

    useEffect(() => {
        const fetchPhone = async () => {
            if (slug) {
                const result = await getProductBySlugApi({ slug: slug });

                setPhone(result);
            }
        };

        fetchPhone();
    }, [slug]);

    useEffect(() => {
        if (phone) {
            setPhonePrice(phone.prices[phone.prices.length - 1]);
            setPhoneColor(phone.colors[0]);
            if (phone.type === 'phone') {
                const getFrequentProducts = async () => {
                    const result = await getFrequentProductsApi({ productId: phone._id });
                    setFrequentProducts(result);
                };
                getFrequentProducts();
            }
        }
    }, [phone]);

    useEffect(() => {
        localStorage.setItem('carts', JSON.stringify(carts));
    }, [carts]);

    const colLeftRef: any = useRef(null);
    const phonePageRef: any = useRef(null);

    useEffect(() => {
        if (colLeftRef?.current) {
            const width = colLeftRef.current.getBoundingClientRect().width;
            setWidthColLeft(width - 24 - 16 * 2);
        }
    }, [colLeftRef?.current]);

    useEffect(() => {
        if (isTablet && phonePageRef?.current) {
            const width = phonePageRef.current.getBoundingClientRect().width;
            setWidthColLeft(width);
        }
    }, [phonePageRef?.current]);

    const handleSelectCarousel = (selectedIndex: number) => {
        setIndexCarousel(selectedIndex);
    };

    if (!phone) {
        return <h2>Loading...</h2>;
    }

    // Thêm vào giỏ hàng
    const handleAddToCart = async () => {
        if (userInfo.email) {
            await addToCartApi({
                userId: userInfo._id,
                productId: phone._id,
                color: phoneColor.color,
                quantity: 1,
                type: phonePrice.type,
            });
            dispatch(
                pushSnackbar({
                    content: 'Thêm vào giỏ hàng thành công',
                }),
            );
            setModeSuggest(MODESUGGEST.CART);
            setOpenDialogSuggest(true);
        } else {
            setOpenPopupSignIn(true);
        }
        // dispatch(addToCart(phoneAddToCart));
    };

    const handleAddItemsToCart = async ({ product }: { product: IProductItem }) => {
        if (userInfo.email) {
            await addToCartApi({
                userId: userInfo._id,
                productId: product._id,
                color: product.colors?.length ? product.colors[0].color : undefined,
                quantity: 1,
            });
            dispatch(
                pushSnackbar({
                    content: 'Thêm vào giỏ hàng thành công',
                }),
            );
        } else {
            setOpenPopupSignIn(true);
        }
        // dispatch(addToCart(phoneAddToCart));
    };

    const handleAddPhoneToCompare = () => {
        dispatch(openCompare(true));
        dispatch(changeComparePhone1(phone));
    };

    const setImgWidth = (htmlContent: any, width: any) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlContent;

        const imgElements = tempElement.querySelectorAll('img');
        const iframeElements = tempElement.querySelectorAll('iframe');
        imgElements.forEach((img) => {
            img.style.width = width + 'px';
            img.style.borderRadius = 8 + 'px';
            img.loading = 'lazy';
        });
        iframeElements.forEach((img) => {
            img.style.width = width + 'px';
            img.style.borderRadius = 8 + 'px';
        });

        return tempElement.innerHTML;
    };
    const handleBuy = () => {
        setModeSuggest(MODESUGGEST.BUY);
        setOpenDialogSuggest(true);
        dispatch(
            addToPurchase([
                {
                    productId: phone._id,
                    color: phoneColor.color,
                    quantity: 1,
                    type: phonePrice.type,
                    productInfo: phone,
                },
            ]),
        );
    };

    return (
        <Container style={{ maxWidth: 1300 }} className="phone-page mt-4 p-0" ref={phonePageRef}>
            <div className="d-flex gap-2">
                <h4 className="fw-700 mb-0">{phone.name}</h4>
                {/* <Link to="/" className="ms-auto">
                        Tất cả điện thoại
                    </Link> */}
                <Button variant="outline-danger" onClick={handleAddPhoneToCompare}>
                    + So sánh
                </Button>
            </div>
            <hr />

            <Row className="row-cols-sm-1 row-cols-md-2">
                <Col md={5} lg={7} className="h-100" ref={colLeftRef}>
                    <Carousel
                        activeIndex={indexCarousel}
                        onSelect={handleSelectCarousel}
                        interval={3000}
                        indicators={false}
                    >
                        {phone.images.map((img, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    height={isTablet ? 300 : 400}
                                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                                    src={img}
                                    alt={img}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className={'list-image-swipe mt-2 mb-1 py-2 w-100  overflow-x-auto '}>
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
                    <div className="mt-2 pt-2 pe-2 mb-2 bg-body-secondary bg-opacity-75 border rounded-3 shadow-sm">
                        <h5 className="text-center text-danger fw-bold">ĐẶC ĐIỂM NỔI BẬT</h5>
                        <ul>
                            {phone.description?.map((item, index) => (
                                <li key={index} className="fw-normal">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* {{! Sản phẩm thường mua kèm }} */}
                    {frequentProducts?._id ? (
                        <>
                            <div className="fs-5 fw-medium mt-3">Phụ kiện mua cùng</div>

                            <Swiper
                                slidesPerView={3}
                                spaceBetween={15}
                                loop={true}
                                // pagination={{
                                //     clickable: true,
                                // }}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="p-2"
                                style={{ userSelect: 'none' }}
                            >
                                {frequentProducts?.frequentItems.map((frequentItem, index) => {
                                    const itemDetail = frequentItem.itemDetails;
                                    return (
                                        <>
                                            <SwiperSlide key={index}>
                                                <Card
                                                    className="h-100 shadow rounded-3"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        window.open(
                                                            `/${itemDetail.type}/${itemDetail.slug}`,
                                                            '_blank',
                                                        );
                                                    }}
                                                >
                                                    <div className="text-center mt-2">
                                                        <div className="center">
                                                            <Card.Img
                                                                src={itemDetail.images[0]}
                                                                alt={itemDetail.name}
                                                                className="mt-2"
                                                                style={{ width: 160, height: 160 }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Card.Body>
                                                            <Card.Title
                                                                className="fs-6 fw-bold"
                                                                style={{
                                                                    height: '6rem',
                                                                    color: '#444',
                                                                }}
                                                            >
                                                                {itemDetail.name}
                                                            </Card.Title>

                                                            <Card.Text className="mt-2 text-danger fs-5 fw-bold">
                                                                {convertToVND(itemDetail.price)}
                                                            </Card.Text>
                                                        </Card.Body>
                                                        {/* <Card.Footer> */}
                                                        <div className="p-2">
                                                            <Button
                                                                variant="outline-danger"
                                                                className=" w-100 h-100 center gap-2 "
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleAddItemsToCart({
                                                                        product: itemDetail,
                                                                    });
                                                                }}
                                                            >
                                                                <FontAwesomeIcon
                                                                    className="mt-1 fs-5"
                                                                    icon={faCartPlus}
                                                                />

                                                                <p className="mt-1 fs-12 mb-0">
                                                                    {' '}
                                                                    Thêm vào giỏ
                                                                </p>
                                                            </Button>
                                                        </div>
                                                        {/* </Card.Footer> */}
                                                    </div>

                                                    {/* <Card.Footer className=" text-center">
                                        <Link to={`/phones/${phone._id}/edit`} className="btn btn-primary ">
                                            Thêm vào giỏ hàng
                                        </Link>
                                    </Card.Footer> */}
                                                </Card>
                                            </SwiperSlide>
                                        </>
                                    );
                                })}
                            </Swiper>
                        </>
                    ) : (
                        <></>
                    )}
                    {!isTablet && (
                        <div
                            className="more-info mt-4 p-3 shadow border rounded-3 overflow-hidden"
                            style={!showMoreDetail ? { height: 450 } : {}}
                        >
                            <div className="fs-4 fw-medium mb-3">Thông tin sản phẩm</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: setImgWidth(phone?.information, widthColLeft),
                                }}
                            />
                            {showBtnShowMore && (
                                <div className="show-more center ">
                                    <Button
                                        onClick={() => {
                                            setShowMoreDetail(true);
                                            setShowBtnShowMore(false);
                                        }}
                                        variant="outline-light"
                                        className={`button-show-more center fs-14 px-2 py-2 mb-4 border border-secondary-subtle text-dark shadow-lg`}
                                        style={{ width: '50%' }}
                                    >
                                        <div>Xem thêm</div>
                                        <KeyboardArrowDownIcon className="ms-2" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
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
                                className={`button-select-option fs-12 px-2 py-2 mb-2 me-2 border text-dark ${
                                    phonePrice.price === price.price
                                        ? 'active border-danger'
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
                        {phone.colors?.map((color, index) => (
                            <Button
                                key={index}
                                onClick={() => setPhoneColor(color)}
                                variant="outline-light"
                                className={
                                    'button-select-option ' +
                                    'fs-12 px-2 py-2 mb-2 me-2 btn border text-dark ' +
                                    `${
                                        phoneColor?.color === color.color
                                            ? 'active border-danger'
                                            : 'border-dark-subtle'
                                    }`
                                }
                                style={{ width: 'calc(33.33333% - 0.7rem)', height: 50 }}
                            >
                                <div className="center">
                                    <img
                                        src={color.img}
                                        alt={color.color}
                                        style={{ width: '2rem' }}
                                    />
                                    <span
                                        className="ms-2 fw-semibold"
                                        style={{ textAlign: 'left' }}
                                    >
                                        {color.color}
                                    </span>
                                </div>
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
                            {phone.promotion?.map((promotion, i) => (
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
                                        style={
                                            isTablet
                                                ? { width: 12, height: 12, marginTop: 2 }
                                                : { width: 16, height: 16, marginTop: 2 }
                                        }
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
                                <ButtonBuy clickFunc={handleBuy} />
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
                            <TechnicalCommonPhone phone={phone} />
                        </div>
                        <Button
                            variant="outline-light"
                            className="button-details mx-5 my-3 px-4 py-2 center gap-3 border border-secondary-subtle text-dark"
                            onClick={() => {
                                setOpenDialogTechnical(true);
                            }}
                        >
                            <p className="mb-0 fs-7">Xem thêm cấu hình chi tiết</p>
                            <FontAwesomeIcon className="fs-5" icon={faCaretRight} />
                        </Button>
                    </div>
                </Col>
                {isTablet && (
                    <div
                        className="more-info mt-4 p-3 shadow border rounded-3 overflow-hidden"
                        style={{ width: widthColLeft, ...(!showMoreDetail ? { height: 300 } : {}) }}
                    >
                        <div className="fs-4 fw-medium mb-3">Thông tin sản phẩm</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: setImgWidth(phone?.information, widthColLeft - 24),
                            }}
                        />
                        {showBtnShowMore && (
                            <div className="show-more center ">
                                <Button
                                    onClick={() => {
                                        setShowMoreDetail(true);
                                        setShowBtnShowMore(false);
                                    }}
                                    variant="outline-light"
                                    className={`button-show-more center fs-14 px-2 py-2 mb-4 border border-secondary-subtle text-dark shadow-lg`}
                                    style={{ width: '50%' }}
                                >
                                    <div>Xem thêm</div>
                                    <KeyboardArrowDownIcon className="ms-2" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Row>
            {compareState.open && <ComparePhone />}
            <DialogTechnicalPhone
                phone={phone}
                open={openDialogTechnical}
                setOpen={setOpenDialogTechnical}
            />
            <PopupSignIn open={openPopupSignIn} setOpen={setOpenPopupSignIn} />
            {frequentProducts?.frequentItems?.length && (
                <DialogSuggestItems
                    open={openDialogSuggest}
                    setOpen={setOpenDialogSuggest}
                    items={frequentProducts?.frequentItems?.map(
                        (frequentProduct) => frequentProduct.itemDetails,
                    )}
                    mode={modeSuggest}
                />
            )}
        </Container>
    );
}

export default PhonePage;
