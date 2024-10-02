import { Close as CloseIcon } from "@mui/icons-material"; // Import Close Icon
import SecurityIcon from "@mui/icons-material/Security";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Icon,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { apiHandler } from "api/apiHandler";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";

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

  const handleEditClick = async (userId: string) => {
    setSelectedUserId(userId);
    setOpen(true);
    await fetchUserData();
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
      fetchTableData();
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handle2FAChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIs2FAEnabled(event.target.checked);
    fetchTableData();
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
          FilterName: searchValue,
          FilterUid: "",
          FilterStatus: FilterStatus,
        }),
      };
      const response = await apiHandler(apiUrl, params);
      const responseData = JSON.parse(response.Data);
      console.log("master list", responseData);
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
          status: <Switch checked={item.Status === "1"} />,
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
    const newFilterStatus = filterStatus === "0" ? "1" : "0";
    setFilterStatus(newFilterStatus);
    fetchTableData(newFilterStatus, searchValue);
  };

  const handleSearchChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchValue(value);
    fetchTableData(filterStatus, value);
  };

  const fetchUserData = async (uid?: string) => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const userId = uid || selectedUserId;

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
      const parsedData = JSON.parse(response.Data);
<<<<<<< HEAD
=======
      console.log("Master Account User", parsedData);
      // console.log("Parsed Data:", parsedData);
      // console.log("Uid:", parsedData.Uid);
      // console.log("Name:", parsedData.Name);
>>>>>>> e6477a4a89a1c32f2a3cab8cfa3ed34ac1dde2e1

      setDialogUserID(parsedData.Uid);
      setDialogUsername(parsedData.Name);
      setDialogPass(parsedData.Pass);
      setDialogControl(parsedData.Control);
      setDialogTfa(parsedData.Tfa);
      setDialogClass(parsedData.Class);
      setDialogStatus(parsedData.Status);

      setIs2FAEnabled(parsedData.Tfa === "1");
      return parsedData;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleReset2FA = async (userId: string) => {
    try {
<<<<<<< HEAD
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
      } else {
=======
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      const user = await fetchUserData(userId);

      if (user.Tfa === "0") {
>>>>>>> e6477a4a89a1c32f2a3cab8cfa3ed34ac1dde2e1
        alert("Please make sure 2fa is enable before reset.");
      } else {
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
        console.log("response", response);
        if (response.Status === "1") {
          alert("2FA has been reset successfully.");
          await fetchTableData();
        } else {
          alert("Something went wrong.");
        }
        fetchTableData(filterStatus, searchValue);
      }
      fetchTableData();
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const updateUserData = async () => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    // Check for empty passwords and spaces
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
          Status: is2FAEnabled ? "1" : "0",
        }),
      };
      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
      alert("Details Updated Successfully.");
      setNewPassword("");
      setConfirmPassword("");
      handleLockClose();
      fetchTableData(filterStatus, searchValue);
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditSaveClick(selectedUserId)} color="primary">
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
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            value={newPassword} // Bind state variable
            onChange={handleNewPasswordChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword} // Bind state variable
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
