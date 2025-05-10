import { useState, useContext, createContext, ReactNode } from "react";
import { Transaction } from "./useGlobalFilter";

export type TransactionType = "deposit" | "withdraw" | "";

type MonthlyData = {
  month: string;
  deposit: number;
  withdraw: number;
};

type BalanceData = {
  month: string;
  balance: number;
};

type DepositData = {
  month: string;
  deposit: number;
};

type TransactionContextType = {
  transactions: Transaction[];
  setTransactions: (data: Transaction[]) => void;
  getMonthlyTransactions: () => MonthlyData[];
  getMonthlyDeposits: () => DepositData[];
  getMonthlyBalance: () => BalanceData[];
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getMonthlyTransactions = (): MonthlyData[] => {
    const grouped: Record<string, { deposit: number; withdraw: number }> = {};

    transactions.forEach((item) => {
      const date = new Date(item.date);
      const key = `${date.getMonth() + 1}/${date.getFullYear()}`;
      const amount = Number(item.amount);

      if (!grouped[key]) {
        grouped[key] = { deposit: 0, withdraw: 0 };
      }

      if (
        item.transaction_type === "deposit" ||
        item.transaction_type === "withdraw"
      ) {
        grouped[key][item.transaction_type] += amount;
      }
    });

    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      const [ma, ya] = a.split("/").map(Number);
      const [mb, yb] = b.split("/").map(Number);
      return new Date(ya, ma - 1).getTime() - new Date(yb, mb - 1).getTime();
    });

    return sortedKeys.map((key) => ({
      month: key,
      deposit: grouped[key].deposit,
      withdraw: grouped[key].withdraw,
    }));
  };

  const getMonthlyDeposits = (): DepositData[] => {
    const monthlyTransactions = getMonthlyTransactions();
    return monthlyTransactions.map(({ month, deposit }) => ({
      month,
      deposit,
    }));
  };

  const getMonthlyBalance = (): BalanceData[] => {
  const monthly = getMonthlyTransactions();
  let accumulated = 0;

  return monthly.map(({ month, deposit, withdraw }) => {
    accumulated += deposit - withdraw;
    return { month, balance: accumulated };
  });
};

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        getMonthlyTransactions,
        getMonthlyDeposits,
        getMonthlyBalance
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
