import { Card, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
import { useEffect, useState } from "react";
import axios from "axios";

const tableColumns = [
  { Header: "", accessor: "edit", width: "1%" },
  { Header: "id", accessor: "id", width: "4%" },
  { Header: "transaction id", accessor: "transaction_id", width: "15%" },
  { Header: "currency", accessor: "currency", width: "10%" },
  { Header: "value", accessor: "value", width: "15%" },
  { Header: "created date", accessor: "created_date", width: "15%" },
  { Header: "modified date", accessor: "updated_date", width: "15%" },
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
  const [tableData, setTableData] = useState([]);
  const [editRows, setEditRows] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from http://192.168.68.111/transactions.json");
        const data = await axios.get<Transaction[]>("http://192.168.68.111/transactions.json");
        console.log("Data fetched successfully:", data.data);
        const newData = data.data.map((row, index) => ({
          ...row,
          transaction_id: row.id.toString(), // Assuming transaction_id is a string representation of the id
          id: index + 1,
        }));

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
      return;
    }

    setEditRows([...editRows, rowId]);
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
                      <IconButton aria-label="save" onClick={() => console.log("Saving...")}>
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
