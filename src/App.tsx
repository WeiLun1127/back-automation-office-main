import { JSXElementConstructor, Key, ReactElement, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Configurator from "assets/examples/Configurator/Configurator";
import Sidenav from "modules/sideNav";
import theme from "modules/settings/theme-settings/theme";
import themeDark from "modules/settings/theme-settings/theme-dark";
import routes from "routes";
import { setMiniSidenav, useMaterialUIController } from "context";
import brandDark from "assets/images/logo-ct-dark.png";
import brandWhite from "assets/images/logo-ct.png";
import ApiControl from "modules/layouts/company";
import MasterList from "modules/layouts/master";
import CreateMasterAccount from "modules/layouts/master/create";
import Transactions from "modules/layouts/report";
import Authentication from "modules/layouts/security";
import Illustration from "modules/layouts/signin/illustration";
import axios from "axios";

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
  const [pathname, setPathname] = useState<Pathname>("apiControl");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (username: string, password: string) => {
    const authApi = "http://18.138.168.43:10311/api/auth";

    try {
      console.log("Connecting To API");
      const response = await axios.post(
        authApi,
        {
          Uid: username,
          Pass: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;

        if (data.Value.Status === "ERR:0") {
          console.log("Login successful", data.Value);
          setIsAuthenticated(true);
          setPathname("apiControl");
          navigate("/");
        } else {
          console.error("Login failed:", data.Value.Data.Message);
          // alert(data.Value.Data.Message);
          alert("Login failed");
        }
      } else {
        console.error("Unexpected response status:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login", error);
      alert("An error occurred during login. Please try again.");
    }
  };

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
      {!isAuthenticated ? (
        <Illustration onSignIn={handleSignIn} />
      ) : (
        <>
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
        </>
      )}
    </ThemeProvider>
  );
}
