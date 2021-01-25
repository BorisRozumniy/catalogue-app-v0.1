import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper'
import { Card } from '../components/Card'
import { IProduct } from '../../types';

interface IProps {
  products: IProduct[]
}

interface Column {
  name: 'img' | 'title' | 'description' | 'price' | 'numberDaysUntilEndDiscount';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { name: 'title', label: 'Title', minWidth: 100 },
  { name: 'description', label: 'Description', minWidth: 170 },
  {
    name: 'price',
    label: 'Price\u00a0($)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    name: 'numberDaysUntilEndDiscount',
    label: 'Discount',
    minWidth: 70,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({ products }: IProps) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [cards, setCards] = useState(products)
  useEffect(() => {
    setCards(products)
  }, [products])

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [cards],
  )

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.name}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <DndProvider backend={HTML5Backend}>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                console.log(row)
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <Card id={row._id} index={index} moveCard={moveCard}>
                      {columns.map((column) => {
                        const value = row[column.name];
                        return (
                          <TableCell key={column.name} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </Card >
                  </TableRow>
                );
              })}
            </DndProvider>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
