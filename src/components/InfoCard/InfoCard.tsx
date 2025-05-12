"use client";
import { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import CountUp from "react-countup";
import { BottomRight, BottomSubRight, Card, TopRow } from "./InfoCard.styles";
import { abbreviateNumberFn } from "@/utils/abbreviateNumberFn";
import { formatCurrencyFn } from "@/utils/formatCurrencyFn";
interface InfoCardProps {
  label: string;
  icon: ReactNode;
  value?: number;
  color?: "primary" | "success" | "error" | "warning";
}

export default function InfoCard({
  label,
  icon,
  value,
  color = "primary",
}: InfoCardProps) {
  const theme = useTheme();

  const selectedColor = theme.palette[color].main;

  return (
    <Card color={selectedColor}>
      <TopRow>
        <span>{label}</span>
        {icon}
      </TopRow>
      <BottomRight>
        {typeof value === "number" ? (
          <CountUp
            key={value}
            start={0}
            end={value}
            duration={2}
            formattingFn={(val: number) => abbreviateNumberFn(val)}
          />
        ) : (
          "Nenhuma"
        )}
      </BottomRight>

      <BottomSubRight>
        {typeof value === "number" ? (
          <CountUp
            key={`currency-${value}`}
            start={0}
            end={value}
            duration={2}
            formattingFn={(val: number) => formatCurrencyFn(val)}
          />
        ) : null}
      </BottomSubRight>
    </Card>
  );
}
