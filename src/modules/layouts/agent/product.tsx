import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import { apiHandler } from "api/apiHandler";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function AgentProduct(): JSX.Element {
  const [addOpen, setAddOpen] = useState(false);
  const [editMyShare, setEditMyShare] = useState(false);
  const [myShareValue, setMyShareValue] = useState("0.005");
  const [tempMyShareValue, setTempMyShareValue] = useState(myShareValue);
  const [allowChecked1, setAllowChecked1] = useState(false); // Separate state for tableData1 checkbox
  const [allowChecked2, setAllowChecked2] = useState(false); // Separate state for tableData2 checkbox
  const [accGroup, setAccGroup] = useState("");

  const handleAccGroupChange = (event: SelectChangeEvent) => {
    setAccGroup(event.target.value); // update the selected value
  };

  const handleAddClickOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  // Function to handle edit icon click to enable input field
  const handleEditMyShare = () => {
    setEditMyShare(true);
  };

  // Function to save the new value (tick icon)
  const handleSaveMyShare = () => {
    setMyShareValue(tempMyShareValue); // save the temporary value
    setEditMyShare(false); // close the edit mode
  };

  // Function to cancel editing (cross icon)
  const handleCancelMyShare = () => {
    setTempMyShareValue(myShareValue); // reset temp value to the original
    setEditMyShare(false); // close the edit mode
  };

  // Function to handle change in text field while editing
  const handleMyShareInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempMyShareValue(event.target.value); // update temp value
  };

  // Handle checkbox change tableData1
  const handleAllowCheckboxChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowChecked1(event.target.checked);
  };

  // Handle checkbox change for tableData2
  const handleAllowCheckboxChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowChecked2(event.target.checked);
  };

  const tableData1 = {
    columns: [
      { Header: "Currency", accessor: "currency", width: "7%" },
      { Header: "Allow", accessor: "allow", width: "7%" },
    ],
    rows: [
      {
        currency: "MYR",
        allow: <Checkbox checked={allowChecked1} onChange={handleAllowCheckboxChange1} />,
      },
    ],
  };

  const tableData2 = {
    columns: [
      { Header: "Currency", accessor: "currency", width: "3%" },
      { Header: "Product", accessor: "product", width: "3%" },
      { Header: "Type", accessor: "type", width: "3%" },
      { Header: "MyShare %", accessor: "my_share", width: "3%" },
      { Header: "Max%", accessor: "max_allow", width: "3%" },
      { Header: "Acc.Group", accessor: "acc_group", width: "3%" },
      { Header: "Allow", accessor: "allow", width: "3%" },
    ],
    rows: [
      {
        currency: "MYR",
        product: "DUITNOW",
        type: "Web",
        my_share: (
          <MDBox display="flex" alignItems="center">
            {editMyShare ? (
              <>
                <TextField
                  value={tempMyShareValue}
                  onChange={handleMyShareInputChange}
                  size="small"
                  variant="outlined"
                  style={{ width: "70px", marginRight: "8px" }}
                />
                <IconButton size="small" onClick={handleSaveMyShare}>
                  <CheckIcon color="success" /> {/* Tick icon */}
                </IconButton>
                <IconButton size="small" onClick={handleCancelMyShare}>
                  <CloseIcon color="error" /> {/* Cross icon */}
                </IconButton>
              </>
            ) : (
              <>
                <span>{myShareValue}</span>
                <IconButton size="small" onClick={handleEditMyShare}>
                  <Icon>more_vert</Icon> {/* Three dots icon */}
                </IconButton>
              </>
            )}
          </MDBox>
        ),
        max_allow: "0.235%",
        acc_group: (
          <FormControl
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                minHeight: "30px", // Ensure consistent min-height
                borderWidth: "1px", // Consistent border width (optional)
              },
            }}
          >
            <InputLabel>Acc Group</InputLabel>
            <Select
              label="Acc Group"
              value={accGroup}
              onChange={handleAccGroupChange}
              style={{ width: "150px" }}
            >
              <MenuItem disabled>APUserId1</MenuItem>
              <MenuItem value="AccGrpName1" sx={{ pl: 4 }}>
                AccGrpName1
              </MenuItem>
              <MenuItem value="AccGrpName2" sx={{ pl: 4 }}>
                AccGrpName2
              </MenuItem>
              <MenuItem value="AccGrpName3" sx={{ pl: 4 }}>
                AccGrpName3
              </MenuItem>
              <MenuItem disabled>APUserId2</MenuItem>
              <MenuItem value="AccGrpName4" sx={{ pl: 4 }}>
                AccGrpName4
              </MenuItem>
              <MenuItem value="AccGrpName5" sx={{ pl: 4 }}>
                AccGrpName5
              </MenuItem>
              <MenuItem value="AccGrpName6" sx={{ pl: 4 }}>
                AccGrpName6
              </MenuItem>
            </Select>
          </FormControl>
        ),
        allow: <Checkbox checked={allowChecked2} onChange={handleAllowCheckboxChange2} />,
      },
    ],
  };

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "username", accessor: "reference", width: "7%" },
      { Header: "userid", accessor: "country", width: "7%" },
      { Header: "allowed currencies", accessor: "allowed_currencies", width: "7%" },
      { Header: "action", accessor: "action", width: "7%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
    ],
    rows: [
      {
        id: "001",
        reference: "john_doe",
        country: "US123",
        allowed_currencies: "USD, EUR",
        action: (
          <div style={{ paddingLeft: "12px" }}>
            <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={handleAddClickOpen}>
              add
            </Icon>
          </div>
        ),
        updated_on: "2024-10-07",
      },
    ],
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox
              p={3}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              lineHeight={1}
            >
              <MDTypography variant="h5" fontWeight="medium" style={{ color: "black" }}>
                Product
              </MDTypography>
            </MDBox>
            <DataTable table={tableData} canSearch />
          </Card>
        </MDBox>
      </MDBox>
      {/* Dialog Implementation */}
      <Dialog
        open={addOpen}
        onClose={handleAddClose}
        maxWidth="xl"
        fullWidth={true}
        sx={{ "& .MuiDialogContent-root": { height: "450px" } }}
      >
        <DialogTitle style={{ color: "black" }}>Product Control</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="UserID"
            fullWidth
            // disabled
            InputProps={{
              // readOnly: true,
              style: { width: "250px" },
            }}
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            // disabled
            InputProps={{
              // readOnly: true,
              style: { width: "250px" },
            }}
          />
          <Box style={{ marginBottom: "20px" }}></Box>
          {/* <Box display="flex" justifyContent="space-between">
            <Box width="30%">
              <DataTable table={tableData1} showEntriesPerPage={false} />
            </Box>
            <Box width="70%">
              <DataTable table={tableData2} showEntriesPerPage={false} />
            </Box>
          </Box> */}
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            sx={{
              overflow: "hidden", // Prevent scrolling
              "& > div": {
                minWidth: "100%", // Ensure proper wrapping on small screens
                marginBottom: "20px", // Add spacing between tables
                "@media (min-width: 600px)": {
                  minWidth: "30%", // Adjust to original width for larger screens
                  marginBottom: "0", // Remove spacing for larger screens
                },
              },
            }}
          >
            <Box>
              <DataTable table={tableData1} showEntriesPerPage={false} />
            </Box>
            <Box>
              <DataTable table={tableData2} showEntriesPerPage={false} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default AgentProduct;
