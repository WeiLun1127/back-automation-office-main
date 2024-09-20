import { Card, Checkbox, Grid } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import SecurityIcon from "@mui/icons-material/Security";
import { SetStateAction, useState } from "react";
import { apiHandler } from "api/apiHandler";

const Authentication = () => {
  // States to manage input values
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const storedUsername = localStorage.getItem("username");
  const storedToken = localStorage.getItem("token");

  // Event handler for the "Next" button
  const handleNextClick = async () => {
    const apiUrl = "http://18.138.168.43:10311/api/execmem";
    const params = {
      EXECF: "GETAUTHDATA",
      Uid: storedUsername, // Use the stored username
      Token: storedToken, // Use the stored token
      Data: JSON.stringify({
        // Uid: storedUsername, // Use the stored username
        Uid: "test",
        Prefix: "",
      }),
    };

    try {
      // Call the apiHandler function
      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
      // Handle the response as needed (e.g., navigate to another page, show a success message, etc.)
      const parsedData = JSON.parse(response.Data);
      console.log(parsedData.Uid);
      console.log(parsedData.Pass);
      console.log(parsedData.Control);
      console.log(parsedData.Tfa);
      console.log(parsedData.TfaKey);
      console.log(parsedData.Class);
      console.log(parsedData.Prefix);
      console.log(parsedData.Status);
      console.log(parsedData.OtpAuth);
      if (response.Status === "1" && currentPassword === parsedData.Pass) {
        console.log("Success Message");
        // Define parameters for the second API call
        const updateParams = {
          EXECF: "SETAUTHDATA",
          Uid: storedUsername, // Use the stored username
          Token: storedToken, // Use the stored token
          Data: JSON.stringify({
            Uid: "test", //changeToStoredUsername
            Pass: newPassword, // New password entered by the user
            Control: parsedData.Control,
            Tfa: parsedData.TfaKey,
            Tfakey: parsedData.TfaKey,
            Class: parsedData.Class,
            Prefix: parsedData.Prefix,
            Status: parsedData.Status,
          }),
        };
        // Call the apiHandler function for the second API
        const updateResponse = await apiHandler(apiUrl, updateParams);
        console.log("Update API Response:", updateResponse);
        if (updateResponse.Status === "1") {
          console.log("Password updated successfully");
        } else {
          console.log("Failed to update password");
        }
      } else {
        console.log("Failure: Incorrect password or status not 1");
      }
    } catch (error) {
      console.error("API Error:", error);
      // Handle the error as needed (e.g., show an error message)
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
                  inputProps={{ type: "password", autoComplete: "" }}
                  value={currentPassword}
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setCurrentPassword(e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="New Password"
                  inputProps={{ type: "password", autoComplete: "" }}
                  value={newPassword}
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setNewPassword(e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="Confirm New Password"
                  inputProps={{ type: "password", autoComplete: "" }}
                  value={confirmNewPassword}
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setConfirmNewPassword(e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <MDBox display="flex" alignItems="center">
                  <Checkbox />
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
                  Next
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </DashboardLayout>
  );
};

export default Authentication;
