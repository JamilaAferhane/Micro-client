import { createTheme } from "@mui/material";
import colors from "./colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.default,
    },
    secondary: {
      main: colors.dark_main,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
