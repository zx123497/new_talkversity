import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './pages/Home/Home';
import Train from './pages/Train/Train';
import Member from './pages/Member/Member';
import Setting from './pages/Setting/Setting';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator();

 const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      // shifting= {false}
       initialRouteName="首頁"
       inactiveColor="#D1D1D1"
       activeColor="#79CAC3"
       barStyle={{ backgroundColor: '#F6F6F6' }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;