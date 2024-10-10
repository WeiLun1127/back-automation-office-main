import { Card, Checkbox, Grid, IconButton, InputAdornment } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import SecurityIcon from "@mui/icons-material/Security";
import { SetStateAction, useState } from "react";
import { apiHandler } from "api/apiHandler";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { QRCodeSVG } from "qrcode.react";
import MDSnackbar from "components/MDSnackbar";

const Authentication = () => {
  // States to manage input values
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showPasswords, setShowPasswords] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [totpUri, setTotpUri] = useState(""); // State to store TOTP URI
  const [totpKey, setTotpKey] = useState("");

  const [success, setSuccess] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState("");

  const getSnackbarColor = () => {
    return snackBarTitle.toLowerCase().includes("error") ? "error" : "success";
  };

  // Event handler for the "Next" button
  const handleNextClick = async () => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (!currentPassword || !newPassword) {
      console.error("Both the current password and new password fields must be filled.");
      setSnackBarTitle("Error. Both the current password and new password fields must be filled.");
      setSuccess(true);
      // alert("Both the current password and new password fields must be filled."); // Show an alert or any other UI feedback
      return; // Exit the function if either field is empty
    }

    // Check if the new password is the same as the current password
    if (currentPassword === newPassword) {
      console.error("The new password cannot be the same as the current password.");
      setSnackBarTitle("Error. The new password cannot be the same as the current password.");
      setSuccess(true);
      // alert("The new password cannot be the same as the current password."); // Show an alert or any other UI feedback
      return; // Exit the function if the passwords are the same
    }
    const apiUrl = "http://18.138.168.43:10311/api/execmem";
    const params = {
      EXECF: "GETAUTHDATA",
      Uid: storedUsername, // Use the stored username
      Token: storedToken, // Use the stored token
      Data: JSON.stringify({
        FilterUid: storedUsername,
      }),
    };

    try {
      const response = await apiHandler(apiUrl, params);
      const storedUsername = localStorage.getItem("username");
      const storedToken = localStorage.getItem("token");
      console.log("API Response:", response);
      const parsedData = JSON.parse(response.Data);
      console.log(parsedData.OtpAuth);
      if (response.Status === "1" && currentPassword === parsedData.Pass) {
        console.log("Success Message");
        // Define parameters for the second API call
        const updateParams = {
          EXECF: "SETAUTHDATA",
          Uid: storedUsername,
          Token: storedToken,
          Data: JSON.stringify({
            Uid: storedUsername, //changeToStoredUsername("test")
            Name: parsedData.Name,
            Pass: newPassword, // New password entered by the user
            Control: parsedData.Control,
            Tfa: is2FAEnabled ? "1" : "0",
            Class: parsedData.Class,
            Status: parsedData.Status,
          }),
        };
        // Call the apiHandler function for the second API
        const updateResponse = await apiHandler(apiUrl, updateParams);
        console.log("Update API Response:", updateResponse);
        if (updateResponse.Status === "1") {
          console.log("Password updated successfully");
          // alert("Password updated successfully");
          setSnackBarTitle("Password Updated Successfully.");
          setSuccess(true);

          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        } else {
          console.log("Failed to update password");
          setSnackBarTitle("Error updating password.");
          setSuccess(true);
          // alert("Failed to update password.");
        }
      } else {
        console.log("Failure: Incorrect password");
        setSnackBarTitle("Error. Please make sure current password is entered correctly ");
        setSuccess(true);
        // alert("Please make sure current password is entered correctly");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const extractSecretFromTotpUri = (uri: string) => {
    // Decode the URI
    const decodedUri = decodeURIComponent(uri);
    const regex = /secret=([^&]+)/; // Regular expression to extract the secret
    const match = decodedUri.match(regex);
    return match ? match[1] : null; // Return the secret if found, else return null
  };

  const handle2FACheckboxChange = async (e: { target: { checked: any } }) => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    const isChecked = e.target.checked;
    setIs2FAEnabled(isChecked);

    if (isChecked) {
      // Fetch OTP Auth data from the API
      const apiUrl = "http://18.138.168.43:10311/api/execmem";
      const params = {
        EXECF: "GETAUTHDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({ FilterUid: storedUsername }),
      };

      try {
        const response = await apiHandler(apiUrl, params);
        const parsedData = JSON.parse(response.Data);
        console.log(parsedData.OtpAuth);
        if (response.Status === "1") {
          setTotpUri(parsedData.OtpAuth);
          const secret = extractSecretFromTotpUri(parsedData.OtpAuth);
          console.log("Extracted Secret:", secret);
          setTotpKey(secret);
        }
      } catch (error) {
        console.error("Error fetching OTP Auth data:", error);
      }
    } else {
      setTotpUri("");
      setTotpKey("");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container pt={3} pb={25} justifyContent="center">
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h4">Authentication</MDTypography>
          </MDBox>

          <MDBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="Current Password"
                  inputProps={{ type: showPasswords ? "text" : "password", autoComplete: "" }}
                  value={currentPassword}
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setCurrentPassword(e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPasswords((prev) => !prev)} edge="end">
                          {showPasswords ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="New Password"
                  inputProps={{ type: showPasswords ? "text" : "password", autoComplete: "" }}
                  value={newPassword}
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setNewPassword(e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPasswords((prev) => !prev)} edge="end">
                          {showPasswords ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="Confirm New Password"
                  inputProps={{ type: showPasswords ? "text" : "password", autoComplete: "" }}
                  value={confirmNewPassword}
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setConfirmNewPassword(e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPasswords((prev) => !prev)} edge="end">
                          {showPasswords ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <MDBox display="flex" alignItems="center">
                  <Checkbox
                    checked={is2FAEnabled}
                    // onChange={(e) => setIs2FAEnabled(e.target.checked)} // Track checkbox change
                    onChange={handle2FACheckboxChange}
                  />
                  <MDTypography variant="button">Enable 2FA</MDTypography>
                  <SecurityIcon style={{ marginLeft: 8, marginRight: 8 }} />
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
              <MDBox ml="auto">
                <MDButton variant="gradient" color="dark" size="small" onClick={handleNextClick}>
                  Save
                </MDButton>
              </MDBox>
            </MDBox>
            {is2FAEnabled && totpUri && (
              <MDBox mt={1} display="flex" flexDirection="column" alignItems="center">
                <MDTypography style={{ color: "grey" }} variant="body2" textAlign="center" mb={2}>
                  Scan this QR code with the Google Authenticator app
                </MDTypography>
                <QRCodeSVG value={totpUri} size={218} />
                <MDTypography
                  style={{ color: "grey" }}
                  variant="body2"
                  textAlign="center"
                  mb={2}
                  mt={2}
                >
                  KEY: {totpKey}
                </MDTypography>
              </MDBox>
            )}
          </MDBox>
        </Card>
      </Grid>
      <MDSnackbar
        open={success}
        color={getSnackbarColor()}
        title={snackBarTitle}
        close={() => setSuccess(false)} // Close the snackbar
      />
    </DashboardLayout>
  );
};

export default Authentication;
