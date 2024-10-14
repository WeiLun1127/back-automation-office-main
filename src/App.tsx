import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Configurator from "assets/examples/Configurator/Configurator";
import brandDark from "assets/images/logo-ct-dark.png";
import brandWhite from "assets/images/logo-ct.png";
import axios from "axios";
import MDSnackbar from "components/MDSnackbar";
import { setMiniSidenav, useMaterialUIController } from "context";
import AccountGroupList from "modules/layouts/account/accountGroup";
import CreateThresholdAccount from "modules/layouts/account/createThreshold";
import AccountThresholdList from "modules/layouts/account/thresholdList";
import AccountProviderList from "modules/layouts/accountProvider";
import CreateAccountProvider from "modules/layouts/accountProvider/create";
import AgentList from "modules/layouts/agent";
import CreateAgentAccount from "modules/layouts/agent/create";
import AgentProduct from "modules/layouts/agent/product";
import CommissionList from "modules/layouts/comm";
import CreateCommissionAccount from "modules/layouts/comm/create";
import ApiControl from "modules/layouts/company";
import CompanyList from "modules/layouts/company/companyList";
import Api from "modules/layouts/controllers/api";
import CurrencyTables from "modules/layouts/currency";
import MasterList from "modules/layouts/master";
import ProductControl from "modules/layouts/master/control";
import MasterControl from "modules/layouts/master/control";
import CreateMasterAccount from "modules/layouts/master/create";
import MerchantList from "modules/layouts/merchant";
import CreateMerchantAccount from "modules/layouts/merchant/create";
import ProductTables from "modules/layouts/product";
import TransactionsReport from "modules/layouts/report";
import TraReport from "modules/layouts/report/report";
import TransactionSummary from "modules/layouts/report/summary";
import SummaryCurrency from "modules/layouts/report/summaryData/summaryCurrency";
import SummaryCurrencyProducts from "modules/layouts/report/summaryData/summaryCurrency";
import DuitNowReport from "modules/layouts/report/summaryData/summaryDuitNow";
import SummaryProduct from "modules/layouts/report/summaryData/summaryProduct";
import SummaryProductReport from "modules/layouts/report/summaryData/summaryProductData.tsx/summaryProductReport";
import SummaryTotalInReport from "modules/layouts/report/summaryData/summaryProductData.tsx/summaryTotalInReport";
import SummaryTotalOutReport from "modules/layouts/report/summaryData/summaryProductData.tsx/summaryTotalOutReport";
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
  | "api"
  | "accessibility"
  | "createMasterAccount"
  | "masterList"
  | "productControl"
  | "createAgent"
  | "agentList"
  | "createAccountThreshold"
  | "accountTresholdList"
  | "accountGroup"
  | "productListCompany"
  | "productListAgent"
  | "transactionSummary"
  | "transactionReport"
  | "currencyList"
  | "createAccountProvider"
  | "providerList"
  | "authentication"
  | "commissionList";

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
  const [welcomeName, setWelcomeName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false); // Automatically hide the snackbar after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when success changes
    }
  }, [success]);

  const getSnackbarColor = () => {
    return snackBarTitle.toLowerCase().includes("error") ? "error" : "success";
  };

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

        const decodedString = data.Data.replace(/\\u0022/g, '"')
          .replace('"[{', "[{")
          .replace('}]"', "}]");
        const authData = JSON.parse(decodedString);

        // set user control
        console.log("control", authData.Control);
        console.log("name", authData.Name);
        setWelcomeName(authData.Name);
        setUserControl(authData.Control);

        if (data.Status === "ERR:0") {
          console.log("Login successful", data);

          // Extract the token
          const tokenMatch = /"Token"\s*:\s*"([^"]+)"/.exec(data.Data);
          const initialToken = tokenMatch ? tokenMatch[1] : null;

          if (initialToken) {
            setIsAuthenticated(true);
            setUsername(username);
            setToken(initialToken); // Store the token in the state

            setSnackBarTitle(`Welcome Back, ${authData.Name}`);
            setSuccess(true);

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
            // alert("Token not found during login.");
            setSnackBarTitle("Error, Token Not Found.");
            setSuccess(true);
          }
        } else {
          console.error("Login failed:", data.Value.Data.Message);
          // alert("Login failed");
          setSnackBarTitle("Error Occured. Login Failed.");
          setSuccess(true);
        }
      } else {
        console.error("Unexpected response status:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login", error);
      // alert("An error occurred during login. Please try again.");
      setSnackBarTitle("An error occurred during login. Please try again.");
      setSuccess(true);
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
      case "api":
        return <Api />;
      case "accessibility":
        return <ApiControl />;
      case "createMasterAccount":
        return <CreateMasterAccount />;
      case "masterList":
        return <MasterList />;
      case "productControl":
        return <ProductControl />;
      case "createAgent":
        return <CreateAgentAccount />;
      case "agentList":
        return <AgentList />;
      case "createAccountThreshold":
        return <CreateThresholdAccount />;
      case "accountTresholdList":
        return <AccountThresholdList />;
      case "accountGroup":
        return <AccountGroupList />;
      case "productListCompany":
        return <ProductTables />;
      case "productListAgent":
        return <ApiControl />; //
      case "transactionSummary":
        return <TransactionSummary />;
      case "transactionReport":
        return <TraReport />;
      case "currencyList":
        return <CurrencyTables />;
      case "createAccountProvider":
        return <CreateAccountProvider />;
      case "providerList":
        return <AccountProviderList />;
      case "authentication":
        return <Authentication />;
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
            <Route path="/CurrencySummary" element={<SummaryCurrency />} />
            <Route path="/ProductSummary" element={<SummaryProduct />} />
            <Route path="/ProductReport" element={<SummaryProductReport />} />
            <Route path="/TotalInReport" element={<SummaryTotalInReport />} />
            <Route path="/TotalOutReport" element={<SummaryTotalOutReport />} />
            <Route path="/DuitNowReport" element={<DuitNowReport />} />
          </Routes>
        </>
      )}
      <MDSnackbar
        open={success}
        color={getSnackbarColor()}
        title={snackBarTitle}
        close={() => setSuccess(false)} // Close the snackbar
      />
    </ThemeProvider>
  );
}
