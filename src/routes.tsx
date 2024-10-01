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
import Transactions from "modules/layouts/report";
import Authentication from "modules/layouts/security";

// Images

const routes = [
  {
    id: "001",
    type: "collapse",
    name: "Company Level",
    key: "company-level",
    icon: <Icon fontSize="medium">business</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "001",
        name: "API Control",
        key: "api-control",
        route: "apiControl",
        component: <ApiControl />,
      },
      {
        id: "002",
        parentId: "001",
        name: "Company List",
        key: "company-list",
        route: "companyList",
        component: <CompanyList />,
      },
    ],
  },
  {
    id: "002",
    type: "collapse",
    name: "Master",
    key: "master",
    icon: <Icon fontSize="medium">group</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "002",
        name: "Create Account",
        key: "create-master-account",
        route: "createMasterAccount",
        component: <CreateMasterAccount />,
      },
      {
        id: "002",
        parentId: "002",
        name: "Master List",
        key: "master-list",
        route: "masterList",
        component: <MasterList />,
      },
    ],
  },
  {
    id: "003",
    type: "collapse",
    name: "Report",
    key: "report",
    icon: <Icon fontSize="medium">assessment</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "003",
        name: "Transactions",
        key: "transactions",
        route: "transactions",
        component: <Transactions />,
      },
    ],
  },
  {
    id: "004",
    type: "collapse",
    name: "Security",
    key: "security",
    icon: <Icon fontSize="medium">security</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "004",
        name: "Authentication",
        key: "authentication",
        route: "authentication",
        component: <Authentication />,
      },
    ],
  },
  {
    id: "005",
    type: "collapse",
    name: "Merchant",
    key: "merchant",
    icon: <Icon fontSize="medium">shopping_cart</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "005",
        name: "Create Account",
        key: "create-merchant-account",
        route: "createMerchantAccount",
        component: <CreateMerchantAccount />,
      },
      {
        id: "002",
        parentId: "005",
        name: "Merchant List",
        key: "merchant-list",
        route: "merchantList",
        component: <MerchantList />,
      },
    ],
  },
  {
    id: "006",
    type: "collapse",
    name: "Account Provider",
    key: "account-provider",
    icon: <Icon fontSize="medium">account_box</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "006",
        name: "Create Account",
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
    icon: <Icon fontSize="medium">account_circle</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "007",
        name: "Create Account",
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
    ],
  },
  {
    id: "008",
    type: "collapse",
    name: "Commission Broker",
    key: "Commission",
    icon: <Icon fontSize="medium">monetization_on</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "008",
        name: "Create Account",
        key: "create-commission",
        route: "createCommission",
        component: <CreateAccountProvider />,
      },
      {
        id: "002",
        parentId: "008",
        name: "Commission List",
        key: "commission-list",
        route: "commissionList",
        component: <AccountProviderList />,
      },
    ],
  },
  {
    id: "009",
    type: "collapse",
    name: "Currency",
    key: "currency",
    icon: <Icon fontSize="medium">attach_money</Icon>,
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
    icon: <Icon fontSize="medium">shopping_basket</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "010",
        name: "Product List",
        key: "products",
        route: "products",
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
    icon: <Icon fontSize="medium">logout</Icon>,
  },
];

export default routes;
