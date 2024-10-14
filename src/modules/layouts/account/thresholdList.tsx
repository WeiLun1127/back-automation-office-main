import {
  Box,
  Button,
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
import { Close as CloseIcon } from "@mui/icons-material"; // Import Close Icon
import React, { useEffect, useState } from "react";

function AccountThresholdList(): JSX.Element {
  const [horizOpen, setHorizOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleHorizClickOpen = () => {
    setHorizOpen(true);
  };

  const handleHorizClose = () => {
    setHorizOpen(false);
  };

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "currency", accessor: "currency", width: "3%" },
      { Header: "bank code", accessor: "bank_code", width: "7%" },
      { Header: "acc. name", accessor: "acc_name", width: "7%" },
      { Header: "acc. number", accessor: "acc_number", width: "7%" },
      { Header: "running in$", accessor: "running_in_1", width: "7%" },
      { Header: "running in#", accessor: "running_in_2", width: "7%" },
      { Header: "running out$", accessor: "running_out_1", width: "7%" },
      { Header: "running out#", accessor: "running_out_2", width: "7%" },
      { Header: "running", accessor: "running", width: "3%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
      { Header: "status", accessor: "status", width: "3%" },
      { Header: "action", accessor: "action", width: "3%" },
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
                Account Threshold List
              </MDTypography>
            </MDBox>
            <DataTable table={tableData} canSearch />
          </Card>
        </MDBox>
      </MDBox>

      <Dialog open={horizOpen} onClose={handleHorizClose} fullWidth maxWidth="md">
        <DialogTitle>
          Account Threshold
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Country" sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="dense" label="Bank Code" sx={{ width: "100%" }} />
            </Grid>
          </Grid>

          {/* Row 2: Acc. Name and Acc. Number */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Acc. Name" sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="dense" label="Acc. Number" sx={{ width: "100%" }} />
            </Grid>
          </Grid>

          {/* Row 3: Running In and Running Out */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Running In # / Daily In #" sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Running Out # / Daily Out #"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          {/* Row 4: Running In $ and Running Out $ */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Running In $ / Daily In $" sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Running Out $ / Daily Out $"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="md">
        <DialogTitle>
          Update Account Threshold
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
          <TextField margin="dense" label="Currency" sx={{ width: 680 }} />
          <TextField margin="dense" label="Bank Code" sx={{ width: 680 }} />
          <TextField margin="dense" label="Account Number" sx={{ width: 680 }} />
          <TextField margin="dense" label="Account Name" sx={{ width: 680 }} />
          <TextField margin="dense" label="Login Id" sx={{ width: 680 }} />
          <TextField margin="dense" label="Login Password" sx={{ width: 680 }} />
          <TextField margin="dense" label="Security Code" sx={{ width: 680 }} />
          <TextField margin="dense" label="TimeZone" sx={{ width: 680 }} />
          <TextField margin="dense" label="Cut Off Time" sx={{ width: 680 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Daily In Limit $" sx={{ width: 300 }} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="dense" label="Daily Out Limit $" sx={{ width: 300 }} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Daily In Limit #" sx={{ width: 300 }} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="dense" label="Daily Out Limit #" sx={{ width: 300 }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default AccountThresholdList;
