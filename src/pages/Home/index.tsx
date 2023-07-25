import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { phoneProps } from 'utils/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import Url from 'utils/url';

const cx = classNames.bind(styles);

function Home() {
    const [phones, setPhones] = useState<phoneProps[]>([]);
    useEffect(() => {
        const getPhones = async () => {
            try {
                const result = await axios.get(Url(`phones`));
                setPhones(result.data);
            } catch (error: any) {
                console.log(error);
                alert(error.response.data.message);
            }
        };
        getPhones();
    }, []);
    return (
        <Container className="mt-4">
            <Row className="g-2" xs={2} sm={2} md={3} lg={4} xl={5}>
                {phones.map((phone: phoneProps) => (
                    <Col key={phone._id} style={{ minWidth: 170, maxWidth: 280 }}>
                        <Card className="h-100 shadow rounded-4">
                            <div className="text-center">
                                <Link to={`/phones/${phone.slug}`}>
                                    <Card.Img
                                        src={phone.images[0]}
                                        className={cx('card-img-top')}
                                        alt={phone.name}
                                    />
                                </Link>
                            </div>
                            <Link to={`/phones/${phone.slug}`}>
                                <Card.Body style={{ minHeight: '18rem' }}>
                                    <Card.Title
                                        className="fs-6 fw-bold"
                                        style={{ height: '4rem', color: '#444' }}
                                    >
                                        {phone.name}
                                    </Card.Title>
                                    <div className="mt-1 d-flex flex-row gap-2">
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
                                        {phone.prices[phone.prices.length - 1].price}
                                    </Card.Text>
                                    <p
                                        className="mb-5 p-2 bg-body-secondary border border-secondary-subtle rounded-2 small"
                                        style={{ color: '#444' }}
                                    >
                                        {phone.promotion}
                                    </p>
                                </Card.Body>
                            </Link>

                            <div className="position-absolute end-5 bottom-3 v-center text-dark">
                                <small className="me-1">Yêu thích</small>
                                <FontAwesomeIcon className="text-danger" size="lg" icon={faHeart} />
                            </div>
                            {/* <Card.Footer className=" text-center">
                                <Link to={`/phones/${phone._id}/edit`} className="btn btn-primary ">
                                    Thêm vào giỏ hàng
                                </Link>
                            </Card.Footer> */}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
