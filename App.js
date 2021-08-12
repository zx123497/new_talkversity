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
import LoginStack from "./pages/Login/Login";
import { View, ActivityIndicator, Text } from "react-native";
import { AuthContext } from "./components/context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialBottomTabNavigator();
const App = () => {
  const { colors } = useTheme();
  // const [isLoading, setIsLoading] = useState(true);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userPicture: null,
    userEmail: null,
    userToken: "123",
    userId: null,
    userGender: null,
    coachGender: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "RETRIEVE_ID":
        return {
          ...prevState,
          userId: action.id,
          isLoading: false,
        };
      case "LOGIN":
        console.log(action.id);
        return {
          ...prevState,
          userName: action.username,
          userId: action.id,
          userEmail: action.email,
          userToken: action.token,
          userPicture: action.picture,
          userGender: action.gender,
          coachGender: action.coach_gender,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userPicture: null,
          userEmail: null,
          userToken: null,
          userId: null,
          userGender: null,
          coachGender: null,
          isLoading: false,
        };
      case "GETTINGDATA":
        return {
          ...prevState,
          isLoading: true,
        };
      case "GETDATA":
        return {
          ...prevState,
        };
      case "CHANGEGENDER":
        return {
          ...prevState,
          userGender: action.gender,
        };
      case "CHANGECOACHGENDER":
        return {
          ...prevState,
          coachGender: action.coach_gender,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = useMemo(
    () => ({
      //登入
      signIn: (
        id,
        userName,
        accessToken,
        email,
        picture,
        gender,
        coach_gender
      ) => {
        dispatch({
          type: "LOGIN",
          id,
          email,
          picture,
          username: userName,
          token: accessToken,
          gender,
          coach_gender,
        });
      },
      //登出
      signOut: () => {
        dispatch({ type: "LOGOUT" });
      },
      //讀取畫面
      load: () => {
        dispatch({ type: "GETTINGDATA" });
      },
      //取得資料
      getData: () => {
        const data = loginState;
        return data;
      },
      changeGender: (gender) => {
        dispatch({ type: "CHANGEGENDER", gender });
      },
      changeCoachGender: (coach_gender) => {
        dispatch({ type: "CHANGECOACHGENDER", coach_gender });
      },
    }),
    [loginState]
  );

  useEffect(() => {
    setTimeout(async () => {
      //測試用，accesstoken 不能用
      dispatch({
        type: "LOGIN",
        token: "test",
        picture:
          "https://lh3.googleusercontent.com/a/AATXAJzeev5bFEU2gmnpYhdbQjJ83Z2oHUSfXIoE3Fe1=s96-c",
        email: "wupalupa777@gmail.com",
        id: 1,
        username: "烏帕露帕",
        gender: "F",
        coach_gender: "F",
      });

      //開發完要用這個
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
                tabBarLabel: "個人專區",
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
