import styled from "styled-components";
import { AppBar, Backdrop, ListItem } from "@mui/material";

export const StyledAppBar = styled(AppBar)`
  background-color: #193895;
  z-index: 1301;
`;

export const DrawerContent = styled.div`
  width: 250px;
  z-index: 1302;
  position: relative;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

export const StyledListItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    background-color: rgba(25, 56, 149, 0.1);
  }
`;

export const StyledBackdrop = styled(Backdrop)`
z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
`;
