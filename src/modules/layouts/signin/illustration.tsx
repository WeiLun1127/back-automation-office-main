import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import IllustrationLayout from ".";

interface IllustrationProps {
  onSignIn: () => void; // Define the onSignIn prop
}

function Illustration({ onSignIn }: IllustrationProps): JSX.Element {
  // Accept the prop
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={bgImage}
    >
      <MDBox component="form" role="form">
        <MDBox mb={2}>
          <MDInput type="email" label="Email" fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput type="password" label="Password" fullWidth />
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Remember me
          </MDTypography>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" size="large" fullWidth onClick={onSignIn}>
            sign in
          </MDButton>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default Illustration;
