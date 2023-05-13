import { FC, useState } from "react";
import { Snackbar, SnackbarContent, styled } from "@mui/material";

type PaymentSuccessProps = {
  state: boolean;
};
const SuccessfulPayment: FC<PaymentSuccessProps> = ({ state }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(state);

  const handleCloseSnackbar = () => {
    // Reset payment success state
    setPaymentSuccess(false);
  };
  const StyledSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
    backgroundColor: "green",
    fontSize: "16px",
    fontWeight: "bold",
  }));

  return (
    <Snackbar
      open={paymentSuccess}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
      message="Payment Successful!"
    >
      <StyledSnackbarContent />
    </Snackbar>
  );
};

export default SuccessfulPayment;
