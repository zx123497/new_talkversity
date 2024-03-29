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
import InitialStack from "./pages/Initial/Initial";
import { View, ActivityIndicator, Text } from "react-native";
import { AuthContext } from "./components/context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
const Tab = createMaterialBottomTabNavigator();
const App = () => {
  const { colors } = useTheme();
  // const [isLoading, setIsLoading] = useState(true);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userPicture: null,
    userEmail: null,
    userToken: null,
    userId: null,
    userGender: null,
    coachGender: null,
    initial: false,
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
          initial: action.initial,
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
          initial: false,
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
      case "INITIALFINISH":
        return {
          ...prevState,
          initial: action.initial,
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
        coach_gender,
        initial
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
          initial,
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
      changeInitial: (initial) => {
        dispatch({ type: "INITIALFINISH", initial });
      },
    }),
    [loginState]
  );

  useEffect(() => {
    setTimeout(async () => {
      //測試用，accesstoken 不能用
      // dispatch({
      //   type: "LOGIN",
      //   token: "test",
      //   picture:
      //     "https://lh3.googleusercontent.com/a/AATXAJzeev5bFEU2gmnpYhdbQjJ83Z2oHUSfXIoE3Fe1=s96-c",
      //   email: "wupalupa777@gmail.com",
      //   id: 1,
      //   username: "烏帕露帕",
      //   gender: "F",
      //   coach_gender: "F",
      //   initial: true,
      // });

      //開發完要用這個
      dispatch({ type: "LOGOUT" });
    }, 2500);
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 300,
            height: 200,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("./assets/loading4.json")}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
      // theme={DarkTheme}
      >
        {loginState.userToken !== null ? (
          loginState.initial ? (
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
                  tabBarLabel: "Home",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="home"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="訓練"
                component={Train}
                options={{
                  tabBarLabel: "Train",
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
                  tabBarLabel: "Your Profile",
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
                  tabBarLabel: "Setting",
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
            <InitialStack />
          )
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
