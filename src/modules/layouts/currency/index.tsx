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
import { apiHandler } from "api/apiHandler";

function CurrencyTables(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [ratio, setRatio] = useState("");
  const [rate, setRate] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [editCurrencyData, setEditCurrencyData] = useState(null);

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "currency", accessor: "currency", width: "10%" },
      { Header: "country", accessor: "country", width: "15%" },
      { Header: "rate", accessor: "rate", width: "10%" },
      { Header: "ratio", accessor: "ratio", width: "10%" },
      { Header: "status", accessor: "status", width: "10%" },
      { Header: "action", accessor: "action", width: "7%" },
    ],
    rows: [
      {
        id: 1,
        currency: "THB",
        country: (
          <div>
            <Flag code="TH" style={{ width: "20px", marginRight: "10px" }} />
            Thailand
          </div>
        ),
        rate: "7.55", // Example: 1 MYR = 7.55 THB
        ratio: "1",
        status: (
          <Switch
            checked={true} // Set this based on your logic (1 for true, 0 for false)
            onChange={(event) => handleStatusChange(1, event.target.checked)} // Pass the id and the new status
          />
        ),
        action: (
          <MDBox display="flex" gap={1} alignItems="center">
            <Icon
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() =>
                handleEditClick({
                  currency: "THB",
                  country: "Thailand",
                  rate: "7.55",
                  ratio: "1",
                  status: true,
                })
              }
            >
              edit
            </Icon>
          </MDBox>
        ),
      },
      {
        id: 2,
        currency: "MYR",
        country: (
          <div>
            <Flag code="MY" style={{ width: "20px", marginRight: "10px" }} />
            Malaysia
          </div>
        ),
        rate: "1",
        ratio: "1",
        status: (
          <Switch
            checked={true}
            onChange={(event) => handleStatusChange(1, event.target.checked)}
          />
        ),
        action: (
          <MDBox display="flex" gap={1} alignItems="center">
            <Icon
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() =>
                handleEditClick({
                  currency: "MYR",
                  country: "Malaysia",
                  rate: "1",
                  ratio: "1",
                  status: true,
                })
              }
            >
              edit
            </Icon>
          </MDBox>
        ),
      },
      {
        id: 3,
        currency: "SGD",
        country: (
          <div>
            <Flag code="SG" style={{ width: "20px", marginRight: "10px" }} />
            Singapore
          </div>
        ),
        rate: "0.31254",
        ratio: "1",
        status: (
          <Switch
            checked={true}
            onChange={(event) => handleStatusChange(1, event.target.checked)}
          />
        ),
        action: (
          <MDBox display="flex" gap={1} alignItems="center">
            <Icon
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() =>
                handleEditClick({
                  currency: "SGD",
                  country: "Singapore",
                  rate: "0.31254",
                  ratio: "1",
                  status: true,
                })
              }
            >
              edit
            </Icon>
          </MDBox>
        ),
      },
      {
        id: 4,
        currency: "JPY",
        country: (
          <div>
            <Flag code="JP" style={{ width: "20px", marginRight: "10px" }} />
            Japan
          </div>
        ),
        rate: "30.50", // Example: 1 MYR = 30.50 JPY
        ratio: "1",
        status: (
          <Switch
            checked={true}
            onChange={(event) => handleStatusChange(1, event.target.checked)}
          />
        ),
        action: (
          <MDBox display="flex" gap={1} alignItems="center">
            <Icon
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() =>
                handleEditClick({
                  currency: "JPY",
                  country: "Japan",
                  rate: "30.50",
                  ratio: "1",
                  status: true,
                })
              }
            >
              edit
            </Icon>
          </MDBox>
        ),
      },
      {
        id: 5,
        currency: "KRW",
        country: (
          <div>
            <Flag code="KR" style={{ width: "20px", marginRight: "10px" }} />
            Korea
          </div>
        ),
        rate: "280", // Example: 1 MYR = 280 KRW
        ratio: "1",
        status: (
          <Switch
            checked={true} // Set this based on your logic (1 for true, 0 for false)
            onChange={(event) => handleStatusChange(1, event.target.checked)} // Pass the id and the new status
          />
        ),
        action: (
          <MDBox display="flex" gap={1} alignItems="center">
            <Icon
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() =>
                handleEditClick({
                  currency: "KRW",
                  country: "Korea",
                  rate: "280",
                  ratio: "1",
                  status: true,
                })
              }
            >
              edit
            </Icon>
          </MDBox>
        ),
      },
      {
        id: 6,
        currency: "VND",
        country: (
          <div>
            <Flag code="VN" style={{ width: "20px", marginRight: "10px" }} />
            Vietnam
          </div>
        ),
        rate: "5462", // Example: 1 MYR = 5462 VND
        ratio: "1",
        status: (
          <Switch
            checked={true} // Set this based on your logic (1 for true, 0 for false)
            onChange={(event) => handleStatusChange(1, event.target.checked)} // Pass the id and the new status
          />
        ),
        action: (
          <MDBox display="flex" gap={1} alignItems="center">
            <Icon
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() =>
                handleEditClick({
                  currency: "VND",
                  country: "Vietnam",
                  rate: "5462",
                  ratio: "1",
                  status: true,
                })
              }
            >
              edit
            </Icon>
          </MDBox>
        ),
      },
      {
        id: 7,
        currency: "IDR",
        country: (
          <div>
            <Flag code="ID" style={{ width: "20px", marginRight: "10px" }} />
            Indonesia
          </div>
        ),
        rate: "3300", // Example: 1 MYR = 3300 IDR
        ratio: "1",
        status: (
          <Switch
            checked={true} // Set this based on your logic (1 for true, 0 for false)
            onChange={(event) => handleStatusChange(1, event.target.checked)} // Pass the id and the new status
          />
        ),
        action: (
          <MDBox display="flex" gap={1} alignItems="center">
            <Icon
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() =>
                handleEditClick({
                  currency: "IDR",
                  country: "Indonesia",
                  rate: "3300",
                  ratio: "1",
                  status: true,
                })
              }
            >
              edit
            </Icon>
          </MDBox>
        ),
      },
      {
        id: 8,
        currency: "INR",
        country: (
          <div>
            <Flag code="IN" style={{ width: "20px", marginRight: "10px" }} />
            India
          </div>
        ),
        rate: "18.45", // Example: 1 MYR = 18.45 INR
        ratio: "1",
        status: (
          <Switch
            checked={true} // Set this based on your logic (1 for true, 0 for false)
            onChange={(event) => handleStatusChange(1, event.target.checked)} // Pass the id and the new status
          />
        ),
        action: (
          <MDBox display="flex" gap={1} alignItems="center">
            <Icon
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() =>
                handleEditClick({
                  currency: "INR",
                  country: "India",
                  rate: "18.45",
                  ratio: "1",
                  status: true,
                })
              }
            >
              edit
            </Icon>
          </MDBox>
        ),
      },
    ],
  });

  const handleClickOpen = () => {
    setOpen(true);
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
    setIsSwitchOn(event.target.checked);
  };

  const handleEditClick = async (currencyData: {
    currency: string;
    country: string;
    rate: string;
    ratio: string;
    status: boolean;
  }) => {
    // setEditCurrencyData(currencyData);
    // setEditOpen(true);
    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "GETCURRDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Currency: currencyData.currency,
          Status: currencyData.status ? "1" : "0", // Convert boolean to string "1" or "0"
        }),
      };

      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);

      const dataArray = JSON.parse(response.Data);

      if (response.Status == 1 && dataArray.length > 0) {
        const { Currency, Country, Rate, Ratio, Status } = dataArray[0]; // Destructure the first item

        // // Set the edit currency data and open the edit dialog
        // setEditCurrencyData(currencyData);
        setEditCurrencyData({
          currency: Currency,
          country: Country,
          rate: Rate,
          ratio: Ratio,
          status: Status === "1", // Convert string to boolean
        });
        setEditOpen(true);
      } else {
        alert("An error occurred, please try again.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const storedUsername = localStorage.getItem("username");
  const storedToken = localStorage.getItem("token");

  const handleSubmit = async () => {
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
      handleClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleEditSubmit = async () => {
    // API submit logic for edit
    // handleEditClose();
    if (!editCurrencyData) return; // Ensure editCurrencyData is not null

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
          Status: editCurrencyData.status ? "1" : "0", // Convert boolean to string "1" or "0"
        }),
      };

      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);

      // Optionally handle the response (e.g., show a success message)
      if (response.Status === 1) {
        // Update the table data or handle success
        alert("Currency data updated successfully!");
        // } else {
        //   alert("An error occurred, please try again.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      handleEditClose(); // Close the edit dialog
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

  const selectedDialogCountry =
    currencyOptions.find((option) => option.value === selectedCurrency)?.country || "";

  const handleStatusChange = (id: number, checked: boolean) => {
    console.log(`Status changed for ID: ${id} - New Status: ${checked}`);
  };

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
          <FormControl fullWidth sx={{ mt: 1 }}>
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
                  minHeight: "45px", // Ensure minimum height
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
              value={editCurrencyData?.currency || ""}
              onChange={(e) => {
                const currency = e.target.value;
                setEditCurrencyData({
                  ...editCurrencyData,
                  currency,
                });
              }}
              renderValue={(selected) => {
                const selectedCurrencyOption = currencyOptions.find(
                  (option) => option.value === selected
                );
                return (
                  <Box display="flex" alignItems="center" sx={{ height: "45px" }}>
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
                  minHeight: "45px", // Ensure minimum height
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
            value={
              currencyOptions.find((option) => option.value === editCurrencyData?.currency)
                ?.country || ""
            }
            InputProps={{
              readOnly: true, // Make the country field read-only
            }}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Rate"
            variant="outlined"
            value={editCurrencyData?.rate || ""}
            // onChange={(e) => setEditCurrencyData({ ...editCurrencyData, rate: e.target.value })}
            onChange={(e) => {
              const newRate = e.target.value;
              // Allow numbers and decimals with up to 5 decimal places
              if (/^\d*\.?\d{0,5}$/.test(newRate)) {
                setEditCurrencyData({ ...editCurrencyData, rate: newRate });
              }
            }}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Ratio"
            variant="outlined"
            value={editCurrencyData?.ratio || ""}
            // onChange={(e) => setEditCurrencyData({ ...editCurrencyData, ratio: e.target.value })}
            onChange={(e) => {
              const newRatio = e.target.value;
              // Allow only integers
              if (/^\d*$/.test(newRatio)) {
                setEditCurrencyData({ ...editCurrencyData, ratio: newRatio });
              }
            }}
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={editCurrencyData?.status}
                onChange={(e) =>
                  setEditCurrencyData({ ...editCurrencyData, status: e.target.checked })
                }
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
    </DashboardLayout>
  );
}

export default CurrencyTables;
