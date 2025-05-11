"use client";
import styled from "styled-components";
import { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import CountUp from "react-countup";
interface InfoCardProps {
  label: string;
  icon: ReactNode;
  value?: number;
  color?: "primary" | "success" | "error" | "warning";
}

const Card = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: 12px;
  padding: 1.5rem;
  flex: 1;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  color: white;
`;

const BottomRight = styled.div`
  align-self: flex-end;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
`;

const BottomSubRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 1.5rem;
  font-size: 0.8rem;
  color: white;
`;

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
