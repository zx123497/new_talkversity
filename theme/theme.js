import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    text: "#5d5d5d",
    primary: { main: "#79CAC3", dark: "#6faab0", light: "#abd7d6", secondary: "#96D1D9" },
    paragraph: { primary: "#5d5d5d", secondary: "#9d9d9d" },
    orange: { main: "#e68614", light: "#efcea7", secondary:"#ffb55c" },
    red: { main: "#ed2816", light: "#fc9595" },
    background: { default: "#f1f5f4", paper: "#ffffff" },
  },
};

export default theme;
