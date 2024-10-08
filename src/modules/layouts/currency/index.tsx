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
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";

function CurrencyTables(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [ratio, setRatio] = useState("");
  const [rate, setRate] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [editCurrencyData, setEditCurrencyData] = useState(null);

  const [success, setSuccess] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState("");

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "currency", accessor: "currency", width: "10%" },
      { Header: "country", accessor: "country", width: "15%" },
      { Header: "rate", accessor: "rate", width: "10%" },
      { Header: "ratio", accessor: "ratio", width: "10%" },
      { Header: "status", accessor: "status", width: "10%" },
      { Header: "updated on", accessor: "updatedOn", width: "10%" },
      { Header: "action", accessor: "action", width: "7%" },
    ],
    rows: [],
  });

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false); // Automatically hide the snackbar after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when success changes
    }
  }, [success]);

  const getSnackbarColor = () => {
    return snackBarTitle.toLowerCase().includes("error") ? "error" : "success";
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
      console.log(responseData);
      // Map API data to fit DataTable format
      const formattedRows = responseData.map(
        (
          item: {
            Currency: any;
            Country: string;
            Rate: any;
            Ratio: any;
            Status: any;
          },
          index: number
        ) => ({
          id: index + 1, // Generate an ID based on index
          currency: item.Currency,
          country: (
            <Box display="flex" alignItems="center">
              <Flag
                code={
                  currencyOptions.find((option) => option.country === item.Country)?.countryCode
                }
                style={{ width: 24, height: 16, marginRight: "8px" }}
              />
              {item.Country}
            </Box>
          ),
          rate: item.Rate,
          ratio: item.Ratio,
          status: (
            <Switch
              checked={item.Status === "1"}
              onChange={() => handleStatusChangeCurrencyTable(item.Currency, item.Status === "1")}
            />
          ),
          action: (
            <MDBox display="flex" gap={1} alignItems="center">
              <div style={{ paddingLeft: "12px" }}>
                <Icon
                  style={{ cursor: "pointer", fontSize: 20 }}
                  onClick={() => handleEditClick(item.Currency)}
                >
                  edit
                </Icon>
              </div>
            </MDBox>
          ),
        })
      );
      setTableData((prevData) => ({
        ...prevData,
        rows: formattedRows,
      }));
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleStatusChangeCurrencyTable = async (currency: string, currentStatus: boolean) => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");

    // Invert the current status
    const updatedStatus = currentStatus ? "0" : "1";

    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "SETCURRDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Currency: currency,
          Status: updatedStatus,
        }),
      };

      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);

      if (response.Status === "1") {
        // alert("Currency status updated successfully!");
        setSnackBarTitle("Currency status updated successfully.");
        setSuccess(true);
        fetchCurrencyData(); // Refresh the table data
      }
    } catch (error) {
      console.error("Error updating currency status:", error);
      setSnackBarTitle("Error updating currency status.");
      setSuccess(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditCurrencyData(null);
  };

  const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
    const currency = event.target.value as string;
    setSelectedCurrency(currency);

    // Update the selected country based on the selected currency
    const countryOption = currencyOptions.find((option) => option.value === currency);
    setSelectedCountry(countryOption ? countryOption.country : "");
  };

  const handleRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow up to 3 digits before the decimal and 5 digits after the decimal
    const ratioPattern = /^\d{0,3}(\.\d{0,5})?$/;
    if (ratioPattern.test(value)) {
      setEditCurrencyData((prevData: any) => ({
        ...prevData,
        ratio: value,
      }));
    }
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow up to 3 digits before the decimal and 5 digits after the decimal
    const ratePattern = /^\d{0,3}(\.\d{0,5})?$/;
    if (ratePattern.test(value)) {
      setEditCurrencyData((prevData: any) => ({
        ...prevData,
        rate: value,
      }));
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditCurrencyData((prevData: any) => ({
      ...prevData,
      status: event.target.checked,
    }));
  };

  const handleNewRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const ratioPattern = /^\d{0,3}(\.\d{0,5})?$/;
    if (ratioPattern.test(value)) {
      setRatio(value); // Set the ratio for the new currency dialog
    }
  };

  const handleNewRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const ratePattern = /^\d{0,3}(\.\d{0,5})?$/;
    if (ratePattern.test(value)) {
      setRate(value); // Set the rate for the new currency dialog
    }
  };

  const handleEditClick = async (currency: string) => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "GETCURRDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Currency: currency,
          Status: "", // Convert boolean to string "1" or "0"
        }),
      };

      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
      const dataArray = JSON.parse(response.Data);
      const currencyData = dataArray[0];
      setEditCurrencyData({
        currency: currencyData.Currency,
        country: currencyData.Country,
        rate: currencyData.Rate,
        ratio: currencyData.Ratio,
        status: currencyData.Status === "1",
      });
      setEditOpen(true);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleSubmit = async () => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "SETCURRDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Currency: selectedCurrency,
          Country: selectedCountry,
          Ratio: ratio,
          Rate: rate,
          Status: isSwitchOn ? "1" : "0", // Convert boolean to string "1" or "0"
        }),
      };

      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
      if (response.Status === "1") {
        // alert("Currency added successfully!");
        setSnackBarTitle("Currency added successfully.");
        setSuccess(true);
        fetchCurrencyData(); // Refresh the table data after successful submission
        handleClose(); // Close the dialog
      } else {
        // alert("Failed to add currency.");
        setSnackBarTitle("Error adding currency.");
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setSnackBarTitle("Error occured. Please Try again shortly.");
      setSuccess(true);
    }
  };

  const handleEditSubmit = async () => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (!editCurrencyData) return;
    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "SETCURRDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Currency: editCurrencyData.currency,
          Country: editCurrencyData.country,
          Ratio: editCurrencyData.ratio,
          Rate: editCurrencyData.rate,
          Status: editCurrencyData.status ? "1" : "0",
        }),
      };

      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
      console.log(response.Status);

      if (response.Status === "1") {
        // alert("Currency data updated successfully!");
        setSnackBarTitle("Currency data updated successfully.");
        setSuccess(true);
        fetchCurrencyData();
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setSnackBarTitle("Error occured. Please try again shortly.");
      setSuccess(true);
    } finally {
      handleEditClose();
    }
  };

  const handleCreateSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchOn(event.target.checked); // Update this function for the "Add New Currency" dialog
  };

  const currencyOptions = [
    { value: "MYR", label: "MYR", countryCode: "MY", country: "Malaysia" },
    { value: "SGD", label: "SGD", countryCode: "SG", country: "Singapore" },
    { value: "THB", label: "THB", countryCode: "TH", country: "Thailand" },
    { value: "VND", label: "VND", countryCode: "VN", country: "Vietnam" },
    { value: "KRW", label: "KRW", countryCode: "KR", country: "South Korea" },
    { value: "JPY", label: "JPY", countryCode: "JP", country: "Japan" },
    { value: "IDR", label: "IDR", countryCode: "ID", country: "Indonesia" },
    { value: "INR", label: "INR", countryCode: "IN", country: "India" },
  ];

  const selectedDialogCountry =
    currencyOptions.find((option) => option.value === selectedCurrency)?.country || "";

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
              <MDTypography variant="h5" fontWeight="medium">
                Currency
              </MDTypography>
              <MDButton
                variant="gradient"
                color="info"
                startIcon={<Icon>add</Icon>}
                onClick={handleClickOpen}
              >
                Add
              </MDButton>
            </MDBox>
            <DataTable table={tableData} canSearch />
          </Card>
        </MDBox>
      </MDBox>

      {/* Add Currency Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          Add New Currency
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
            <Icon>close</Icon>
          </IconButton>
        </DialogTitle>
        <Box
          sx={{
            borderBottom: "1px solid #e0e0e0",
            margin: "0 16px",
          }}
        />
        <DialogContent>
          <FormControl
            fullWidth
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                minHeight: "45px", // Ensure consistent min-height
                borderWidth: "2px", // Consistent border width (optional)
              },
            }}
          >
            <InputLabel id="currency-select-label">Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              value={selectedCurrency}
              label="Currency"
              onChange={handleCurrencyChange}
              renderValue={(selected) => {
                const selectedCurrencyOption = currencyOptions.find(
                  (option) => option.value === selected
                );
                return (
                  <Box display="flex" alignItems="center">
                    <Flag
                      code={selectedCurrencyOption?.countryCode}
                      style={{ width: 24, height: 16, marginRight: "8px" }}
                    />
                    {selectedCurrencyOption?.label}
                  </Box>
                );
              }}
              sx={{
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  minHeight: "46px", // Ensure minimum height
                  height: "45px", // Specific height
                  padding: "0 8px", // Add padding
                },
                "& .MuiInputBase-root": {
                  height: "45px", // Consistent height for the root
                },
              }}
            >
              {currencyOptions.map(({ value, label, countryCode }) => (
                <MenuItem key={value} value={value}>
                  <Flag code={countryCode} style={{ width: 24, height: 16, marginRight: "8px" }} />
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            value={selectedCountry}
            InputProps={{
              readOnly: true, // Make the country field read-only
            }}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Ratio"
            variant="outlined"
            value={ratio}
            onChange={handleNewRatioChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Rate"
            variant="outlined"
            value={rate}
            onChange={handleNewRateChange}
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Switch checked={isSwitchOn} onChange={handleCreateSwitchChange} color="primary" />
            }
            label="Show"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Currency Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth>
        <DialogTitle>
          Edit Currency
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
            <Icon>close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="edit-currency-select-label">Currency</InputLabel>
            <Select
              labelId="edit-currency-select-label"
              label="Currency"
              value={editCurrencyData?.currency}
              disabled
              sx={{
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  minHeight: "46px",
                  height: "46px",
                  padding: "0 8px",
                },
                "& .MuiInputBase-root": {
                  height: "46px",
                },
              }}
            >
              {currencyOptions.map(({ value, label, countryCode }) => (
                <MenuItem key={value} value={value}>
                  <Flag code={countryCode} style={{ width: 24, height: 16, marginRight: "8px" }} />
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            value={editCurrencyData?.country}
            disabled
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Rate"
            variant="outlined"
            value={editCurrencyData?.rate}
            onChange={handleRateChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Ratio"
            variant="outlined"
            value={editCurrencyData?.ratio}
            onChange={handleRatioChange}
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={editCurrencyData?.status}
                onChange={handleSwitchChange}
                color="primary"
              />
            }
            label="Show"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSubmit} color="primary">
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

export default CurrencyTables;
