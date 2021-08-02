import "react-native-gesture-handler";
import React, { useState, useEffect, useMemo } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Home from "./pages/Home/Home";
import Train from "./pages/Train/Train";
import Member from "./pages/Member/Member";
import Setting from "./pages/Setting/Setting";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import theme from "./theme/theme";
import darktheme from "./theme/darktheme";
import LoginStack from "./pages/Login/Login";
import { View, ActivityIndicator, Text } from "react-native";
import { AuthContext } from "./components/context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      signIn: async (userName, accessToken, email, picture) => {
        // setUserToken(accessToken);
        // console.log(accessToken);
        // setIsLoading(false);
        try {
          await AsyncStorage.setItem("userToken", accessToken);
          await AsyncStorage.setItem("userName", userName);
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("picture", picture);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGIN", id: userName, token: accessToken });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("userName");
          await AsyncStorage.removeItem("email");
          await AsyncStorage.removeItem("picture");
        } catch (e) {
          console.log(e);
        }
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
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
      // dispatch({ type: "LOGOUT" });
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
      <NavigationContainer
      // theme={DarkTheme}
      >
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
