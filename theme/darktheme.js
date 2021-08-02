import { DarkTheme } from "react-native-paper";

const theme = {
  ...DarkTheme,
  roundness: 2,
  myOwnProperty: true,
  colors: {
    ...DarkTheme.colors,
    text: "#FFF",
    primary: { main: "#79CAC3", dark: "#6faab0", light: "#abd7d6" },
    paragraph: { primary: "#FFF", secondary: "#eeeeee" },
    orange: { main: "#e68614", light: "#efcea7" },
    red: { main: "#ed2816", light: "#fc9595" },
    background: { default: "#333333", paper: "#5d5d5d" },
  },
};

export default theme;
