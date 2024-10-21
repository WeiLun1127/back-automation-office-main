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
import Flag from "react-flagkit";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import MDInput from "components/MDInput";

//Need to check for role also for display 2 different tables?

function ProductTables(): JSX.Element {
  const [editOpen, setEditOpen] = useState(false); // To control the dialog open state
  const [addOpen, setAddOpen] = useState(false); // To control the add dialog open state
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>(""); // State for country selection
  const [products, setProducts] = useState<any[]>([]); // New state for products
  const [selectedProductData, setSelectedProductData] = useState<any>(null); // New state for selected product data

  const countries = [
    { name: "Korea", code: "KR" },
    { name: "Vietnam", code: "VN" },
    { name: "Malaysia", code: "MY" },
    { name: "Singapore", code: "SG" },
    { name: "Thailand", code: "TH" },
    { name: "Japan", code: "JP" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Cambodia", code: "KH" },
  ];

  const handleEditClickOpen = (product: any) => {
    setSelectedProduct(product); // Store the product being edited
    setSelectedCountry(product.country);
    setEditOpen(true); // Open the dialog
  };

  const handleEditClose = () => {
    setEditOpen(false); // Close the dialog
    setSelectedProduct(null); // Clear selected product on close
  };

  const handleAddClickOpen = () => {
    setAddOpen(true); // Open the add dialog
    setSelectedCountry("");
    setSelectedProductData(null);
  };

  type CountryName =
    | "Korea"
    | "Vietnam"
    | "Malaysia"
    | "Singapore"
    | "Thailand"
    | "Japan"
    | "India"
    | "Indonesia"
    | "Cambodia";

  // Update the currency mapping with CountryName as keys
  const currencyMapping: Record<CountryName, string> = {
    Korea: "KRW",
    Vietnam: "VND",
    Malaysia: "MYR",
    Singapore: "SGD",
    Thailand: "THB",
    Japan: "JPY",
    India: "INR",
    Indonesia: "IDR",
    Cambodia: "KHR",
  };

  const handleCountryChange = async (event: SelectChangeEvent<string>) => {
    // setSelectedCountry(event.target.value);
    const selectedCountry = event.target.value as CountryName;
    setSelectedCountry(selectedCountry);
    const selectedCountryCurrency = currencyMapping[selectedCountry];

    if (selectedCountryCurrency) {
      // Call the API with the necessary parameters
      try {
        const storedUsername = localStorage.getItem("username");
        const storedToken = localStorage.getItem("token");
        const response = await axios.post("http://18.138.168.43:10312/api/execset", {
          EXECF: "GETPRODSBYCURR",
          Uid: storedUsername,
          Token: storedToken,
          Data: JSON.stringify({ Currency: selectedCountryCurrency }),
        });
        console.log("API Response:", response.data);
        // Extract the 'Data' string and manipulate it to remove the outer structure
        const filteredDataString = response.data.Data; // Original string
        let filteredData = filteredDataString.slice(filteredDataString.indexOf("[")); // Keep from the first '[' onward

        // Check and remove the extra '}' at the end if it exists
        if (filteredData.endsWith("}")) {
          filteredData = filteredData.slice(0, -1); // Remove the last character
        }

        if (filteredData.endsWith('"')) {
          filteredData = filteredData.slice(0, -1); // Remove the last character
        }

        // If you need to remove any trailing whitespace or newline characters:
        filteredData = filteredData.trim(); // Clean up any whitespace

        console.log("Filtered Data:", filteredData);
        const dataArray = JSON.parse(filteredData);
        setProducts(dataArray);

        dataArray.forEach((item: { Code: any; Name: any; Type: any; Status: any }) => {
          console.log("Code:", item.Code);
          console.log("Name:", item.Name);
          console.log("Type:", item.Type);
          console.log("Status:", item.Status);
          console.log("-----"); // Separator for readability
        });
      } catch (error) {
        console.error("API call failed:", error);
      }
    }
  };

  const handleAddClose = () => {
    setAddOpen(false); // Close the add dialog
    setSelectedCountry("");
  };

  const handleProductSelect = (event: SelectChangeEvent<string>) => {
    const selectedProductCode = event.target.value;
    const productData = products.find((product) => product.Code === selectedProductCode);
    setSelectedProductData(productData); // Update selected product data
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
          <div style={{ paddingLeft: "12px" }}>
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
            <MDBox display="flex" justifyContent="flex-start" p={3}>
              <MDInput
                fullWidth
                variant="standard"
                label="Filter Keyword"
                sx={{ width: 200, marginRight: 3 }}
              />
              <MDBox display="flex" alignItems="center">
                {/* <TextField margin="dense" label="Status" sx={{ width: 200 }} /> */}
                <SearchIcon sx={{ marginLeft: 1, cursor: "pointer" }} />
              </MDBox>
            </MDBox>
            <DataTable table={tableData} />
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
          <FormControl
            fullWidth
            margin="dense"
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                minHeight: "44px", // Ensure consistent min-height
                borderWidth: "2px", // Consistent border width (optional)
              },
            }}
          >
            <InputLabel id="country">Country</InputLabel>
            <Select
              labelId="country"
              label="Country"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              {countries.map(({ name, code }) => (
                <MenuItem key={code} value={name} style={{ margin: "5px 0" }}>
                  <Box display="flex" alignItems="center">
                    <Flag country={code} size={20} style={{ marginRight: "10px" }} />
                    {name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            margin="dense"
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                minHeight: "44px", // Ensure consistent min-height
                borderWidth: "2px", // Consistent border width (optional)
              },
            }}
          >
            <InputLabel id="product-select-label">Product</InputLabel>
            <Select
              labelId="product-select-label"
              label="Product"
              value={selectedProductData?.Code || ""}
              onChange={handleProductSelect}
            >
              {products.map((product) => (
                <MenuItem key={product.Code} value={product.Code}>
                  {product.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Displaying the selected product details */}
          <TextField
            margin="dense"
            label="Display Name"
            fullWidth
            value={selectedProductData?.Name || ""}
          />
          <TextField
            margin="dense"
            label="Profit Type"
            fullWidth
            value={selectedProductData?.Type || ""}
          />
          <TextField
            margin="dense"
            label="Max Margin"
            fullWidth
            defaultValue="" // Add default value as needed
          />
          <FormControlLabel
            label="Status"
            control={<Switch checked={selectedProductData?.Status || false} />} // Default status as needed
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
