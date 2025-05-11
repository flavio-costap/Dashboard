"use client";
import styled from "styled-components";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoCard from "./InfoCard";
import { useTransaction } from "@/hooks/useTransaction";
import { Transaction, useGlobalFilter } from "@/hooks/useGlobalFilter";
import { useMemo } from "react";
import dayjs from "dayjs";

const CustomGrid = styled.div`
  display: flex;
  gap: 1rem;
`;

function abbreviateNumber(value: number): string {
  const absValue = Math.abs(value);

  let abbreviated = "";
  if (absValue >= 1_000_000) {
    abbreviated = (absValue / 1_000_000).toFixed(1) + "M";
  } else if (absValue >= 1_000) {
    abbreviated = (absValue / 1_000).toFixed(1) + "k";
  } else {
    abbreviated = absValue.toString();
  }

  return value < 0 ? `-${abbreviated}` : abbreviated;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

interface CardsGridProps {
  data?: Transaction[];
}

export default function CardsGrid({ data }: CardsGridProps) {
  const { transactions } = useTransaction();
  const { filters } = useGlobalFilter();

  const sourceData = data ?? transactions;

  const { deposit, withdraw, balance } = useMemo(() => {
    const filtered = sourceData.filter((t) => {
      const date = dayjs(Number(t.date));
      const [start, end] = filters.dateRange;

      if (
        filters.transactionType &&
        t.transaction_type !== filters.transactionType
      ) {
        return false;
      }

      if (start && date.isBefore(dayjs(start), "day")) return false;
      if (end && date.isAfter(dayjs(end), "day")) return false;

      return true;
    });

    const deposit = filtered
      .filter((t) => t.transaction_type === "deposit")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const withdraw = filtered
      .filter((t) => t.transaction_type === "withdraw")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = deposit - withdraw;

    return { deposit, withdraw, balance };
  }, [sourceData, filters]);

  return (
    <CustomGrid>
      <InfoCard
        label="Receitas"
        icon={<AttachMoneyIcon fontSize="large" />}
        color="primary"
        abbreviateNumber={abbreviateNumber(deposit)}
        value={formatCurrency(deposit)}
      />
      <InfoCard
        label="Despesas"
        icon={<MoneyOffIcon fontSize="large" />}
        color="error"
        abbreviateNumber={abbreviateNumber(withdraw)}
        value={formatCurrency(withdraw)}
      />
      <InfoCard
        label="Transações Pendentes"
        icon={<PendingActionsIcon fontSize="large" />}
        color="warning"
        abbreviateNumber="Nenhuma"
      />
      <InfoCard
        label="Saldo total"
        icon={<AccountBalanceIcon fontSize="large" />}
        color="success"
        abbreviateNumber={abbreviateNumber(balance)}
        value={formatCurrency(balance)}
      />
    </CustomGrid>
  );
}
