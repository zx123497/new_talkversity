import 'react-native-gesture-handler';
import React from 'react';
import {  Provider as PaperProvider } from 'react-native-paper';
import Home from './pages/Home/Home';
import Train from './pages/Train/Train';
import Member from './pages/Member/Member';
import Setting from './pages/Setting/Setting';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import theme from './theme/theme'

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const { colors } = useTheme();
  return (
    
    <NavigationContainer>
      <Tab.Navigator
       initialRouteName="首頁"
       inactiveColor={colors.text.secondary}
       activeColor={colors.primary.main}
       barStyle={{ backgroundColor: colors.background.paper }}
      >
        <Tab.Screen name="首頁" component={Home} options={{
          tabBarLabel: '首頁',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name="訓練" component={Train} options={{
          tabBarLabel: '訓練',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tooltip" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name="會員專區" component={Member} options={{
          tabBarLabel: '會員專區',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name="設定" component={Setting} options={{
          tabBarLabel: '設定',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tools" color={color} size={26} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

const Main =()=>{
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

export default Main;