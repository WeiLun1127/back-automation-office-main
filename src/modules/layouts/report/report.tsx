import {
  Box,
  Button,
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

function TraReport(): JSX.Element {
  const [open, setOpen] = useState(false);

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "system ref", accessor: "system_ref", width: "7%" },
      { Header: "merchant ref", accessor: "merchant_ref", width: "7%" },
      { Header: "currency", accessor: "currency", width: "7%" },
      { Header: "amount", accessor: "amount", width: "7%" },
      { Header: "type", accessor: "type", width: "7%" },
      { Header: "product", accessor: "product", width: "7%" },
      { Header: "from", accessor: "from", width: "7%" },
      { Header: "to", accessor: "to", width: "7%" },
      { Header: "status", accessor: "status", width: "7%" },
      { Header: "created on", accessor: "created_on", width: "7%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
      { Header: "action", accessor: "action", width: "5%" },
    ],
    rows: [
      {
        id: "1",
        system_ref: "SYS123456",
        merchant_ref: "MERCHANT001",
        currency: "USD",
        amount: "$150.00",
        type: "payment",
        product: "Product A",
        from: "John Doe",
        to: "Jane Smith",
        status: "Completed",
        created_on: "2023-09-01",
        updated_on: "2023-09-02",
        action: (
          <div style={{ paddingLeft: "12px" }}>
            <Icon style={{ cursor: "pointer", fontSize: 20 }}>edit</Icon>
          </div>
        ),
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
              <MDTypography variant="h5" fontWeight="medium">
                Report
              </MDTypography>
            </MDBox>
            <DataTable table={tableData} />
          </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default TraReport;
