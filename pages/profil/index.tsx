import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types";

const UserProfil = () => {
  const user = useSelector((state: RootState) => state.user.authenticatedUser);

  return (
    <Container sx={{ p: 12 }}>
      <Typography sx={{ p: 5, pl: 0 }}>My Profil</Typography>
      {user ? (
        <div>
          {" "}
          <Stack direction="row" spacing={2}>
            <Avatar />
            {user.email}
          </Stack>
          <Typography>{user.fullname}</Typography>
          <Typography>{user.credit}</Typography>
        </div>
      ) : (
        <div>Your Are Not Authenticated</div>
      )}
    </Container>
  );
};

export default UserProfil;
