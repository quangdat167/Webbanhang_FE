import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getInfosByTitle } from 'utils';
import { IPhone } from 'utils/interface';

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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name: string, info: string) {
    return { name, info };
}

export default function TechnicalCommonPhone({ phone }: { phone: IPhone }) {
    const [rows, setRows] = useState<any>([]);

    useEffect(() => {
        if (phone) {
            setRows([
                createData('Màn hình:', getInfosByTitle(phone, 'Công nghệ màn hình')[0]),
                createData('Hệ điều hành:', getInfosByTitle(phone, 'Hệ điều hành')[0]),
                createData('Camera sau:', getInfosByTitle(phone, 'Độ phân giải', 'Camera sau')[0]),
                createData(
                    'Camera trước:',
                    getInfosByTitle(phone, 'Độ phân giải', 'Camera trước')[0],
                ),
                createData('Chip:', getInfosByTitle(phone, 'Chip xử lý (CPU)')[0]),
                createData('RAM:', getInfosByTitle(phone, 'RAM')[0]),
                createData('Dung lượng lưu trữ:', getInfosByTitle(phone, 'Dung lượng lưu trữ')[0]),
                createData('SIM:', getInfosByTitle(phone, 'SIM')[0]),
                createData(
                    'Pin, Sạc:',
                    `${getInfosByTitle(phone, 'Dung lượng pin')[0]}, ${
                        getInfosByTitle(phone, 'Hỗ trợ sạc tối đa')[0]
                    }`,
                ),
                createData('Hãng', getInfosByTitle(phone, 'Hãng')[0]),
            ]);
        } else {
        }
    }, [phone]);

    return (
        phone && (
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                        <TableBody>
                            {rows.length &&
                                rows?.map((row: any) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row.info}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    );
}
