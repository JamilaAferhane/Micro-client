import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../store/types";
import LoginForm from "../common/components/Login";

const Payment = () => {
  const [login, setLogin] = useState(true);
  const onClose = () => {
    setLogin(false);
  };
  const user = useSelector((state: RootState) => state.user.authenticatedUser);
  return (
    <Container>
      {/* {user ? (
        <div>payment</div>
      ) : (
        <div>
          You Are Not Authenticated
          <LoginForm open={login} onClose={onClose} />
        </div>
      )} */}
    </Container>
  );
};

export default Payment;
