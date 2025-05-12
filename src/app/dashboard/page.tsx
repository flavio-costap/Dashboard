"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import { memo, useCallback, useMemo, useState } from "react";
import CardsGrid from "@/components/CardsGrid/CardsGrid";
import TransactionsTable from "@/components/Tables/TransactionsTable/TransactionsTable";
import TransactionCharts from "@/components/Charts/TransactionCharts/TransactionCharts";
import { Grid } from "@mui/material";
import { useGlobalFilter } from "@/hooks/useGlobalFilter";
import GlobalFilter from "@/components/GlobalFilter/GlobalFilter";
import { useTransaction } from "@/hooks/useTransaction";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { Background, CustomContainer, Layout } from "./page.styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";

export default function DashboardPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { filters, setFilters, filteredData } = useGlobalFilter();
  const { transactions } = useTransaction();

  const isMobile = useMediaQuery("(max-width:600px)");
  const filteredTransactions = useMemo(
    () => filteredData(transactions),
    [filteredData, transactions]
  );

  const MemoizedCardsGrid = memo(CardsGrid);
  const sidebarWidth = useMemo(() => (isExpanded ? 200 : 70), [isExpanded]);
  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <ProtectedRoute>
      <Layout>
        {isMobile ? (
          <MobileNavbar />
        ) : (
          <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        )}
        <Background $sidebarWidth={sidebarWidth}>
          <CustomContainer>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid size={{ xs: 12, md: 8 }}>
                <GlobalFilter
                  search={filters.search}
                  onSearchChange={(v) =>
                    setFilters((f) => ({ ...f, search: v }))
                  }
                  dateRange={filters.dateRange}
                  onDateChange={(range) =>
                    setFilters((f) => ({ ...f, dateRange: range }))
                  }
                  transactionType={filters.transactionType}
                  onTypeChange={(type) =>
                    setFilters((f) => ({ ...f, transactionType: type }))
                  }
                />
                <MemoizedCardsGrid data={filteredTransactions} />
                <TransactionsTable data={filteredTransactions} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TransactionCharts data={filteredTransactions} />
              </Grid>
            </Grid>
          </CustomContainer>
        </Background>
      </Layout>
    </ProtectedRoute>
  );
}
