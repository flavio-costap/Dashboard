"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import styled from "styled-components";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import TransactionsTable from "@/components/TransactionsTable";
import TransactionCharts from "@/components/TransactionCharts";
import { Grid } from "@mui/material";
import { useGlobalFilter } from "@/hooks/useGlobalFilter";
import GlobalFilter from "@/components/GlobalFilter";
import { useTransaction } from "@/hooks/useTransaction";

const Layout = styled.div`
  display: flex;
`;

const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Background = styled.div<{ $sidebarWidth: number }>`
  background-color: #264eca;
  min-height: 100vh;
  padding-top: 4rem;
  padding-right: 4rem;
  padding-left: ${({ $sidebarWidth }) => `calc(${$sidebarWidth}px + 4rem)`};
  transition: padding-left 0.3s ease;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default function DashboardPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { filters, setFilters } = useGlobalFilter();
  const { transactions } = useTransaction();

  return (
    <ProtectedRoute>
      <Layout>
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <Background $sidebarWidth={isExpanded ? 200 : 70}>
          <CustomContainer>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid size={8}>
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
                <CardsGrid />
                <TransactionsTable data={transactions} />
              </Grid>
              <Grid size={4}>
                <TransactionCharts data={transactions} />
              </Grid>
            </Grid>
          </CustomContainer>
        </Background>
      </Layout>
    </ProtectedRoute>
  );
}
