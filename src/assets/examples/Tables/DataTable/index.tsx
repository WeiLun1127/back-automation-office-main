import { useEffect, useMemo, useState } from "react";

import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

import Autocomplete from "@mui/material/Autocomplete";
import Icon from "@mui/material/Icon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";
import MDTypography from "components/MDTypography";

import DataTableBodyCell from "assets/examples/Tables/DataTable/DataTableBodyCell";
import DataTableHeadCell from "assets/examples/Tables/DataTable/DataTableHeadCell";

import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import MDDatePicker from "components/MDDatePicker";
import ClearButton from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface Props {
  entriesPerPage?:
    | false
    | {
        defaultValue: number;
        entries: number[];
      };
  showEntriesPerPage?: boolean;
  canSearch?: boolean;
  canFilter?: boolean;
  showTotalEntries?: boolean;
  table: {
    columns: { [key: string]: any }[];
    rows: { [key: string]: any }[];
  };
  pagination?: {
    variant: "contained" | "gradient";
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
  };
  isSorted?: boolean;
  noEndBorder?: boolean;
  editRows?: number[];
  onEditRow?: (row: number) => void;
  onStatusChange?: (row: number, status: string) => void;
  //Filter Properties
  currencyOptions?: string[];
  selectedCurrency?: string[];
  handleCurrencyChange?: (value: string[]) => void;
  selectedCreatedDate?: string;
  handleCreatedDateChange?: (value: string) => void;
  selectedUpdatedDate?: string;
  handleUpdatedDateChange?: (value: string) => void;
  roleOptions?: string[];
  selectedRole?: string[];
  handleRoleChange?: (value: string[]) => void;
  statusOptions?: string[];
  selectedStatus?: string;
  handleStatusChange?: (value: string) => void;
}

function DataTable({
  entriesPerPage,
  showEntriesPerPage,
  canSearch,
  canFilter,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  editRows,
  onEditRow,
  onStatusChange,
  //Filter Properties
  currencyOptions = ["MYR", "THB", "VND", "IDR", "INR", "KRW", "JPN", "SGD", "MMK"],
  selectedCurrency = [],
  handleCurrencyChange,
  selectedCreatedDate,
  handleCreatedDateChange,
  selectedUpdatedDate,
  handleUpdatedDateChange,
  roleOptions = ["Account Provider", "Merchant", "Reseller"],
  selectedRole = [],
  handleRoleChange,
  statusOptions = ["SUCCESSFULL", "PENDING", "APPROVED", "IN PROGRESS", "FAILED"],
  selectedStatus,
  handleStatusChange,
}: Props): JSX.Element {
  let defaultValue: any;
  let entries: any[];

  if (entriesPerPage) {
    defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : "10";
    entries = entriesPerPage.entries ? entriesPerPage.entries : ["10", "25", "50", "100"];
  }

  const columns = useMemo<any>(() => table.columns, [table]);
  const data = useMemo<any>(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  const setEntriesPerPage = (value: any) => setPageSize(value);

  const renderPagination = pageOptions.map((option: any) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  const handleInputPagination = ({ target: { value } }: any) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  const customizedPageOptions = pageOptions.map((option: any) => option + 1);

  const handleInputPaginationValue = ({ target: value }: any) => gotoPage(Number(value.value - 1));

  const [search, setSearch] = useState(globalFilter);

  const onSearchChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 100);

  const setSortedValue = (column: any) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  // State to manage the selected filter option
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCurrencyOptions, setSelectedCurrencyOptions] =
    useState<string[]>(selectedCurrency);
  const [dialogExpanded, setDialogExpanded] = useState(false);
  const [selectedRoleOptions, setSelectedRoleOptions] = useState<string[]>(selectedRole);
  const [selectedStatusOptions, setSelectedStatusOptions] = useState<string | null>(
    selectedStatus || null
  );

  const handleExpandClick = () => {
    setDialogExpanded(!dialogExpanded);
  };

  // Function to handle filter change
  const handleFilterChange = (value: string | null) => {
    setSelectedFilter(value);
  };

  const handleFilterClick = () => {
    setOpenDialog(true);
  };

  const handleFilterClose = () => {
    setOpenDialog(false);
  };

  const handleCheckboxChange = (option: string) => {
    setSelectedCurrencyOptions((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option]
    );
  };

  const handleRoleCheckboxChange = (option: string) => {
    setSelectedRoleOptions((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option]
    );
  };

  useEffect(() => {
    if (handleCurrencyChange) {
      handleCurrencyChange(selectedCurrencyOptions);
    }
  }, [selectedCurrencyOptions, handleCurrencyChange]);

  useEffect(() => {
    if (handleStatusChange) handleStatusChange(selectedStatusOptions || "");
  }, [selectedStatusOptions, handleStatusChange]);

  useEffect(() => {
    if (handleRoleChange) {
      handleRoleChange(selectedRoleOptions);
    }
  }, [selectedRoleOptions, handleRoleChange]);

  const selectedRows = rows.filter((row) => editRows && editRows.includes(row.index + 1));

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {selectedRows.length > 0 && (
        <>
          <MDBox p={3}>
            <MDTypography variant="title">Selected Rows</MDTypography>
          </MDBox>
          <MDBox component="thead">
            {headerGroups.map((headerGroup, key) => (
              <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, key: any) => (
                  <DataTableHeadCell
                    key={key}
                    {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                    width={column.width ? column.width : "auto"}
                    align={column.align ? column.align : "left"}
                    sorted={setSortedValue(column)}
                    column={column}
                  >
                    {column.render("Header")}
                  </DataTableHeadCell>
                ))}
              </TableRow>
            ))}
          </MDBox>
          <TableBody {...getTableBodyProps()}>
            {selectedRows.map((row, key) => {
              prepareRow(row);
              return (
                <TableRow key={key} {...row.getRowProps()}>
                  {row.cells.map((cell: any, key: any) => (
                    <DataTableBodyCell
                      key={key}
                      noBorder={noEndBorder && rows.length - 1 === key}
                      align={cell.column.align ? cell.column.align : "left"}
                      {...cell.getCellProps()}
                      cell={cell}
                      editRows={editRows}
                      onEditRow={onEditRow}
                      onStatusChange={onStatusChange}
                    >
                      {cell.render("Cell")}
                    </DataTableBodyCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </>
      )}
      {showEntriesPerPage || canSearch ? (
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </MDTypography>
            </MDBox>
          )}

          {canSearch && (
            <MDBox width="12rem" ml="auto">
              <MDInput
                placeholder="Search..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }: any) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </MDBox>
          )}
          {/* Filter Button */}
          {canFilter && (
            <MDBox display="flex" alignItems="center" ml={2}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  color: "rgba(0, 0, 0, 0.6)",
                  fontWeight: "bold",
                  "&:hover": {
                    borderColor: "rgba(0, 0, 0, 0.4)",
                  },
                }}
                onClick={handleFilterClick}
              >
                Filters
              </Button>
              <Dialog
                open={openDialog}
                onClose={handleFilterClose}
                aria-labelledby="filter-dialog-title"
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle
                  id="filter-dialog-title"
                  sx={{
                    m: 0,
                    p: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  Filter Options
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleFilterClose}
                    aria-label="close"
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      m: 1,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <Box
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    margin: "0 16px",
                  }}
                />
                <DialogContent>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ marginRight: 2 }}>
                      Created By
                    </Typography>
                    <MDDatePicker
                      input={{
                        value: selectedCreatedDate,
                        placeholder: "Created Date",
                        size: "small",
                        sx: { width: "10rem", marginRight: 2 },
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={() => handleCreatedDateChange("")}>
                                <ClearButton />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      value={selectedCreatedDate}
                      onChange={([date]: any) => handleCreatedDateChange(date)}
                    />
                  </Box>
                </DialogContent>
                <Box
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    margin: "0 16px",
                  }}
                />
                <DialogContent>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ marginRight: 2 }}>
                      Updated By
                    </Typography>
                    <MDDatePicker
                      input={{
                        value: selectedUpdatedDate,
                        placeholder: "Updated Date",
                        size: "small",
                        sx: { width: "10rem", marginRight: 2 },
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={() => handleUpdatedDateChange("")}>
                                <ClearButton />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      value={selectedUpdatedDate}
                      onChange={([date]: any) => handleUpdatedDateChange(date)}
                    />
                  </Box>
                </DialogContent>
                <Box
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    margin: "0 16px",
                  }}
                />
                <DialogContent>
                  <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Currency
                    </Typography>
                    <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                      {currencyOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          control={
                            <Checkbox
                              value={option}
                              checked={selectedCurrencyOptions.includes(option)}
                              onChange={() => handleCheckboxChange(option)}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  border: "1px solid black",
                                },
                                "& .Mui-checked": {
                                  color: "black",
                                },
                              }}
                            />
                          }
                          label={option}
                          sx={{ margin: 0 }}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                </DialogContent>
                <Box
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    margin: "0 16px",
                  }}
                />
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleExpandClick}
                  aria-label="expand"
                  sx={{
                    position: "absolute",
                    left: "calc(50% - 2rem)",
                    top: "calc(89% - 1rem)",
                    m: 1,
                  }}
                >
                  {dialogExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                {dialogExpanded && (
                  <>
                    <DialogContent>
                      <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Roles
                        </Typography>
                        <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                          {roleOptions.map((option) => (
                            <FormControlLabel
                              key={option}
                              control={
                                <Checkbox
                                  checked={selectedRoleOptions.includes(option)}
                                  onChange={() => handleRoleCheckboxChange(option)}
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      border: "1px solid black",
                                    },
                                    "& .Mui-checked": {
                                      color: "black",
                                    },
                                  }}
                                />
                              }
                              label={option}
                              sx={{ margin: 0 }}
                            />
                          ))}
                        </FormGroup>
                      </Box>
                    </DialogContent>
                    <Box
                      sx={{
                        borderBottom: "1px solid #e0e0e0",
                        margin: "0 16px",
                      }}
                    />
                    <DialogContent>
                      <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Status
                        </Typography>
                      </Box>
                      <Autocomplete
                        disableClearable
                        value={selectedStatusOptions}
                        options={statusOptions}
                        onChange={(event, newValue) => setSelectedStatusOptions(newValue || null)}
                        size="small"
                        sx={{ width: "10rem", marginRight: 2 }}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            placeholder="Status"
                            styles={{
                              ".MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                                paddingTop: "8px",
                                paddingBottom: "8px",
                              },
                            }}
                          />
                        )}
                      />
                    </DialogContent>
                  </>
                )}
                <DialogActions>
                  <Button
                    onClick={() => {
                      handleFilterClose();
                    }}
                    color="primary"
                  >
                    Apply
                  </Button>
                </DialogActions>
              </Dialog>
            </MDBox>
          )}
        </MDBox>
      ) : null}
      <Table {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, key: any) => (
                <DataTableHeadCell
                  key={key}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                  column={column}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>

        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);

            const isChecked = editRows && editRows.includes(row.index + 1);
            if (!isChecked) {
              return (
                <TableRow key={key} {...row.getRowProps()}>
                  {row.cells.map((cell: any, key: any) => (
                    <DataTableBodyCell
                      key={key}
                      noBorder={noEndBorder && rows.length - 1 === key}
                      align={cell.column.align ? cell.column.align : "left"}
                      {...cell.getCellProps()}
                      cell={cell}
                      editRows={editRows}
                      onEditRow={onEditRow}
                      onStatusChange={onStatusChange}
                    >
                      {cell.render("Cell")}
                    </DataTableBodyCell>
                  ))}
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        <MDBox mb={{ xs: 3, sm: 0 }}>
          {showTotalEntries && (
            <MDTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          )}
        </MDBox>

        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}

            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(event: any) => {
                    handleInputPagination(event);
                    handleInputPaginationValue(event);
                  }}
                />
              </MDBox>
            ) : (
              renderPagination
            )}

            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: ["5", "10", "15", "20", "25"] },
  showEntriesPerPage: true,
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
  handleCreatedDateChange: () => {},
  handleUpdatedDateChange: () => {},
};

export default DataTable;
