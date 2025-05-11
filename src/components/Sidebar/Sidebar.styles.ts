import Button from "@mui/material/Button";
import styled from "styled-components";

export const SidebarWrapper = styled.div`
  position: relative;
`;

export const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>`
  width: ${({ expanded }) => (expanded ? "200px" : "70px")};
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

export const Header = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>`
  background-color: #193895;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: ${({ expanded }) => (expanded ? "0.5rem" : "0")};
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  justify-content: ${({ expanded }) => (expanded ? "flex-start" : "center")};
`;
export const StyledButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => prop !== "expanded" && prop !== "colorhex",
})<{ colorhex: string; expanded: boolean }>`
  && {
    padding: 1rem;
    justify-content: ${({ expanded }) => (expanded ? "flex-start" : "center")};
    color: ${({ colorhex }) => colorhex};
    text-transform: none;
    font-weight: bold;
    font-size: 1rem;
    gap: ${({ expanded }) => (expanded ? "1rem" : "0")};
    transition: all 0.3s ease;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .label-text {
    opacity: ${({ expanded }) => (expanded ? 1 : 0)};
    width: ${({ expanded }) => (expanded ? "auto" : "0")};
    overflow: hidden;
    transition: opacity 0.2s ease, width 0.2s ease;
    white-space: nowrap;
  }

  .MuiButton-startIcon {
    margin: 0;
  }
`;

export const LogoutContainer = styled.div`
  margin-top: auto;
  background-color: #BF2151;
`;