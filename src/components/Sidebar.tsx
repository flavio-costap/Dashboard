"use client";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { DashboardOutlined } from "@mui/icons-material";

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 1px solid #ddd;
  position: relative;
`;

const Header = styled.div`
  background-color: #193895;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
`;

const StyledButton = styled(Button)<{ colorhex: string }>`
  && {
  padding: 1rem;
    justify-content: space-between;
    color: ${({ colorhex }) => colorhex};
    text-transform: none;
    font-weight: bold;
    font-size: 1rem;
  }
`;

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <SidebarContainer>
      <Header>
        Dashboard
        <DashboardOutlined/>
      </Header>
      <StyledButton
        colorhex="#193895"
        endIcon={<HomeIcon />}
        onClick={() => router.push("/dashboard")}
      >
        Home
      </StyledButton>
      <StyledButton
        colorhex="#BF2151"
        endIcon={<LogoutIcon />}
        onClick={logout}
      >
        Logout
      </StyledButton>
    </SidebarContainer>
  );
}
