import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import { apiHandler } from "api/apiHandler";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material"; // Import Close Icon
import MDInput from "components/MDInput";
import SearchIcon from "@mui/icons-material/Search";

function AccountGroupList(): JSX.Element {
  const [horizOpen, setHorizOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const countryList = [
    { code: "MY", name: "Malaysia", currency: "MYR" },
    { code: "TH", name: "Thailand", currency: "THB" },
    { code: "VN", name: "Vietnam", currency: "VND" },
    { code: "ID", name: "Indonesia", currency: "IDR" },
    { code: "IN", name: "India", currency: "INR" },
    { code: "KR", name: "Korea", currency: "KRW" },
    { code: "JP", name: "Japan", currency: "JPY" },
    { code: "SG", name: "Singapore", currency: "SGD" },
    { code: "CO", name: "Colombia", currency: "COP" },
  ];

  const handleHorizClickOpen = () => {
    setHorizOpen(true);
  };

  const handleHorizClose = () => {
    setHorizOpen(false);
  };

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
  };

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "group name", accessor: "group_name", width: "7%" },
      { Header: "currency", accessor: "currency", width: "7%" },
      { Header: "running ", accessor: "running", width: "7%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
      { Header: "status", accessor: "status", width: "7%" },
      { Header: "action", accessor: "action", width: "7%" },
    ],
    rows: [
      {
        id: "001",
        group_name: "SwanTechGrp1",
        currency: "MYR",
        running: (
          <div style={{ paddingLeft: "12px" }}>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={handleHorizClickOpen}>
              more_horiz
            </Icon>
          </div>
        ),
        updated_on: "2024-01-01 20:55:23 GMT+8",
        status: <Switch defaultChecked />,
        action: (
          <div style={{ paddingLeft: "12px" }}>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={handleEditClickOpen}>
              edit
            </Icon>
          </div>
        ),
      },
    ],
  });

  const [dialogMoreHorizTableData, setDialogMoreHorizTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "currency", accessor: "currency", width: "5%" },
      { Header: "bank code", accessor: "bank_code", width: "7%" },
      { Header: "acc. name", accessor: "acc_name", width: "10%" },
      { Header: "acc. number", accessor: "acc_number", width: "10%" },
      { Header: "running in$", accessor: "running_in_1", width: "10%" },
      { Header: "running in#", accessor: "running_in_2", width: "10%" },
      { Header: "running out$", accessor: "running_out_1", width: "10%" },
      { Header: "running out#", accessor: "running_out_2", width: "10%" },
    ],
    rows: [
      {
        id: "1",
        currency: "MYR",
        bank_code: "MBB",
        acc_name: "Tan Ah Lu",
        acc_number: "564589781234",
        running_in_1: "26,652.00 / 30,000",
        running_in_2: "165 / 200",
        running_out_1: "22,912.00 / 25,000",
        running_out_2: "99/200",
      },
    ],
  });

  const [dialogEditTableData, setEditTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "currency", accessor: "currency", width: "5%" },
      { Header: "bank code", accessor: "bank_code", width: "7%" },
      { Header: "acc. name", accessor: "acc_name", width: "10%" },
      { Header: "acc. number", accessor: "acc_number", width: "10%" },
      { Header: "running in$", accessor: "running_in_1", width: "10%" },
      { Header: "running in#", accessor: "running_in_2", width: "10%" },
      { Header: "running out$", accessor: "running_out_1", width: "10%" },
      { Header: "running out#", accessor: "running_out_2", width: "10%" },
      { Header: "action", accessor: "action", width: "3%" },
    ],
    rows: [
      {
        id: "1",
        currency: "MYR",
        bank_code: "MBB",
        acc_name: "Tan Ah Lu",
        acc_number: "564589781234",
        running_in_1: "30,000",
        running_in_2: "200",
        running_out_1: "25,000",
        running_out_2: "200",
        action: <Checkbox color="primary" />,
      },
    ],
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox
              p={3}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              lineHeight={1}
            >
              <MDTypography variant="h5" fontWeight="medium" style={{ color: "black" }}>
                Account Group
              </MDTypography>
            </MDBox>
            {/* <MDBox display="flex" justifyContent="flex-start" p={3}>
              <MDInput
                fullWidth
                variant="standard"
                label="Filter Keyword"
                sx={{ width: 200, marginRight: 3 }}
              />
              <MDBox display="flex" alignItems="center">
                <MDBox display="flex" alignItems="center" sx={{ marginRight: 2 }}>
                  <Switch color="primary" />
                </MDBox>
                <SearchIcon sx={{ marginLeft: 1, cursor: "pointer" }} />
              </MDBox>
            </MDBox> */}
            <DataTable table={tableData} />
          </Card>
        </MDBox>
      </MDBox>

      {/* Dialog Component */}
      <Dialog open={horizOpen} onClose={handleHorizClose} fullWidth maxWidth="xl">
        <DialogTitle>
          Account Group Running Balance
          <IconButton
            aria-label="close"
            onClick={handleHorizClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DataTable table={dialogMoreHorizTableData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHorizClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Component */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="xl">
        <DialogTitle>
          Update Account Group
          <IconButton
            aria-label="close"
            onClick={handleEditClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={2.5}>
              <TextField margin="dense" label="Group Name" sx={{ width: 200 }} />
            </Grid>
            <Grid item xs={2.5}>
              <FormControl
                margin="dense"
                sx={{
                  width: 200,
                  mt: 1,
                  "& .MuiOutlinedInput-root": {
                    minHeight: "45px", // Ensure consistent min-height
                    borderWidth: "2px", // Consistent border width (optional)
                  },
                }}
              >
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  id="country-select"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  label="Country"
                >
                  {countryList.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={2.5}>
              <TextField margin="dense" label="Currency" sx={{ width: 200 }} />
            </Grid> */}
          </Grid>
          <DataTable table={dialogEditTableData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default AccountGroupList;
