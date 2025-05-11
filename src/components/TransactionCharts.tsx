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
  ReferenceLine,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "styled-components";
import { useTransaction } from "@/hooks/useTransaction";
import { Transaction } from "@/hooks/useGlobalFilter";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CustomBalanceTooltip from "./CustomBalanceTooltip";
import CustomTransactionTooltip from "./CustomTransactionTooltip";

const CardContainer = styled(Box)`
  background-color: #193895;
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
`;
interface TransactionsChartProps {
  data: Transaction[];
}

export default function TransactionCharts({ data }: TransactionsChartProps) {
  const theme = useTheme();
  const { getMonthlyTransactions, getMonthlyBalance } = useTransaction();
  const barChartData = getMonthlyTransactions(data);
  const balanceLineData = getMonthlyBalance(data);

  const formatNumberK = (value: number) => {
    const absValue = Math.abs(value);
    const formatted =
      absValue >= 1000
        ? `${(absValue / 1000).toFixed(0)}k`
        : absValue.toString();
    return value < 0 ? `-${formatted}` : formatted;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="calc(100vh - 5rem)"
      gap="1rem"
    >
      <CardContainer sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={"1rem"}
        >
          <Typography variant="h6" gutterBottom>
            Transações
          </Typography>
          <CompareArrowsIcon />
        </Box>
        <Box flex={1}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis dataKey="month" stroke="#fff" fontSize={"12px"} />
              <YAxis stroke="#fff" tickFormatter={formatNumberK} />
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
              <Tooltip content={<CustomTransactionTooltip />} />
              <Legend
                formatter={(value: string) => {
                  if (value === "deposit") return "Depósito";
                  if (value === "withdraw") return "Saque";
                  return value;
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContainer>

      <CardContainer sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={"1rem"}
        >
          <Typography variant="h6" gutterBottom>
            Saldo Total
          </Typography>
          <AccountBalanceIcon />
        </Box>
        <Box flex={1}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" stroke="#fff" fontSize={"12px"} />
              <YAxis stroke="#fff" tickFormatter={formatNumberK} />
              <ReferenceLine
                y={0}
                stroke={theme.palette.error.main}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke={"white"}
                dot={({ cx, cy, payload }) => {
                  const isNegative = payload.balance < 0;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      stroke={
                        isNegative
                          ? theme.palette.error.main
                          : theme.palette.success.main
                      }
                      strokeWidth={2}
                      fill="#fff"
                    />
                  );
                }}
              />
              <Tooltip content={<CustomBalanceTooltip />} />
              <Legend
                formatter={(value: string) => {
                  if (value === "balance") return "Balanço";
                  return value;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContainer>
    </Box>
  );
}
