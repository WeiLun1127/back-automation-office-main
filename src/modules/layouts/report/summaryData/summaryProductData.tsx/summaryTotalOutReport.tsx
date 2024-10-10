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

function SummaryTotalOutReport(): JSX.Element {
  const [open, setOpen] = useState(false);

  const calculateTotalAmount = (rows: any[]) => {
    return rows.reduce((sum, row) => {
      return sum + parseFloat(row.amount.replace(/,/g, "") || 0); // Remove commas and convert to float
    }, 0);
  };

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "system ref", accessor: "system_ref", width: "7%" },
      { Header: "merchant ref", accessor: "merchant_ref", width: "10%" },
      { Header: "currency", accessor: "currency", width: "7%" },
      { Header: "amount", accessor: "amount", width: "7%" },
      { Header: "type", accessor: "type", width: "7%" },
      { Header: "product", accessor: "product", width: "7%" },
      { Header: "from", accessor: "from", width: "5%" },
      { Header: "to", accessor: "to", width: "5%" },
      { Header: "status", accessor: "status", width: "7%" },
      { Header: "created on", accessor: "created_on", width: "7%" },
      { Header: "updated on", accessor: "updated_on", width: "7%" },
    ],
    rows: [
      {
        id: 1,
        system_ref: "AEX1007A0002",
        merchant_ref: "987-4574-21",
        currency: "MYR",
        amount: "5,000.00",
        type: "OUT",
        product: "DuitNow",
        from: "PBB 10333458554 OOyoo Dee",
        to: "MBB 512355501231 Ali Sdn Bhd",
        status: "Approved",
        created_on: "2024-01-01 18:55:23 GMT+8",
        updated_on: "2024-03-19 13:05:11 GMT+8",
      },
    ],
  });

  // Calculate the total amount
  const totalAmount = calculateTotalAmount(tableData.rows);

  const totalRow = {
    id: "",
    system_ref: "",
    merchant_ref: "",
    currency: "Total:",
    amount: (
      <span style={{ textDecoration: "underline" }}>
        {totalAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    ),
    type: "",
    product: "",
    from: "",
    to: "",
    status: "",
    created_on: "",
    updated_on: "",
  };

  const updatedRows = [...tableData.rows, totalRow];

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
            ></MDBox>
            <DataTable
              table={{
                columns: tableData.columns,
                rows: updatedRows, // Use the updated rows with the total row
              }}
              canSearch
            />
            {/* <MDBox p={3}>
              <MDTypography variant="h6">
                Total Amount: {totalAmount.toFixed(2)} MYR
              </MDTypography>
            </MDBox> */}
          </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default SummaryTotalOutReport;
