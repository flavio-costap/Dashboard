"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "styled-components";
import { useTransaction } from "@/hooks/useTransaction";
import { useEffect } from "react";
import { Transaction } from "@/hooks/useGlobalFilter";

// Estilização do card
const CardContainer = styled(Box)`
  background-color: #193895;
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
`;
interface TransactionsTableProps {
  data: Transaction[];
}

export default function TransactionCharts({ data }: TransactionsTableProps) {
  const theme = useTheme();
  const { getMonthlyTransactions, setTransactions, getMonthlyBalance } = useTransaction();

  useEffect(() => setTransactions(data), [data, setTransactions]);

  const barChartData = getMonthlyTransactions();
  const balanceLineData = getMonthlyBalance();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="calc(100vh - 8rem)"
      gap="1rem"
    >
      <CardContainer sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" gutterBottom>
          Transações dos últimos meses
        </Typography>
        <Box flex={1}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="deposit"
                stackId="a"
                fill={theme.palette.success.main}
              />
              <Bar
                dataKey="withdraw"
                stackId="a"
                fill={theme.palette.error.main}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContainer>

      <CardContainer sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" gutterBottom>
          Balanço dos últimos meses
        </Typography>
        <Box flex={1}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="balance"
                stroke={theme.palette.success.main}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContainer>
    </Box>
  );
}