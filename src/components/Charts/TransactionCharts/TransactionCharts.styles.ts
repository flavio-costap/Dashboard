import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  gap: 1rem;
`;

export const Card = styled.div`
  background-color: #193895;
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Title = styled.h6`
  margin: 0;
  font-size: 1.25rem;
`;

export const ChartWrapper = styled.div`
  flex: 1;
`;