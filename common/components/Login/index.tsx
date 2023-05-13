import React, { ChangeEvent, FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

type LoginProps = {
  open: boolean;
  onClose: any;
};

const LoginModal: FC<LoginProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Perform login logic with username and password
    // You can replace this with your own implementation

    console.log("Login with:", username, password);

    // Close the modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogin} variant="contained" color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
