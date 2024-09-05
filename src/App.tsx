import { JSXElementConstructor, Key, ReactElement, useEffect, useState } from "react";

// react-router components
import { Navigate, Route, Routes } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components

// Material Dashboard 2 PRO React TS exampless
import Configurator from "assets/examples/Configurator/Configurator";
import Sidenav from "modules/sideNav";

// Material Dashboard 2 PRO React TS themes
import theme from "modules/settings/theme-settings/theme";

// Material Dashboard 2 PRO React TS Dark Mode themes
import themeDark from "modules/settings/theme-settings/theme-dark";

// RTL plugins

// Material Dashboard 2 PRO React TS routes
import routes from "routes";

// Material Dashboard 2 PRO React TS contexts
import { setMiniSidenav, useMaterialUIController } from "context";

// Images
import brandDark from "assets/images/logo-ct-dark.png";
import brandWhite from "assets/images/logo-ct.png";
import ApiControl from "modules/layouts/company";
import MasterList from "modules/layouts/master";
import CreateMasterAccount from "modules/layouts/master/create";
import Transactions from "modules/layouts/report";
import Authentication from "modules/layouts/security";

export type Pathname =
  | "apiControl"
  | "authentication"
  | "createMasterAccount"
  | "masterList"
  | "transactions";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout, sidenavColor, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // const { pathname } = useLocation();
  const [pathname, setPathname] = useState<Pathname>("apiControl");

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes: any[]): any =>
    allRoutes.map(
      (route: {
        collapse: any;
        route: string;
        component: ReactElement<any, string | JSXElementConstructor<any>>;
        key: Key;
      }) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return <Route path={route.route} element={route.component} key={route.key} />;
        }

        return null;
      }
    );

  const getRouteElement = (route: Pathname) => {
    switch (route) {
      case "apiControl":
        return <ApiControl />;
      case "authentication":
        return <Authentication />;
      case "createMasterAccount":
        return <CreateMasterAccount />;
      case "masterList":
        return <MasterList />;
      case "transactions":
        return <Transactions />;
      default:
        return <Navigate to="/" />;
    }
  };

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="BackOffice Automation"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            onSetPathname={(pathname: Pathname) => setPathname(pathname)}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}

      <Routes>
        <Route path="*" element={getRouteElement(pathname)} />
      </Routes>
    </ThemeProvider>
  );
}
