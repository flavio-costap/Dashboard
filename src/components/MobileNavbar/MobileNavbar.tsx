"use client";
import { useState } from "react";
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  DrawerContent,
  DrawerHeader,
  StyledAppBar,
  StyledBackdrop,
  StyledListItem,
} from "./MobileNavbar.styled";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const toggleDrawer = () => setOpen((prev) => !prev);
  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <DashboardOutlinedIcon onClick={toggleDrawer} />
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <StyledBackdrop open={open} onClick={toggleDrawer} />

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{
          BackdropProps: { style: { backgroundColor: "transparent" } },
        }}
      >
        <DrawerContent role="presentation">
          <DrawerHeader>
            <DashboardOutlinedIcon />
            <Typography variant="h6" sx={{ ml: 1 }}>
              Dashboard
            </Typography>
          </DrawerHeader>
          <List>
            <StyledListItem onClick={() => handleNavigate("/dashboard")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </StyledListItem>
            <StyledListItem onClick={() => handleNavigate("/dashboard")}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </StyledListItem>
            <StyledListItem onClick={() => handleNavigate("/dashboard")}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Planos" />
            </StyledListItem>
            <StyledListItem onClick={() => handleNavigate("/dashboard")}>
              <ListItemIcon>
                <LocalPhoneIcon />
              </ListItemIcon>
              <ListItemText primary="Contatos" />
            </StyledListItem>
            <Divider />
            <StyledListItem onClick={logout}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ color: "error.main" }} />
            </StyledListItem>
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
}
