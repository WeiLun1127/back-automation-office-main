import { Card, Divider, Grid, Icon } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ApiControl = () => {
  const renderCard = (
    icon: string,
    iconColor: string,
    title: string,
    description: string,
    caption: string
  ) => {
    return (
      <Card>
        <MDBox p={2}>
          <MDBox display="flex">
            <MDBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor={iconColor}
              color="white"
              width="4rem"
              height="4rem"
              shadow="md"
              borderRadius="lg"
              variant="gradient"
            >
              <Icon fontSize="large">{icon}</Icon>
            </MDBox>

            <MDBox
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              pl={3}
            >
              <MDTypography variant="caption">{title}</MDTypography>
              <MDTypography variant="h4" fontWeight="medium">
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>

          <Divider />

          <MDTypography variant="caption">{caption}</MDTypography>
        </MDBox>
      </Card>
    );
  };

  const lineChartData1 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const lineChartData2 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Dataset 2",
        data: [28, 48, 40, 19, 86, 27],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container pt={3} pb={25} justifyContent="center">
        <MDBox pt={3} pb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={6}>
              {renderCard("task", "info", "Information", "1,600", "Updated 4 minutes ago")}
            </Grid>

            <Grid item xs={12} xl={6}>
              {renderCard("priority_high", "error", "Alert", "357", "Updated 4 minutes ago")}
            </Grid>

            <Grid item xs={12} xl={6}>
              {renderCard("warning", "warning", "Warning", "2,300", "Updated 4 minutes ago")}
            </Grid>

            <Grid item xs={12} xl={6}>
              {renderCard("assignment", "dark", "Report", "940", "Updated 4 minutes ago")}
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={5}>
            <Grid item xs={12} xl={6}>
              <Line data={lineChartData1} />
            </Grid>
            <Grid item xs={12} xl={6}>
              <Line data={lineChartData2} />
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
    </DashboardLayout>
  );
};

export default ApiControl;
