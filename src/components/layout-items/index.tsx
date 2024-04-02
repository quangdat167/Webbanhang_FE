import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SortBy from 'components/sort-by';
import { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateItemsHome } from 'redux/reducer/home';
import { RootState } from 'redux/store';
import RouteConfig from 'routes/Route';
import { convertToVND, scrollToTop } from 'utils';
import { IItem } from 'utils/interface';

function LayoutItems({ getItemFunc }: { getItemFunc: Function }) {
    const dispatch = useDispatch();
    const itemState = useSelector((state: RootState) => state.homeState?.items);
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);
    const offsetState = useSelector((state: RootState) => state.homeState?.offset);
    const totalRemainingState = useSelector((state: RootState) => state.homeState?.totalRemaining);

    useEffect(() => {
        getItemFunc().then((result: any) => {
            if (result) {
                dispatch(
                    updateItemsHome({
                        items: result.data,
                        totalRemaining: result.totalRemaining,
                    }),
                );
            }
        });

        return () => {
            scrollToTop(false);
        };
    }, [dispatch, getItemFunc, sortbyState]);

    return (
        <Container className="mt-4">
            <SortBy />
            <Row className="g-2" xs={2} md={3} lg={4} xl={5}>
                {itemState?.length ? (
                    itemState?.map((item: IItem, i) => {
                        return (
                            <Col key={item._id} style={{ minWidth: 170, maxWidth: 280 }}>
                                <Card className="h-100 shadow rounded-3">
                                    <div className="text-center" style={{ minHeight: '5rem' }}>
                                        <Link to={`${RouteConfig.BACKUPCHARGER}/${item.slug}`}>
                                            <Card.Img
                                                src={item?.image}
                                                className={'pt-4 px-2'}
                                                style={{ objectFit: 'cover' }}
                                                alt={item.name}
                                            />
                                        </Link>
                                    </div>
                                    <Link to={`/backups/${item.slug}`}>
                                        <Card.Body style={{ minHeight: '10rem' }}>
                                            <Card.Title
                                                className="fs-6 fw-bold"
                                                style={{ minHeight: '2rem', color: '#444' }}
                                            >
                                                {item.name}
                                            </Card.Title>
                                            {/* <div className="mt-1 d-flex flex-row gap-2 flex-wrap">
					{item.specifications.map((specification, index) => (
					    <span
						key={index}
						className={
						    'specifications ' +
						    'badge rounded text-bg-light fw-normal border border-dark-subtle'
						}
					    >
						{specification}
					    </span>
					))}
				    </div> */}
                                            <Card.Text className="pt-2 pb-4 text-danger fs-5 fw-bold">
                                                {convertToVND(item.price)}
                                            </Card.Text>
                                            {/* {item.promotion?.length && (
					<p
					    className="mb-5 p-2 bg-body-secondary border border-secondary-subtle rounded-2 small"
					    style={{ color: '#444' }}
					>
					    {item.promotion[0]}
					</p>
				    )} */}
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
                                </Card>
                            </Col>
                        );
                    })
                ) : (
                    <>
                        <div className="h3 w-100 center">Không tìm thấy sản phẩm nào</div>
                    </>
                )}
            </Row>
            {totalRemainingState > 0 && (
                <div className="pt-5 center ">
                    <Button
                        onClick={() => {
                            getItemFunc(offsetState + 1).then((result: any) => {
                                if (result) {
                                    dispatch(
                                        updateItemsHome({
                                            items: [...itemState, ...result.data],
                                            totalRemaining: result.totalRemaining,
                                            offset: offsetState + 1,
                                        }),
                                    );
                                }
                            });
                        }}
                        variant="outline-light"
                        className={`hover-primary center fs-14 px-2 py-2 mb-4 border border-secondary-subtle text-dark shadow-lg`}
                        style={{ width: '25%' }}
                    >
                        <div>Xem thêm {totalRemainingState} sản phẩm</div>
                        <KeyboardArrowDownIcon className="ms-2" />
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default LayoutItems;
