/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactNode } from "react";

// @mui material components
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React TS contexts
import { useMaterialUIController } from "context";

// Declaring props types for DataTableHeadCell
interface Props {
  width?: string | number;
  children: ReactNode;
  sorted?: false | "none" | "asce" | "desc";
  align?: "left" | "right" | "center";
  column?: any;
}

function DataTableHeadCell({
  width = "auto",
  children,
  sorted = "none",
  align = "left",
  column,
  ...rest
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // if (column?.id === "edit") return null;

  return (
    <MDBox
      component="th"
      width={width}
      py={1.5}
      px={3}
      sx={({ palette: { light }, borders: { borderWidth } }: Theme) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox
        {...rest}
        position="relative"
        textAlign={align}
        color={darkMode ? "white" : "secondary"}
        opacity={0.7}
        display="flex"
        sx={({ typography: { size, fontWeightBold } }: Theme) => ({
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
          textTransform: "uppercase",
          cursor: sorted && "pointer",
          userSelect: sorted && "none",
        })}
      >
        {column?.id !== "edit" && (
          <>
            {children}

            {sorted && (
              <MDBox
                sx={({ typography: { size } }: any) => ({
                  fontSize: size.lg,
                })}
              >
                <MDBox
                  position="absolute"
                  top={-6}
                  color={sorted === "asce" ? "text" : "secondary"}
                  opacity={sorted === "asce" ? 1 : 0.5}
                >
                  <Icon>arrow_drop_up</Icon>
                </MDBox>
                <MDBox
                  position="absolute"
                  top={0}
                  color={sorted === "desc" ? "text" : "secondary"}
                  opacity={sorted === "desc" ? 1 : 0.5}
                >
                  <Icon>arrow_drop_down</Icon>
                </MDBox>
              </MDBox>
            )}
          </>
        )}
      </MDBox>
    </MDBox>
  );
}

export default DataTableHeadCell;
