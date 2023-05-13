import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ChildrenProps } from "../types/@appTypes";
import { lightTheme } from "../config/theme";

const ThemeProvider = ({ children }: ChildrenProps) => (
  <MuiThemeProvider theme={lightTheme}>{children}</MuiThemeProvider>
);
export default ThemeProvider;
