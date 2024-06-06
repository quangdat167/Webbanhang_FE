import { useEffect, useState } from 'react';
import { applyApriori, applyFPGrowth, getAllFrequentProdApi } from 'service/frequent.service';
// import { getAllPhonesApi } from 'service/phone.service';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { convertToVND, getMinPrice } from 'utils';
import { IFrequentProducts } from 'utils/interface';

const ManageFrequentProduct = () => {
    const [frequentProducts, setFrequentProducts] = useState<IFrequentProducts[]>([]);
    useEffect(() => {
        const getPhones = async () => {
            const result = await getAllFrequentProdApi({});
            setFrequentProducts(result);
        };
        getPhones();
    }, []);

    const handleApplyFpGrowth = async () => {
        const result = await applyFPGrowth({});
        if (result.length) {
            // result.sort((a, b) => a.productInfo.type - b.productInfo.type);
            setFrequentProducts(result);
        }
    };
    const handleApplyApriori = async () => {
        const result = await applyApriori({});
        if (result.length) {
            setFrequentProducts(result);
        }
    };
    return (
        <>
            <div className="center gap-3 ">
                <Button
                    onClick={() => {
                        handleApplyFpGrowth();
                    }}
                >
                    Áp dụng thuật toán FPGrowth
                </Button>
                <Button
                    variant="warning"
                    onClick={() => {
                        handleApplyApriori();
                    }}
                >
                    Áp dụng thuật toán Apriori
                </Button>
            </div>
            {frequentProducts.map((frequentProduct, index) => (
                <div className="mt-3 p-3 border border-rounded rounded-2">
                    <div>
                        <div className="fs-5 fw-medium">Sản phẩm</div>
                        <Card
                            className="mt-1 h-100 shadow rounded-3"
                            style={{ cursor: 'pointer', width: 250 }}
                            onClick={() => {
                                window.open(
                                    `/${frequentProduct.productInfo?.type}/${frequentProduct.productInfo?.slug}`,
                                    '_blank',
                                );
                            }}
                        >
                            <div className="text-center mt-2">
                                <div className="center">
                                    <Card.Img
                                        src={frequentProduct.productInfo?.colors[0].img}
                                        alt={frequentProduct.productInfo?.name}
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
                                            height: '3rem',
                                            color: '#444',
                                        }}
                                    >
                                        {frequentProduct.productInfo?.name}
                                    </Card.Title>

                                    <Card.Text className="mt-2 text-danger fs-5 fw-bold">
                                        {getMinPrice(frequentProduct.productInfo)}
                                    </Card.Text>
                                </Card.Body>
                                {/* <Card.Footer> */}
                            </div>
                        </Card>
                    </div>

                    <div className="mt-3">
                        <div className="fs-6 fw-medium">Sản phẩm mua kèm</div>
                        <Row className="mt-1 g-2" xs={2} md={3} lg={4} xl={5}>
                            {frequentProduct?.frequentItems.map((frequentItem, index) => {
                                const itemDetail = frequentItem.itemDetails;
                                return (
                                    <Col key={index} style={{ minWidth: 170, maxWidth: 280 }}>
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
                                            </div>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ManageFrequentProduct;
