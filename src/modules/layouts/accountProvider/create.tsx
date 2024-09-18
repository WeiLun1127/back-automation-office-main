import SecurityIcon from "@mui/icons-material/Security";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Card, Checkbox, Grid, Icon, IconButton } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { SetStateAction, useState } from "react";

const CreateAccountProvider = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value);
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
      // Proceed with form submission or further processing
    }
  };

  const handleMouseUpPassword = () => {
    setShowPassword(false);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(true);
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
                    InputProps={{ style: { maxWidth: "500px" } }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Name"
                    InputProps={{ style: { maxWidth: "500px" } }}
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
                      style: { maxWidth: "500px" },
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
                      style: { maxWidth: "500px" },
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
                    label="Prefix"
                    InputProps={{ style: { maxWidth: "500px" } }}
                    inputProps={{
                      maxLength: 3, // Restrict the input to 3 characters
                      pattern: "[A-Za-z]{3}", // Regex pattern to allow only 3 alphabetic characters
                    }}
                    onChange={(e: { target: { value: any }; preventDefault: () => void }) => {
                      const value = e.target.value.toUpperCase();
                      // Allow only alphabetic characters and restrict the length to 3
                      if (/^[A-Za-z]{0,3}$/.test(value)) {
                        e.target.value = value;
                      } else {
                        e.preventDefault();
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDBox display="flex" alignItems="center">
                    <MDTypography variant="button">Enable 2FA</MDTypography>
                    <SecurityIcon style={{ marginLeft: 8, marginRight: 8 }} />
                    <Checkbox />
                  </MDBox>
                </Grid>

                <Grid item xs={12}>
                  <MDBox display="flex" alignItems="center">
                    <MDTypography variant="button">Show</MDTypography>
                    <Icon style={{ marginLeft: 8, marginRight: 8 }}>visibility</Icon>
                    <Checkbox />
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
                    Next
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default CreateAccountProvider;
