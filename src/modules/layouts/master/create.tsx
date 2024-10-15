import SecurityIcon from "@mui/icons-material/Security";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Autocomplete,
  Card,
  Checkbox,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { apiHandler } from "api/apiHandler";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React from "react";
import { SetStateAction, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MDSnackbar from "components/MDSnackbar";

const CreateMasterAccount = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [prefix, setPrefix] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isTfaSwitchOn, setIsTfaSwitchOn] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "dashboard",
    "controller",
    "api",
    "agent",
    "createAgent",
    "agentList",
    "agentProduct",
    "report",
    "transactionSummary",
    "transactionReport",
    "accountProvider",
    "createAccountProvider",
    "providerList",
    "security",
    "authentication",
  ]);
  const [success, setSuccess] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState("");

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

  const handlePasswordChange = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value);
  };

  const controlOptions = [
    { label: "Controller", value: "controller" },
    { label: "API", value: "api" },
    { label: "Accessibility", value: "accessibility" },
    { label: "Dashboard", value: "dashboard" },
    { label: "Master", value: "master" },
    { label: "Create Master Account", value: "createMasterAccount" },
    { label: "Master List", value: "masterList" },
    { label: "Product Control", value: "productControl" },
    { label: "Agent", value: "agent" },
    { label: "Create Agent", value: "createAgent" },
    { label: "Agent List", value: "agentList" },
    { label: "Agent Product", value: "agentProduct" },
    { label: "Account", value: "account" },
    { label: "Create Account Threshold", value: "createAccountThreshold" },
    { label: "Account Threshold List", value: "accountThresholdList" },
    { label: "Account Group", value: "accountGroup" },
    { label: "Product", value: "product" },
    { label: "Product List Company", value: "productListCompany" },
    { label: "Product List Agent", value: "productListAgent" },
    { label: "Report", value: "report" },
    { label: "Transaction Summary", value: "transactionSummary" },
    { label: "Transaction Report", value: "transactionReport" },
    { label: "Currency", value: "currency" },
    { label: "Currency List", value: "currencyList" },
    { label: "Account Provider", value: "accountProvider" },
    { label: "Create Account Provider", value: "createAccountProvider" },
    { label: "Provider List", value: "providerList" },
    { label: "Security", value: "security" },
    { label: "Authentication", value: "authentication" },
  ];

  const controlMapping: { [key: string]: string[] } = {
    controller: ["001"],
    api: ["001.001"],
    accessibility: ["001.002"],
    dashboard: ["002"],
    master: ["003"],
    createMasterAccount: ["003.001"],
    masterList: ["003.002"],
    productControl: ["003.003"],
    agent: ["004"],
    createAgent: ["004.001"],
    agentList: ["004.002"],
    agentProduct: ["004.003"],
    account: ["005"],
    createAccountThreshold: ["005.001"],
    accountTresholdList: ["005.002"],
    accountGroup: ["005.003"],
    product: ["006"],
    productListCompany: ["006.001"],
    productListAgent: ["006.002"],
    report: ["007"],
    transactionSummary: ["007.001"],
    transactionReport: ["007.002"],
    currency: ["008"],
    currencyList: ["008.001"],
    accountProvider: ["009"],
    createAccountProvider: ["009.001"],
    providerList: ["009.002"],
    security: ["010"],
    authentication: ["010.001"],
  };

  const handleConfirmPasswordChange = (e: { target: { value: SetStateAction<string> } }) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleMouseUpPassword = () => {
    setShowPassword(false);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(true);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchOn(event.target.checked); // Update switch state
  };

  const handleTfaSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTfaSwitchOn(event.target.checked); // Update switch state
  };

  const handleNextButtonClick = async () => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    localStorage.setItem("userId", userId);
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    try {
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const selectedControlValues = selectedOptions.flatMap((option) => controlMapping[option]);
      const controlArray = selectedControlValues.map((control) => ({
        [control]: "1",
      }));

      const params = {
        EXECF: "SETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Uid: userId,
          Name: name,
          Pass: password,
          Control: JSON.stringify(controlArray),
          Tfa: isTfaSwitchOn ? "1" : "0",
          Class: "mtr",
          Status: isSwitchOn ? "1" : "0", // Convert boolean to string "1" or "0"
        }),
      };
      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);

      // Check if response.Status is 1
      if (response.Status === "1") {
        // setSuccess(true);
        setSnackBarTitle("Master Account Created Successfully");
        setSuccess(true);
        setUserId("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setSelectedOptions([]);
        setIsSwitchOn(false);
        setIsTfaSwitchOn(false);
      } else {
        // alert("Error Occured. Please Try Again Shortly");
        setSnackBarTitle("Error Occured. Please Try Again Shortly");
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container pt={3} pb={3} justifyContent="center">
        <Grid item lg={12} xl={8}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h4">Create Master Account</MDTypography>
            </MDBox>

            <MDBox component="form" pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="User ID"
                    value={userId}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>
                      setUserId(e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Name"
                    value={name}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>
                      setName(e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Password"
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    value={password}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          onMouseLeave={handleMouseUpPassword} // Ensure visibility is disabled when mouse leaves
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!passwordError}
                    helperText={passwordError}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          onMouseLeave={handleMouseUpPassword} // Ensure visibility is disabled when mouse leaves
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Level"
                    value="MTR"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={controlOptions.filter(
                      (option) => !selectedOptions.includes(option.value)
                    )}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" label="Control" fullWidth />
                    )}
                    value={selectedOptions.map((optionValue) =>
                      controlOptions.find((option) => option.value === optionValue)
                    )}
                    onChange={(event, value) =>
                      setSelectedOptions(value.map((option) => option.value))
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDBox display="flex" alignItems="center">
                    <FormControl fullWidth variant="standard">
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
                    <MDTypography variant="button">Enable 2FA</MDTypography>
                    <SecurityIcon style={{ marginLeft: 8, marginRight: 8 }} />
                    <Checkbox checked={isTfaSwitchOn} onChange={handleTfaSwitchChange} />
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
                  <MDButton
                    variant="gradient"
                    color="dark"
                    size="small"
                    onClick={handleNextButtonClick}
                  >
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

export default CreateMasterAccount;
