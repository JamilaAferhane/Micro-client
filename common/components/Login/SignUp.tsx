import React, { FC, MouseEvent, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Modal,
  DialogActions,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState, UserAction } from "../../../store/types";
import { registerUser } from "../../utils/authenticationActions";

type LoginProps = {
  open: boolean;
  onClose: any;
};

const SignUp: FC<LoginProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credit, setCredit] = useState(1000);
  const [fullName, setFullName] = useState("");
  const loginError = useSelector((state: RootState) => state.user.error);
  const authenticatedUser = useSelector(
    (state: RootState) => state.user.authenticatedUser
  );
  const dispatch: ThunkDispatch<RootState, any, UserAction> = useDispatch();

  const router = useRouter();
  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    // Perform registration logic here

    e.preventDefault();
    await dispatch(registerUser(email, password, fullName, credit));

    // Reset form fields
    setEmail("");
    setPassword("");
    setCredit(1000);
    setFullName("");
    // Close the modal
    if (authenticatedUser) onClose();
    // You can submit the form data to your backend API
  };

  const handleCancel = () => {
    onClose();

    router.back();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Container maxWidth="sm">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Credit"
          type="text"
          value={credit}
          placeholder="1000"
          onChange={(e) => setCredit(parseFloat(e.target.value))}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        {loginError ? (
          <Typography variant="body1" color="error">
            {loginError}
          </Typography>
        ) : null}
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>

          <Button
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            color="primary"
          >
            sign up
          </Button>
        </DialogActions>
      </Container>
    </Modal>
  );
};

export default SignUp;
