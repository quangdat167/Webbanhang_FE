import { IPhone } from 'utils/interface';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import DialogSearchPhone from 'components/dialog-search-phone';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';

function ItemCompare({
    phone,
    action,
    enableClose = true,
}: {
    phone?: IPhone;
    action: any;
    enableClose?: boolean;
}) {
    const dispatch = useDispatch();
    const [openDialogSearchPhone, setOpenDialogSearchPhone] = useState(false);
    const handleAddComparePhone = () => {
        setOpenDialogSearchPhone(true);
    };
    return phone ? (
        <div className="item-compare">
            <>
                <img src={phone?.colors[0].img} alt="phone" width={50} />
                <div>{phone?.name}</div>
                {enableClose && (
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            action && dispatch(action({}));
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
                )}
            </>
        </div>
    ) : (
        <>
            <div className="item-compare" onClick={handleAddComparePhone}>
                <div>
                    <AddIcon />
                </div>
                <div>Thêm sản phẩm</div>
            </div>
            <DialogSearchPhone open={openDialogSearchPhone} setOpen={setOpenDialogSearchPhone} />
        </>
    );
}

export default ItemCompare;
