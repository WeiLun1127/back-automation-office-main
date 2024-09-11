import { SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import IllustrationLayout from ".";

interface IllustrationProps {
  onSignIn: (username: string, password: string) => void;
}

function Illustration({ onSignIn }: IllustrationProps): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    onSignIn(username, password);
    // console.log(username, password);
  };

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your UserID and Password to sign in"
      illustration={bgImage}
    >
      <MDBox component="form" role="form">
        <MDBox mb={2}>
          <MDInput
            type="userid"
            label="User ID"
            fullWidth
            value={username}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setUsername(e.target.value)
            }
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            fullWidth
            value={password}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setPassword(e.target.value)
            }
          />
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" size="large" fullWidth onClick={handleSignIn}>
            sign in
          </MDButton>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default Illustration;
