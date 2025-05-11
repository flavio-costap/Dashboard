import { useTheme } from "@mui/material";
import styled from "styled-components";

interface PayloadItem {
  dataKey: string;
  value: number;
  name: string;
  color: string;
}

interface CustomTransactionTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}

const TooltipContainer = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
  color: black;
  min-width: 140px;
`;

const LabelText = styled.p`
  font-weight: bold;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
`;

const ValueText = styled.p<{ $color: string }>`
  color: ${({ $color }) => $color};
  margin: 0;
  font-size: 0.875rem;
`;

export default function CustomTransactionTooltip({
  active,
  payload,
  label,
}: CustomTransactionTooltipProps) {
  const theme = useTheme();

  if (!active || !payload || payload.length === 0) return null;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const deposit = payload.find((p) => p.dataKey === "deposit");
  const withdraw = payload.find((p) => p.dataKey === "withdraw");

  return (
    <TooltipContainer>
      <LabelText>{label}</LabelText>
      {deposit && (
        <ValueText $color={theme.palette.success.main}>
          Depósito: {formatCurrency(deposit.value)}
        </ValueText>
      )}
      {withdraw && (
        <ValueText $color={theme.palette.error.main}>
          Saque: {formatCurrency(withdraw.value)}
        </ValueText>
      )}
    </TooltipContainer>
  );
}
