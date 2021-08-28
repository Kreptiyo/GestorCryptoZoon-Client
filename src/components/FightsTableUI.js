import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import moment from 'moment';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    TableFooter
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 160px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.warning.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),

    },
    result: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));
let FIGHTS = [];
axios.get('https://gestor-cryptozoon.herokuapp.com/api/fights')
    .then(res => {
        for (const dataObj of res.data) {
            FIGHTS.push(dataObj);
        }
    })

function FightsTableUI() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(12);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>Date</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Zoan ID</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Zoon</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Exp</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Result</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Fee</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Monster</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {FIGHTS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>
                                {moment(row.date).format('LL')}
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">{row.zoan_id}</Typography>
                            </TableCell>
                            <TableCell>
                                {row.zoon.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                {row.exp.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <Typography
                                    className={classes.result}
                                    style={{
                                        backgroundColor:
                                            ((row.result === 'Victory' && 'green') ||
                                                (row.result === 'Defeat' && 'red'))
                                    }}
                                >{row.result}</Typography>
                            </TableCell>
                            <TableCell>
                                {row.fee.toFixed(5)} BNB
                            </TableCell>
                            <TableCell>
                                {row.monster}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[12, 24, 36]}
                            count={FIGHTS.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default FightsTableUI;