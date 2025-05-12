"use client";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { memo } from "react";
import { Header, LogoutContainer, SidebarContainer, SidebarWrapper, StyledButton } from "./Sidebar.styles";



interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void
}

function Sidebar({ isExpanded, toggleSidebar }: SidebarProps) {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <SidebarWrapper>
      <SidebarContainer expanded={isExpanded}>
        <Header expanded={isExpanded} onClick={() => toggleSidebar()}>
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

export default memo(Sidebar);