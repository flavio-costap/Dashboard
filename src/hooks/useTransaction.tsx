import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
} from "react";
import axios from "axios";
import { Transaction } from "./useGlobalFilter";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

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
  getMonthlyTransactions: (data: Transaction[]) => MonthlyData[];
  getMonthlyDeposits: (data: Transaction[]) => DepositData[];
  getMonthlyBalance: (data: Transaction[]) => BalanceData[];
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user]) 

  const fetchData = async () => {
    try {
      const res = await axios.get<Transaction[]>("/api/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
      toast.error('Erro ao carregar transações')
    }
  };

  const getMonthlyTransactions = (data: Transaction[]): MonthlyData[] => {
    const grouped: Record<string, { deposit: number; withdraw: number }> = {};

    data.forEach((item) => {
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

  const getMonthlyDeposits = (data: Transaction[]): DepositData[] => {
    return getMonthlyTransactions(data).map(({ month, deposit }) => ({
      month,
      deposit,
    }));
  };

  const getMonthlyBalance = (data: Transaction[]): BalanceData[] => {
    const monthly = getMonthlyTransactions(data);
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
        getMonthlyBalance,
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
