"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import styled from "styled-components";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import CardsGrid from "@/components/CardsGrid";
import TransactionsTable from "@/components/TransactionsTable";
import TransactionCharts from "@/components/TransactionCharts";
import { Grid } from "@mui/material";
import { Transaction, useGlobalFilter } from "@/hooks/useGlobalFilter";
import GlobalFilter from "@/components/GlobalFilter";

// Dados mockados para teste
const mockData: Transaction[] = [
  {
    date: 1682698259192,
    amount: "5565",
    transaction_type: "deposit",
    currency: "brl",
    account: "Baker Hughes",
    industry: "Oil and Gas Equipment",
    state: "TX",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1671293734303,
    amount: "1480",
    transaction_type: "withdraw",
    currency: "brl",
    account: "Wynn Resorts",
    industry: "Hotels",
    state: "NV",
  },
  {
    date: 1661438596457,
    amount: "6894",
    transaction_type: "deposit",
    currency: "brl",
    account: "Hyatt Hotels",
    industry: "Hotels",
    state: "IL",
  },
];

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
                <TransactionsTable data={mockData} />
              </Grid>
              <Grid size={4}>
                <TransactionCharts data={mockData} />
              </Grid>
            </Grid>
          </CustomContainer>
        </Background>
      </Layout>
    </ProtectedRoute>
  );
}
