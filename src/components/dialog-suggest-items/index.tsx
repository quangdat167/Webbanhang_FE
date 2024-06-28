import CloseIcon from '@mui/icons-material/Close';
// import Button from '@mui/material/Button';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { convertToVND } from 'utils';
import { IProductItem } from 'utils/interface';
import './style.scss';
import { pushSnackbar } from 'redux/reducer/snackbar';
import { addToCartApi } from 'service/cart.service';
import { RootState } from 'redux/store';
import DialogActions from '@mui/material/DialogActions';
import { addToPurchase } from 'pages/Cart/purchaseSlice';
import RouteConfig from 'routes/Route';
import { Link } from 'react-router-dom';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export const MODESUGGEST = {
    BUY: 'buy',
    CART: 'cart',
};

export default function DialogSuggestItems({
    open,
    setOpen,
    items,
    mode,
}: {
    open: boolean;
    setOpen: Function;
    items: IProductItem[];
    mode: string;
}) {
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const purchaseState = useSelector((state: RootState) => state.purchaseState);

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        dispatch(addToPurchase([]));
    };

    const handleAddItemsToCart = async ({ product }: { product: IProductItem }) => {
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
    };

    const handleAddItemsToPurschase = async ({ product }: { product: IProductItem }) => {
        dispatch(
            addToPurchase([
                ...purchaseState,
                {
                    productId: product._id,
                    quantity: 1,
                    productInfo: product,
                },
            ]),
        );
    };

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className="dialog-search-phone"
                style={{ width: '100%' }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Lựa chọn phụ kiện mua kèm
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'white',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Row className="g-2 center" xs={2} sm={2} md={3} xl={4} xxl={5}>
                        {items.map((itemDetail: IProductItem) => (
                            <Col key={itemDetail._id} style={{ minWidth: 170, maxWidth: 280 }}>
                                <Card
                                    className={
                                        'h-100 shadow rounded-3 ' +
                                        (purchaseState?.find(
                                            (item) => item.productId === itemDetail._id,
                                        ) && mode === MODESUGGEST.BUY
                                            ? ' border-danger'
                                            : '')
                                    }
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
                                                variant={
                                                    purchaseState?.find(
                                                        (item) => item.productId === itemDetail._id,
                                                    ) && mode === MODESUGGEST.BUY
                                                        ? 'danger'
                                                        : 'outline-danger'
                                                }
                                                className=" w-100 h-100 center gap-2 "
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    mode === MODESUGGEST.CART
                                                        ? handleAddItemsToCart({
                                                              product: itemDetail,
                                                          })
                                                        : handleAddItemsToPurschase({
                                                              product: itemDetail,
                                                          });
                                                }}
                                            >
                                                {mode === MODESUGGEST.CART ? (
                                                    <FontAwesomeIcon
                                                        className="mt-1 fs-5"
                                                        icon={faCartPlus}
                                                    />
                                                ) : (
                                                    <></>
                                                )}

                                                <p className="mt-1 fs-12 mb-0">
                                                    {' '}
                                                    {mode === MODESUGGEST.CART
                                                        ? ' Thêm vào giỏ'
                                                        : purchaseState.find(
                                                              (item) =>
                                                                  item.productId === itemDetail._id,
                                                          )
                                                        ? 'Đã chọn'
                                                        : 'Chọn sản phẩm'}
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
                            </Col>
                        ))}
                    </Row>
                </DialogContent>
                {mode === MODESUGGEST.BUY ? (
                    <DialogActions>
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Link to={RouteConfig.CONFIRM_INFO}>
                            <Button variant="primary">Xác nhận</Button>
                        </Link>
                    </DialogActions>
                ) : (
                    <></>
                )}
            </BootstrapDialog>
        </>
    );
}
