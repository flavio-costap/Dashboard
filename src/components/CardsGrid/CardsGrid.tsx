"use client";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useTransaction } from "@/hooks/useTransaction";
import { Transaction, useGlobalFilter } from "@/hooks/useGlobalFilter";
import { useMemo } from "react";
import dayjs from "dayjs";
import { CustomGrid } from "./CardsGrid.styles";
import InfoCard from "../InfoCard/InfoCard";

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
        value={deposit}
      />
      <InfoCard
        label="Despesas"
        icon={<MoneyOffIcon fontSize="large" />}
        color="error"
        value={withdraw}
      />
      <InfoCard
        label="Transações Pendentes"
        icon={<PendingActionsIcon fontSize="large" />}
        color="warning"
      />
      <InfoCard
        label="Saldo total"
        icon={<AccountBalanceIcon fontSize="large" />}
        color="success"
        value={balance}
      />
    </CustomGrid>
  );
}
