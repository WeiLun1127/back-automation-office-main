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
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function Api(): JSX.Element {
  // State to control the dialog
  const [open, setOpen] = useState(false);

  // Function to handle opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "currency", accessor: "id", width: "3%" },
      { Header: "API Url", accessor: "api_url", width: "7%" },
      { Header: "action", accessor: "action", width: "7%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
      { Header: "updated by", accessor: "updated_by", width: "7%" },
    ],
    rows: [
      {
        id: "USD", // currency
        api_url: "https://api.usd", // API Url
        action: (
          <MDBox display="flex" gap={1} alignItems="center">
            <div style={{ paddingLeft: "12px" }}>
              <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={handleClickOpen}>
                edit
              </Icon>
            </div>
          </MDBox>
        ), // action
        updated_on: "2024-10-10", // updated on
        updated_by: "admin", // updated by
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
                Callback API Controller
              </MDTypography>
            </MDBox>
            <FormControlLabel
              control={<Checkbox />}
              label="use parent defined APIs " // Need to add check self role , if role = agent , then this will show
              sx={{ marginTop: 1, paddingLeft: 3 }}
            />
            <DataTable table={tableData} />
          </Card>
        </MDBox>
      </MDBox>
      {/* Dialog component */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="lg" // Sets the max width to a larger size
        sx={{
          "& .MuiDialog-paper": {
            width: "600px", // Set custom width
            height: "300px", // Set custom height
          },
        }}
      >
        <DialogTitle>
          Update Callback API URL
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
          <TextField fullWidth label="Currency" disabled variant="outlined" sx={{ mt: 2 }} />
          <TextField fullWidth label="API Url" variant="outlined" sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Api;
