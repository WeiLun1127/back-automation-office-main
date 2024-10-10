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
import { useNavigate } from "react-router-dom";

interface RowData {
  id: number;
  master: string;
  product: string;
  total_in_$: string;
  total_in: string;
  com_profit: string;
  total_out_$: string;
  total_out: string;
  com_profit_1: string;
}

// Function to calculate the sum of `com_profit` and `com_profit_1`
const calculateTotal = (rows: any[], key: string) => {
  return rows.reduce((sum, row) => {
    return sum + parseFloat(row[key] || 0);
  }, 0);
};

function SummaryProduct(): JSX.Element {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [tableData, setTableData] = useState({
    columns: [
      { Header: "id", accessor: "id", width: "3%" },
      { Header: "master", accessor: "master", width: "7%" },
      //   { Header: "product", accessor: "product", width: "7%" },
      {
        Header: "product $",
        accessor: "product",
        width: "7%",
        Cell: ({ cell }: { cell: { value: string; row: { original: RowData } } }) => (
          <span
            style={{ textAlign: "left", cursor: "pointer" }} // Align text to the left and show pointer on hover
            onClick={() => handleProductClick(cell.row.original)} // Handle click
          >
            {cell.value}
          </span>
        ),
      },
      {
        Header: "total in $",
        accessor: "total_in_$",
        width: "7%",
        Cell: ({ cell }: { cell: { value: string; row: { original: RowData } } }) => (
          <span
            style={{ textAlign: "left", cursor: "pointer" }} // Align text to the left and show pointer on hover
            onClick={() => handleTotalInClick(cell.row.original)} // Handle click
          >
            {cell.value}
          </span>
        ),
      },
      { Header: "total in #", accessor: "total_in", width: "7%" },
      { Header: "com profit", accessor: "com_profit", width: "7%" },
      //   { Header: "total out $", accessor: "total_out_$", width: "7%" },
      {
        Header: "total out $",
        accessor: "total_out_$",
        width: "7%",
        Cell: ({ cell }: { cell: { value: string; row: { original: RowData } } }) => (
          <span
            style={{ textAlign: "left", cursor: "pointer" }} // Align text to the left and show pointer on hover
            onClick={() => handleTotalOutClick(cell.row.original)} // Handle click
          >
            {cell.value}
          </span>
        ),
      },
      { Header: "total out #", accessor: "total_out", width: "7%" },
      { Header: "com profit", accessor: "com_profit_1", width: "7%" },
    ],
    rows: [
      {
        id: 1,
        master: "MYR MTR001",
        product: "DuitNow",
        total_in_$: "9000.00",
        total_in: "46,221",
        com_profit: "80.50",
        total_out_$: "5000.00",
        total_out: "46,221",
        com_profit_1: "100.50",
      },
      {
        id: 2,
        master: "MYR MTR003",
        product: "Duit Now",
        total_in_$: "1,000.00",
        total_in: "846",
        com_profit: "80.50",
        total_out_$: "1,000.00 ",
        total_out: "563",
        com_profit_1: "100.50",
      },
    ],
  });

  const handleTotalOutClick = (rowData: any) => {
    navigate("/TotalOutReport"); // Replace with the desired route path
  };

  const handleTotalInClick = (rowData: any) => {
    navigate("/TotalInReport"); // Replace with the desired route path
  };

  const handleProductClick = (rowData: any) => {
    navigate("/DuitNowReport"); // Replace with the desired route path
  };

  // Calculate the totals for `com_profit` and `com_profit_1`
  const totalComProfit = calculateTotal(tableData.rows, "com_profit");
  const totalComProfit1 = calculateTotal(tableData.rows, "com_profit_1");

  const totalRow = {
    id: "", // Empty value for id
    master: "", // Empty value for master
    product: "", // Empty value for product
    total_in_$: "", // Empty value for total_in_$ (align with others)
    total_in: "Total:", // Empty value for total_in (align with others)
    com_profit: <span style={{ textDecoration: "underline" }}>{totalComProfit.toFixed(2)}</span>, // Displaying the total
    total_out_$: "", // Empty value for total_out_$ (align with others)
    total_out: "", // Empty value for total_out (align with others)
    com_profit_1: <span style={{ textDecoration: "underline" }}>{totalComProfit1.toFixed(2)}</span>, // Displaying the total
  };

  // Add the label row before the total values
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
                ...tableData,
                rows: updatedRows, // Update the rows to include the total row
              }}
              canSearch
            />
          </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default SummaryProduct;
