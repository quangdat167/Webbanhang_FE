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
import { RootState } from 'redux/store';
import { getInfosByTitle } from 'utils';
import { IPhone } from 'utils/interface';
import './style.scss';

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
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '.header': {
        backgroundColor: theme.palette.action.hover,
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
    const compareState = useSelector((state: RootState) => state.compareState);

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
                            <Table sx={{}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell width={'20%'}></StyledTableCell>
                                        <StyledTableCell align="left" width={'35%'}>
                                            {phone1.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" width={'35%'}>
                                            {phone2.name}
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {phone1.technical_infos?.map((info, i) => (
                                        <>
                                            <StyledTableRow>
                                                <StyledTableCell
                                                    colSpan={3}
                                                    className="header fs-5 fw-medium px-2"
                                                >
                                                    {info.name}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            {info?.details?.map((detail, index) => {
                                                const detailPhone2 = getInfosByTitle(
                                                    phone2,
                                                    detail.title,
                                                );
                                                return (
                                                    <StyledTableRow key={index}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {detail.title}
                                                        </StyledTableCell>
                                                        <StyledTableCell
                                                            align="left"
                                                            style={{ width: '35%' }}
                                                        >
                                                            {detail.infos.length > 1 ? (
                                                                <ul className="px-3 mb-0">
                                                                    {detail.infos.map((info, i) => (
                                                                        <li key={i}>{info}</li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <>{detail.infos[0]}</>
                                                            )}
                                                        </StyledTableCell>
                                                        {}
                                                        <StyledTableCell align="left">
                                                            {detailPhone2.length > 1 ? (
                                                                <ul className="px-3 mb-0">
                                                                    {detail.infos.map((info, i) => (
                                                                        <li key={i}>{info}</li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <>{detailPhone2[0]}</>
                                                            )}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                );
                                            })}
                                        </>
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
