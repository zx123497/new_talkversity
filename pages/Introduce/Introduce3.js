import React from "react";
import { useTheme } from "react-native-paper";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const Introduce3 = ({ navigation, route }) => {
  const { colors } = useTheme();
  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).text}>
        Talkversity會幫您紀錄您的訓練成果， 分析進步幅度，陪您一起成長
      </Text>

      <View style={styles(colors).containerTutor}>
        <Image
          style={styles(colors).image}
          source={
            route.params.index === 0
              ? require("../../images/tutor_report.png")
              : require("../../images/tutor_m_report.png")
          }
        />
      </View>
      <View style={styles(colors).submitArea}>
        <Pressable
          onPress={() =>
            navigation.navigate("前測介紹", { index: route.params.index })
          }
          style={({ pressed }) => [{}, styles(colors).submit]}
        >
          <Text style={styles(colors).submitText}>下一步</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 2,
      backgroundColor: colors.primary.main,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#FFF",
      fontSize: 25,
      fontWeight: "500",
      margin: 50,
    },
    image: {
      flex: 1,
      resizeMode: "contain",
    },
    containerLogo: {
      flex: 2,

      alignItems: "center",
      justifyContent: "center",
    },
    containerTutor: {
      flex: 6,

      alignItems: "center",
      justifyContent: "center",
    },
    submit: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 4,
    },
    submitText: {
      color: "#FFF",
      fontSize: 20,
    },
    submitArea: {
      alignItems: "flex-end",
      alignSelf: "stretch",
      padding: 10,
    },
  });
export default Introduce3;
