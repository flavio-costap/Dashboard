import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
`;

export const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
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
`;
