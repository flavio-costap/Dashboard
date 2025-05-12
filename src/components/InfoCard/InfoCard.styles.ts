import styled from "styled-components";

export const BoxCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

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
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: bold;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 100%;
`;

export const BottomSubRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 1.5rem;
  font-size: clamp(0.6rem, 2vw, 0.8rem);
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
