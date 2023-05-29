import React, { ChangeEvent, FC, MouseEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useRouter } from "next/router";
import { loginUser } from "../../utils/authenticationActions";
import { RootState, UserAction } from "../../../store/types";

type LoginProps = {
  open: boolean;
  onClose: any;
};

const SignIn: FC<LoginProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: ThunkDispatch<RootState, any, UserAction> = useDispatch();
  const loginError = useSelector((state: RootState) => state.user.error);
  const authenticatedUser = useSelector(
    (state: RootState) => state.user.authenticatedUser
  );

  // const router = useRouter();
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    await dispatch(loginUser(email, password));
    // Close the modal
    if (authenticatedUser) onClose();
  };

  const handleCancel = () => {
    onClose();

    // router.back();
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
          value={email}
          onChange={handleEmailChange}
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
        {loginError ? (
          <Typography variant="body1" color="error">
            {loginError}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleLogin} variant="contained" color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignIn;
