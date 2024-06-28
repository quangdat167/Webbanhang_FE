/* eslint-disable react-hooks/exhaustive-deps */
import { faCaretRight, faCartPlus, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery } from '@mui/material';
import ButtonBuy from 'components/ButtonBuy/buttonBuy';
import DialogTechnicalItem from 'components/dialog-technical-item';
import TechnicalCommonItem from 'components/technical-common-item';
import { useEffect, useRef, useState } from 'react';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { convertToVND, scrollToTop } from 'utils';
import { IColors, IItem, IProductItem } from 'utils/interface';
import './style.scss';
import { addToCartApi } from 'service/cart.service';
import { pushSnackbar } from 'redux/reducer/snackbar';
import { addToPurchase } from 'pages/Cart/purchaseSlice';

function LayoutDetailItem({ item }: { item: IItem }) {
    const dispatch = useDispatch();
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const [indexCarousel, setIndexCarousel] = useState<number>(0);
    const [phoneColor, setPhoneColor] = useState<IColors>({} as IColors);
    const [openDialogTechnical, setOpenDialogTechnical] = useState(false);
    const [widthColLeft, setWidthColLeft] = useState(0);
    const [showBtnShowMore, setShowBtnShowMore] = useState(true);
    const [showMoreDetail, setShowMoreDetail] = useState(false);

    useEffect(() => {
        if (item && item.colors?.length) {
            setPhoneColor(item.colors[0]);
        }
    }, [item]);

    useEffect(() => {
        return () => {
            scrollToTop(false);
        };
    }, []);

    const colLeftRef: any = useRef(null);
    const LayoutItemPageRef: any = useRef(null);

    useEffect(() => {
        if (colLeftRef?.current) {
            const width = colLeftRef.current.getBoundingClientRect().width;
            setWidthColLeft(width - 24 - 16 * 2);
        }
    }, [colLeftRef?.current]);

    useEffect(() => {
        if (isTablet && LayoutItemPageRef?.current) {
            const width = LayoutItemPageRef.current.getBoundingClientRect().width;
            setWidthColLeft(width);
        }
    }, [LayoutItemPageRef?.current]);

    const handleSelectCarousel = (selectedIndex: number) => {
        setIndexCarousel(selectedIndex);
    };

    if (!item) {
        return <h2>Loading...</h2>;
    }

    const handleAddItemsToCart = async () => {
        if (userInfo.email) {
            await addToCartApi({
                userId: userInfo._id,
                productId: item._id,
                color: item.colors?.length ? item.colors[0].color : undefined,
                quantity: 1,
            });
            dispatch(
                pushSnackbar({
                    content: 'Thêm vào giỏ hàng thành công',
                }),
            );
        }
        // dispatch(addToCart(phoneAddToCart));
    };

    // Thêm vào giỏ hàng
    const handleAddToCart = async () => {
        if (userInfo.email) {
            // await addToCartApi({
            //     userId: userInfo._id,
            //     phoneId: item._id,
            //     color: phoneColor.color,
            //     quantity: 1,
            //     type: phonePrice.type,
            // });
        }
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
        dispatch(
            addToPurchase([
                {
                    productId: item._id,
                    color: phoneColor.color ? phoneColor.color : undefined,
                    quantity: 1,
                    productInfo: item,
                },
            ]),
        );
    };

    return (
        <Container
            style={{ maxWidth: 1300 }}
            className="layout-detail-items mt-4 p-0"
            ref={LayoutItemPageRef}
        >
            <div className="d-flex gap-2">
                <h4 className="fw-700 mb-0">{item.name}</h4>

                {/* <Button variant="outline-danger" onClick={handleAddPhoneToCompare}>
                    + So sánh
                </Button> */}
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
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                height={isTablet ? 300 : 400}
                                style={{ objectFit: 'contain', maxWidth: '100%' }}
                                src={item.images[0]}
                                alt={item.images[0]}
                            />
                        </Carousel.Item>
                    </Carousel>

                    {/* {{! Đặc điểm nổi bật }} */}
                    {item.description?.length ? (
                        <div className="mt-2 pt-2 pe-2 mb-2 bg-body-secondary bg-opacity-75 border rounded-3 shadow-sm">
                            <h5 className="text-center text-danger fw-bold">ĐẶC ĐIỂM NỔI BẬT</h5>
                            <ul>
                                {item.description?.map((item, index) => (
                                    <li key={index} className="fw-normal">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <></>
                    )}
                    {!isTablet && item?.information && (
                        <div
                            className="more-info mt-4 p-3 shadow border rounded-3 overflow-hidden"
                            style={!showMoreDetail ? { height: 450 } : {}}
                        >
                            <div className="fs-4 fw-medium mb-3">Thông tin sản phẩm</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: setImgWidth(item?.information, widthColLeft),
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
                    <p className="card-text text-danger fs-5 fw-bold">{convertToVND(item.price)}</p>

                    {/* {{! Khung chọn màu }} */}
                    {item.colors?.length ? (
                        <>
                            <h6 className="my-2">Chọn màu</h6>
                            <div className="options-color mt-1">
                                {item.colors?.map((color, index) => (
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
                        </>
                    ) : (
                        <></>
                    )}

                    {/* {{! Khung khuyến mãi }} */}
                    {item.promotion?.length ? (
                        <div className="promotion border border-danger-subtle rounded-3 mt-2">
                            <div className="py-2 ps-2 fw-700 text-danger bg-danger-subtle">
                                <FontAwesomeIcon icon={faGift} style={{ color: '#d70018' }} />
                                <span className="ms-2">Khuyến mãi</span>
                            </div>
                            <div className="p-2">
                                {item.promotion?.map((promotion, i) => (
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
                    ) : (
                        <></>
                    )}

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
                                    onClick={handleAddItemsToCart}
                                >
                                    <FontAwesomeIcon className="mt-1 fs-5" icon={faCartPlus} />

                                    <p className="mt-1 fs-12 mb-0"> Thêm vào giỏ</p>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    {item.technical_infos?.length ? (
                        <div className="mt-4 d-flex flex-column ">
                            <div className="fs-4 fw-medium">Cấu hình Điện thoại {item.name}</div>
                            <div className="mt-2">
                                <TechnicalCommonItem item={item} />
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
                    ) : (
                        <></>
                    )}
                </Col>
                {isTablet && (
                    <div
                        className="more-info mt-4 p-3 shadow border rounded-3 overflow-hidden"
                        style={{ width: widthColLeft, ...(!showMoreDetail ? { height: 300 } : {}) }}
                    >
                        <div className="fs-4 fw-medium mb-3">Thông tin sản phẩm</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: setImgWidth(item?.information, widthColLeft - 24),
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
            <DialogTechnicalItem
                item={item}
                open={openDialogTechnical}
                setOpen={setOpenDialogTechnical}
            />
        </Container>
    );
}

export default LayoutDetailItem;
