// import Button from '@mui/material/Button';
import { Button } from 'react-bootstrap';
import ItemCompare from './ItemCompare';
import CloseIcon from '@mui/icons-material/Close';
import './style.scss';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { changeComparePhone1, changeComparePhone2, openCompare } from 'redux/reducer/compare';
import { RootState } from 'redux/store';
import DialogComparePhone from 'components/dialog-compare-phone';
import { useEffect, useState } from 'react';

function ComparePhone() {
    const dispatch = useDispatch();
    const compareState = useSelector((state: RootState) => state.compareState);

    const [openDialogComparePhone, setOpenDialogComparePhone] = useState(false);
    const [selectedPhone, setSelectedPhone] = useState(0);

    useEffect(() => {
        if (compareState?.phone1?._id && compareState?.phone2?._id) {
            setSelectedPhone(2);
        } else if (compareState?.phone1?._id || compareState?.phone2?._id) {
            setSelectedPhone(1);
        } else {
            setSelectedPhone(0);
        }
    }, [compareState]);

    return (
        <div className="compare-phone-wrapper">
            <ItemCompare
                phone={compareState?.phone1?._id ? compareState?.phone1 : undefined}
                action={changeComparePhone1}
            />
            <ItemCompare
                phone={compareState?.phone2?._id ? compareState?.phone2 : undefined}
                action={changeComparePhone2}
            />
            <div className="item-compare">
                <div>Đã chọn {selectedPhone} sản phẩm</div>
                <Button
                    variant="outline-danger"
                    color="error"
                    onClick={() => {
                        setOpenDialogComparePhone(true);
                    }}
                >
                    So sánh ngay
                </Button>

                <IconButton
                    aria-label="close"
                    onClick={() => {
                        dispatch(openCompare(false));
                    }}
                    sx={{
                        position: 'absolute',
                        right: 4,
                        top: 4,
                        // color: 'white',
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
            {openDialogComparePhone && (
                <DialogComparePhone
                    open={openDialogComparePhone}
                    setOpen={setOpenDialogComparePhone}
                />
            )}
        </div>
    );
}

export default ComparePhone;
