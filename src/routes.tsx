// @mui icons
import Icon from "@mui/material/Icon";
import AccountProviderList from "modules/layouts/accountProvider";
import CreateAccountProvider from "modules/layouts/accountProvider/create";
import ApiControl from "modules/layouts/company";
import CurrencyTables from "modules/layouts/currency";
import MasterList from "modules/layouts/master";
import CreateMasterAccount from "modules/layouts/master/create";
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
        name: "Master List",
        key: "master-list",
        route: "masterList",
        component: <MasterList />,
      },
      {
        id: "002",
        parentId: "002",
        name: "Create Master Account",
        key: "create-master-account",
        route: "createMasterAccount",
        component: <CreateMasterAccount />,
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
    name: "Account Provider",
    key: "account-provider",
    icon: <Icon fontSize="medium">account_box</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "005",
        name: "Create Account",
        key: "create-account-provider",
        route: "createAccountProvider",
        component: <CreateAccountProvider />,
      },
      {
        id: "002",
        parentId: "005",
        name: "Provider List",
        key: "account-provider-list",
        route: "accountProviderList",
        component: <AccountProviderList />,
      },
    ],
  },
  {
    id: "006",
    type: "collapse",
    name: "Currency",
    key: "currency",
    icon: <Icon fontSize="medium">attach_money</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "006",
        name: "Currency List",
        key: "currency",
        route: "currency",
        component: <CurrencyTables />,
      },
    ],
  },
  {
    id: "007",
    type: "collapse",
    name: "Products",
    key: "products",
    icon: <Icon fontSize="medium">shopping_basket</Icon>,
    collapse: [
      {
        id: "001",
        parentId: "007",
        name: "Product List",
        key: "products",
        route: "products",
        component: <Authentication />,
      },
    ],
  },
];

export default routes;
