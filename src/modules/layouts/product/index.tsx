import {
  Box,
  Button,
  CircularProgress,
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
  ToggleButton,
  ToggleButtonGroup,
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
import MDSnackbar from "components/MDSnackbar";

//Need to check for role also for display 2 different tables?

function ProductTables(): JSX.Element {
  const [editOpen, setEditOpen] = useState(false); // To control the dialog open state
  const [addOpen, setAddOpen] = useState(false); // To control the add dialog open state
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>(""); // State for country selection
  const [selectedCurrency, setSelectedCurrency] = useState<string>(""); // State for selected currency
  const [products, setProducts] = useState<any[]>([]); // New state for products
  const [countryList, setCountryList] = useState<{ name: string; code: string }[]>([]);
  const [selectedProductData, setSelectedProductData] = useState<any>(null); // New state for selected product data
  const [maxMargin, setMaxMargin] = useState<string>(""); // New state for max margin
  const [success, setSuccess] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState("");
  const [filterKeyword, setFilterKeyword] = useState(""); // State for filter keyword
  const [filterCurrency, setFilterCurrency] = useState(""); // State for filter keyword
  const [filterSwitchStatus, setFilterSwitchStatus] = useState(null); // State for switch (on/off)
  const [loading, setLoading] = useState(false);

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
    setProducts([]);
    fetchCurrencyData();
  };

  const fetchCurrencyData = async () => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "GETCURRSBYSTATUS",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Currency: "",
          Status: "",
        }),
      };
      const response = await apiHandler(apiUrl, params);
      const responseData = JSON.parse(response.Data);

      // Extract country and currency from the response
      const countryData = responseData.map((item: { Country: string; Currency: string }) => ({
        name: item.Country,
        code: item.Currency, // Using currency code as 'code'
      }));

      // Store country data in state
      setCountryList(countryData);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleCountryChange = async (event: SelectChangeEvent<string>) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    const selectedCountryCurrency = countryList.find(
      (country) => country.name === selectedCountry
    )?.code;
    setSelectedCurrency(selectedCountryCurrency || "");
    if (selectedCountryCurrency) {
      // Call the API with the necessary parameters
      try {
        const storedUsername = localStorage.getItem("username");
        const storedToken = localStorage.getItem("token");
        const response = await axios.post("http://18.138.168.43:10312/api/execset", {
          EXECF: "GETPRODSBYCURR",
          Uid: storedUsername,
          Token: storedToken,
          Data: JSON.stringify({ FilterCurrency: selectedCountryCurrency }),
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

  const getSnackbarColor = () => {
    return snackBarTitle.toLowerCase().includes("error") ? "error" : "success";
  };

  const handleAddClose = () => {
    setAddOpen(false); // Close the add dialog
    setSelectedCountry("");
    setSelectedCurrency("");
    setProducts([]);
    setSelectedProductData(null);
  };

  const handleProductSelect = (event: SelectChangeEvent<string>) => {
    const selectedProductCode = event.target.value;
    const productData = products.find((product) => product.Code === selectedProductCode);
    setSelectedProductData(productData); // Update selected product data
  };

  const handleAddSaveClick = async () => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "SETPRODDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Index: "",
          Currency: selectedCurrency, //Currency Selected by User
          ProductCode: selectedProductData?.Code || "", //Product Code displayed
          DisplayName: selectedProductData?.Name || "", // Display Name displayed
          ProfitType: selectedProductData?.Type || "", //Profit Type Displayed
          ProfitValue: maxMargin, //Max margin value entered by user
          Status: selectedProductData?.Status || "", //status displayed
        }),
      };
      const response = await apiHandler(apiUrl, params);
      const responseData = JSON.parse(response.Data);
      console.log(responseData);
      handleAddClose();
      setSnackBarTitle("Product Added Successfully.");
      setSuccess(true); // Show success snackbar
      // fetchProductData();
      setTimeout(() => fetchProductData(), 1000);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const fetchProductData = async (FilterStatus = "", filterCurrency = "", searchValue = "") => {
    setLoading(true);
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "GETPRODDATALIST",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          FilterDisplayName: filterKeyword || searchValue,
          FilterCurrency: filterCurrency || "",
          FilterStatus: FilterStatus || "",
        }),
      };
      const response = await apiHandler(apiUrl, params);
      const responseData = JSON.parse(response.Data);
      console.log(responseData);
      const formattedRows = responseData.map(
        (
          item: {
            Index: any;
            ProductCode: string;
            Currency: any;
            DisplayName: any;
            ProfitType: any;
            ProfitValue: any;
            Status: any;
            UpdatedOnUTC: any;
          },
          index: number
        ) => ({
          id: index + 1, // Generate an ID based on index
          reference: item.Index,
          country: item.Currency,
          code: item.ProductCode,
          display_name: item.DisplayName,
          profit_type: item.ProfitType,
          max_margin: item.ProfitValue,
          status: <Switch checked={item.Status === "1"} />,
          updated_on: item.UpdatedOnUTC,
          action: (
            <div style={{ paddingLeft: "12px" }}>
              <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={handleEditClickOpen}>
                edit
              </Icon>
            </div>
          ),
        })
      );
      setTableData((prev) => ({
        ...prev,
        rows: formattedRows,
      }));
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call finishes
    }
  };

  // useEffect(() => {
  //   fetchProductData(filterSwitchStatus ? "1" : "0", filterCurrency, filterKeyword);
  // }, [filterKeyword, filterCurrency, filterSwitchStatus]);

  useEffect(() => {
    if (filterSwitchStatus === null) {
      fetchProductData("", filterKeyword, filterCurrency); // No filter applied
    } else {
      fetchProductData(filterSwitchStatus ? "1" : "0", filterKeyword, filterCurrency); // Apply the filter based on On/Off
    }
  }, [filterKeyword, filterCurrency, filterSwitchStatus]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false); // Automatically hide the snackbar after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when success changes
    }
  }, [success]);

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "reference", accessor: "reference", width: "7%" },
      { Header: "currency", accessor: "country", width: "7%" },
      { Header: "code", accessor: "code", width: "7%" },
      { Header: "display name", accessor: "display_name", width: "7%" },
      { Header: "profit type", accessor: "profit_type", width: "7%" },
      { Header: "max margin", accessor: "max_margin", width: "7%" },
      { Header: "status", accessor: "status", width: "7%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
      { Header: "action", accessor: "action", width: "7%" },
    ],
    rows: [],
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
                label="Filter Display Name"
                sx={{ width: 200, marginRight: 3 }}
                value={filterKeyword}
                onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                  setFilterKeyword(e.target.value)
                }
              />
              <MDInput
                fullWidth
                variant="standard"
                label="Filter Currency"
                sx={{ width: 200, marginRight: 3 }}
                value={filterCurrency}
                onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                  setFilterCurrency(e.target.value)
                }
              />
              <MDBox display="flex" alignItems="center">
                <MDBox display="flex" alignItems="center" sx={{ marginRight: 2 }}>
                  <ToggleButtonGroup
                    value={filterSwitchStatus} // The value of the toggle button group is linked to the state
                    exclusive
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        setFilterSwitchStatus(newValue);
                      } else {
                        setFilterSwitchStatus(null);
                      }
                    }}
                    aria-label="filter toggle"
                  >
                    <ToggleButton value={true} aria-label="on">
                      On
                    </ToggleButton>
                    <ToggleButton value={null} aria-label="no-filter">
                      Status
                    </ToggleButton>
                    <ToggleButton value={false} aria-label="off">
                      Off
                    </ToggleButton>
                  </ToggleButtonGroup>
                </MDBox>
                <SearchIcon sx={{ marginLeft: 1, cursor: "pointer" }} />
              </MDBox>
            </MDBox>
            {/* <DataTable table={tableData} /> */}
            {loading ? (
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: "200px" }}
              >
                <CircularProgress />
              </MDBox>
            ) : (
              <DataTable table={tableData} />
            )}
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
              {/* Populate dropdown with fetched countries */}
              {countryList.map(({ name, code }) => (
                <MenuItem key={code} value={name} style={{ margin: "5px 0" }}>
                  <Box display="flex" alignItems="center">
                    {name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Currency Input Field */}
          <TextField
            margin="dense"
            label="Currency"
            fullWidth
            value={selectedCurrency}
            disabled
            InputProps={{
              readOnly: true, // Make the field read-only
            }}
          />
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
            value={maxMargin}
            onChange={(e) => setMaxMargin(e.target.value)}
          />
          <FormControlLabel
            label="Status"
            control={<Switch checked={selectedProductData?.Status || false} />} // Default status as needed
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSaveClick} color="primary">
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
      <MDSnackbar
        open={success}
        color={getSnackbarColor()}
        title={snackBarTitle}
        close={() => setSuccess(false)} // Close the snackbar
      />
    </DashboardLayout>
  );
}

export default ProductTables;
