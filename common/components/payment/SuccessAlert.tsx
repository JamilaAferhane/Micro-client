import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { LinearProgress } from "@mui/material";

export default function BasicAlerts() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {loading ? (
        <LinearProgress color="success" />
      ) : (
        <Alert variant="filled" severity="success">
          Payment Successed !
        </Alert>
      )}
    </Stack>
  );
}
