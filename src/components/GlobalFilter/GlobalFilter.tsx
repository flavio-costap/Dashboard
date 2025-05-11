"use client";

import {
  TextField,
  MenuItem,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { TransactionType, useGlobalFilter } from "@/hooks/useGlobalFilter";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import SearchFieldFilterMenu, { SearchFields } from "../SearchFieldFilterMenu/SearchFieldFilterMenu";
import { FilterContainer, FlexBox } from "./GlobalFilter.styles";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  dateRange: [Date | null, Date | null];
  onDateChange: (range: [Date | null, Date | null]) => void;
  transactionType: TransactionType;
  onTypeChange: (type: TransactionType) => void;
}

export default function GlobalFilter({
  dateRange,
  onDateChange,
  transactionType,
  onSearchChange,
  onTypeChange,
}: Props) {
  const { filters, setFilters } = useGlobalFilter();
  const defaultSearchFields: SearchFields = {
    account: true,
    industry: true,
    state: true,
  };

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleStartDateChange = (newStart: Dayjs | null) => {
    const end = dateRange[1] ? dayjs(dateRange[1]) : null;

    if (newStart && (!end || newStart.isSame(end) || newStart.isBefore(end))) {
      const newStartDate = newStart.toDate();
      onDateChange([newStartDate, dateRange[1]]);
      setFilters((prev) => ({
        ...prev,
        dateRange: [newStartDate, dateRange[1]],
      }));
    } else {
      onDateChange([newStart?.toDate() ?? null, null]);
      setFilters((prev) => ({
        ...prev,
        dateRange: [newStart?.toDate() ?? null, null],
      }));
    }
  };

  const handleEndDateChange = (newEnd: Dayjs | null) => {
    const start = dateRange[0] ? dayjs(dateRange[0]) : null;

    if (newEnd && start && (newEnd.isSame(start) || newEnd.isAfter(start))) {
      const newEndDate = newEnd.toDate();
      onDateChange([dateRange[0], newEndDate]);
      setFilters((prev) => ({
        ...prev,
        dateRange: [dateRange[0], newEndDate],
      }));
    } else {
      onDateChange([null, newEnd?.toDate() ?? null]);
      setFilters((prev) => ({
        ...prev,
        dateRange: [null, newEnd?.toDate() ?? null],
      }));
    }
  };

  const handleTypeChange = (type: TransactionType) => {
    onTypeChange(type);
    setFilters((prev) => ({ ...prev, transactionType: type }));
  };

  const handleClearAll = () => {
    const today = new Date();
    onSearchChange("");
    onTypeChange("");
    onDateChange([null, today]);

    setFilters({
      search: "",
      transactionType: "",
      dateRange: [null, today],
      searchFields: defaultSearchFields,
    });
  };

  return (
    <FilterContainer>
      <Grid container spacing={2} alignItems="center" width={"100%"}>
        <Grid size={4}>
          <FlexBox gap={8}>
            <SearchFieldFilterMenu
              value={filters.searchFields}
              onChange={(newFields) =>
                setFilters((prev) => ({ ...prev, searchFields: newFields }))
              }
            />
            <TextField
              label="Buscar"
              value={filters.search}
              fullWidth
              onChange={(e) => handleSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FlexBox>
        </Grid>

        <Grid size={5}>
          <FlexBox gap={16}>
            <DatePicker
              label="Data inicial"
              value={dateRange[0] ? dayjs(dateRange[0]) : null}
              onChange={handleStartDateChange}
              maxDate={dateRange[1] ? dayjs(dateRange[1]) : undefined}
            />
            <DatePicker
              label="Data final"
              value={dateRange[1] ? dayjs(dateRange[1]) : null}
              onChange={handleEndDateChange}
              minDate={dateRange[0] ? dayjs(dateRange[0]) : undefined}
            />
          </FlexBox>
        </Grid>

        <Grid size={3}>
          <FlexBox gap={16}>
            <TextField
              label="Tipo"
              select
              value={transactionType}
              fullWidth
              onChange={(e) =>
                handleTypeChange(e.target.value as TransactionType)
              }
            >
              <MenuItem value="deposit">Depósito</MenuItem>
              <MenuItem value="withdraw">Saque</MenuItem>
            </TextField>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleClearAll}
              startIcon={<CloseIcon />}
            >
              Limpar
            </Button>
          </FlexBox>
        </Grid>
      </Grid>
    </FilterContainer>
  );
}
