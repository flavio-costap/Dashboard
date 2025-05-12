"use client";

import {
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

export interface SearchFields {
  account: boolean;
  industry: boolean;
  state: boolean;
}

interface Props {
  value: SearchFields;
  onChange: (value: SearchFields) => void;
}

export default function SearchFieldFilterMenu({ value, onChange }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (key: keyof SearchFields) => {
    const activeCount = Object.values(value).filter(Boolean).length;
    if (value[key] && activeCount === 1) return;

    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ width: "fit-content", marginRight: 1 }}
        onClick={handleOpenMenu}
      >
        <MenuIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={value.account}
                onChange={() => handleCheckboxChange("account")}
              />
            }
            label="Contas"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={value.industry}
                onChange={() => handleCheckboxChange("industry")}
              />
            }
            label="Setor"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={value.state}
                onChange={() => handleCheckboxChange("state")}
              />
            }
            label="Estados"
          />
        </MenuItem>
      </Menu>
    </>
  );
}
