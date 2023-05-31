import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import * as getPhonesService from 'service/getPhonesService';

const cx = classNames.bind(styles);
interface PriceObject {
    type: string;
    price: string;
}

interface ColorObject {
    color: string;
    img: string;
}
interface Phone {
    _id: string;
    brand: string;
    name: string;
    prices: PriceObject[];
    specifications: string[];
    images: string[];
    promotion: String;
    colors: ColorObject[];
    createdAt: Date;
    updatedAt: Date;
    slug: string;
}

function Home() {
    const [phones, setPhones] = useState<Phone[]>([]);
    useEffect(() => {
        const getPhones = async () => {
            const result: Phone[] = await getPhonesService.getAllPhones();
            if (result) setPhones(result);
        };
        getPhones();
    }, []);

    return (
        <Container className="mt-4">
            <Row className="g-2 " sm={2} md={3} lg={4} xl={5}>
                {phones.map((phone: Phone) => (
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
                                        className="p-2 bg-body-secondary border border-secondary-subtle rounded-2 small"
                                        style={{ color: '#444' }}
                                    >
                                        {phone.promotion}
                                    </p>
                                </Card.Body>
                            </Link>
                            <Card.Footer className=" text-center">
                                <Link to={`/phones/${phone._id}/edit`} className="btn btn-primary ">
                                    Thêm vào giỏ hàng
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
