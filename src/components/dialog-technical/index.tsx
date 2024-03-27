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
import useMediaQuery from '@mui/material/useMediaQuery';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '.header': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DialogTechnicalPhone({
    open,
    setOpen,
    phone,
}: {
    open: boolean;
    setOpen: Function;
    phone: IPhone;
}) {
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const handleClose = () => {
        setOpen(false);
    };

    return (
        phone && (
            <>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="digalog-technical-phone"
                    open={open}
                    className="dialog-technical-phone"
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
                        <TableContainer component={Paper}>
                            <Table
                                stickyHeader
                                sx={isTablet ? {} : { minWidth: '700px' }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <StyledTableCell align="center" colSpan={2} className="fs-4">
                                        {phone.name}
                                    </StyledTableCell>
                                </TableHead>
                                <TableBody>
                                    {phone.technical_infos?.map((info, i) => (
                                        <>
                                            <StyledTableRow key={i}>
                                                <StyledTableCell
                                                    colSpan={2}
                                                    className="header fs-5 fw-medium px-2"
                                                >
                                                    {info.name}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            {info.details.map((detail, index) => (
                                                <StyledTableRow key={i + index}>
                                                    <StyledTableCell width={'30%'}>
                                                        {detail.title}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
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
                                                </StyledTableRow>
                                            ))}
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
