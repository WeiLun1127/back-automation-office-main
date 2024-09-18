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
import Flag from "react-flagkit";

// const currencies = [
//   { code: "MYR", country: "MY" }, // Malaysia
//   { code: "SGD", country: "SG" }, // Singapore
//   { code: "JPY", country: "JP" }, // Japan
//   { code: "KRW", country: "KR" }, // South Korea
//   { code: "THB", country: "TH" }, // Thailand
//   { code: "VND", country: "VN" }, // Vietnam
//   { code: "IDR", country: "ID" }, // Indonesia
//   { code: "INR", country: "IN" }, // India
// ];

// const dataTableData = {
//   columns: [
//     { Header: "agent", accessor: "agent", width: "50%" },
//     { Header: "value", accessor: "value", width: "50%" },
//   ],
//   rows: [
//     {
//       agent: (
//         <>
//           <Checkbox />
//           John Michael
//         </>
//       ),
//       value: <MDInput value="12%" />,
//     },
//     {
//       agent: (
//         <>
//           <Checkbox />
//           Alexa Liras
//         </>
//       ),
//       value: <MDInput value="10%" />,
//     },
//     {
//       agent: (
//         <>
//           <Checkbox />
//           Laurent Perrier
//         </>
//       ),
//       value: <MDInput value="20%" />,
//     },
//     {
//       agent: (
//         <>
//           <Checkbox />
//           Michael Levi
//         </>
//       ),
//       value: <MDInput value="15%" />,
//     },
//     {
//       agent: (
//         <>
//           <Checkbox />
//           Richard Gran
//         </>
//       ),
//       value: <MDInput value="18%" />,
//     },
//     {
//       agent: (
//         <>
//           <Checkbox />
//           Michael Johnson
//         </>
//       ),
//       value: <MDInput value="10%" />,
//     },
//     {
//       agent: (
//         <>
//           <Checkbox />
//           Miriam Eric
//         </>
//       ),
//       value: <MDInput value="11%" />,
//     },
//     {
//       agent: (
//         <>
//           <Checkbox />
//           Peter Parker
//         </>
//       ),
//       value: <MDInput value="12%" />,
//     },
//     {
//       agent: (
//         <>
//           <Checkbox />
//           Diana Prince
//         </>
//       ),
//       value: <MDInput value="16%" />,
//     },
//     {
//       agent: (
//         <>
//           <Checkbox />
//           Tony Stark
//         </>
//       ),
//       value: <MDInput value="16%" />,
//     },
//   ],
// };

// const CreateMasterAccount = () => {
//   const [allowCommissionAgent, setAllowCommissionAgent] = useState(false);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [productMargin, setProductMargin] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handlePasswordChange = (e: { target: { value: SetStateAction<string> } }) => {
//     setPassword(e.target.value);
//   };

//   const handleConfirmPasswordChange = (e: { target: { value: SetStateAction<string> } }) => {
//     setConfirmPassword(e.target.value);
//     if (e.target.value !== password) {
//       setPasswordError("Passwords do not match.");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleProductMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d{0,2}$/.test(value) && Number(value) <= 20) {
//       setProductMargin(value);
//     }
//   };

//   const handleSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setPasswordError("Passwords do not match.");
//     } else {
//       setPasswordError("");
//       // Proceed with form submission or further processing
//     }
//   };

//   const handleMouseUpPassword = () => {
//     setShowPassword(false);
//   };

//   const handleMouseDownPassword = () => {
//     setShowPassword(true);
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />

//       <Grid container pt={3} pb={3} justifyContent="center">
//         <Grid item lg={12} xl={8}>
//           <Card>
//             <MDBox p={3}>
//               <MDTypography variant="h4">Create Master Account</MDTypography>
//             </MDBox>

//             <MDBox component="form" pb={3} px={3}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <MDInput
//                     fullWidth
//                     variant="standard"
//                     label="User ID"
//                     InputProps={{ style: { maxWidth: "500px" } }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <MDInput
//                     fullWidth
//                     variant="standard"
//                     label="Name"
//                     InputProps={{ style: { maxWidth: "500px" } }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <MDInput
//                     fullWidth
//                     variant="standard"
//                     label="Password"
//                     type={showPassword ? "text" : "password"} // Toggle between text and password
//                     value={password}
//                     onChange={handlePasswordChange}
//                     InputProps={{
//                       style: { maxWidth: "500px" },
//                       endAdornment: (
//                         <IconButton
//                           onMouseDown={handleMouseDownPassword}
//                           onMouseUp={handleMouseUpPassword}
//                           onMouseLeave={handleMouseUpPassword} // Ensure visibility is disabled when mouse leaves
//                         >
//                           {showPassword ? <Visibility /> : <VisibilityOff />}
//                         </IconButton>
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <MDInput
//                     fullWidth
//                     variant="standard"
//                     label="Confirm Password"
//                     type={showPassword ? "text" : "password"} // Toggle between text and password
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     error={!!passwordError}
//                     helperText={passwordError}
//                     InputProps={{
//                       style: { maxWidth: "500px" },
//                       endAdornment: (
//                         <IconButton
//                           onMouseDown={handleMouseDownPassword}
//                           onMouseUp={handleMouseUpPassword}
//                           onMouseLeave={handleMouseUpPassword} // Ensure visibility is disabled when mouse leaves
//                         >
//                           {showPassword ? <Visibility /> : <VisibilityOff />}
//                         </IconButton>
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <MDInput
//                     fullWidth
//                     variant="standard"
//                     label="Product Margin (0-20%)"
//                     value={productMargin}
//                     onChange={handleProductMarginChange}
//                     inputProps={{
//                       inputMode: "numeric",
//                       pattern: "[0-9]*",
//                       max: 20,
//                       min: 0,
//                     }}
//                     InputProps={{ style: { maxWidth: "500px" } }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <MDBox display="flex" alignItems="center">
//                     <MDTypography variant="button">Enable 2FA</MDTypography>
//                     <SecurityIcon style={{ marginLeft: 8, marginRight: 8 }} />
//                     <Checkbox />
//                   </MDBox>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <MDBox display="flex" alignItems="center" flexWrap="wrap" gap={1}>
//                     {currencies.map((currency) => (
//                       <div style={{ display: "flex" }} key={currency.code}>
//                         <Checkbox />
//                         <MDTypography
//                           variant="button"
//                           style={{ display: "flex", alignItems: "center" }}
//                         >
//                           <Flag
//                             country={currency.country}
//                             style={{ width: 24, height: 16, marginRight: 4 }} // Adjust margin if needed
//                           />
//                           {currency.code}
//                         </MDTypography>
//                       </div>
//                     ))}
//                   </MDBox>
//                 </Grid>
//               </Grid>

//               <MDBox
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="flex-end"
//                 flexWrap="wrap"
//                 mt={6}
//               >
//                 <MDBox display="flex" gap={2} alignItems="center">
//                   <MDTypography variant="button">Allow to add commission agent</MDTypography>
//                   <Checkbox
//                     value={allowCommissionAgent}
//                     onChange={() => setAllowCommissionAgent(!allowCommissionAgent)}
//                   />
//                 </MDBox>
//                 <MDBox display="flex" gap={2}>
//                   <MDButton variant="outlined" color="dark" size="small">
//                     Reset 2FA
//                   </MDButton>
//                   <MDButton variant="gradient" color="dark" size="small">
//                     Next
//                   </MDButton>
//                 </MDBox>
//               </MDBox>
//             </MDBox>
//           </Card>
//         </Grid>
//       </Grid>

//       {allowCommissionAgent && (
//         <Grid container justifyContent="center">
//           <Card>
//             <MDBox p={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
//               <MDTypography variant="h4">Commission Agent</MDTypography>

//               <MDBox display="flex" gap={2}>
//                 <MDInput
//                   type="search"
//                   value="Search..."
//                   InputProps={{ style: { maxWidth: "200px" } }}
//                 />
//                 <MDButton variant="gradient" color="primary">
//                   <Icon fontSize="small">add</Icon>&nbsp;Add
//                 </MDButton>
//               </MDBox>
//             </MDBox>

//             <DataTable
//               entriesPerPage={{
//                 entries: [5, 10, 20, 50, 100],
//                 defaultValue: 5,
//               }}
//               showEntriesPerPage={false}
//               showTotalEntries={false}
//               table={dataTableData}
//             />
//           </Card>
//         </Grid>
//       )}

//       <MDBox pb={25} />
//     </DashboardLayout>
//   );
// };

// export default CreateMasterAccount;

const CreateMasterAccount = () => {
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
                  <MDBox display="flex" alignItems="center">
                    <MDTypography variant="button">Enable 2FA</MDTypography>
                    <SecurityIcon style={{ marginLeft: 8, marginRight: 8 }} />
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

export default CreateMasterAccount;
