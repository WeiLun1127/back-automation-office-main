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

function ProductControl(): JSX.Element {
  const [addOpen, setAddOpen] = useState(false);

  const handleAddClickOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const tableData1 = {
    columns: [
      { Header: "Currency", accessor: "currency", width: "7%" },
      { Header: "Allow", accessor: "allow", width: "7%" },
    ],
    rows: [{ currency: "MYR", allow: "allow" }],
  };

  const tableData2 = {
    columns: [
      { Header: "Currency", accessor: "currency", width: "7%" },
      { Header: "Product", accessor: "product", width: "7%" },
      { Header: "Type", accessor: "type", width: "7%" },
      { Header: "Allow", accessor: "allow", width: "7%" },
    ],
    rows: [{ currency: "MYR", product: "DUITNOW", type: "Web", allow: "allow" }],
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
      <Dialog
        open={addOpen}
        onClose={handleAddClose}
        maxWidth="md"
        fullWidth={true}
        sx={{ "& .MuiDialogContent-root": { height: "450px" } }}
      >
        <DialogTitle style={{ color: "black" }}>Master Control</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="UserID"
            fullWidth
            // disabled
            InputProps={{
              // readOnly: true,
              style: { width: "250px" },
            }}
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            // disabled
            InputProps={{
              // readOnly: true,
              style: { width: "250px" },
            }}
          />
          <Box style={{ marginBottom: "20px" }}></Box>
          <Box display="flex" justifyContent="space-between">
            <Box width="30%">
              {/* <MDTypography variant="h6" style={{ marginLeft: "16px" }}>
                Table 1
              </MDTypography> */}
              <DataTable table={tableData1} showEntriesPerPage={false} />
            </Box>
            <Box width="60%">
              <DataTable table={tableData2} showEntriesPerPage={false} />
            </Box>
          </Box>
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

export default ProductControl;
