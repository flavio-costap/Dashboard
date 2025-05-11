import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  margin-bottom: 16px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const FlexBox = styled.div<{ gap?: number }>`
  display: flex;
  gap: ${({ gap }) => gap || 8}px;
`;