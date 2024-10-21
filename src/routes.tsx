// @mui icons
import Icon from "@mui/material/Icon";
import AccountProviderList from "modules/layouts/accountProvider";
import CreateAccountProvider from "modules/layouts/accountProvider/create";
import ApiControl from "modules/layouts/company";
import CompanyList from "modules/layouts/company/companyList";
import CurrencyTables from "modules/layouts/currency";
import MasterList from "modules/layouts/master";
import CreateMasterAccount from "modules/layouts/master/create";
import MerchantList from "modules/layouts/merchant";
import CreateMerchantAccount from "modules/layouts/merchant/create";
import Authentication from "modules/layouts/security";
import businessIcon from "././assets/images/routes-logo/business.svg";
import masterIcon from "././assets/images/routes-logo/master.svg";
import reportIcon from "././assets/images/routes-logo/report.svg";
import securityIcon from "././assets/images/routes-logo/security.svg";
import merchantIcon from "././assets/images/routes-logo/merchant.svg";
import agentIcon from "././assets/images/routes-logo/agent.svg";
import accountProviderIcon from "././assets/images/routes-logo/accountProvider.svg";
import productIcon from "././assets/images/routes-logo/products.svg";
import currencyIcon from "././assets/images/routes-logo/currency.svg";
import commissionIcon from "././assets/images/routes-logo/commission.svg";
import logoutIcon from "././assets/images/routes-logo/logout.svg";
import productTables from "modules/layouts/product";
import ProductTables from "modules/layouts/product";
import MasterControl from "modules/layouts/master/control";
import TransactionsReport from "modules/layouts/report";
import TransactionSummary from "modules/layouts/report/summary";
import TraReport from "modules/layouts/report/report";
import dashboardIcon from "././assets/images/routes-logo/dashboard.svg";
import Api from "modules/layouts/controllers/api";
import AgentProduct from "modules/layouts/agent/product";
import CreateAgentAccount from "modules/layouts/agent/create";
import AgentList from "modules/layouts/agent";
import controlIcon from "././assets/images/routes-logo/controller.svg";
import acountIcon from "././assets/images/routes-logo/account.svg";
import ProductControl from "modules/layouts/master/control";
import CreateThresholdAccount from "modules/layouts/account/createThreshold";
import AccountGroupList from "modules/layouts/account/accountGroup";
import AccountThresholdList from "modules/layouts/account/thresholdList";
// Images

const routes = [
  {
    id: "001",
    type: "collapse",
    name: "Controller",
    key: "controller",
    icon: <img src={controlIcon} alt="controller" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "001",
        name: "API",
        key: "api",
        route: "api",
        component: <Api />,
      },
      {
        id: "002",
        parentId: "001",
        name: "Accessibility",
        key: "accessibility",
        route: "accessibility",
        component: <ApiControl />,
      },
    ],
  },
  {
    id: "002",
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <img src={dashboardIcon} alt="dashboard" width="24" height="24" />,
    collapse: [
      // {
      //   id: "001",
      //   parentId: "002",
      //   name: "API",
      //   key: "api",
      //   route: "api",
      //   component: <Api />,
      // },
    ],
  },
  {
    id: "003",
    type: "collapse",
    name: "Master",
    key: "master",
    icon: <img src={masterIcon} alt="master" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "003",
        name: "Create Master",
        key: "create-master-account",
        route: "createMasterAccount",
        component: <CreateMasterAccount />,
      },
      {
        id: "002",
        parentId: "003",
        name: "Master List",
        key: "master-list",
        route: "masterList",
        component: <MasterList />,
      },
      {
        id: "003",
        parentId: "003",
        name: "Product Control",
        key: "product-control",
        route: "productControl",
        component: <ProductControl />,
      },
    ],
  },
  {
    id: "004",
    type: "collapse",
    name: "Agent",
    key: "agent",
    icon: <img src={agentIcon} alt="agent" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "004",
        name: "Create Agent",
        key: "create-agent",
        route: "createAgent",
        component: <CreateAgentAccount />,
      },
      {
        id: "002",
        parentId: "004",
        name: "Agent List",
        key: "agent-list",
        route: "agentList",
        component: <AgentList />,
      },
      {
        id: "003",
        parentId: "004",
        name: "Product Controls",
        key: "product-control",
        route: "productAgentControl",
        component: <AgentProduct />,
      },
    ],
  },
  {
    id: "005",
    type: "collapse",
    name: "Account",
    key: "account",
    icon: <img src={acountIcon} alt="account" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "005",
        name: "Create Threshold",
        key: "create-account-threshold",
        route: "createAccountThreshold",
        component: <CreateThresholdAccount />,
      },
      {
        id: "002",
        parentId: "005",
        name: "Threshold List",
        key: "account-threshold",
        route: "accountTresholdList",
        component: <AccountThresholdList />,
      },
      {
        id: "003",
        parentId: "005",
        name: "Account Group",
        key: "account-group",
        route: "accountGroup",
        component: <AccountGroupList />,
      },
    ],
  },
  {
    id: "006",
    type: "collapse",
    name: "Product",
    key: "product",
    icon: <img src={productIcon} alt="product" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "006",
        name: "Product List",
        key: "product-list-company",
        route: "productListCompany",
        component: <ProductTables />,
      },
      // {
      //   id: "002",
      //   parentId: "006",
      //   name: "Product List",
      //   key: "product-list-agent",
      //   route: "productListAgent",
      //   component: <ProductTables />,
      // },
    ],
  },
  {
    id: "007",
    type: "collapse",
    name: "Report",
    key: "report",
    icon: <img src={reportIcon} alt="report" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "007",
        name: "Transaction Summary",
        key: "transaction-summary",
        route: "transactionSummary",
        component: <TransactionSummary />,
      },
      {
        id: "002",
        parentId: "007",
        name: "Transaction Report",
        key: "transaction-report",
        route: "transactionReport",
        component: <TraReport />,
      },
    ],
  },
  {
    id: "008",
    type: "collapse",
    name: "Currency",
    key: "currency",
    icon: <img src={currencyIcon} alt="currency" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "008",
        name: "Currency List",
        key: "currency-list",
        route: "currencyList",
        component: <CurrencyTables />,
      },
    ],
  },
  {
    id: "009",
    type: "collapse",
    name: "Account Provider",
    key: "account-provider",
    icon: <img src={accountProviderIcon} alt="account provider" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "009",
        name: "Create Provider",
        key: "create-Account-Provider",
        route: "createAccountProvider",
        component: <CreateAccountProvider />,
      },
      {
        id: "002",
        parentId: "009",
        name: "Provider List",
        key: "provider-list",
        route: "providerList",
        component: <AccountProviderList />,
      },
    ],
  },
  {
    id: "010",
    type: "collapse",
    name: "Security",
    key: "security",
    icon: <img src={securityIcon} alt="security" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "010",
        name: "Authentication",
        key: "authentication",
        route: "authentication",
        component: <Authentication />,
      },
    ],
  },
  {
    type: "divider",
    name: "Divider-1",
    key: "divider-1",
  },
  {
    type: "item",
    name: "Logout",
    key: "logout",
    icon: <img src={logoutIcon} alt="logout" width="24" height="24" />,
  },
];

export default routes;
