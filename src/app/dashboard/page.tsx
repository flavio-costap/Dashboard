"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Container } from "@mui/material";
import styled from "styled-components";
import InfoCard from "@/components/InfoCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Sidebar from "@/components/Sidebar";

const Layout = styled.div`
  display: flex;
`;

const Background = styled.div`
  background-color: #264eca;
  min-height: 100vh;
  padding: 4rem 1rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <Sidebar />
        <Background>
          <ContentContainer>
            <CardsGrid>
              <InfoCard
                label="Receitas"
                icon={<AttachMoneyIcon color="primary" />}
                color="primary"
                value="R$ 12.000"
              />
              <InfoCard
                label="Despesas"
                icon={<MoneyOffIcon color="error" />}
                color="error"
                value="R$ 8.500"
              />
              <InfoCard
                label="Transações Pendentes"
                icon={<PendingActionsIcon color="warning" />}
                color="warning"
                value="3"
              />
              <InfoCard
                label="Saldo total"
                icon={<AccountBalanceIcon color="success" />}
                color="success"
                value="R$ 3.500"
              />
            </CardsGrid>
          </ContentContainer>
        </Background>
      </Layout>
    </ProtectedRoute>
  );
}
