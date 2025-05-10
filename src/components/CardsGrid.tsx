"use client";
import styled from "styled-components";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InfoCard from "./InfoCard";

const CustomGrid = styled.div`
  display: flex;
  gap: 1rem;
`;
export default function CardsGrid() {
  return (
    <CustomGrid>
      <InfoCard
        label="Receitas"
        icon={<AttachMoneyIcon fontSize="large" />}
        color="primary"
        value="R$ 12.000"
      />
      <InfoCard
        label="Despesas"
        icon={<MoneyOffIcon fontSize="large" />}
        color="error"
        value="R$ 8.500"
      />
      <InfoCard
        label="Transações Pendentes"
        icon={<PendingActionsIcon fontSize="large" />}
        color="warning"
        value="3"
      />
      <InfoCard
        label="Saldo total"
        icon={<AccountBalanceIcon fontSize="large" />}
        color="success"
        value="R$ 3.500"
      />
    </CustomGrid>
  );
}
