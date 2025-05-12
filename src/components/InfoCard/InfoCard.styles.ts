import styled from "styled-components";

export const Card = styled.div<{ color: string }>`
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

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  color: white;
`;

export const BottomRight = styled.div`
  align-self: flex-end;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

export const BottomSubRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 1.5rem;
  font-size: 0.8rem;
  color: white;
`;
