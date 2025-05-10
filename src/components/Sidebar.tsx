"use client";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const SidebarWrapper = styled.div`
  position: relative;
`;

const SidebarContainer = styled.div<{ expanded: boolean }>`
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

const Header = styled.div<{ expanded: boolean }>`
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

const StyledButton = styled(Button).withConfig({
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

const LogoutContainer = styled.div`
  margin-top: auto;
  background-color: #BF2151;
`;

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export default function Sidebar({ isExpanded, setIsExpanded }: SidebarProps) {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <SidebarWrapper
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <SidebarContainer expanded={isExpanded}>
        <Header expanded={isExpanded}>
          <DashboardOutlinedIcon />
          {isExpanded && <span>Dashboard</span>}
        </Header>

        <StyledButton
          colorhex="#193895"
          startIcon={<HomeIcon />}
          onClick={() => router.push("/dashboard")}
          expanded={isExpanded}
        >
          <span className="label-text">Home</span>
        </StyledButton>
        <StyledButton
          colorhex="#193895"
          startIcon={<PersonIcon />}
          onClick={() => router.push("/dashboard")}
          expanded={isExpanded}
        >
          <span className="label-text">Perfil</span>
        </StyledButton>
        <StyledButton
          colorhex="#193895"
          startIcon={<CreditCardIcon />}
          onClick={() => router.push("/dashboard")}
          expanded={isExpanded}
        >
          <span className="label-text">Planos</span>
        </StyledButton>
        <StyledButton
          colorhex="#193895"
          startIcon={<LocalPhoneIcon />}
          onClick={() => router.push("/dashboard")}
          expanded={isExpanded}
        >
          <span className="label-text">Contatos</span>
        </StyledButton>

        <LogoutContainer>
          <StyledButton
            colorhex="white"
            startIcon={<LogoutIcon />}
            onClick={logout}
            expanded={isExpanded}
          >
            <span className="label-text">Logout</span>
          </StyledButton>
        </LogoutContainer>
      </SidebarContainer>
    </SidebarWrapper>
  );
}
