import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { DetailOfTechnicalInfo, IItem } from 'utils/interface';

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

export default function TechnicalCommonItem({ item }: { item: IItem }) {
    return (
        item && (
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                        <TableBody>
                            {item.technical_infos?.map((detail: DetailOfTechnicalInfo, i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell component="th" scope="row">
                                        {detail.title}:
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{detail.infos}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    );
}
