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
import { styled } from "@mui/system";
import { formatDate } from "@/utils/formatDate";

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

const translate = {
  deposit: "Depósito",
  withdraw: "Saque",
  USD: "Dólar",
  BRL: "Real",
  EUR: "Euro",
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function TransactionsTable({ data }: TransactionsTableProps) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 9;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const translateTerm = (term: string) => {
    return translate[term.toLowerCase() as keyof typeof translate] || term;
  };

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
              <StyledTableRow key={idx}>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>
                  {Number(item.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: item.currency.toUpperCase(),
                  })}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      item.transaction_type.toLowerCase() === "deposit"
                        ? "success.main"
                        : item.transaction_type.toLowerCase() === "withdraw"
                        ? "error.main"
                        : "inherit",
                  }}
                >
                  {translateTerm(item.transaction_type)}
                </TableCell>
                <TableCell>{translateTerm(item.currency.toUpperCase())}</TableCell>
                <TableCell>{item.account}</TableCell>
                <TableCell>{translateTerm(item.industry)}</TableCell>
                <TableCell>{translateTerm(item.state)}</TableCell>
              </StyledTableRow>
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
