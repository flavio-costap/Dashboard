import { Typography } from "@mui/material";
import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import styled from "styled-components";

const TooltipContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 12px;
  color: #000;
`;

interface ValueTextProps {
  isNegative: boolean;
}

const ValueText = styled(Typography)<ValueTextProps>`
  color: ${({ isNegative, theme }) =>
    isNegative ? theme.palette.error.main : theme.palette.success.main};
  font-weight: 500;
`;

const CustomBalanceTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length > 0) {
    const value = payload[0].value as number;
    const isNegative = value < 0;

    return (
      <TooltipContainer>
        <Typography variant="body2" fontWeight={600}>
          {label}
        </Typography>
        <ValueText isNegative={isNegative} variant="body2">
          Balanço:{" "}
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </ValueText>
      </TooltipContainer>
    );
  }

  return null;
};

export default CustomBalanceTooltip;
