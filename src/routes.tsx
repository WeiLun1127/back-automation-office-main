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
    type: "collapse",
    name: "Company Level",
    key: "company-level",
    icon: <Icon fontSize="medium">business</Icon>,
    collapse: [
      {
        name: "API Control",
        key: "api-control",
        route: "apiControl",
        component: <ApiControl />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Master",
    key: "master",
    icon: <Icon fontSize="medium">group</Icon>,
    collapse: [
      {
        name: "Master List",
        key: "master-list",
        route: "masterList",
        component: <MasterList />,
      },
      {
        name: "Create Master Account",
        key: "create-master-account",
        route: "createMasterAccount",
        component: <CreateMasterAccount />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Report",
    key: "report",
    icon: <Icon fontSize="medium">assessment</Icon>,
    collapse: [
      {
        name: "Transactions",
        key: "transactions",
        route: "transactions",
        component: <Transactions />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Security",
    key: "security",
    icon: <Icon fontSize="medium">security</Icon>,
    collapse: [
      {
        name: "Authentication",
        key: "authentication",
        route: "authentication",
        component: <Authentication />,
      },
    ],
  },
];

export default routes;
