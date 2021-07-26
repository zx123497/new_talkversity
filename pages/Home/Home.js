import React from "react";
import Introduce from "../Introduce/Introduce";
import Introduce2 from "../Introduce/Introduce2";
import Introduce3 from "../Introduce/Introduce3";
import TestIntro from "../Introduce/TestIntro";
import SelectTutor from "../Introduce/SelectTutor/SelectTutor";
import Greeting from "../Greeting/Greeting";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Login/Login";
const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator
      initialRouteName="登入"
      headerMode="none"
      headerShown={false}
    >
      <Stack.Screen name="登入" component={Login} />
      <Stack.Screen name="選擇教練" component={SelectTutor} />
      <Stack.Screen name="軟體介紹" component={Introduce} />
      <Stack.Screen name="軟體介紹2" component={Introduce2} />
      <Stack.Screen name="軟體介紹3" component={Introduce3} />
      <Stack.Screen name="前測介紹" component={TestIntro} />
      <Stack.Screen name="首頁" component={Greeting} />
    </Stack.Navigator>
  );
};

export default Home;
