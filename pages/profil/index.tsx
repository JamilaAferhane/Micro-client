import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const UserProfil = () => {
  const user = useSelector((state: RootState) => state.user.authenticatedUser);

  return (
    <Container sx={{ p: 12 }}>
      {user ? (
        <div>
          {" "}
          <Stack direction="row" spacing={2}>
            <Avatar {...stringAvatar(`${user?.email}`)} />
          </Stack>
          <Typography>{user?.email}</Typography>
          <Typography>{user?.credit}</Typography>
        </div>
      ) : (
        <div>Your Are Not Authenticated</div>
      )}
    </Container>
  );
};

export default UserProfil;
