import { useState, useContext, createContext, ReactNode } from "react";

export type TransactionType = "deposit" | "withdraw" | "";

export interface Transaction {
  date: number;
  amount: string;
  transaction_type: TransactionType;
  currency: string;
  account: string;
  industry: string;
  state: string;
}

interface GlobalFilterState {
  search: string;
  dateRange: [Date | null, Date | null];
  transactionType: TransactionType;
}

type GlobalFilterContextType = {
  filters: GlobalFilterState;
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilterState>>;
  filteredData: (data: Transaction[]) => Transaction[];
};

const GlobalFilterContext = createContext<GlobalFilterContextType | undefined>(
  undefined
);

export const GlobalFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<GlobalFilterState>({
    search: "",
    dateRange: [null, null],
    transactionType: "",
  });

  const filteredData = (data: Transaction[]): Transaction[] => {
    return data.filter((item) => {
      const matchText =
        item.account.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.industry.toLowerCase().includes(filters.search.toLowerCase());

      const matchType =
        filters.transactionType === "" ||
        item.transaction_type === filters.transactionType;

      const matchDate =
        (!filters.dateRange[0] ||
          item.date >= filters.dateRange[0].getTime()) &&
        (!filters.dateRange[1] || item.date <= filters.dateRange[1].getTime());

      return matchText && matchType && matchDate;
    });
  };

  return (
    <GlobalFilterContext.Provider
      value={{
        filters,
        setFilters,
        filteredData,
      }}
    >
      {children}
    </GlobalFilterContext.Provider>
  );
};

export const useGlobalFilter = () => {
  const context = useContext(GlobalFilterContext);
  if (!context) {
    throw new Error(
      "useGlobalFilter must be used within a GlobalFilterProvider"
    );
  }
  return context;
};
