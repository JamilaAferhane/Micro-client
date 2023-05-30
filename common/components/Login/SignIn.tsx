import React, { ChangeEvent, FC, MouseEvent, useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { loginUser } from "../../utils/authenticationActions";
import { RootState, UserAction } from "../../../store/types";

type LoginProps = {
  onClose: any;
};

const SignIn: FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: ThunkDispatch<RootState, any, UserAction> = useDispatch();
  const loginError = useSelector((state: RootState) => state.user.error);
  const authenticatedUser = useSelector(
    (state: RootState) => state.user.authenticatedUser
  );

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
    <Box sx={{ color: "#fff" }}>
      <DialogTitle>Sign In !</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ color: "#fff" }}
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          value={email}
          onChange={handleEmailChange}
          fullWidth
        />
        <TextField
          sx={{ color: "#fff" }}
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
      <DialogActions sx={{ color: "#fff" }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleLogin} variant="contained" color="primary">
          Login
        </Button>
      </DialogActions>
    </Box>
  );
};

export default SignIn;
