import React, { FC, MouseEvent, useState } from "react";
import {
  TextField,
  Button,
  Container,
  DialogActions,
  Typography,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState, UserAction } from "../../../store/types";
import { registerUser } from "../../utils/authenticationActions";

type LoginProps = {
  onClose: any;
};

const SignUp: FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credit, setCredit] = useState(1000);
  const [fullName, setFullName] = useState("");
  const { authenticatedUser, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch: ThunkDispatch<RootState, any, UserAction> = useDispatch();

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
  };

  return (
    <Container maxWidth="sm" sx={{ color: "#fff" }}>
      <DialogTitle>Sign Up !</DialogTitle>

      <TextField
        sx={{ color: "#fff" }}
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        sx={{ color: "#fff" }}
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        sx={{ color: "#fff" }}
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
        sx={{ color: "#fff" }}
        label="Full Name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : null}
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>

        <Button
          onClick={(e) => handleSubmit(e)}
          variant="contained"
          color="primary"
          sx={{ color: "#fff" }}
        >
          sign up
        </Button>
      </DialogActions>
    </Container>
  );
};

export default SignUp;
