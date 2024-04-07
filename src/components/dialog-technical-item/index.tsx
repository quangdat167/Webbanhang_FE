import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TechnicalCommonItem from 'components/technical-common-item';
import { IItem } from 'utils/interface';
import './style.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DialogTechnicalItem({
    open,
    setOpen,
    item,
}: {
    open: boolean;
    setOpen: Function;
    item: IItem;
}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="digalog-technical-phone"
                open={open}
                className="dialog-technical-item"
                style={{ width: '100%' }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="digalog-technical-title">
                    Thông số kỹ thuật
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
                    <TechnicalCommonItem item={item} />
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}
