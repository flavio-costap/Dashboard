import TableContainer from "@mui/material/TableContainer";
import styled from "styled-components";

export const StyledTableContainer = styled(TableContainer)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    margin-bottom: 0;
    height: auto;
  }
`;
