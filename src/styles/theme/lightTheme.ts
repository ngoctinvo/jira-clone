import { createTheme, ThemeOptions } from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#0052CC",
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
