import React from "react";
import Introduce from "../Introduce/Introduce";
import Introduce2 from "../Introduce/Introduce2";
import Introduce3 from "../Introduce/Introduce3";
import TestIntro from "../Introduce/TestIntro";
import PreTest from "../Introduce/PreTest";
import SelectTutor from "../Introduce/SelectTutor/SelectTutor";
// import Greeting from "../Greeting/Greeting";
import SelectGender from "../SelectGender/SelectGender";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Login/Login";
const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator
      initialRouteName="選擇性別"
      headerMode="none"
      headerShown={false}
    >
      {/* <Stack.Screen name="登入" component={Login} /> */}
      <Stack.Screen name="選擇性別" component={SelectGender} />
      <Stack.Screen name="選擇教練" component={SelectTutor} />
      <Stack.Screen name="軟體介紹" component={Introduce} />
      <Stack.Screen name="軟體介紹2" component={Introduce2} />
      <Stack.Screen name="軟體介紹3" component={Introduce3} />
      <Stack.Screen name="前測介紹" component={TestIntro} />
      <Stack.Screen name="開始前測" component={PreTest} />
    </Stack.Navigator>
  );
};

export default Home;
