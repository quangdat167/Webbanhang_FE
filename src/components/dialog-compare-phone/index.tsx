import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPhonesApi } from 'service/phone.service';
import { IPhone } from 'utils/interface';
import './style.scss';
import { RootState } from 'redux/store';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name: string, calories: string, fat: string) {
    return { name, calories, fat };
}

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DialogComparePhone({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: Function;
}) {
    const dispatch = useDispatch();
    const compareState = useSelector((state: RootState) => state.compareState);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [phone1, setPhone1] = useState({} as IPhone);
    const [phone2, setPhone2] = useState({} as IPhone);

    useEffect(() => {
        if (compareState) {
            setPhone1(compareState.phone1);
            setPhone2(compareState.phone2);
        }
    }, [compareState]);

    const [rows, setRows] = useState<any>([]);

    useEffect(() => {
        if (phone1?._id && phone2?._id) {
            setRows([
                createData('Thương hiệu', phone1.brand, phone2.brand),
                createData(
                    'Kích thước màn hình',
                    phone1.specifications[0],
                    phone2.specifications[0],
                ),
                createData(
                    'Công nghệ màn hình',
                    phone1.screen_technology,
                    phone2.screen_technology,
                ),
                createData('Tần số quét', phone1.scanning_frequency, phone2.scanning_frequency),
                createData('Kiểu màn hình', phone1.display_type, phone2.display_type),
                createData('Chipset', phone1.chipset, phone2.chipset),
                createData('Loại CPU', phone1.cpu, phone2.cpu),
                createData('GPU', phone1.gpu, phone2.gpu),
                createData('Dung lượng RAM', phone1.specifications[1], phone2.specifications[1]),
                createData('Bộ nhớ trong', phone1.specifications[2], phone2.specifications[2]),
                createData('Khe cắm thẻ nhớ', phone1.memory_card, phone2.memory_card),
                createData('Pin', phone1.batery, phone2.batery),
                createData('Cổng sạc', phone1.charging_port, phone2.charging_port),
                createData('Thẻ SIM', phone1.sim, phone2.sim),
                createData('Hệ điều hành', phone1.operating_system, phone2.operating_system),
                createData('Công nghệ NFC', phone1.nfc, phone2.nfc),
                createData('Bluetooth', phone1.bluetooth, phone2.bluetooth),
                createData('Kích thước', phone1.size, phone2.size),
                createData('Trọng lượng', phone1.weight, phone2.weight),
                createData('Thời điểm ra mắt', phone1.time_release, phone2.time_release),
            ]);
        } else {
            // handleClose();
            // setRows([]);
        }
    }, [phone1, phone2, open]);

    return (
        phone1 &&
        phone2 && (
            <>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    className="dialog-compare-phone"
                    style={{ width: '100%' }}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        So sánh chi tiết
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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 1200 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell align="left" width={400}>
                                            {phone1.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" width={400}>
                                            {phone2.name}
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.length &&
                                        rows?.map((row: any) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.calories}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.fat}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
                </BootstrapDialog>
            </>
        )
    );
}
