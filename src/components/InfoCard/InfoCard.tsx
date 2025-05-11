"use client";
import { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import CountUp from "react-countup";
import { BottomRight, BottomSubRight, Card, TopRow } from "./InfoCard.styles";
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

  function abbreviateNumberFn(value: number): string {
    const absValue = Math.abs(value);
    let abbreviated = "";

    if (absValue >= 1_000_000) {
      abbreviated = (absValue / 1_000_000).toFixed(1) + "M";
    } else if (absValue >= 1_000) {
      abbreviated = (absValue / 1_000).toFixed(1) + "k";
    } else {
      abbreviated = absValue.toString();
    }

    return value < 0 ? `-${abbreviated}` : abbreviated;
  }

  function formatCurrencyFn(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  }

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
