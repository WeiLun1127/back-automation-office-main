// import { Card, Icon } from "@mui/material";
// import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
// import DataTable from "assets/examples/Tables/DataTable";
// import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";

// const dataTableData = {
//   columns: [
//     { Header: "id", accessor: "id", width: "3%" },
//     { Header: "username", accessor: "user", width: "4%" },
//     { Header: "userid", accessor: "user_id", width: "7%" },
//     { Header: "last login", accessor: "last_login", width: "10%" },
//     { Header: "ip address", accessor: "ip_addres", width: "10%" },
//     { Header: "action", accessor: "action", width: "7%" },
//   ],
//   rows: [
//     {
//       id: "1",
//       user: "Test",
//       user_id: "test",
//       action: (
//         <MDBox display="flex" gap={1} alignItems="center">
//           <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
//           <Icon style={{ cursor: "pointer", fontSize: 20 }}>edit</Icon>
//           <MDButton
//             variant="outlined"
//             color="dark"
//             size="small"
//             style={{
//               cursor: "pointer",
//               fontSize: "0.75rem", // Smaller font size
//               padding: "4px 8px", // Adjust padding for a smaller button
//               minWidth: "auto", // Ensure button size fits the text
//               height: "auto",
//             }}
//           >
//             Reset 2FA
//           </MDButton>
//         </MDBox>
//       ),
//       last_login: "2024-09-01 14:30:00",
//       ip_addres: "203.0.113.45",
//     },
//   ],
// };

// const MasterList = () => {
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />

//       <MDBox pt={3} pb={3}>
//         <Card>
//           <DataTable table={dataTableData} canSearch />
//         </Card>
//       </MDBox>
//     </DashboardLayout>
//   );
// };

// export default MasterList;

import React, { useState } from "react";
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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material"; // Import Close Icon
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

const MasterList = () => {
  const [open, setOpen] = useState(false); // State for controlling the dialog visibility
  const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected user ID

  // Function to handle the edit button click
  const handleEditClick = (userId: string) => {
    setSelectedUserId(userId); // Set the selected user ID (optional)
    setOpen(true); // Open the dialog
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Move the dataTableData inside the component
  const dataTableData = {
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "username", accessor: "user", width: "4%" },
      { Header: "userid", accessor: "user_id", width: "7%" },
      { Header: "last login", accessor: "last_login", width: "10%" },
      { Header: "ip address", accessor: "ip_addres", width: "10%" },
      { Header: "action", accessor: "action", width: "7%" },
    ],
    rows: [
      {
        id: "1",
        user: "Test",
        user_id: "test",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            {/* Use handleEditClick from the current scope */}
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 14:30:00",
        ip_addres: "203.0.113.45",
      },
      {
        id: "2",
        user_id: "alexaliras2024",
        user: "Alexa Liras",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 14:35:00",
        ip_addres: "198.51.100.78",
      },
      {
        id: "3",
        user_id: "laurentperrier2024",
        user: "Laurent Perrier",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 14:40:00",
        ip_addres: "192.168.0.12",
      },
      {
        id: "4",
        user: "Michael Levi",
        user_id: "michaellevi2024",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 14:45:00",
        ip_addres: "10.1.2.34",
      },
      {
        id: "5",
        user: "Richard Gran",
        user_id: "richardgran2024",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 14:50:00",
        ip_addres: "172.31.255.255",
      },
      {
        id: "6",
        user: "Michael Johnson",
        user_id: "michaeljohnson2024",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 14:55:00",
        ip_addres: "198.51.100.200",
      },
      {
        id: "7",
        user: "Miriam Eric",
        user_id: "miriameric2024",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 15:00:00",
        ip_addres: "192.0.2.77",
      },
      {
        id: "8",
        user: "Peter Parker",
        user_id: "peterparker2024",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 15:05:00",
        ip_addres: "203.0.113.56",
      },
      {
        id: "9",
        user: "Diana Prince",
        user_id: "dianaprince2024",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 15:10:00",
        ip_addres: "198.51.100.22",
      },
      {
        id: "10",
        user: "Tony Stark",
        user_id: "tonystark2024",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
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
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 15:15:00",
        ip_addres: "172.16.254.89",
      },
      {
        id: "11",
        user: "Eleanor Rigby",
        user_id: "eleanorrigby2024",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
              edit
            </Icon>
            <MDButton
              variant="outlined"
              color="dark"
              size="small"
              style={{ cursor: "pointer", height: "auto", padding: "6px 12px" }}
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 15:20:00",
        ip_addres: "10.0.0.123",
      },
      {
        id: "12",
        user: "Jack Sparrow",
        user_id: "jacksparrow2024",
        action: (
          <MDBox display="flex" gap={2} alignItems="center">
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={() => handleEditClick("1")}>
              edit
            </Icon>
            <MDButton
              variant="outlined"
              color="dark"
              size="small"
              style={{ cursor: "pointer", height: "auto", padding: "6px 12px" }}
            >
              Reset 2FA
            </MDButton>
          </MDBox>
        ),
        last_login: "2024-09-01 15:25:00",
        ip_addres: "192.168.1.45",
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={3} pb={3}>
        <Card>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>

      {/* Dialog Component */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Edit User
          {/* Add Close Icon on the right side */}
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
          {/* You can include form inputs here to edit the user details */}
        </DialogContent>
        <DialogActions>
          {/* Remove Cancel button */}
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default MasterList;