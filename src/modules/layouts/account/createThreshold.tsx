import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import Flag from "react-flagkit";

const CreateThresholdAccount = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [selectedCutOffTime, setSelectedCutOffTime] = useState("");

  const timeZones = [
    { label: "(UTC-12:00) Baker Island", value: "UTC-12:00" },
    { label: "(UTC-11:00) Niue, Samoa", value: "UTC-11:00" },
    { label: "(UTC-10:00) Hawaii", value: "UTC-10:00" },
    { label: "(UTC-09:00) Alaska", value: "UTC-09:00" },
    { label: "(UTC-08:00) Pacific Time (US & Canada)", value: "UTC-08:00" },
    { label: "(UTC-07:00) Mountain Time (US & Canada)", value: "UTC-07:00" },
    { label: "(UTC-06:00) Central Time (US & Canada)", value: "UTC-06:00" },
    { label: "(UTC-05:00) Eastern Time (US & Canada)", value: "UTC-05:00" },
    { label: "(UTC-04:00) Atlantic Time (Canada), Venezuela", value: "UTC-04:00" },
    { label: "(UTC-03:00) Buenos Aires, Brazil", value: "UTC-03:00" },
    { label: "(UTC-02:00) South Georgia & the South Sandwich Islands", value: "UTC-02:00" },
    { label: "(UTC-01:00) Azores, Cape Verde", value: "UTC-01:00" },
    { label: "(UTC+00:00) London, Dublin, Lisbon", value: "UTC+00:00" },
    { label: "(UTC+01:00) Berlin, Madrid, Paris", value: "UTC+01:00" },
    { label: "(UTC+02:00) Cairo, Johannesburg", value: "UTC+02:00" },
    { label: "(UTC+03:00) Moscow, Nairobi, Baghdad", value: "UTC+03:00" },
    { label: "(UTC+04:00) Abu Dhabi, Muscat", value: "UTC+04:00" },
    { label: "(UTC+05:00) Karachi, Tashkent", value: "UTC+05:00" },
    { label: "(UTC+06:00) Dhaka, Almaty", value: "UTC+06:00" },
    { label: "(UTC+07:00) Bangkok, Hanoi, Jakarta", value: "UTC+07:00" },
    { label: "(UTC+08:00) Beijing, Singapore", value: "UTC+08:00" },
    { label: "(UTC+09:00) Tokyo, Seoul", value: "UTC+09:00" },
    { label: "(UTC+10:00) Sydney, Guam", value: "UTC+10:00" },
    { label: "(UTC+11:00) Solomon Islands", value: "UTC+11:00" },
    { label: "(UTC+12:00) Fiji, New Zealand", value: "UTC+12:00" },
  ];

  const countryList = [
    { code: "MY", name: "Malaysia", currency: "MYR" },
    { code: "TH", name: "Thailand", currency: "THB" },
    { code: "VN", name: "Vietnam", currency: "VND" },
    { code: "ID", name: "Indonesia", currency: "IDR" },
    { code: "IN", name: "India", currency: "INR" },
    { code: "KR", name: "Korea", currency: "KRW" },
    { code: "JP", name: "Japan", currency: "JPY" },
    { code: "SG", name: "Singapore", currency: "SGD" },
    { code: "CO", name: "Colombia", currency: "COP" },
  ];

  const bankCodes = [
    { code: "BANK001", name: "Bank A" },
    { code: "BANK002", name: "Bank B" },
    { code: "BANK003", name: "Bank C" },
    { code: "BANK004", name: "Bank D" },
  ];

  const cutOffTimes = [
    { label: "12:00 AM", value: "00:00" },
    { label: "1:00 AM", value: "01:00" },
    { label: "2:00 AM", value: "02:00" },
    { label: "3:00 AM", value: "03:00" },
    { label: "4:00 AM", value: "04:00" },
    { label: "5:00 AM", value: "05:00" },
    { label: "6:00 AM", value: "06:00" },
    { label: "7:00 AM", value: "07:00" },
    { label: "8:00 AM", value: "08:00" },
    { label: "9:00 AM", value: "09:00" },
    { label: "10:00 AM", value: "10:00" },
    { label: "11:00 AM", value: "11:00" },
    { label: "12:00 PM", value: "12:00" },
    { label: "1:00 PM", value: "13:00" },
    { label: "2:00 PM", value: "14:00" },
    { label: "3:00 PM", value: "15:00" },
    { label: "4:00 PM", value: "16:00" },
    { label: "5:00 PM", value: "17:00" },
    { label: "6:00 PM", value: "18:00" },
    { label: "7:00 PM", value: "19:00" },
    { label: "8:00 PM", value: "20:00" },
    { label: "9:00 PM", value: "21:00" },
    { label: "10:00 PM", value: "22:00" },
    { label: "11:00 PM", value: "23:00" },
  ];

  const handleBankCodeChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedBankCode(event.target.value); // Update the selected bank code
  };

  const getSnackbarColor = () => {
    return snackBarTitle.toLowerCase().includes("error") ? "error" : "success";
  };

  const [selectedTimeZone, setSelectedTimeZone] = React.useState("");

  const handleClearTimeZone = () => {
    setSelectedTimeZone(""); // Clear the selected time zone
  };

  const handleTimeZoneChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedTimeZone(event.target.value);
  };

  const handleClearCountry = () => {
    setSelectedCountry(""); // Clear the selected country
    setSelectedCurrency(""); // Clear the currency when country is cleared
  };

  const handleCountryChange = (event: { target: { value: any } }) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);

    // Find the selected country in the country list and set the currency
    const selected = countryList.find((country) => country.code === countryCode);
    setSelectedCurrency(selected ? selected.currency : ""); // Update currency based on selected country
  };

  const handleCutOffTimeChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedCutOffTime(event.target.value); // Update cut off time
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchOn(event.target.checked); // Update switch state
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container pt={2} pb={2} justifyContent="center">
        <Grid item lg={12} xl={8}>
          <Card>
            <MDBox p={2}>
              <MDTypography variant="h4">Create Account Threshold</MDTypography>
            </MDBox>

            <MDBox component="form" pb={2} px={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="standard" sx={{ maxWidth: 500 }}>
                    <Box mb={3}>
                      <InputLabel id="country-label">Country</InputLabel>
                    </Box>
                    <MDBox display="flex" alignItems="center">
                      <Select
                        labelId="country-label"
                        id="country-select"
                        value={selectedCountry}
                        onChange={handleCountryChange} // Update the change handler
                        fullWidth // Ensure it takes the full width of the FormControl
                      >
                        {countryList.map((country) => (
                          <MenuItem key={country.code} value={country.code}>
                            <MDBox display="flex" alignItems="center">
                              <Flag country={country.code} style={{ marginRight: 8 }} />
                              {country.name}
                            </MDBox>
                          </MenuItem>
                        ))}
                      </Select>
                      {selectedCountry && ( // Conditionally render the icon button
                        <IconButton
                          onClick={handleClearCountry} // Call the clear function on click
                          aria-label="clear country"
                          sx={{ marginLeft: 1 }} // Add some spacing
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </MDBox>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Currency"
                    disabled
                    value={selectedCurrency}
                    sx={{ maxWidth: 500 }} // Set the value based on selected currency
                    readOnly // Make the currency input read-only
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="standard" sx={{ maxWidth: 500 }}>
                    <InputLabel id="bank-code-label">Bank Code</InputLabel>
                    <Select
                      labelId="bank-code-label"
                      value={selectedBankCode}
                      onChange={handleBankCodeChange} // Handle bank code change
                    >
                      {bankCodes.map((bank) => (
                        <MenuItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={10}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Account Number"
                    sx={{ maxWidth: 500 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Account Name"
                    sx={{ maxWidth: 500 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDInput fullWidth variant="standard" sx={{ maxWidth: 500 }} label="Login ID" />
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    sx={{ maxWidth: 500 }}
                    label="Login Password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    sx={{ maxWidth: 500 }}
                    label="Security Code"
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDBox display="flex" alignItems="center">
                    <FormControl fullWidth variant="standard" sx={{ maxWidth: 500 }}>
                      <InputLabel id="time-zone-label">Time Zone</InputLabel>
                      <Select
                        labelId="time-zone-label"
                        value={selectedTimeZone}
                        onChange={handleTimeZoneChange}
                      >
                        {timeZones.map((zone, index) => (
                          <MenuItem key={index} value={zone.value}>
                            {zone.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {selectedTimeZone && (
                      <IconButton
                        onClick={handleClearTimeZone}
                        aria-label="clear time zone"
                        sx={{ marginLeft: 1 }}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </MDBox>
                </Grid>

                <Grid item xs={12}>
                  <MDBox display="flex" alignItems="center">
                    <FormControl fullWidth variant="standard" sx={{ maxWidth: 500 }}>
                      <InputLabel id="cut-off-time-label">Cut Off Time</InputLabel>
                      <Select
                        labelId="cut-off-time-label"
                        value={selectedCutOffTime}
                        onChange={handleCutOffTimeChange} // Handle cut off time change
                      >
                        {cutOffTimes.map((time) => (
                          <MenuItem key={time.value} value={time.value}>
                            {time.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>

                <Grid item xs={12}>
                  <MDBox display="flex" justifyContent="space-between" width="100%">
                    <MDInput
                      variant="standard"
                      sx={{ width: "48%" }} // Adjust width for better spacing
                      label="Daily In Limit $"
                    />
                    <MDInput
                      variant="standard"
                      sx={{ width: "48%" }} // Adjust width for better spacing
                      label="Daily Out Limit $"
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12}>
                  <MDBox display="flex" justifyContent="space-between" width="100%">
                    <MDInput
                      variant="standard"
                      sx={{ width: "48%" }} // Adjust width for better spacing
                      label="Daily In Limit #"
                    />
                    <MDInput
                      variant="standard"
                      sx={{ width: "48%" }} // Adjust width for better spacing
                      label="Daily Out Limit #"
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12}>
                  <MDBox display="flex" alignItems="center">
                    <MDTypography variant="button">Status</MDTypography>
                    <Icon style={{ marginLeft: 8, marginRight: 8 }}>visibility</Icon>
                    <Switch
                      checked={isSwitchOn} // Bind the checked state to isSwitchOn
                      onChange={handleSwitchChange} // Call handleSwitchChange on toggle
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                flexWrap="wrap"
                mt={6}
              >
                <MDBox display="flex" gap={2} justifyContent="flex-end" width="100%">
                  <MDButton variant="gradient" color="dark" size="small">
                    Create
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
      {/* Conditionally render the MDSnackbar */}
      <MDSnackbar
        open={success}
        color={getSnackbarColor()}
        title={snackBarTitle}
        close={() => setSuccess(false)} // Close the snackbar
      />
    </DashboardLayout>
  );
};

export default CreateThresholdAccount;
