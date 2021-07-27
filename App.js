import "react-native-gesture-handler";
import React, { useState, useEffect, useMemo } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Home from "./pages/Home/Home";
import Train from "./pages/Train/Train";
import Member from "./pages/Member/Member";
import Setting from "./pages/Setting/Setting";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import theme from "./theme/theme";
import LoginStack from "./pages/Login/Login";
import { View, ActivityIndicator, Text } from "react-native";
import { AuthContext } from "./components/context/context";
const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const { colors } = useTheme();
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          userName: null,
          isLoading: false,
        };
      case "GETTINGDATA":
        return {
          ...prevState,
          isLoading: true,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = useMemo(
    () => ({
      signIn: (userName, accessToken) => {
        // setUserToken(accessToken);
        // console.log(accessToken);
        // setIsLoading(false);
        dispatch({ type: "LOGIN", id: userName, token: accessToken });
      },
      signOut: () => {
        // setUserToken(null);
        // setIsLoading(false);
        dispatch({ type: "LOGOUT" });
      },
      load: () => {
        // setUserToken(null);
        // setIsLoading(false);
        dispatch({ type: "GETTINGDATA" });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      // dispatch({ type: "RETRIEVE_TOKEN", token: "test" });
      dispatch({ type: "LOGOUT" });
    }, 1500);
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text
          style={{
            marginTop: 10,
            color: colors.primary.main,
            fontWeight: "bold",
          }}
        >
          教材準備中...
        </Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Tab.Navigator
            initialRouteName="首頁"
            inactiveColor={colors.text.secondary}
            activeColor={colors.primary.main}
            barStyle={{ backgroundColor: colors.background.paper }}
          >
            <Tab.Screen
              name="首頁"
              component={Home}
              options={{
                tabBarLabel: "首頁",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="訓練"
              component={Train}
              options={{
                tabBarLabel: "訓練",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="tooltip"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="會員專區"
              component={Member}
              options={{
                tabBarLabel: "會員專區",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="設定"
              component={Setting}
              options={{
                tabBarLabel: "設定",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="tools"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <LoginStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};

export default Main;
