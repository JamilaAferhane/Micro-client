import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Modal } from "@mui/material";
import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface LinkTabProps {
  // eslint-disable-next-line react/require-default-props
  label?: string;
  // eslint-disable-next-line react/require-default-props
  href?: string;
}

interface LoginTabsProps {
  open: boolean;
  onClose: () => void;
}

const LinkTab = (props: LinkTabProps) => (
  <Tab
    component="a"
    onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
    }}
    {...props}
  />
);

const LoginForm: React.FC<LoginTabsProps> = ({ open, onClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="signIn" />
          <LinkTab label="signUp" />
        </Tabs>

        {value === 0 ? (
          <SignIn open={open} onClose={onClose} />
        ) : (
          <SignUp open={open} onClose={onClose} />
        )}
      </Box>
    </Modal>
  );
};
export default LoginForm;
