import { useTheme } from "@mui/material";
import { LabelText, TooltipContainer, ValueText } from "./CustomTransactionTooltip.styles";

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
