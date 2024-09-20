import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Flag from "react-world-flags";
import dataTableData from "./dataTableData";
import { apiHandler } from "api/apiHandler";

function CurrencyTables(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [ratio, setRatio] = useState("");
  const [rate, setRate] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [tableData, setTableData] = useState(dataTableData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
    setSelectedCurrency(event.target.value as string);
  };

  const handleRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setRatio(value);
    }
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d{0,5}$/.test(value)) {
      setRate(value);
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchOn(event.target.checked); // Update switch state
  };

  const storedUsername = localStorage.getItem("username");
  const storedToken = localStorage.getItem("token");

  const handleSubmit = async () => {
    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "GETCURRDATA",
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
      handleClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error during API call:", error);
    }
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

  const selectedCountry =
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
            <DataTable table={dataTableData} canSearch />
          </Card>
        </MDBox>
      </MDBox>
      {/* Dialog Component */}
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
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="currency-select-label">Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              value={selectedCurrency}
              label="Currency"
              onChange={handleCurrencyChange}
              renderValue={(selected) => {
                const selectedOption = currencyOptions.find((option) => option.value === selected);
                return (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {selectedOption && (
                      <Flag
                        code={selectedOption.countryCode}
                        style={{ width: 24, height: 16, marginRight: 8 }}
                      />
                    )}
                    {selectedOption?.label}
                  </Box>
                );
              }}
              sx={{
                height: "40px", // Adjust the height as needed
                ".MuiSelect-select": {
                  height: "100%", // Ensure the content fits within the container
                  display: "flex",
                  alignItems: "center",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderRadius: "4px", // Optional: Adjust border radius
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: "200px", // Adjust the max height of the dropdown menu if needed
                  },
                },
              }}
            >
              {currencyOptions.map(({ value, label, countryCode }) => (
                <MenuItem
                  key={value}
                  value={value}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 10px", // Add padding for spacing
                    "&:not(:last-child)": {
                      borderBottom: "1px solid #e0e0e0", // Add a bottom border for separation
                    },
                  }}
                >
                  <Box sx={{ mr: 1 }}>
                    <Flag code={countryCode} style={{ width: 24, height: 16 }} />
                  </Box>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Country TextField */}
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            value={selectedCountry}
            sx={{ mt: 2 }}
          />
          {/* Ratio and Rate Input Fields */}
          <TextField
            fullWidth
            label="Ratio"
            variant="outlined"
            value={ratio}
            onChange={handleRatioChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Rate"
            variant="outlined"
            value={rate}
            onChange={handleRateChange}
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={<Switch checked={isSwitchOn} onChange={handleSwitchChange} color="primary" />}
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
    </DashboardLayout>
  );
}

export default CurrencyTables;
