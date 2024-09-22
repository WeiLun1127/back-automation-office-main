import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Configurator from "assets/examples/Configurator/Configurator";
import brandDark from "assets/images/logo-ct-dark.png";
import brandWhite from "assets/images/logo-ct.png";
import axios from "axios";
import { setMiniSidenav, useMaterialUIController } from "context";
import AccountProviderList from "modules/layouts/accountProvider";
import CreateAccountProvider from "modules/layouts/accountProvider/create";
import AgentList from "modules/layouts/agent";
import CreateAgentAccount from "modules/layouts/agent/create";
import CommissionList from "modules/layouts/comm";
import CreateCommissionAccount from "modules/layouts/comm/create";
import ApiControl from "modules/layouts/company";
import CurrencyTables from "modules/layouts/currency";
import MasterList from "modules/layouts/master";
import CreateMasterAccount from "modules/layouts/master/create";
import Transactions from "modules/layouts/report";
import Authentication from "modules/layouts/security";
import Illustration from "modules/layouts/signin/illustration";
import theme from "modules/settings/theme-settings/theme";
import themeDark from "modules/settings/theme-settings/theme-dark";
import Sidenav from "modules/sideNav";
import { JSXElementConstructor, Key, ReactElement, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routes from "routes";

export type Pathname =
  | "apiControl"
  | "authentication"
  | "createMasterAccount"
  | "masterList"
  | "transactions"
  | "createAccountProvider"
  | "accountProviderList"
  | "createAgent"
  | "agentList"
  | "createCommission"
  | "commissionList"
  | "currency"
  | "products";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout, sidenavColor, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [pathname, setPathname] = useState<Pathname>("apiControl");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userControl, setUserControl] = useState<{ [key: string]: string }[]>(null);
  const [token, setToken] = useState<string | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async (username: string, password: string) => {
    const authApi = "http://18.138.168.43:10311/api/auth";

    try {
      const userAgent = navigator.userAgent;
      const response = await axios.post(
        authApi,
        {
          Uid: username,
          Pass: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": userAgent,
          },
        }
      );

      if (response.status === 200) {
        const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;

        // data.Data is "{Token : tfcWhyawKrAzMAvGpP00uOtY4Z/lWhKx1RQuyR9WDzqX6F25tNX5OkOwwA3TJuYi2zNpQeNz2maqGxYyrf9IJQHE9fAKu25QN4j3gTOnri0=, Control : [{001:1},{001.001:1}, {001.002:1},{002:1},{003:1},{002.004:1}, {002.004.001:1111}, {002.004.002:1001}] }"
        // extract the control
        // replace \n with '' and ' ' with ''
        // remove " only the first and last
        const control = data.Data.substring(data.Data.indexOf("Control") + 10, data.Data.length - 1)
          .replace(/\n/g, "")
          .replace(/ /g, "")
          .slice(1, -1);
        console.log("Control", control, JSON.parse(control));
        setUserControl(JSON.parse(control));

        if (data.Status === "ERR:0") {
          console.log("Login successful", data);

          // Extract the token
          const tokenMatch = /"Token"\s*:\s*"([^"]+)"/.exec(data.Data);
          const initialToken = tokenMatch ? tokenMatch[1] : null;

          if (initialToken) {
            setIsAuthenticated(true);
            setUsername(username);
            setToken(initialToken); // Store the token in the state

            pingApi(username, initialToken);

            // Set interval to ping every 20 seconds
            const newIntervalId = setInterval(() => {
              setToken((prevToken) => {
                if (prevToken) {
                  pingApi(username, prevToken); // Use the latest token
                }
                return prevToken;
              });
            }, 20000);
            setIntervalId(newIntervalId);

            setPathname("apiControl");
            navigate("/");
          } else {
            console.error("Token not found");
            alert("Token not found during login.");
          }
        } else {
          console.error("Login failed:", data.Value.Data.Message);
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

  //Data Sample : "Control" : "["001.1.001.1", "002.1.001.1", "002.1.002.1", "003.1.001.1.001.1111", "004.1.001.1"]"
  localStorage.setItem("username", username);

  const pingApi = async (username: string, currentToken: string) => {
    const pingUrl = "http://18.138.168.43:10311/api/ping";

    try {
      const response = await axios.post(
        pingUrl,
        {
          Uid: username,
          Token: currentToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Ping successful", response.data);
        const newToken = response.data?.Token;
        if (newToken) {
          setToken(newToken); // Update the token in the state
          localStorage.setItem("token", newToken);
        } else {
          console.warn("Token is empty, navigating to illustration page.");
          setIsAuthenticated(false); // Set authenticated state to false
          navigate("/"); // Navigate to the illustration page
        }
      } else {
        console.error("Ping failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during ping", error);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    const handlePopState = () => {
      if (intervalId) {
        clearInterval(intervalId); // stop the ping interval
        setIntervalId(null); // clear the interval state
      }
      setIsAuthenticated(false); // reset authentication state
      navigate("/"); // navigate to illustration page
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [intervalId, navigate]);

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
      case "createAccountProvider":
        return <CreateAccountProvider />;
      case "accountProviderList":
        return <AccountProviderList />;
      case "createAgent":
        return <CreateAgentAccount />;
      case "agentList":
        return <AgentList />;
      case "createCommission":
        return <CreateCommissionAccount />;
      case "commissionList":
        return <CommissionList />;
      case "currency":
        return <CurrencyTables />;
      case "products":
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
                userControl={userControl}
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
