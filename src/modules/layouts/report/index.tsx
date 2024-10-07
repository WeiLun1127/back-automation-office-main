import SaveIcon from "@mui/icons-material/Save";
import { Card, IconButton } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import axios from "axios";
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const tableColumns = [
  { Header: "", accessor: "edit", width: "1%" },
  { Header: "id", accessor: "id", width: "4%" },
  { Header: "transaction id", accessor: "transaction_id", width: "15%" },
  { Header: "currency", accessor: "currency", width: "10%" },
  { Header: "value", accessor: "value", width: "15%" },
  { Header: "created date", accessor: "created_date", width: "15%" },
  { Header: "updated date", accessor: "updated_date", width: "15%" },
  { Header: "type", accessor: "type", width: "10%" },
  { Header: "status", accessor: "status", width: "15%" },
];

type Transaction = {
  id: number;
  transaction_id: string;
  currency: string;
  value: string;
  created_date: string;
  updated_date: string;
  type: string;
  status: string;
};

const Transactions = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editRows, setEditRows] = useState([]);
  const [statusChange, setStatusChange] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from http://18.138.168.43:10300/api/json/transactions.json");
        const data = await axios.get<Transaction[]>(
          "http://18.138.168.43:10300/api/json/transactions.json",
          {
            timeout: 10000,
          }
        );
        console.log("Data fetched successfully:", data.data);
        const newData = data.data.map((row, index) => ({
          ...row,
          transaction_id: row.id.toString(),
          id: index + 1,
        }));

        setData(newData);
        setTableData(newData);
      } catch (error) {
        console.error("error", error);
        setError(true);
      }
    };

    fetchData();
  }, []);

  const onEditRow = (rowId: number) => {
    if (editRows.includes(rowId)) {
      setEditRows(editRows.filter((editRow) => editRow !== rowId));
      setStatusChange(statusChange.filter((change) => change.rowId !== rowId));
      return;
    }

    setEditRows([...editRows, rowId]);
  };

  const onStatusChange = (rowId: number, newStatus: string) => {
    const updatedStatusChange = statusChange.map((change) =>
      change.rowId === rowId ? { ...change, newStatus } : change
    );

    if (!statusChange.some((change) => change.rowId === rowId)) {
      updatedStatusChange.push({ rowId, newStatus });
    }

    setStatusChange(updatedStatusChange);
  };

  const onSaveRow = async (rowData: Transaction) => {
    try {
      const newStatus = statusChange.find((change) => change.rowId === rowData.id)?.newStatus;
      const response = await axios.patch(
        `http://localhost:3001/transactions/${rowData.transaction_id}`,
        { status: newStatus }
      );
      console.log("Response Payload:", response.data);

      setTableData((prevTableData) =>
        prevTableData.map((data) =>
          data.id === rowData.id ? { ...data, status: newStatus } : data
        )
      );

      setSuccess(true);
      setEditRows(editRows.filter((editRow) => editRow !== rowData.id));
    } catch (error) {
      console.error("Error", error);
      setError(true);
    }
  };

  const applyFilters = ({
    selectedCreatedDate,
    selectedUpdatedDate,
    selectedCurrencyOptions,
    selectedStatus,
  }: {
    selectedCreatedDate: string;
    selectedUpdatedDate: string;
    selectedCurrencyOptions: string[];
    selectedStatus: string | null;
  }) => {
    // filter by OR condition
    const filteredData = data.filter((row) => {
      if (
        !selectedCurrencyOptions.length &&
        !selectedCreatedDate &&
        !selectedUpdatedDate &&
        !selectedStatus
      )
        return true;
      if (selectedCurrencyOptions.includes(row.currency)) return true;
      if (selectedCreatedDate && dayjs(row.created_date).isSame(selectedCreatedDate, "day"))
        return true;
      if (selectedUpdatedDate && dayjs(row.updated_date).isSame(selectedUpdatedDate, "day"))
        return true;
      if (selectedStatus && row.status === selectedStatus) return true;
      return false;
    });

    setTableData(filteredData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={3} pb={3}>
        <Card>
          <DataTable
            table={{
              columns: [
                ...tableColumns,
                {
                  Header: "Action",
                  accessor: "save",
                  Cell: ({ row }: { row: any }) =>
                    editRows.includes(row.original.id) ? (
                      <IconButton
                        aria-label="save"
                        onClick={() => {
                          onSaveRow(row.original);
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    ) : null,
                },
              ],
              rows: tableData,
            }}
            canSearch
            canFilter
            editRows={editRows}
            onEditRow={onEditRow}
            onStatusChange={onStatusChange}
            applyFilters={applyFilters}
          />
        </Card>
      </MDBox>

      <MDSnackbar
        open={error}
        fontSize="small"
        color="error"
        title="Something went wrong. Please try again later."
        close={() => setError(false)}
      />

      <MDSnackbar
        open={success}
        fontSize="small"
        color="success"
        title="Success"
        close={() => setSuccess(false)}
      />
    </DashboardLayout>
  );
};

export default Transactions;
