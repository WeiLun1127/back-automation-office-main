import SecurityIcon from "@mui/icons-material/Security";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Autocomplete,
  Card,
  Checkbox,
  Grid,
  Icon,
  IconButton,
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
import { SetStateAction, useState } from "react";

const CreateMasterAccount = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [prefix, setPrefix] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handlePasswordChange = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value);
  };

  const controlOptions = [
    { label: "Api Control", value: "apiControl" },
    { label: "Master List", value: "masterList" },
    { label: "Create Master Account", value: "createMasterAccount" },
    { label: "Transactions", value: "transactions" },
    { label: "Authentication", value: "authenthication" },
    { label: "Create Account Provider", value: "createAccountProvider" },
    { label: "Account Provider List", value: "accountProviderList" },
    { label: "Currency List", value: "currencyList" },
    { label: "Product List", value: "productList" },
  ];

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

  const storedUsername = localStorage.getItem("username");
  const storedToken = localStorage.getItem("token");

  const handleNextButtonClick = async () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    try {
      const apiUrl = "http://18.138.168.43:10311/api/execset";
      const params = {
        EXECF: "SETCURRDATA",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          Uid: userId,
          Pass: password,
          Control: "001:1",
          Tfa: 0,
          Tfakey: 1,
          Class: "MA",
          Prefix: prefix,
          Status: isSwitchOn ? "1" : "0", // Convert boolean to string "1" or "0"
        }),
      };

      const response = await apiHandler(apiUrl, params);
      console.log("API Response:", response);
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
                    InputProps={{ style: { maxWidth: "500px" } }}
                  />
                </Grid>

                {/* <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Name"
                    InputProps={{ style: { maxWidth: "500px" } }}
                  />
                </Grid> */}

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
                    value={prefix} // Bind value to state
                    onChange={(e: { target: { value: string } }) =>
                      setPrefix(e.target.value.toUpperCase())
                    } // Update state and convert to uppercase
                    InputProps={{ style: { maxWidth: "500px" } }}
                    inputProps={{
                      maxLength: 3,
                      pattern: "[A-Za-z]{3}",
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDInput
                    fullWidth
                    variant="standard"
                    label="Level"
                    value="MA"
                    InputProps={{
                      readOnly: true,
                      style: { maxWidth: "500px" },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={controlOptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Control"
                        style={{ maxWidth: "500px" }}
                        fullWidth
                      />
                    )}
                    // This state will hold the selected options
                    onChange={(event, value) => console.log(value)}
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
    </DashboardLayout>
  );
};

export default CreateMasterAccount;
