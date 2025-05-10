// components/GlobalFilter.tsx
import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Grid,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TransactionType } from "@/hooks/useGlobalFilter";
import { DatePicker } from "@mui/x-date-pickers";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  dateRange: [Date | null, Date | null];
  onDateChange: (range: [Date | null, Date | null]) => void;
  transactionType: TransactionType;
  onTypeChange: (type: TransactionType) => void;
}

export default function GlobalFilter({
  search,
  onSearchChange,
  dateRange,
  onDateChange,
  transactionType,
  onTypeChange,
}: Props) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      p={2}
      mb={2}
      bgcolor="white"
      borderRadius={2}
      boxShadow={2}
      width="100%"
    >
      <Grid container spacing={2} alignItems={"center"} width={"100%"}>
        <Grid size={3}>
          <TextField
            label="Buscar"
            value={search}
            fullWidth
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={5}>
          <Box display={"flex"} flexDirection={"row"} gap={2} width={"100%"}>
            <DatePicker
              label="Data inicial"
              value={dateRange[0]}
              onChange={(newDate) => onDateChange([newDate, dateRange[1]])}
            />
            <DatePicker
              label="Data final"
              value={dateRange[1]}
              onChange={(newDate) => onDateChange([dateRange[0], newDate])}
            />
          </Box>
        </Grid>
        <Grid size={3}>
          <TextField
            label="Tipo de transação"
            select
            value={transactionType}
            fullWidth
            onChange={(e) => onTypeChange(e.target.value as TransactionType)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="deposit">Depósito</MenuItem>
            <MenuItem value="withdraw">Saque</MenuItem>
          </TextField>
        </Grid>
        <Grid size={1} textAlign={"center"}>
          <IconButton color="primary" size="large">
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
