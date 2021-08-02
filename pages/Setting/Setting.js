import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../../components/context/context";
import { useTheme } from "react-native-paper";
const Setting = () => {
  const { signOut } = React.useContext(AuthContext);
  const { colors } = useTheme();
  return (
    <View style={styles(colors).container}>
      <View
        key="changeTutor"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: 50,
          backgroundColor: colors.background.paper,
          alignItems: "center",
          padding: 10,
          paddingHorizontal: 20,
          borderBottomColor: colors.background.default,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontWeight: "bold", color: colors.text }}>變更教練</Text>
        <TouchableOpacity>
          <Text style={{ color: colors.primary.main }}>變更</Text>
        </TouchableOpacity>
      </View>
      <View
        key="about"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: 50,
          backgroundColor: colors.background.paper,
          alignItems: "center",
          padding: 10,
          paddingHorizontal: 20,
          borderBottomColor: colors.background.default,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontWeight: "bold", color: colors.text }}>關於我們</Text>
        <TouchableOpacity>
          <Text style={{ color: colors.primary.main }}>查看</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => signOut()}
        style={{
          backgroundColor: colors.background.paper,
          padding: 10,
          width: "50%",
          height: 40,
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          elevation: 1,
        }}
      >
        <Text style={{ color: "red" }}>登出</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const Stack = createStackNavigator();
const SetttingStack = () => {
  return (
    <Stack.Navigator initialRouteName="設定">
      <Stack.Screen name="設定" component={Setting} />
    </Stack.Navigator>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    text: {
      color: "#FFF",
      fontSize: 40,
    },
  });
export default SetttingStack;
