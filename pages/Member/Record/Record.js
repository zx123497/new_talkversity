import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
const Setting = () => {
  const { colors } = useTheme();
  return (
    <ScrollView style={styles(colors).container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
        <TouchableOpacity
          key={row}
          style={{
            flexDirection: "row",
            height: 100,
            backgroundColor: colors.background.paper,
            borderBottomColor: colors.background.default,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flex: 1.3, padding: 7 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.orange.light,
                borderRadius: 5,
                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              <Image
                style={styles(colors).image}
                source={require("../../../images/tutor_orange.png")}
              />
            </View>
          </View>

          <View style={{ flex: 3, padding: 10, justifyContent: "center" }}>
            <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: "bold" }}>
              自我介紹訓練
            </Text>
            <Text style={{ color: colors.text.secondary }}>
              June 6, 2021 08:00PM
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
      // alignItems: "center",
      // justifyContent: "flex-start",
      // overflow: "scroll",
    },
    text: {
      color: colors.text.secondary,
      fontSize: 40,
    },
    image: {
      flex: 1,
      resizeMode: "contain",
      height: "100%",
      width: "100%",
      padding: 2,
    },
  });
export default Setting;
