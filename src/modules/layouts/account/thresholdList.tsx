import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
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
import { Close as CloseIcon } from "@mui/icons-material"; // Import Close Icon
import React, { useEffect, useState } from "react";
import MDInput from "components/MDInput";
import SearchIcon from "@mui/icons-material/Search";

function AccountThresholdList(): JSX.Element {
  const [horizOpen, setHorizOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<AccountThresholdData | {}>({});

  interface AccountThresholdData {
    Index: string;
    Currency: string;
    BankCode: string;
    BankAccNumber: string;
    BankAccName: string;
    BankAccLoginID: string;
    BankAccLoginPass: string;
    SecurityCode: string;
    Timezone: string;
    CutoffTime: string;
    MinTransAmount: string;
    MaxTransAmount: string;
    DailyInAmount: string;
    DailyInTrans: string;
    DailyOutAmount: string;
    DailyOutTrans: string;
    Status: string;
  }

  const handleEditClickOpen = async (rowIndex: any) => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "GETACCTHRESDATA",
        Uid: storedUsername || "com",
        Token: storedToken || "",
        Data: JSON.stringify({ FilterIndex: rowIndex }),
      };

      const response = await apiHandler(apiUrl, params);
      const responseData = JSON.parse(response.Data);
      console.log(responseData);
      setSelectedData(responseData); // Save retrieved data
      setEditOpen(true); // Open edit dialog
    } catch (error) {
      console.error("Error fetching edit data:", error);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleHorizClickOpen = () => {
    setHorizOpen(true);
  };

  const handleHorizClose = () => {
    setHorizOpen(false);
  };

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "index", accessor: "index", width: "3%" },
      { Header: "currency", accessor: "currency", width: "3%" },
      { Header: "bank code", accessor: "bank_code", width: "7%" },
      { Header: "acc. name", accessor: "acc_name", width: "7%" },
      { Header: "acc. number", accessor: "acc_number", width: "7%" },
      { Header: "running in$", accessor: "running_in_1", width: "7%" },
      { Header: "running in#", accessor: "running_in_2", width: "7%" },
      { Header: "running out$", accessor: "running_out_1", width: "7%" },
      { Header: "running out#", accessor: "running_out_2", width: "7%" },
      { Header: "running", accessor: "running", width: "3%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
      { Header: "status", accessor: "status", width: "3%" },
      { Header: "action", accessor: "action", width: "3%" },
    ],
    rows: [],
  });

  const fetchThresholdList = async () => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    try {
      const apiUrl = "http://18.138.168.43:10312/api/execset";
      const params = {
        EXECF: "GETACCTHRESDATALIST",
        Uid: storedUsername,
        Token: storedToken,
        Data: JSON.stringify({
          FilterCurrency: "",
          FilterBankCode: "",
          FilterBankAccNumber: "",
          FilterBankAccName: "",
          FilterStatus: "",
        }),
        // Data: JSON.stringify({
        //   FilterDisplayName: filterKeyword,
        // }),
      };
      const response = await apiHandler(apiUrl, params);
      const responseData = JSON.parse(response.Data);
      console.log(responseData);
      // Map API data to fit DataTable format
      const formattedRows = responseData.map(
        (
          item: {
            Index: any;
            Currency: string;
            BankCode: any;
            BankAccNumber: any;
            BankAccName: any;
            BankAccLoginID: any;
            MinTransAmount: any;
            MaxTransAmount: any;
            DailyInAmount: any;
            DailyInTrans: any;
            DailyOutAmount: any;
            DailyOutTrans: any;
            Status: any;
          },
          index: number
        ) => ({
          id: index + 1, // Generate an ID based on index
          index: item.Index,
          currency: item.Currency,
          bank_code: item.BankCode,
          acc_name: item.BankAccNumber,
          acc_number: item.BankAccName,
          running_in_1: item.DailyInAmount,
          running_in_2: item.DailyInTrans,
          running_out_1: item.DailyOutAmount,
          running_out_2: item.DailyOutTrans,
          running: (
            <div style={{ paddingLeft: "12px" }}>
              <Icon style={{ cursor: "pointer", fontSize: 20 }} onClick={handleHorizClickOpen}>
                more_horiz
              </Icon>
            </div>
          ),
          // updated_on: item.UpdatedOnUTC,
          status: <Switch checked={item.Status === "1"} />,
          action: (
            <div style={{ paddingLeft: "12px" }}>
              <Icon
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={() => handleEditClickOpen(item.Index)}
              >
                edit
              </Icon>
            </div>
          ),
        })
      );
      setTableData((prev) => ({
        ...prev,
        rows: formattedRows,
      }));
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchThresholdList();
  }, []);

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
                Account Threshold List
              </MDTypography>
            </MDBox>
            <MDBox display="flex" justifyContent="flex-start" p={3}>
              <MDInput
                fullWidth
                variant="standard"
                label="Filter Keyword"
                sx={{ width: 200, marginRight: 3 }}
              />
              <MDBox display="flex" alignItems="center">
                {/* <TextField margin="dense" label="Status" sx={{ width: 200 }} /> */}
                <SearchIcon sx={{ marginLeft: 1, cursor: "pointer" }} />
              </MDBox>
            </MDBox>
            <DataTable table={tableData} />
          </Card>
        </MDBox>
      </MDBox>

      <Dialog open={horizOpen} onClose={handleHorizClose} fullWidth maxWidth="md">
        <DialogTitle>
          Account Threshold
          <IconButton
            aria-label="close"
            onClick={handleHorizClose}
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Country" sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="dense" label="Bank Code" sx={{ width: "100%" }} />
            </Grid>
          </Grid>

          {/* Row 2: Acc. Name and Acc. Number */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Acc. Name" sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="dense" label="Acc. Number" sx={{ width: "100%" }} />
            </Grid>
          </Grid>

          {/* Row 3: Running In and Running Out */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Running In # / Daily In #" sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Running Out # / Daily Out #"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          {/* Row 4: Running In $ and Running Out $ */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField margin="dense" label="Running In $ / Daily In $" sx={{ width: "100%" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Running Out $ / Daily Out $"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="md">
        <DialogTitle>
          Update Account Threshold
          <IconButton
            aria-label="close"
            onClick={handleEditClose}
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
            margin="dense"
            label="Currency"
            value={(selectedData as AccountThresholdData).Currency || ""}
            sx={{ width: 680 }}
          />
          <TextField
            margin="dense"
            label="Bank Code"
            value={(selectedData as AccountThresholdData).BankCode || ""}
            sx={{ width: 680 }}
          />
          <TextField
            margin="dense"
            label="Account Number"
            value={(selectedData as AccountThresholdData).BankAccNumber || ""}
            sx={{ width: 680 }}
          />
          <TextField
            margin="dense"
            label="Account Name"
            value={(selectedData as AccountThresholdData).BankAccName || ""}
            sx={{ width: 680 }}
          />
          <TextField
            margin="dense"
            label="Login Id"
            value={(selectedData as AccountThresholdData).BankAccLoginID || ""}
            sx={{ width: 680 }}
          />
          <TextField
            margin="dense"
            label="Login Password"
            value={(selectedData as AccountThresholdData).BankAccLoginPass || ""}
            sx={{ width: 680 }}
          />
          <TextField
            margin="dense"
            label="Security Code"
            value={(selectedData as AccountThresholdData).SecurityCode || ""}
            sx={{ width: 680 }}
          />
          <TextField
            margin="dense"
            label="TimeZone"
            value={(selectedData as AccountThresholdData).Timezone || ""}
            sx={{ width: 680 }}
          />
          <TextField
            margin="dense"
            label="Cut Off Time"
            value={(selectedData as AccountThresholdData).CutoffTime || ""}
            sx={{ width: 680 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Daily In Limit $"
                value={(selectedData as AccountThresholdData).DailyInAmount || ""}
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Daily Out Limit $"
                value={(selectedData as AccountThresholdData).DailyOutAmount || ""}
                sx={{ width: 300 }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Daily In Limit #"
                value={(selectedData as AccountThresholdData).DailyInTrans || ""}
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Daily Out Limit #"
                value={(selectedData as AccountThresholdData).DailyOutTrans || ""}
                sx={{ width: 300 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default AccountThresholdList;