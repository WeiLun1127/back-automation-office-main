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
import CloseIcon from "@mui/icons-material/Close";

function ProductTables(): JSX.Element {
  const [editOpen, setEditOpen] = useState(false); // To control the dialog open state
  const [addOpen, setAddOpen] = useState(false); // To control the add dialog open state
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleEditClickOpen = (product: any) => {
    setSelectedProduct(product); // Store the product being edited
    setEditOpen(true); // Open the dialog
  };

  const handleEditClose = () => {
    setEditOpen(false); // Close the dialog
    setSelectedProduct(null); // Clear selected product on close
  };

  const handleAddClickOpen = () => {
    setAddOpen(true); // Open the add dialog
  };

  const handleAddClose = () => {
    setAddOpen(false); // Close the add dialog
  };

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "reference", accessor: "reference", width: "7%" },
      { Header: "country", accessor: "country", width: "7%" },
      { Header: "code", accessor: "code", width: "7%" },
      { Header: "display name", accessor: "display_name", width: "7%" },
      { Header: "profit type", accessor: "profit_type", width: "7%" },
      { Header: "max margin", accessor: "max_margin", width: "7%" },
      { Header: "status", accessor: "status", width: "7%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
      { Header: "action", accessor: "action", width: "7%" },
    ],
    rows: [
      {
        id: "001",
        reference: "REF12345",
        country: "USA",
        code: "US001",
        display_name: "Product A",
        profit_type: "Fixed",
        max_margin: "20%",
        status: <Switch defaultChecked />,
        updated_on: "2024-10-07",
        action: (
          <Icon
            style={{ cursor: "pointer", fontSize: 20 }}
            onClick={() =>
              handleEditClickOpen({
                id: "001",
                reference: "REF12345",
                country: "USA",
                code: "US001",
                display_name: "Product A",
                profit_type: "Fixed",
                max_margin: "20%",
                status: true,
              })
            }
          >
            edit
          </Icon>
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
                Products
              </MDTypography>
              <MDButton
                variant="gradient"
                color="info"
                startIcon={<Icon>add</Icon>}
                onClick={handleAddClickOpen}
              >
                Add
              </MDButton>
            </MDBox>
            <DataTable table={tableData} canSearch />
          </Card>
        </MDBox>
      </MDBox>

      {/* Dialog for adding a new product */}
      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>
          Add Product
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleAddClose}
            aria-label="close"
            style={{ position: "absolute", right: 20, top: 8 }} // Positioning
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Country"
            fullWidth
            defaultValue="" // Add default value as needed
          />
          <TextField
            margin="dense"
            label="Product"
            fullWidth
            defaultValue="" // Add default value as needed
          />
          <TextField
            margin="dense"
            label="Profit Type"
            fullWidth
            defaultValue="" // Add default value as needed
          />
          <TextField
            margin="dense"
            label="Display Name"
            fullWidth
            defaultValue="" // Add default value as needed
          />
          <TextField
            margin="dense"
            label="Max Margin"
            fullWidth
            defaultValue="" // Add default value as needed
          />
          <FormControlLabel
            label="Status"
            control={<Switch checked={false} />} // Default status as needed
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing product */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Update Products</DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleEditClose} // Close the dialog when clicked
          aria-label="close"
          style={{ position: "absolute", right: 20, top: 8 }} // Positioning
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField
            margin="dense"
            label="Country"
            fullWidth
            disabled
            InputProps={{
              readOnly: true,
            }}
            defaultValue={selectedProduct?.country || ""}
          />
          <TextField
            margin="dense"
            label="Product"
            fullWidth
            disabled
            InputProps={{
              readOnly: true,
            }}
            defaultValue={selectedProduct?.reference || ""}
          />
          <TextField
            margin="dense"
            label="Profit Type"
            fullWidth
            disabled
            InputProps={{
              readOnly: true,
            }}
            defaultValue={selectedProduct?.profit_type || ""}
          />
          <TextField
            margin="dense"
            label="Display Name"
            fullWidth
            defaultValue={selectedProduct?.display_name || ""}
          />
          <TextField
            margin="dense"
            label="Max Margin"
            fullWidth
            defaultValue={selectedProduct?.max_margin || ""}
          />
          <FormControlLabel
            label="Status" // Status label displayed first
            control={
              <Switch
                checked={selectedProduct?.status || false} // Use the current status value
                onChange={(e) => console.log(e.target.checked)} // Handle switch state change here
              />
            }
          />
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

export default ProductTables;
