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
import { useTheme } from "@mui/material";
import { useTransaction } from "@/hooks/useTransaction";
import { Transaction } from "@/hooks/useGlobalFilter";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CustomBalanceTooltip from "../../Tooltip/CustomBalanceTooltip/CustomBalanceTooltip";
import CustomTransactionTooltip from "../../Tooltip/CustomTransactionTooltip/CustomTransactionTooltip";
import { Card, ChartWrapper, Header, Title, Wrapper } from "./TransactionCharts.styles";
import { formatNumberK } from "@/utils/formatNumberK";

interface TransactionsChartProps {
  data: Transaction[];
}

export default function TransactionCharts({ data }: TransactionsChartProps) {
  const theme = useTheme();
  const { getMonthlyTransactions, getMonthlyBalance } = useTransaction();
  const barChartData = getMonthlyTransactions(data);
  const balanceLineData = getMonthlyBalance(data);

  return (
    <Wrapper>
      <Card>
        <Header>
          <Title>Transações</Title>
          <CompareArrowsIcon />
        </Header>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData.slice(-10)}>
              <XAxis dataKey="month" stroke="#fff" fontSize={12} />
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
        </ChartWrapper>
      </Card>

      <Card>
        <Header>
          <Title>Saldo Total</Title>
          <AccountBalanceIcon />
        </Header>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" stroke="#fff" fontSize={12} />
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
                      key={cx}
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
        </ChartWrapper>
      </Card>
    </Wrapper>
  );
}
