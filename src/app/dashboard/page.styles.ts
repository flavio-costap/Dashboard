import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  padding-right: 1rem;

  @media (max-width: 600px) {
    padding-right: 0;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.primary.main} transparent;
`;

export const Background = styled.div<{ $sidebarWidth: number }>`
  background-color: #264eca;
  min-height: 100vh;
  padding-top: 4rem;
  padding-right: 4rem;
  padding-left: ${({ $sidebarWidth }) => `calc(${$sidebarWidth}px + 4rem)`};
  transition: padding-left 0.3s ease;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 600px) {
    padding: 1rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
    width: 100%;
  }
`;
