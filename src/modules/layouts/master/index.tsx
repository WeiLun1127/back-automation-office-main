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
  const [newPassword, setNewPassword] = useState(""); // State for the new password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusClickCount, setStatusClickCount] = useState(0); // Track the number of clicks

  const handleEditClick = async (userId: string) => {
    setSelectedUserId(userId);
    setOpen(true);
    // await fetchUserData(userId);
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
      // if (response.Status === "1") {
      //   alert("User Details Updated Successfully.");
      // } else {
      //   alert("Error Update User Details.");
      // }
      alert("User Details Updated Successfully.");
      handleClose();
    } catch (error) {
      console.error("Error during API call:", error);
    }
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
          FilterClass: "mtr",
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
    // const newFilterStatus = filterStatus === "0" ? "1" : "0";
    // setFilterStatus(newFilterStatus);
    // fetchTableData(newFilterStatus, searchValue);

    let newFilterStatus = "";
    let newClickCount = statusClickCount + 1;

    if (newClickCount === 1) {
      newFilterStatus = "1"; // First click: filter active
    } else if (newClickCount === 2) {
      newFilterStatus = "0"; // Second click: filter inactive
    } else {
      newFilterStatus = ""; // Third click: no filtering
      newClickCount = 0; // Reset count after third click
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
        alert("User status updated successfully.");
        fetchTableData(); // Refresh the table data after status change
      } else {
        alert("Error updating user status.");
      }
    } catch (error) {
      console.error("Error during status update:", error);
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
          alert("2FA Reset Successfully.");
        } catch (error) {
          console.error("Error during API call:", error);
        }
      } else {
        alert("Please make sure you enable 2FA.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
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
      alert("Details Updated Successfully.");
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
          <TextField fullWidth label="Time Zone" variant="outlined" sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditSaveClick(selectedUserId)} color="primary">
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
          {/* <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={dialogUsername}
            InputProps={{
              readOnly: true,
            }}
            disabled
            sx={{ mt: 2 }}
          /> */}
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
    </DashboardLayout>
  );
};

export default MasterList;
