import React, { ReactNode, useState } from "react";
import { Theme } from "@mui/material/styles";
import { Checkbox, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";

interface Props {
  children: ReactNode;
  noBorder?: boolean;
  align?: "left" | "right" | "center";
  cell?: {
    column: { id: string };
    value: string;
    row: { values: { id: number } };
  };
  editRows?: number[];
  onEditRow?: (row: number) => void;
}

const statuses = ["PENDING", "IN PROGRESS", "SUCCESSFUL", "APPROVED", "FAILED"];

function DataTableBodyCell({
  noBorder,
  align = "left",
  children,
  cell,
  editRows = [],
  onEditRow = () => {},
}: Props): JSX.Element {
  const [rowStatuses, setRowStatuses] = useState<{ [key: number]: string }>({});

  const handleStatusChange = (rowId: number, newStatus: string) => {
    setRowStatuses((prevStatuses) => ({
      ...prevStatuses,
      [rowId]: newStatus,
    }));
  };

  const renderData = () => {
    if (!cell) return children;

    const editable = editRows.includes(cell.row.values.id);

    switch (cell.column.id) {
      case "edit":
        return (
          <Checkbox
            size="small"
            sx={{ padding: 0 }}
            checked={editable}
            onChange={() => onEditRow(cell.row.values.id)}
          />
        );
      case "status":
        return editable ? (
          <Select
            value={rowStatuses[cell.row.values.id] || cell.value}
            onChange={(event) =>
              handleStatusChange(cell.row.values.id, event.target.value as string)
            }
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        ) : (
          children
        );
      default:
        return children;
    }
  };

  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }: Theme) => ({
        fontSize: size.sm,
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle" }}
      >
        {renderData()}
      </MDBox>
    </MDBox>
  );
}

DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};

export default DataTableBodyCell;
