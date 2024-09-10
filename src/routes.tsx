// @mui icons
import Icon from "@mui/material/Icon";
import ApiControl from "modules/layouts/company";
import MasterList from "modules/layouts/master";
import CreateMasterAccount from "modules/layouts/master/create";
import Transactions from "modules/layouts/report";
import Authentication from "modules/layouts/security";

// Images

const routes = [
  {
    id: "0001",
    type: "collapse",
    name: "Company Level",
    key: "company-level",
    icon: <Icon fontSize="medium">business</Icon>,
    collapse: [
      {
        id: "0001",
        name: "API Control",
        key: "api-control",
        route: "apiControl",
        component: <ApiControl />,
      },
    ],
  },
  {
    id: "0002",
    type: "collapse",
    name: "Master",
    key: "master",
    icon: <Icon fontSize="medium">group</Icon>,
    collapse: [
      {
        id: "0001",
        name: "Master List",
        key: "master-list",
        route: "masterList",
        component: <MasterList />,
      },
      {
        id: "0002",
        name: "Create Master Account",
        key: "create-master-account",
        route: "createMasterAccount",
        component: <CreateMasterAccount />,
      },
    ],
  },
  {
    id: "0003",
    type: "collapse",
    name: "Report",
    key: "report",
    icon: <Icon fontSize="medium">assessment</Icon>,
    collapse: [
      {
        id: "0001",
        name: "Transactions",
        key: "transactions",
        route: "transactions",
        component: <Transactions />,
      },
    ],
  },
  {
    id: "0004",
    type: "collapse",
    name: "Security",
    key: "security",
    icon: <Icon fontSize="medium">security</Icon>,
    collapse: [
      {
        id: "0001",
        name: "Authentication",
        key: "authentication",
        route: "authentication",
        component: <Authentication />,
      },
    ],
  },
];

export default routes;
