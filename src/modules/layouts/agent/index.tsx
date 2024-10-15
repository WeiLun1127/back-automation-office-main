import React, { useState, useEffect } from "react";
import {
  Card,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  Switch,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  Typography,
} from "@mui/material";
import { CheckBox, Close as CloseIcon } from "@mui/icons-material"; // Import Close Icon
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { apiHandler } from "api/apiHandler";
import SecurityIcon from "@mui/icons-material/Security";
import MDSnackbar from "components/MDSnackbar";
import MDInput from "components/MDInput";
import SearchIcon from "@mui/icons-material/Search";

const AgentList = () => {
  const [open, setOpen] = useState(false); // State for controlling the dialog visibility
  const [lockDialogOpen, setLockDialogOpen] = useState(false);
  const [horizOpen, setHorizOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected user ID
  const [tableRows, setTableRows] = useState([]); // State to store rows for the DataTable
  const [filterStatus, setFilterStatus] = useState("1"); // Default to "1"
  const [searchValue, setSearchValue] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [dialogUserID, setDialogUserID] = useState("");
  const [dialogUsername, setDialogUsername] = useState("");
  const [dialogPass, setDialogPass] = useState("");
  const [dialogControl, setDialogControl] = useState("");
  const [dialogTfa, setDialogTfa] = useState("");
  const [dialogClass, setDialogClass] = useState("");
  const [dialogStatus, setDialogStatus] = useState("");
  const [newPassword, setNewPassword] = useState(""); // State for the new password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusClickCount, setStatusClickCount] = useState(0); // Track the number of clicks
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [success, setSuccess] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState("");

  const [tuneDialogOpen, setTuneDialogOpen] = useState(false); // For controlling the tune dialog visibility
  const [keyDialogOpen, setKeyDialogOpen] = useState(false);
  const [yesDialogOpen, setYesDialogOpen] = useState(false);
  const [controlData, setControlData] = useState(null); // State for storing control data from the API
  const [tuneDialogControl, setTuneDialogControl] = useState(""); // Control selected in the dropdown in Tune
  const [tuneDialogUserId, setTuneDialogUserId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
    { label: "Account Group", value: "accountGroup" },
    { label: "Account Threshold List", value: "accountThresholdList" },
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

  const handleTuneClick = async (userId: any) => {
    setSelectedUserId(userId);
    setTuneDialogOpen(true);
    setTuneDialogUserId(userId);
    try {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const params = {
        EXECF: "GETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          FilterUid: userId,
        }),
      };
      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);

      const decodedString = response.Data.replace(/\\u0022/g, '"')
        .replace('"[{', "[{")
        .replace('}]"', "}]");
      const parsedData = JSON.parse(decodedString);
      console.log("Control Data:", parsedData.Control);

      const controlKeys = parsedData.Control.map((item: any) => Object.keys(item)[0]);
      console.log(controlKeys);

      // Map control values to control names using the controlMapping
      const controlNames = controlKeys.map((key: string) => {
        const option = controlOptions.find((opt) => controlMapping[opt.value].includes(key));
        return option ? option.label : key; // Fallback to key if no label is found
      });

      console.log("Mapped Control Names:", controlNames);

      // Set the control names instead of the control values
      setControlData(controlNames);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleKeyClick = async (userId: any) => {
    setSelectedUserId(userId);
    setKeyDialogOpen(true);
  };

  const handleEditClick = async (userId: string) => {
    setSelectedUserId(userId);
    setOpen(true);
    // await fetchUserData(userId);
  };

  const handleHorizClick = async (userId: string) => {
    setSelectedUserId(userId);
    setHorizOpen(true);
  };

  const handleHorizClose = () => {
    setHorizOpen(false);
    fetchTableData();
  };

  const handleEditSaveClick = async (userId: string) => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    try {
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const params = {
        EXECF: "SETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Uid: userId,
          Name: dialogUsername,
          Pass: dialogPass,
          Control: dialogControl,
          Tfa: dialogTfa,
          Class: dialogClass,
          Status: dialogStatus,
        }),
      };
      const response = await apiHandler(apiUrl, params);
      setSnackBarTitle("User Details Updated Successfully.");
      setSuccess(true); // Show success snackbar
      handleClose();
    } catch (error) {
      setSnackBarTitle("Error updating user details.");
      setSuccess(true);
    }
  };

  const handleYesClick = async (userId: any) => {
    setSelectedUserId(userId);
    setYesDialogOpen(true);
  };

  const handleYesClose = () => {
    setYesDialogOpen(false);
    setKeyDialogOpen(false);
  };

  const handle2FAChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    const isChecked = event.target.checked;
    setIs2FAEnabled(event.target.checked);
    setDialogTfa(isChecked ? "1" : "0");
    fetchTableData();
  };

  const handleLockClick = async (userId: string) => {
    setLockDialogOpen(true); // Open the lock dialog
    setSelectedUserId(userId);
    await fetchUserData(userId);
  };

  useEffect(() => {
    if (selectedUserId) {
      fetchUserData(selectedUserId);
    }
  }, [selectedUserId]);

  const handleClose = () => {
    setOpen(false);
    fetchTableData();
  };

  const handleTuneClose = () => {
    setTuneDialogOpen(false);
    setSelectedOptions([]);
  };

  const handleKeyClose = () => {
    setKeyDialogOpen(false);
    fetchTableData();
  };

  const handleLockClose = () => {
    setLockDialogOpen(false);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    fetchTableData();
  };

  const fetchTableData = async (FilterStatus = "", searchValue = "") => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    try {
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const params = {
        EXECF: "GETMEMLIST",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          FilterClass: "agt", //agt
          FilterName: searchValue || "",
          FilterUid: "",
          FilterStatus: FilterStatus,
        }),
      };
      const response = await apiHandler(apiUrl, params);
      const responseData = JSON.parse(response.Data);
      console.log(responseData);
      // Map API data to fit DataTable format
      const formattedRows = responseData.map(
        (
          item: {
            Name: any;
            Uid: string;
            Wallet: any;
            CreatedOnUTC: any;
            LastUpdateOnUTC: any;
            LastIP: any;
            LastLoginOnUTC: any;
            Status: any;
          },
          index: number
        ) => ({
          id: index + 1, // Generate an ID based on index
          user: item.Name,
          user_id: item.Uid,
          wallet: (
            <div style={{ paddingLeft: "12px" }}>
              {" "}
              {/* Wrapping Icon in a div with padding */}
              <Icon
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={() => handleHorizClick(item.Uid)}
              >
                more_horiz
              </Icon>
            </div>
          ),
          last_create: item.CreatedOnUTC,
          last_update: item.LastUpdateOnUTC,
          last_ip: item.LastIP,
          last_login: item.LastLoginOnUTC,
          status: (
            <Switch
              checked={item.Status === "1"}
              onChange={() => handleStatusChange(item.Uid, item.Status === "1" ? "0" : "1")}
            />
          ),
          action: (
            <MDBox display="flex" gap={2} alignItems="center">
              <Icon
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={() => handleLockClick(item.Uid)}
              >
                lockperson
              </Icon>
              <Icon
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={() => handleEditClick(item.Uid)}
              >
                edit
              </Icon>
              <Icon
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={() => handleTuneClick(item.Uid)}
              >
                tune
              </Icon>
              <Icon
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={() => handleKeyClick(item.Uid)} // Function to handle key icon click
              >
                key
              </Icon>
              <MDButton
                variant="outlined"
                color="dark"
                size="small"
                style={{
                  cursor: "pointer",
                  fontSize: "0.75rem", // Smaller font size
                  padding: "4px 8px", // Adjust padding for a smaller button
                  minWidth: "auto", // Ensure button size fits the text
                  height: "auto",
                }}
                onClick={() => handleReset2FA(item.Uid)}
              >
                Reset 2FA
              </MDButton>
            </MDBox>
          ),
        })
      );

      setTableRows(formattedRows); // Set the rows for DataTable
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleStatusHeaderClick = () => {
    let newFilterStatus = "";
    let newClickCount = statusClickCount + 1;

    if (newClickCount === 1) {
      newFilterStatus = "1";
    } else if (newClickCount === 2) {
      newFilterStatus = "0";
    } else {
      newFilterStatus = "";
      newClickCount = 0;
    }

    setStatusClickCount(newClickCount);
    setFilterStatus(newFilterStatus);
    fetchTableData(newFilterStatus, searchValue);
  };

  const handleSearchChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchValue(value);
    // fetchTableData(filterStatus, value);
    if (value.trim() === "") {
      fetchTableData(); // Fetch without the search value
    } else {
      fetchTableData(filterStatus, value); // Fetch with the search value
    }
  };

  const getSnackbarColor = () => {
    return snackBarTitle.toLowerCase().includes("error") ? "error" : "success";
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false); // Automatically hide the snackbar after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when success changes
    }
  }, [success]);

  const handleStatusChange = async (userId: string, newStatus: string) => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    try {
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const params = {
        EXECF: "SETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Uid: userId,
          Status: newStatus, // Update the status based on switch toggle
        }),
      };

      const response = await apiHandler(apiUrl, params);
      if (response.Status === "1") {
        // alert("User status updated successfully.");
        setSnackBarTitle("User status updated successfully.");
        setSuccess(true);
        setTimeout(() => fetchTableData(), 1000); // Refresh the table data after status change
      } else {
        // alert("Error updating user status.");
        setSnackBarTitle("Error updating user status.");
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error during status update:", error);
      setSnackBarTitle("Error updating user status.");
      setSuccess(true);
    }
  };

  const fetchUserData = async (userId: string) => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    try {
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const params = {
        EXECF: "GETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          FilterUid: userId,
        }),
      };
      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
      const parsedData = JSON.parse(response.Data);

      setDialogUserID(parsedData.Uid);
      setDialogUsername(parsedData.Name);
      setDialogPass(parsedData.Pass);
      setDialogControl(parsedData.Control);
      setDialogTfa(parsedData.Tfa);
      setDialogClass(parsedData.Class);
      setDialogStatus(parsedData.Status);

      setIs2FAEnabled(parsedData.Tfa === "1");
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleReset2FA = async (userId: string) => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    try {
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const params = {
        EXECF: "GETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          FilterUid: userId,
        }),
      };
      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
      const parsedData = JSON.parse(response.Data);
      if (parsedData.Tfa === "1") {
        try {
          const apiUrl = "http://18.138.168.43:10311/api/execmem";
          const params = {
            EXECF: "SETAUTHDATA",
            Uid: storedUsername,
            Token: storedToken,
            Data: JSON.stringify({
              Uid: userId,
              Name: parsedData.Name,
              Pass: parsedData.Pass,
              Control: parsedData.Control,
              Tfa: "0",
              Class: parsedData.Class,
              Status: parsedData.Status,
            }),
          };
          const response = await apiHandler(apiUrl, params);
          // alert("2FA Reset Successfully.");
          setSnackBarTitle("2FA Reset Successfully.");
          setSuccess(true);
        } catch (error) {
          console.error("Error during API call:", error);
          setSnackBarTitle("Error resetting 2FA.");
          setSuccess(true);
        }
      } else {
        // alert("Please make sure you enable 2FA.");
        setSnackBarTitle("Please make sure you enable 2FA.");
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setSnackBarTitle("Error resetting 2FA.");
      setSuccess(true);
    }
  };

  const updateUserData = async () => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (/\s/.test(newPassword) || /\s/.test(confirmPassword)) {
      setPasswordError("Passwords cannot contain spaces.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setPasswordError("");

    try {
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const params = {
        EXECF: "SETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Uid: selectedUserId,
          Name: dialogUsername,
          Pass: newPassword,
          Control: dialogControl,
          Tfa: dialogTfa,
          Class: dialogClass,
          Status: dialogStatus,
        }),
      };
      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
      // alert("Details Updated Successfully.");
      setSnackBarTitle("Details Updated Successfully.");
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      handleLockClose();
      fetchTableData();
      const parsedData = JSON.parse(response.Data);
      console.log("Parsed Data:", parsedData);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    // Check for password match
    if (value !== confirmPassword) {
      setPasswordError("New password and confirm password must match.");
    } else {
      setPasswordError(""); // Clear error if passwords match
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    // Check for password match
    if (value !== newPassword) {
      setPasswordError("New password and confirm password must match.");
    } else {
      setPasswordError(""); // Clear error if passwords match
    }
  };

  const isButtonDisabled = !newPassword || newPassword !== confirmPassword;

  const dataTableData = {
    columns: [
      { Header: "id", accessor: "id", width: "1%", disableSortBy: true },
      { Header: "username", accessor: "user", width: "4%", disableSortBy: true },
      { Header: "userid", accessor: "user_id", width: "7%", disableSortBy: true },
      { Header: "wallet", accessor: "wallet", width: "7%", disableSortBy: true },
      { Header: "created on", accessor: "last_create", width: "10%", disableSortBy: true },
      { Header: "updated on", accessor: "last_update", width: "10%", disableSortBy: true },
      { Header: "last login", accessor: "last_login", width: "10%", disableSortBy: true },
      { Header: "last ip", accessor: "last_ip", width: "7%", disableSortBy: true },
      {
        Header: (
          <span style={{ cursor: "pointer" }} onClick={handleStatusHeaderClick}>
            Status
          </span>
        ),
        accessor: "status",
        width: "7%",
        disableSortBy: true,
      },
      { Header: "action", accessor: "action", width: "7%", disableSortBy: true },
    ],
    rows: tableRows,
  };

  const controlTuneSaveClick = async (userId: string) => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
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
          Control: JSON.stringify(controlArray),
        }),
      };
      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);

      // Check if response.Status is 1
      if (response.Status === "1") {
        // setSuccess(true);
        setSnackBarTitle("Control Updated Successfully");
        setSuccess(true);
      } else {
        // alert("Error Occured. Please Try Again Shortly");
        setSnackBarTitle("Error Occured. Please Try Again Shortly");
        setSuccess(true);
      }
      setSelectedOptions([]);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={3} pb={3}>
        <Card>
          <MDBox p={2}>
            {/* <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search"
              style={{
                padding: "10px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            /> */}
            <Typography variant="h6" sx={{ marginTop: 5 }}>
              Agent List
            </Typography>
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
          <DataTable table={dataTableData} />
        </Card>
      </MDBox>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: "black" }}>
          Edit User
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
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            paddingLeft="10px"
            style={{ color: "black", textDecoration: "underline" }}
          >
            {selectedUserId}
          </DialogContentText>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={dialogUsername}
            onChange={(e) => setDialogUsername(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField fullWidth label="Phone Number" variant="outlined" sx={{ mt: 2 }} />
          <TextField fullWidth label="Email" variant="outlined" sx={{ mt: 2 }} />
          <TextField
            fullWidth
            label="Remark"
            variant="outlined"
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                minHeight: "80px", // Adjust height here
                "& fieldset": {
                  borderWidth: "1px", // Optional: Increase border thickness
                },
              },
            }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Time Zone</InputLabel>
            <Select
              label="Time Zone"
              value={selectedTimeZone}
              onChange={(e) => setSelectedTimeZone(e.target.value)}
              sx={{
                minWidth: 60, // Adjust the width of the dropdown
                height: 45, // Adjust the height of the dropdown field
              }}
            >
              {timeZones.map((zone) => (
                <MenuItem key={zone.value} value={zone.value}>
                  {zone.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditSaveClick(selectedUserId)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={tuneDialogOpen}
        onClose={handleTuneClose}
        fullWidth={true}
        maxWidth="lg" // Sets the max width to a larger size
        sx={{
          "& .MuiDialog-paper": {
            // Customize dialog paper size
            width: "600px", // Set custom width
            height: "400px", // Set custom height
          },
        }}
      >
        <DialogTitle>
          Control Data
          <IconButton
            aria-label="close"
            onClick={handleTuneClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            disabled
            label="UserId"
            variant="outlined"
            value={tuneDialogUserId}
            sx={{ mt: 2 }}
          />
          <Autocomplete
            sx={{ paddingLeft: 1, maxWidth: 550, mt: 2 }}
            multiple
            options={controlOptions.filter((option) => !selectedOptions.includes(option.value))}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Control" fullWidth />
            )}
            value={selectedOptions.map((optionValue) =>
              controlOptions.find((option) => option.value === optionValue)
            )}
            onChange={(event, value) => setSelectedOptions(value.map((option) => option.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => controlTuneSaveClick(selectedUserId)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={lockDialogOpen} onClose={handleLockClose}>
        <DialogTitle style={{ color: "black" }}>
          Change Password
          <IconButton
            aria-label="close"
            onClick={handleLockClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="UserID"
            variant="outlined"
            value={dialogUserID}
            InputProps={{
              readOnly: true,
            }}
            disabled
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={handleNewPasswordChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={is2FAEnabled}
                onChange={handle2FAChange}
                name="enable2FA"
                color="primary"
              />
            }
            label={
              <Box display="flex" alignItems="center">
                <span>Enable 2FA</span>
                <SecurityIcon sx={{ ml: 1 }} />
              </Box>
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={updateUserData} color="primary" disabled={isButtonDisabled}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={horizOpen} onClose={handleHorizClose}>
        <DialogTitle style={{ color: "black" }}>
          Wallet
          <IconButton
            aria-label="close"
            onClick={handleHorizClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="UserID"
            variant="outlined"
            value={dialogUserID}
            InputProps={{
              readOnly: true,
            }}
            disabled
            sx={{ mt: 2 }}
          />
          <TextField fullWidth label="Today Balance" variant="outlined" sx={{ mt: 2 }} />
          <TextField fullWidth label="Yesterday Balance" variant="outlined" sx={{ mt: 2 }} />
          <TextField fullWidth label="Widthdrawable Balance" variant="outlined" sx={{ mt: 2 }} />
          <TextField fullWidth label="Cashout Limit" variant="outlined" sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mt: 2 }}></DialogActions>
      </Dialog>

      <Dialog open={keyDialogOpen} onClose={handleYesClose}>
        <DialogTitle style={{ color: "black" }}>
          Change API
          <IconButton
            aria-label="close"
            onClick={handleKeyClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="UserID"
            variant="outlined"
            value={dialogUserID}
            InputProps={{
              readOnly: true,
            }}
            disabled
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={dialogUsername}
            InputProps={{
              readOnly: true,
            }}
            disabled
            sx={{ mt: 2 }}
          />
          <Typography
            variant="body1"
            sx={{ mt: 2, textAlign: "center", fontSize: "0.9rem" }} // Smaller body text font size
          >
            Are you sure you want to generate a new API key?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button onClick={handleYesClick}>Yes</Button>
          <Button onClick={handleKeyClose} sx={{ ml: 2 }}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={yesDialogOpen} onClose={handleYesClose}>
        <DialogTitle style={{ color: "black" }}>
          Change API
          <IconButton
            aria-label="close"
            onClick={handleYesClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="UserID"
            variant="outlined"
            value={dialogUserID}
            InputProps={{
              readOnly: true,
            }}
            disabled
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={dialogUsername}
            InputProps={{
              readOnly: true,
            }}
            disabled
            sx={{ mt: 2 }}
          />
          <Typography
            variant="body1"
            sx={{ mt: 2, textAlign: "center", fontSize: "0.9rem" }} // Smaller body text font size
          >
            New Key:
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mt: 2 }}></DialogActions>
      </Dialog>

      <MDSnackbar
        open={success}
        color={getSnackbarColor()}
        title={snackBarTitle}
        close={() => setSuccess(false)} // Close the snackbar
      />
    </DashboardLayout>
  );
};

export default AgentList;
