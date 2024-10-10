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

function SummaryTotalInReport(): JSX.Element {
  const [open, setOpen] = useState(false);

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
        system_ref: "AEX1007A0001",
        merchant_ref: "987-4515-65",
        currency: "MYR",
        amount: "6,000.00",
        type: "IN",
        product: "DuitNow",
        from: "HLB 20800010057 Akubuuh Meh",
        to: "MBB 512355501231 Ali Sdn Bhd",
        status: "Success",
        created_on: "2024-01-01 20:55:23 GMT+8",
        updated_on: "2024-03-19 13:05:11 GMT+8",
      },
      {
        id: 2,
        system_ref: "AEX1007A0003",
        merchant_ref: "987-4847-03",
        currency: "MYR",
        amount: "3,000.00",
        type: "IN",
        product: "DuitNow",
        from: "KSK 548926448245 Sakrpspong So",
        to: "KSK 54784668264 Kap LTD",
        status: "Approved",
        created_on: "2024-01-01 18:55:23 GMT+8",
        updated_on: "2024-03-18:58:05:11 GMT+8",
      },
    ],
  });

  // Function to calculate the total amount
  const calculateTotalAmount = (rows: any[]) => {
    return rows.reduce((total: number, row: { amount: string }) => {
      return total + parseFloat(row.amount.replace(/,/g, "").replace("MYR ", "").trim());
    }, 0);
  };

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
          </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default SummaryTotalInReport;
