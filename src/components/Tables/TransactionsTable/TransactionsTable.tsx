"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import { StyledTableContainer } from "./TransactionsTable.styles";

export interface Transaction {
  date: number;
  amount: string;
  transaction_type: string;
  currency: string;
  account: string;
  industry: string;
  state: string;
}

interface TransactionsTableProps {
  data: Transaction[];
}

export default function TransactionsTable({ data }: TransactionsTableProps) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 9;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR");
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Data</strong>
              </TableCell>
              <TableCell>
                <strong>Valor</strong>
              </TableCell>
              <TableCell>
                <strong>Tipo</strong>
              </TableCell>
              <TableCell>
                <strong>Moeda</strong>
              </TableCell>
              <TableCell>
                <strong>Conta</strong>
              </TableCell>
              <TableCell>
                <strong>Setor</strong>
              </TableCell>
              <TableCell>
                <strong>Estado</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>
                  {Number(item.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: item.currency.toUpperCase(),
                  })}
                </TableCell>
                <TableCell>{item.transaction_type}</TableCell>
                <TableCell>{item.currency.toUpperCase()}</TableCell>
                <TableCell>{item.account}</TableCell>
                <TableCell>{item.industry}</TableCell>
                <TableCell>{item.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          labelDisplayedRows={({ from, to, count }) =>
            `${from} - ${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
          backIconButtonProps={{
            sx: {
              color: "primary.main",
            },
          }}
          nextIconButtonProps={{
            sx: {
              color: "primary.main",
            },
          }}
        />
      </StyledTableContainer>
    </>
  );
}
