import styled from "styled-components";

export const TooltipContainer = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
  color: black;
  min-width: 140px;
`;

export const LabelText = styled.p`
  font-weight: bold;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
`;

export const ValueText = styled.p<{ $color: string }>`
  color: ${({ $color }) => $color};
  margin: 0;
  font-size: 0.875rem;
`;