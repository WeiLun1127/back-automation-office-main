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
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

// Define the type for your row data
interface RowData {
  id: number;
  currency: string;
  product: string;
  total_in_$: string;
  total_in: string;
  com_profit: string;
  total_out_$: string;
  total_out: string;
  com_profit_1: string;
}

function TransactionSummary(): JSX.Element {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      {
        Header: "currency",
        accessor: "currency",
        width: "7%",
        Cell: ({ cell }: { cell: { value: string; row: { original: RowData } } }) => (
          // <MDButton onClick={() => handleCurrencyClick(cell.row.original)}>{cell.value}</MDButton>
          <span
            style={{ textAlign: "left", cursor: "pointer" }} // Align text to the left and show pointer on hover
            onClick={() => handleCurrencyClick(cell.row.original)} // Handle click
          >
            {cell.value}
          </span>
        ),
      },
      {
        Header: "product",
        accessor: "product",
        width: "7%",
        Cell: ({ cell }: { cell: { value: string; row: { original: RowData } } }) => (
          // <MDButton onClick={() => handleProductClick(cell.row.original)}>{cell.value}</MDButton>
          <span
            style={{ textAlign: "left", cursor: "pointer" }} // Align text to the left and show pointer on hover
            onClick={() => handleProductClick(cell.row.original)} // Handle click
          >
            {cell.value}
          </span>
        ),
      },
      { Header: "total in $", accessor: "total_in_$", width: "7%" },
      { Header: "total in #", accessor: "total_in", width: "7%" },
      { Header: "com profit", accessor: "com_profit", width: "7%" },
      { Header: "total out $", accessor: "total_out_$", width: "7%" },
      { Header: "total out #", accessor: "total_out", width: "7%" },
      { Header: "com profit", accessor: "com_profit_1", width: "7%" },
    ],
    rows: [
      {
        id: 1,
        currency: "MYR",
        product: "DuitNow",
        total_in_$: "46,221",
        total_in: "50",
        com_profit: "20,456.99",
        total_out_$: "6,000.00",
        total_out: "46,221",
        com_profit_1: "20,456.99",
      },
      {
        product: "TNG",
        total_in_$: "700,000.55",
        total_in: "421",
        com_profit: "2,056.99",
        total_out_$: "700,000.55",
        total_out: "421",
        com_profit_1: "656.75",
      },
      {
        product: "Boost",
        total_in_$: "400,000.22",
        total_in: "846",
        com_profit: "856.99",
        total_out_$: "400,000.22 ",
        total_out: "563",
        com_profit_1: "856.99",
      },
    ],
  });

  const handleCurrencyClick = (rowData: any) => {
    navigate("/CurrencySummary"); // Replace with the desired route path
  };

  const handleProductClick = (rowData: any) => {
    navigate("/ProductSummary"); // Replace with the desired route path
  };

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
                Summary
              </MDTypography>
            </MDBox>
            <DataTable table={tableData} />
          </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default TransactionSummary;
