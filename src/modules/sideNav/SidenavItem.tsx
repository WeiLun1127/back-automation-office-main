import { ReactNode } from "react";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Theme } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Custom styles for the SidenavItem
import { item, itemArrow, itemContent } from "./styles/sidenavItem";

// Material Dashboard 2 PRO React TS contexts
import { useMaterialUIController } from "context";

// Declaring props types for SidenavCollapse
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  name: string;
  active?: boolean | string;
  nested?: boolean;
  children?: ReactNode;
  open?: boolean;
  [key: string]: any;
}

function SidenavItem({
  color = "info",
  name,
  active = false,
  nested = false,
  children,
  open = false,
  ...rest
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;

  return (
    <>
      <ListItem
        {...rest}
        component="li"
        sx={(theme) => item(theme, { active, color, transparentSidenav, whiteSidenav, darkMode })}
      >
        <MDBox
          sx={(theme: Theme): any =>
            itemContent(theme, {
              active,
              miniSidenav,
              name,
              open,
              nested,
              transparentSidenav,
              whiteSidenav,
              darkMode,
            })
          }
        >
          <ListItemText primary={name} />
          {children && (
            <Icon
              component="i"
              sx={(theme) =>
                itemArrow(theme, { open, miniSidenav, transparentSidenav, whiteSidenav, darkMode })
              }
            >
              expand_less
            </Icon>
          )}
        </MDBox>
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit {...rest}>
          {children}
        </Collapse>
      )}
    </>
  );
}

export default SidenavItem;
