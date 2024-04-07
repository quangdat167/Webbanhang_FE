import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeComparePhone2 } from 'redux/reducer/compare';
import { getAllPhonesApi } from 'service/product.service';
import { getMinPrice } from 'utils';
import { IPhone } from 'utils/interface';
import './style.scss';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DialogSearchPhone({ open, setOpen }: { open: boolean; setOpen: Function }) {
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const [phones, setPhones] = useState<IPhone[]>([]);
    useEffect(() => {
        const getPhones = async () => {
            const result = await getAllPhonesApi();
            setPhones(result);
        };
        getPhones();
    }, []);

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
                    Tìm sản phẩm để so sánh
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
                    <Row className="g-2" xs={2} sm={2} md={3} xl={4} xxl={5}>
                        {phones.map((phone: IPhone) => (
                            <Col key={phone._id} style={{ minWidth: 170, maxWidth: 280 }}>
                                <Card className="h-100 shadow rounded-4">
                                    <div className="text-center mt-3">
                                        <Card.Img
                                            src={phone.colors[0].img}
                                            style={
                                                isTablet
                                                    ? { width: 120, height: 120 }
                                                    : { width: 160, height: 160 }
                                            }
                                            alt={phone.name}
                                        />
                                    </div>
                                    <Card.Body style={{ minHeight: '10rem' }}>
                                        <Card.Title
                                            className="fs-6 fw-bold"
                                            style={{ height: '3rem', color: '#444' }}
                                        >
                                            {phone.name}
                                        </Card.Title>

                                        <Card.Text className="text-danger fs-5 fw-bold">
                                            {getMinPrice(phone)}
                                        </Card.Text>

                                        <div className="w-100 d-flex justify-content-center">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    dispatch(changeComparePhone2(phone));
                                                    handleClose();
                                                }}
                                                className="center"
                                            >
                                                <AddIcon />
                                                Chọn để so sánh
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </BootstrapDialog>
        </>
    );
}
