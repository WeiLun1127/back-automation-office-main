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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material"; // Import Close Icon
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { apiHandler } from "api/apiHandler";

const MasterList = () => {
  const [open, setOpen] = useState(false); // State for controlling the dialog visibility
  const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected user ID
  const [tableRows, setTableRows] = useState([]); // State to store rows for the DataTable
  const [filterStatus, setFilterStatus] = useState("1"); // Default to "1"
  const [searchValue, setSearchValue] = useState("");

  // Function to handle the edit button click
  const handleEditClick = (userId: string) => {
    setSelectedUserId(userId); // Set the selected user ID (optional)
    setOpen(true); // Open the dialog
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
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
          FilterClass: "mtr",
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
            CreatedDateTimeUTC: any;
            LastUpdateDateTimeUTC: any;
            LastIP: any;
            LastLoginDateTimeUTC: any;
            Status: any;
          },
          index: number
        ) => ({
          id: index + 1, // Generate an ID based on index
          user: item.Name,
          user_id: item.Uid,
          last_create: item.CreatedDateTimeUTC,
          last_update: item.LastUpdateDateTimeUTC,
          last_ip: item.LastIP,
          last_login: item.LastLoginDateTimeUTC,
          status: item.Status,
          action: (
            <MDBox display="flex" gap={2} alignItems="center">
              <Icon style={{ cursor: "pointer", fontSize: 20 }}>lockperson</Icon>
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
                onClick={() => fetchTableData(FilterStatus)}
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

  // New function to handle the status header click
  const handleStatusHeaderClick = () => {
    const newFilterStatus = filterStatus === "0" ? "1" : "0";
    setFilterStatus(newFilterStatus);
    fetchTableData(newFilterStatus, searchValue);
  };

  const handleSearchChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchValue(value);
    fetchTableData(filterStatus, value); // Fetch with search value
  };

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
    rows: tableRows, // Pass the dynamic rows to DataTable
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={3} pb={3}>
        <Card>
          {/* Search input box */}
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
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default MasterList;
