import {
  Box,
  Button,
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

function MasterControl(): JSX.Element {
  const [addOpen, setAddOpen] = useState(false);

  const handleAddClickOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "username", accessor: "reference", width: "7%" },
      { Header: "userid", accessor: "country", width: "7%" },
      { Header: "allowed currencies", accessor: "allowed_currencies", width: "7%" },
      { Header: "action", accessor: "action", width: "7%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
    ],
    rows: [
      {
        id: "001",
        reference: "john_doe",
        country: "US123",
        allowed_currencies: "USD, EUR",
        action: (
          <div style={{ paddingLeft: "12px" }}>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={handleAddClickOpen}>
              add
            </Icon>
          </div>
        ),
        updated_on: "2024-10-07",
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
                Master Controls
              </MDTypography>
            </MDBox>
            <DataTable table={tableData} canSearch />
          </Card>
        </MDBox>
      </MDBox>
      {/* Dialog Implementation */}
      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle style={{ color: "black" }}>Master Control</DialogTitle>
        <DialogContent>
          {/* You can add form fields here for the new entry */}
          <p>Add new user details here...</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default MasterControl;
