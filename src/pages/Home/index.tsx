import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterPhone from 'components/filter-phone';
import SortBy from 'components/sort-by';
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePhoneHome } from 'redux/reducer/home';
import { RootState } from 'redux/store';
import { getAllPhonesApi } from 'service/phone.service';
import { getMinPrice, scrollToTop } from 'utils';
import { IPhone } from 'utils/interface';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const homeState = useSelector((state: RootState) => state.homeState);
    useEffect(() => {
        return () => {
            const getPhones = async () => {
                const result = await getAllPhonesApi();
                dispatch(updatePhoneHome(result));
            };
            // getPhones();
            scrollToTop();
        };
    }, []);
    return (
        <Container className="mt-4">
            <FilterPhone />
            <SortBy />
            <Row className="g-2" xs={2} md={3} lg={4} xl={5}>
                {homeState?.phones.length ? (
                    homeState?.phones?.map((phone: IPhone) => (
                        <Col key={phone._id} style={{ minWidth: 170, maxWidth: 280 }}>
                            <Card className="h-100 shadow rounded-3">
                                <div className="text-center mt-2">
                                    <Link to={`/phones/${phone.slug}`}>
                                        {phone.colors[0]?.img && (
                                            <Card.Img
                                                src={phone?.colors[0]?.img}
                                                className={cx('card-img-top')}
                                                alt={phone.name}
                                            />
                                        )}
                                    </Link>
                                </div>
                                <Link to={`/phones/${phone.slug}`}>
                                    <Card.Body style={{ minHeight: '18rem' }}>
                                        <Card.Title
                                            className="fs-6 fw-bold"
                                            style={{ height: '3rem', color: '#444' }}
                                        >
                                            {phone.name}
                                        </Card.Title>
                                        <div className="mt-1 d-flex flex-row gap-2 flex-wrap">
                                            {phone.specifications.map((specification, index) => (
                                                <span
                                                    key={index}
                                                    className={cx(
                                                        'specifications',
                                                        'badge rounded text-bg-light fw-normal border border-dark-subtle',
                                                    )}
                                                >
                                                    {specification}
                                                </span>
                                            ))}
                                        </div>
                                        <Card.Text className="mt-2 text-danger fs-5 fw-bold">
                                            {getMinPrice(phone)}
                                        </Card.Text>
                                        {phone.promotion?.length && (
                                            <p
                                                className="mb-5 p-2 bg-body-secondary border border-secondary-subtle rounded-2 small"
                                                style={{ color: '#444' }}
                                            >
                                                {phone.promotion[0]}
                                            </p>
                                        )}
                                    </Card.Body>
                                </Link>

                                <div className="position-absolute end-5 bottom-3 v-center text-dark">
                                    <small className="me-1">Yêu thích</small>
                                    <FontAwesomeIcon
                                        className="text-danger"
                                        size="lg"
                                        icon={faHeart}
                                    />
                                </div>
                                {/* <Card.Footer className=" text-center">
                                <Link to={`/phones/${phone._id}/edit`} className="btn btn-primary ">
                                    Thêm vào giỏ hàng
                                </Link>
                            </Card.Footer> */}
                            </Card>
                        </Col>
                    ))
                ) : (
                    <>
                        <div className="h3 w-100 center">Không tìm thấy sản phẩm nào</div>
                    </>
                )}
            </Row>
        </Container>
    );
}

export default Home;
