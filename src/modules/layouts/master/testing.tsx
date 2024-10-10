// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Icon,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
//   IconButton,
//   Switch,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Autocomplete,
// } from "@mui/material";
// import { CheckBox, Close as CloseIcon } from "@mui/icons-material"; // Import Close Icon
// import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
// import DataTable from "assets/examples/Tables/DataTable";
// import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
// import { apiHandler } from "api/apiHandler";
// import SecurityIcon from "@mui/icons-material/Security";
// import MDSnackbar from "components/MDSnackbar";
// import { stringify } from "querystring";

// const MasterList = () => {
//   const [open, setOpen] = useState(false); // State for controlling the dialog visibility
//   const [lockDialogOpen, setLockDialogOpen] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected user ID
//   const [tableRows, setTableRows] = useState([]); // State to store rows for the DataTable
//   const [filterStatus, setFilterStatus] = useState("1"); // Default to "1"
//   const [searchValue, setSearchValue] = useState("");
//   const [is2FAEnabled, setIs2FAEnabled] = useState(false);
//   const [dialogUserID, setDialogUserID] = useState("");
//   const [dialogUsername, setDialogUsername] = useState("");
//   const [dialogPass, setDialogPass] = useState("");
//   const [dialogControl, setDialogControl] = useState("");
//   const [dialogTfa, setDialogTfa] = useState("");
//   const [dialogClass, setDialogClass] = useState("");
//   const [dialogStatus, setDialogStatus] = useState("");
//   const [newPassword, setNewPassword] = useState(""); // State for the new password
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [statusClickCount, setStatusClickCount] = useState(0); // Track the number of clicks
//   const [selectedTimeZone, setSelectedTimeZone] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [snackBarTitle, setSnackBarTitle] = useState("");

//   const [tuneDialogOpen, setTuneDialogOpen] = useState(false); // For controlling the tune dialog visibility
//   const [controlData, setControlData] = useState(null); // State for storing control data from the API
//   const [tuneDialogControl, setTuneDialogControl] = useState(""); // Control selected in the dropdown in Tune
//   const [tuneDialogUserId, setTuneDialogUserId] = useState("");
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   const controlOptions = [
//     { label: "Dashboard", value: "dashboard" },
//     { label: "Accessibility", value: "accessibility" },
//     { label: "Master", value: "master" },
//     { label: "Company List", value: "companyList" },
//     { label: "Api Control", value: "apiControl" },
//     { label: "Company List", value: "companyList" },
//     { label: "Master List", value: "masterList" },
//     { label: "Master Control", value: "masterControl" },
//     { label: "Create Master Account", value: "createMasterAccount" },
//     { label: "Transactions", value: "transactions" },
//     { label: "Authentication", value: "authenthication" },
//     { label: "Create Merchant", value: "createMerchant" },
//     { label: "Merchant List", value: "merchantList" },
//     { label: "Create Account Provider", value: "createAccountProvider" },
//     { label: "Account Provider List", value: "accountProviderList" },
//     { label: "Create Agent", value: "createAgent" },
//     { label: "Agent List", value: "agentList" },
//     { label: "Create Commission", value: "createCommission" },
//     { label: "Commission List", value: "commissionList" },
//     { label: "Currency List", value: "currencyList" },
//     { label: "Product List", value: "productList" },
//   ];

//   const controlMapping: { [key: string]: string[] } = {
//     dashboard: ["001"],
//     apiControl: ["001.001"],
//     accessibility: ["001.002"],
//     companyList: ["001.003"],
//     master: ["002"],
//     createMasterAccount: ["002.001"],
//     masterList: ["002.002"],
//     masterControl: ["002.003"],
//     transactions: ["003", "003.001"],
//     authenthication: ["004", "004.001"],
//     createMerchant: ["005", "005.001"],
//     merchantList: ["005", "005.002"],
//     createAccountProvider: ["006", "006.001"],
//     accountProviderList: ["006", "006.002"],
//     createAgent: ["007", "007.001"],
//     agentList: ["007", "007.002"],
//     createCommission: ["008", "008.001"],
//     commissionList: ["008", "008.002"],
//     currencyList: ["009", "009.001"],
//     productList: ["010", "010.001"],
//   };

//   const handleTuneClick = async (userId: any) => {
//     setTuneDialogOpen(true);
//     setTuneDialogUserId(userId);
//     try {
//       const storedToken = localStorage.getItem("token");
//       const storedUsername = localStorage.getItem("username");
//       const apiUrl = "http://18.138.168.43:10311/api/execmem";
//       const params = {
//         EXECF: "GETAUTHDATA",
//         Uid: storedUsername,
//         Token: storedToken,
//         Data: JSON.stringify({
//           FilterUid: userId,
//         }),
//       };
//       const response = await apiHandler(apiUrl, params);
//       console.log("API Response:", response);

//       const decodedString = response.Data.replace(/\\u0022/g, '"')
//         .replace('"[{', "[{")
//         .replace('}]"', "}]");
//       const parsedData = JSON.parse(decodedString);
//       console.log("Control Data:", parsedData.Control);

//       const controlKeys = parsedData.Control.map((item: any) => Object.keys(item)[0]);
//       console.log(controlKeys);

//       const controlNames = controlKeys.map((key: string) => {
//         const option = controlOptions.find((opt) => controlMapping[opt.value].includes(key));
//         return option ? option.label : key;  // Fallback to key if no label is found
//       });
  
//       console.log("Mapped Control Names:", controlNames);
  
//       // Set the control names instead of the control values
//       setControlData(controlNames);
//     } catch (error) {
//       console.error("Error during API call:", error);
//     }
//   };

//   const handleEditClick = async (userId: string) => {
//     setSelectedUserId(userId);
//     setOpen(true);
//     // await fetchUserData(userId);
//   };

//   const handleEditSaveClick = async (userId: string) => {
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     try {
//       const apiUrl = "http://18.138.168.43:10311/api/execmem";
//       const params = {
//         EXECF: "SETAUTHDATA",
//         Uid: storedUsername,
//         Token: storedToken,
//         Data: JSON.stringify({
//           Uid: userId,
//           Name: dialogUsername,
//           Pass: dialogPass,
//           Control: dialogControl,
//           Tfa: dialogTfa,
//           Class: dialogClass,
//           Status: dialogStatus,
//         }),
//       };
//       const response = await apiHandler(apiUrl, params);
//       setSnackBarTitle("User Details Updated Successfully.");
//       setSuccess(true); // Show success snackbar
//       handleClose();
//     } catch (error) {
//       setSnackBarTitle("Error updating user details.");
//       setSuccess(true);
//     }
//   };

//   const handle2FAChange = (event: {
//     target: { checked: boolean | ((prevState: boolean) => boolean) };
//   }) => {
//     const isChecked = event.target.checked;
//     setIs2FAEnabled(event.target.checked);
//     setDialogTfa(isChecked ? "1" : "0");
//     fetchTableData();
//   };

//   const handleLockClick = async (userId: string) => {
//     setLockDialogOpen(true); // Open the lock dialog
//     setSelectedUserId(userId);
//     await fetchUserData(userId);
//   };

//   useEffect(() => {
//     if (selectedUserId) {
//       fetchUserData(selectedUserId);
//     }
//   }, [selectedUserId]);


//   const fetchTableData = async (FilterStatus = "", searchValue = "") => {
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     try {
//       const apiUrl = "http://18.138.168.43:10311/api/execmem";
//       const params = {
//         EXECF: "GETMEMLIST",
//         Uid: storedUsername,
//         Token: storedToken,
//         Data: JSON.stringify({
//           FilterClass: "mtr",
//           FilterName: searchValue || "",
//           FilterUid: "",
//           FilterStatus: FilterStatus,
//         }),
//       };
//       const response = await apiHandler(apiUrl, params);
//       const responseData = JSON.parse(response.Data);
//       console.log(responseData);
//       // Map API data to fit DataTable format
//       const formattedRows = responseData.map(
//         (
//           item: {
//             Name: any;
//             Uid: string;
//             CreatedOnUTC: any;
//             LastUpdateOnUTC: any;
//             LastIP: any;
//             LastLoginOnUTC: any;
//             Status: any;
//           },
//           index: number
//         ) => ({
//           id: index + 1, // Generate an ID based on index
//           user: item.Name,
//           user_id: item.Uid,
//           last_create: item.CreatedOnUTC,
//           last_update: item.LastUpdateOnUTC,
//           last_ip: item.LastIP,
//           last_login: item.LastLoginOnUTC,
//           status: (
//             <Switch
//               checked={item.Status === "1"}
//               onChange={() => handleStatusChange(item.Uid, item.Status === "1" ? "0" : "1")}
//             />
//           ),
//           action: (
//             <MDBox display="flex" gap={2} alignItems="center">
//               <Icon
//                 style={{ cursor: "pointer", fontSize: 20 }}
//                 onClick={() => handleLockClick(item.Uid)}
//               >
//                 lockperson
//               </Icon>
//               <Icon
//                 style={{ cursor: "pointer", fontSize: 20 }}
//                 onClick={() => handleEditClick(item.Uid)}
//               >
//                 edit
//               </Icon>
//               <Icon
//                 style={{ cursor: "pointer", fontSize: 20 }}
//                 onClick={() => handleTuneClick(item.Uid)}
//               >
//                 tune
//               </Icon>
//               <MDButton
//                 variant="outlined"
//                 color="dark"
//                 size="small"
//                 style={{
//                   cursor: "pointer",
//                   fontSize: "0.75rem", // Smaller font size
//                   padding: "4px 8px", // Adjust padding for a smaller button
//                   minWidth: "auto", // Ensure button size fits the text
//                   height: "auto",
//                 }}
//                 onClick={() => handleReset2FA(item.Uid)}
//               >
//                 Reset 2FA
//               </MDButton>
//             </MDBox>
//           ),
//         })
//       );

//       setTableRows(formattedRows); // Set the rows for DataTable
//     } catch (error) {
//       console.error("Error during API call:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTableData();
//   }, []);

//   const controlTuneSaveClick = async (userId: string) => {
//     selectedUserId(userId);
//     const storedUsername = localStorage.getItem("username");
//     const storedToken = localStorage.getItem("token");
//     try {
//       const apiUrl = "http://18.138.168.43:10311/api/execmem";
//       const selectedControlValues = selectedOptions.flatMap((option) => controlMapping[option]);
//       const controlArray = selectedControlValues.map((control) => ({
//         [control]: "1",
//       }));

//       const params = {
//         EXECF: "SETAUTHDATA",
//         Uid: storedUsername,
//         Token: storedToken,
//         Data: JSON.stringify({
//           Uid: userId,
//           Control: JSON.stringify(controlArray),
//         }),
//       };
//       const response = await apiHandler(apiUrl, params);
//       console.log("API Response:", response);

//       // Check if response.Status is 1
//       if (response.Status === "1") {
//         // setSuccess(true);
//         setSnackBarTitle("Control Updated Successfully");
//         setSuccess(true);
//       } else {
//         // alert("Error Occured. Please Try Again Shortly");
//         setSnackBarTitle("Error Occured. Please Try Again Shortly");
//         setSuccess(true);
//       }
//     } catch (error) {
//       console.error("Error during API call:", error);
//     }
//   };

//   const handleStatusHeaderClick = () => {
//     let newFilterStatus = "";
//     let newClickCount = statusClickCount + 1;

//     if (newClickCount === 1) {
//       newFilterStatus = "1";
//     } else if (newClickCount === 2) {
//       newFilterStatus = "0";
//     } else {
//       newFilterStatus = "";
//       newClickCount = 0;
//     }

//     setStatusClickCount(newClickCount);
//     setFilterStatus(newFilterStatus);
//     fetchTableData(newFilterStatus, searchValue);
//   };

//   const handleStatusChange = async (userId: string, newStatus: string) => {
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     try {
//       const apiUrl = "http://18.138.168.43:10311/api/execmem";
//       const params = {
//         EXECF: "SETAUTHDATA",
//         Uid: storedUsername,
//         Token: storedToken,
//         Data: JSON.stringify({
//           Uid: userId,
//           Status: newStatus, // Update the status based on switch toggle
//         }),
//       };

//       const response = await apiHandler(apiUrl, params);
//       if (response.Status === "1") {
//         // alert("User status updated successfully.");
//         setSnackBarTitle("User status updated successfully.");
//         setSuccess(true);
//         setTimeout(() => fetchTableData(), 1000); // Refresh the table data after status change
//       } else {
//         // alert("Error updating user status.");
//         setSnackBarTitle("Error updating user status.");
//         setSuccess(true);
//       }
//     } catch (error) {
//       console.error("Error during status update:", error);
//       setSnackBarTitle("Error updating user status.");
//       setSuccess(true);
//     }
//   };

//   const fetchUserData = async (userId: string) => {
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");
//     try {
//       const apiUrl = "http://18.138.168.43:10311/api/execmem";
//       const params = {
//         EXECF: "GETAUTHDATA",
//         Uid: storedUsername,
//         Token: storedToken,
//         Data: JSON.stringify({
//           FilterUid: userId,
//         }),
//       };
//       const response = await apiHandler(apiUrl, params);
//       console.log("API Response:", response);
//       const parsedData = JSON.parse(response.Data);

//       setDialogUserID(parsedData.Uid);
//       setDialogUsername(parsedData.Name);
//       setDialogPass(parsedData.Pass);
//       setDialogControl(parsedData.Control);
//       setDialogTfa(parsedData.Tfa);
//       setDialogClass(parsedData.Class);
//       setDialogStatus(parsedData.Status);

//       setIs2FAEnabled(parsedData.Tfa === "1");
//     } catch (error) {
//       console.error("Error during API call:", error);
//     }
//   };

//   const handleReset2FA = async (userId: string) => {
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     try {
//       const apiUrl = "http://18.138.168.43:10311/api/execmem";
//       const params = {
//         EXECF: "GETAUTHDATA",
//         Uid: storedUsername,
//         Token: storedToken,
//         Data: JSON.stringify({
//           FilterUid: userId,
//         }),
//       };
//       const response = await apiHandler(apiUrl, params);
//       console.log("API Response:", response);
//       const parsedData = JSON.parse(response.Data);
//       if (parsedData.Tfa === "1") {
//         try {
//           const apiUrl = "http://18.138.168.43:10311/api/execmem";
//           const params = {
//             EXECF: "SETAUTHDATA",
//             Uid: storedUsername,
//             Token: storedToken,
//             Data: JSON.stringify({
//               Uid: userId,
//               Name: parsedData.Name,
//               Pass: parsedData.Pass,
//               Control: parsedData.Control,
//               Tfa: "0",
//               Class: parsedData.Class,
//               Status: parsedData.Status,
//             }),
//           };
//           const response = await apiHandler(apiUrl, params);
//           // alert("2FA Reset Successfully.");
//           setSnackBarTitle("2FA Reset Successfully.");
//           setSuccess(true);
//         } catch (error) {
//           console.error("Error during API call:", error);
//           setSnackBarTitle("Error resetting 2FA.");
//           setSuccess(true);
//         }
//       } else {
//         // alert("Please make sure you enable 2FA.");
//         setSnackBarTitle("Please make sure you enable 2FA.");
//         setSuccess(true);
//       }
//     } catch (error) {
//       console.error("Error during API call:", error);
//       setSnackBarTitle("Error resetting 2FA.");
//       setSuccess(true);
//     }
//   };

//   const updateUserData = async () => {
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     if (!newPassword || !confirmPassword) {
//       setPasswordError("All password fields are required.");
//       return;
//     }

//     if (/\s/.test(newPassword) || /\s/.test(confirmPassword)) {
//       setPasswordError("Passwords cannot contain spaces.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setPasswordError("New password and confirmation do not match.");
//       return;
//     }

//     setPasswordError("");

//     try {
//       const apiUrl = "http://18.138.168.43:10311/api/execmem";
//       const params = {
//         EXECF: "SETAUTHDATA",
//         Uid: storedUsername,
//         Token: storedToken,
//         Data: JSON.stringify({
//           Uid: selectedUserId,
//           Name: dialogUsername,
//           Pass: newPassword,
//           Control: dialogControl,
//           Tfa: dialogTfa,
//           Class: dialogClass,
//           Status: dialogStatus,
//         }),
//       };
//       const response = await apiHandler(apiUrl, params);
//       console.log("API Response:", response);
//       // alert("Details Updated Successfully.");
//       setSnackBarTitle("Details Updated Successfully.");
//       setSuccess(true);
//       setNewPassword("");
//       setConfirmPassword("");
//       handleLockClose();
//       fetchTableData();
//       const parsedData = JSON.parse(response.Data);
//       console.log("Parsed Data:", parsedData);
//     } catch (error) {
//       console.error("Error during API call:", error);
//     }
//   };

//   const isButtonDisabled = !newPassword || newPassword !== confirmPassword;

//   const dataTableData = {
//     columns: [
//       { Header: "id", accessor: "id", width: "1%", disableSortBy: true },
//       { Header: "username", accessor: "user", width: "4%", disableSortBy: true },
//       { Header: "userid", accessor: "user_id", width: "7%", disableSortBy: true },
//       { Header: "last create", accessor: "last_create", width: "10%", disableSortBy: true },
//       { Header: "last update", accessor: "last_update", width: "10%", disableSortBy: true },
//       { Header: "last login", accessor: "last_login", width: "10%", disableSortBy: true },
//       { Header: "last ip", accessor: "last_ip", width: "7%", disableSortBy: true },
//       {
//         Header: (
//           <span style={{ cursor: "pointer" }} onClick={handleStatusHeaderClick}>
//             Status
//           </span>
//         ),
//         accessor: "status",
//         width: "7%",
//         disableSortBy: true,
//       },
//       { Header: "action", accessor: "action", width: "7%", disableSortBy: true },
//     ],
//     rows: tableRows,
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />

//       <MDBox pt={3} pb={3}>
//         <Card>
//           <MDBox p={2}>
//             <input
//               type="text"
//               value={searchValue}
//               placeholder="Search"
//               style={{
//                 padding: "10px",
//                 width: "100%",
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//               }}
//             />
//           </MDBox>
//           <DataTable table={dataTableData} />
//         </Card>
//       </MDBox>

//       <Dialog
//         open={tuneDialogOpen}
//         onClose={() => setTuneDialogOpen(false)}
//         fullWidth={true}
//         maxWidth="lg" // Sets the max width to a larger size
//         sx={{
//           "& .MuiDialog-paper": {
//             // Customize dialog paper size
//             width: "600px", // Set custom width
//             height: "400px", // Set custom height
//           },
//         }}
//       >
//         <DialogTitle>
//           Control Data
//           <IconButton
//             aria-label="close"
//             onClick={() => setTuneDialogOpen(false)}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="UserId"
//             variant="outlined"
//             value={tuneDialogUserId}
//             sx={{ mt: 2 }}
//           />
//           <Autocomplete
//             multiple
//             options={controlOptions.filter((option) => !selectedOptions.includes(option.value))}
//             disableCloseOnSelect
//             getOptionLabel={(option) => option.label}
//             renderInput={(params) => (
//               <TextField {...params} variant="standard" label="Control" fullWidth />
//             )}
//             value={selectedOptions.map((optionValue) =>
//               controlOptions.find((option) => option.value === optionValue)
//             )}
//             onChange={(event, value) => setSelectedOptions(value.map((option) => option.value))}
//           />
//         </DialogContent>
//         <DialogActions>
//             <Button onClick={() => controlTuneSaveClick(selectedUserId)} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </DashboardLayout>
//   );
// };

// export default MasterList;
