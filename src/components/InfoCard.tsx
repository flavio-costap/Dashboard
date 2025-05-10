'use client'
import styled from 'styled-components'
import { ReactNode } from 'react'
import { useTheme  } from '@mui/material/styles'

interface InfoCardProps {
  label: string
  icon: ReactNode
  value: string
  color?: 'primary' | 'success' | 'error' | 'warning'
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

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  color: white;
`

const BottomRight = styled.div<{ color: string }>`
  align-self: flex-end;
  font-size: 2rem;
  font-weight: bold;
  color: white;
`

export default function InfoCard({ label, icon, value, color = 'primary' }: InfoCardProps) {
  const theme = useTheme()
  const selectedColor = theme.palette[color].main

  return (
    <Card color={selectedColor}>
      <TopRow>
        <span>{label}</span>
        {icon}
      </TopRow>
      <BottomRight color={selectedColor}>{value}</BottomRight>
    </Card>
  )
}
