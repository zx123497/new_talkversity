import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Grow from "./Grow/Grow";
import Career from "./Career/Career";
import Record from "./Record/Record";
import { useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../../components/DrawerContent/DrawerContent";
import RecordInfo from "./Record/RecordInfo";
import Icon from "react-native-vector-icons/Ionicons";
const GrowStack = createStackNavigator();
const CareerStack = createStackNavigator();
const RecordStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RecordInfoStack = createStackNavigator();
const RecordInfoStackScreen = ({ navigation }) => (
  <RecordInfoStack.Navigator
    headerShown={false}
    headerMode="screen"
    screenOptions={{
      headerStyle: { backgroundColor: "white" },

      headerTintColor: "#5d5d5d",
      headerTitleStyle: { fontWeight: "bold" },
      headerTitleAlign: "center",
    }}
  >
    <RecordInfoStack.Screen
      name="info"
      options={{
        headerShown: false,
      }}
      component={RecordInfo}
    />
  </RecordInfoStack.Navigator>
);

const GrowStackScreen = ({ navigation }) => (
  <GrowStack.Navigator
    headerShown={false}
    headerMode="screen"
    screenOptions={{
      headerStyle: { backgroundColor: "white" },

      headerTintColor: "#5d5d5d",
      headerTitleStyle: { fontWeight: "bold" },
      headerTitleAlign: "center",
    }}
  >
    <GrowStack.Screen
      name="成長紀錄"
      component={Grow}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="white"
            color="#5d5d5d"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </GrowStack.Navigator>
);
const CareerStackScreen = ({ navigation }) => (
  <CareerStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "white" },
      headerTintColor: "#5d5d5d",
      headerTitleStyle: { fontWeight: "bold" },
      headerTitleAlign: "center",
    }}
  >
    <CareerStack.Screen
      name="生涯成就"
      component={Career}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="white"
            color="#5d5d5d"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </CareerStack.Navigator>
);
const RecordStackScreen = ({ navigation }) => (
  <RecordStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "white" },
      headerTintColor: "#5d5d5d",
      headerTitleStyle: { fontWeight: "bold" },
      headerTitleAlign: "center",
    }}
  >
    <RecordStack.Screen
      name="訓練紀錄"
      component={Record}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="white"
            color="#5d5d5d"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
    <RecordStack.Screen name="紀錄內容" component={RecordInfoStackScreen} />
  </RecordStack.Navigator>
);

const MemberRouter = (props) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="成長紀錄" component={GrowStackScreen} />
      <Drawer.Screen name="生涯成就" component={CareerStackScreen} />
      <Drawer.Screen name="訓練紀錄" component={RecordStackScreen} />
    </Drawer.Navigator>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
      alignItems: "center",
      justifyContent: "center",
    },
    titlebar: {
      flex: 1,
      backgroundColor: colors.background.paper,
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "flex-end",

      paddingTop: 10,
    },
    title: {
      marginBottom: 10,
      fontSize: 25,
      alignSelf: "flex-start",
      fontWeight: "bold",
      height: 40,
    },
    navbar: {
      flexDirection: "row",
      alignSelf: "stretch",
      backgroundColor: colors.background.paper,
      height: 50,
    },
    nav: {
      margin: 15,
      marginBottom: 5,
      color: colors.text.secondary,
    },
    navActive: {
      margin: 15,
      fontWeight: "bold",
      color: colors.primary.main,
      borderBottomColor: colors.primary.main,
      borderBottomWidth: 1,
    },
  });
export default MemberRouter;
