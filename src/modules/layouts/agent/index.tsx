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
} from "@mui/material";
import { CheckBox, Close as CloseIcon } from "@mui/icons-material"; // Import Close Icon
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { apiHandler } from "api/apiHandler";
import SecurityIcon from "@mui/icons-material/Security";

const MasterList = () => {
  const [open, setOpen] = useState(false); // State for controlling the dialog visibility
  const [lockDialogOpen, setLockDialogOpen] = useState(false);
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

  const [currentPassword, setCurrentPassword] = useState(""); // State for the current password
  const [newPassword, setNewPassword] = useState(""); // State for the new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming the new password
  const [passwordError, setPasswordError] = useState("");

  // Function to handle the edit button click
  const handleEditClick = (userId: string) => {
    setSelectedUserId(userId); // Set the selected user ID (optional)
    setOpen(true); // Open the dialog
  };

  const handle2FAChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIs2FAEnabled(event.target.checked);
  };

  const handleLockClick = async (userId: string) => {
    setLockDialogOpen(true); // Open the lock dialog
    setSelectedUserId(userId); // Set the selected user ID

    await fetchUserData();
  };

  useEffect(() => {
    if (selectedUserId) {
      fetchUserData();
    }
  }, [selectedUserId]);

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
    fetchTableData(filterStatus, searchValue);
  };

  const handleLockClose = () => {
    setLockDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    fetchTableData(filterStatus, searchValue);
  };

  // Fetch data from API and populate table rows
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
          FilterClass: "agt",
          FilterName: searchValue,
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
          last_create: item.CreatedOnUTC,
          last_update: item.LastUpdateOnUTC,
          last_ip: item.LastIP,
          last_login: item.LastLoginOnUTC,
          // status: item.Status,
          status: <Switch checked={item.Status === "1"} disabled />,
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

  // Call fetchTableData when the component mounts
  useEffect(() => {
    fetchTableData();
  }, []); // Empty dependency array to run only once on mount

  const handleStatusHeaderClick = () => {
    const newFilterStatus = filterStatus === "0" ? "1" : "0";
    setFilterStatus(newFilterStatus);
    fetchTableData(newFilterStatus, searchValue);
  };

  const handleSearchChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchValue(value);
    fetchTableData(filterStatus, value);
  };

  const fetchUserData = async () => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (!selectedUserId) {
      console.error("No user selected for fetching data.");
      return;
    }
    try {
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const params = {
        EXECF: "GETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          FilterUid: selectedUserId,
        }),
      };
      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
      const parsedData = JSON.parse(response.Data);
      // console.log("Parsed Data:", parsedData);
      // console.log("Uid:", parsedData.Uid);
      // console.log("Name:", parsedData.Name);

      setDialogUserID(parsedData.Uid);
      setDialogUsername(parsedData.Name);
      setDialogPass(parsedData.Pass);
      setDialogControl(parsedData.Control);
      setDialogTfa(parsedData.Tfa);
      setDialogClass(parsedData.Class);
      setDialogStatus(parsedData.Status);
      setIs2FAEnabled(parsedData.Status === "1");

      // console.log("Pass:", parsedData.Pass);
      // console.log("Control:", parsedData.Control);
      // console.log("Tfa:", parsedData.Tfa);
      // console.log("TfaKey:", parsedData.TfaKey);
      // console.log("Class:", parsedData.Class);
      // console.log("Prefix:", parsedData.Prefix);
      // console.log("Status:", parsedData.Status);
      // console.log("OtpAuth:", parsedData.OtpAuth);

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
        EXECF: "SETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Uid: userId,
          Name: dialogUsername,
          Pass: dialogPass,
          Control: dialogControl,
          Tfa: "0",
          Class: dialogClass,
          Status: dialogStatus,
        }),
      };
      const response = await apiHandler(apiUrl, params);
      if (response.Status === "1") {
        alert("2FA has been reset successfully.");
        await fetchTableData();
      } else {
        alert("Please make sure 2fa is enable before reset.");
      }
      fetchTableData(filterStatus, searchValue);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const updateUserData = async () => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    // Check for empty passwords and spaces
    if (!currentPassword || !newPassword || !confirmPassword) {
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

    if (dialogPass === currentPassword) {
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
            Status: is2FAEnabled ? "1" : "0",
          }),
        };
        const response = await apiHandler(apiUrl, params);
        console.log("API Response:", response);
        if (response.Status === "1") {
          alert("Details Updated Successfully.");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          handleLockClose();
          fetchTableData(filterStatus, searchValue); // Pass filter and search value
        }
        const parsedData = JSON.parse(response.Data);
        console.log("Parsed Data:", parsedData);
      } catch (error) {
        console.error("Error during API call:", error);
      }
    } else alert("Please make sure you have input a correct password");
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
      { Header: "last create", accessor: "last_create", width: "10%", disableSortBy: true },
      { Header: "last update", accessor: "last_update", width: "10%", disableSortBy: true },
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

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={3} pb={3}>
        <Card>
          <MDBox p={2}>
            <input
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
            />
          </MDBox>
          <DataTable table={dataTableData} />
        </Card>
      </MDBox>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
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
          <DialogContentText>
            You are editing the details for User ID: {selectedUserId}.
          </DialogContentText>
          <TextField fullWidth label="Name" variant="outlined" sx={{ mt: 2 }} />
          <TextField fullWidth label="Phone Number" variant="outlined" sx={{ mt: 2 }} />
          <TextField fullWidth label="Email" variant="outlined" sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={lockDialogOpen} onClose={handleLockClose}>
        <DialogTitle>
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
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Current Password"
            variant="outlined"
            type="password" // Ensure password is hidden
            value={currentPassword} // Bind state variable
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            value={newPassword} // Bind state variable
            // onChange={(e) => setNewPassword(e.target.value)}
            onChange={handleNewPasswordChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword} // Bind state variable
            // onChange={(e) => setConfirmPassword(e.target.value)}
            onChange={handleConfirmPasswordChange} // Updated handler for confirm password
            error={!!passwordError} // Show error styling if there's an error
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
    </DashboardLayout>
  );
};

export default MasterList;
