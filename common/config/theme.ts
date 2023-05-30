import { createTheme } from "@mui/material";
import colors from "./colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary.main,
    },
    secondary: {
      main: colors.secondary.main,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
