import Button  from "@mui/material/Button"
import styled from "styled-components"

export const Background = styled.div`
  background-color: #264ECA;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FormContainer = styled.div`
  background-color: white;
  padding: 3rem 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`

export const StyledButton = styled(Button)`
  && {
    background-color: #2148C0;
    color: white;
    margin-top: 1rem;
    width: 100%;
    &:hover {
      background-color: #2148C0;
    }
  }
`

export const TitleContainer = styled.div`
  background-color: #2148C0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
`