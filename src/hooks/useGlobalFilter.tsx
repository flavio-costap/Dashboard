import { useState, useContext, createContext, ReactNode, useCallback, useEffect } from "react";

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
  searchFields: SearchFields;
}

type GlobalFilterContextType = {
  filters: GlobalFilterState;
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilterState>>;
  filteredData: (data: Transaction[]) => Transaction[];
};

export interface SearchFields {
  account: boolean;
  industry: boolean;
  state: boolean;
}

const GlobalFilterContext = createContext<GlobalFilterContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "global-filters";

export const GlobalFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<GlobalFilterState>({
    search: "",
    dateRange: [null, null],
    transactionType: "",
    searchFields: {
      account: true,
      industry: true,
      state: true,
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.dateRange = parsed.dateRange.map((d: string | null) =>
        d ? new Date(d) : null
      );
      setFilters(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const filteredData = useCallback((data: Transaction[]): Transaction[] => {
    const search = filters.search?.toLowerCase() || "";

    return data.filter((item) => {
      const { searchFields } = filters;

      const matchText =
        (searchFields.account && item.account?.toLowerCase().includes(search)) ||
        (searchFields.industry && item.industry?.toLowerCase().includes(search)) ||
        (searchFields.state && item.state?.toLowerCase().includes(search));

      const matchType =
        filters.transactionType === "" || item.transaction_type === filters.transactionType;

      const matchDate =
        (!filters.dateRange[0] || item.date >= filters.dateRange[0].getTime()) &&
        (!filters.dateRange[1] || item.date <= filters.dateRange[1].getTime());

      return matchText && matchType && matchDate;
    });
  }, [filters]);

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
    throw new Error("useGlobalFilter must be used within a GlobalFilterProvider");
  }
  return context;
};
