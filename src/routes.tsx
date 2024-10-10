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
// Images

const routes = [
  {
    id: "001",
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <img src={dashboardIcon} alt="dashboard" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "001",
        name: "API Controller",
        key: "api-control",
        route: "apiControl",
        component: <ApiControl />,
      },
      {
        id: "002",
        parentId: "001",
        name: "Accessibility",
        key: "accessibility",
        route: "accessibility",
        component: <ApiControl />,
      },
      // {
      //   id: "003",
      //   parentId: "001",
      //   name: "Company List",
      //   key: "company-list",
      //   route: "companyList",
      //   component: <CompanyList />,
      // },
    ],
  },
  {
    id: "002",
    type: "collapse",
    name: "Controllers",
    key: "controller",
    icon: <img src={businessIcon} alt="business" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "002",
        name: "API",
        key: "api",
        route: "api",
        component: <Api />,
      },
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
        name: "Master Control",
        key: "master-control",
        route: "masterControl",
        component: <MasterControl />,
      },
    ],
  },
  {
    id: "004",
    type: "collapse",
    name: "Report",
    key: "report",
    icon: <img src={reportIcon} alt="report" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "004",
        name: "Summary",
        key: "transaction-summary",
        route: "transactionSummary",
        component: <TransactionSummary />,
      },
      {
        id: "002",
        parentId: "004",
        name: "Report",
        key: "transaction-report",
        route: "transactionReport",
        // component: <TransactionsReport />,
        component: <TraReport />,
      },
    ],
  },
  {
    id: "005",
    type: "collapse",
    name: "Security",
    key: "security",
    icon: <img src={securityIcon} alt="security" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "005",
        name: "Authentication",
        key: "authentication",
        route: "authentication",
        component: <Authentication />,
      },
    ],
  },
  // {
  //   id: "005",
  //   type: "collapse",
  //   name: "Merchant",
  //   key: "merchant",
  //   icon: <img src={merchantIcon} alt="merchant" width="24" height="24" />,
  //   collapse: [
  //     {
  //       id: "001",
  //       parentId: "005",
  //       name: "Create Account",
  //       key: "create-merchant-account",
  //       route: "createMerchantAccount",
  //       component: <CreateMerchantAccount />,
  //     },
  //     {
  //       id: "002",
  //       parentId: "005",
  //       name: "Merchant List",
  //       key: "merchant-list",
  //       route: "merchantList",
  //       component: <MerchantList />,
  //     },
  //   ],
  // },
  {
    id: "006",
    type: "collapse",
    name: "Account Provider",
    key: "account-provider",
    icon: <img src={accountProviderIcon} alt="accountProvider" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "006",
        name: "Create Provider",
        key: "create-account-provider",
        route: "createAccountProvider",
        component: <CreateAccountProvider />,
      },
      {
        id: "002",
        parentId: "006",
        name: "Provider List",
        key: "account-provider-list",
        route: "accountProviderList",
        component: <AccountProviderList />,
      },
    ],
  },
  {
    id: "007",
    type: "collapse",
    name: "Agent",
    key: "agent",
    icon: <img src={agentIcon} alt="agent" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "007",
        name: "Create Agent",
        key: "create-agent",
        route: "createAgent",
        component: <CreateAccountProvider />,
      },
      {
        id: "002",
        parentId: "007",
        name: "Agent List",
        key: "agent-list",
        route: "agentList",
        component: <AccountProviderList />,
      },
      {
        id: "003",
        parentId: "007",
        name: "Products",
        key: "agent-products",
        route: "agentProducts",
        component: <AgentProduct />,
      },
    ],
  },
  // {
  //   id: "008",
  //   type: "collapse",
  //   name: "Commission Broker",
  //   key: "Commission",
  //   icon: <img src={commissionIcon} alt="commissionBroker" width="24" height="24" />,
  //   collapse: [
  //     {
  //       id: "001",
  //       parentId: "008",
  //       name: "Create Account",
  //       key: "create-commission",
  //       route: "createCommission",
  //       component: <CreateAccountProvider />,
  //     },
  //     {
  //       id: "002",
  //       parentId: "008",
  //       name: "Commission List",
  //       key: "commission-list",
  //       route: "commissionList",
  //       component: <AccountProviderList />,
  //     },
  //   ],
  // },
  {
    id: "009",
    type: "collapse",
    name: "Currency",
    key: "currency",
    icon: <img src={currencyIcon} alt="currency" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "009",
        name: "Currency List",
        key: "currency",
        route: "currency",
        component: <CurrencyTables />,
      },
    ],
  },
  {
    id: "010",
    type: "collapse",
    name: "Products",
    key: "products",
    icon: <img src={productIcon} alt="products" width="24" height="24" />,
    collapse: [
      {
        id: "001",
        parentId: "010",
        name: "Product List",
        key: "products",
        route: "products",
        component: <ProductTables />,
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
