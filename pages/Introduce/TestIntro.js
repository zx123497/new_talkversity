import React, { useContext } from "react";
import { useTheme } from "react-native-paper";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import IntroListItem from "../../components/IntroListItem/IntroNewsItem";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../components/context/context";
const TestIntro = ({ navigation }) => {
  const { getData, changeInitial } = useContext(AuthContext);
  const userData = getData();
  const { colors } = useTheme();
  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).containerTutor}>
        <Image
          style={styles(colors).image}
          source={
            userData.coachGender === "F"
              ? require("../../images/tutor_orange.png")
              : require("../../images/tutor_m_orange.png")
          }
        />
      </View>
      <View style={styles(colors).introArea}>
        <Text style={styles(colors).introTitle}>
          接下來，將請您面無表情朗讀一段話，作為訓練判斷的基準，我們將會記錄：
        </Text>

        <View style={styles(colors).listArea}>
          <IntroListItem
            title="表情"
            content="您的眉毛、眼睛等臉部活動特徵"
            icon={
              <MaterialIcons
                name="face"
                size={35}
                style={styles(colors).resultButtonIcon}
              />
            }
          />
          <IntroListItem
            title="語意"
            content="您的說話內容。"
            icon={
              <MaterialIcons
                name="text-fields"
                size={35}
                style={styles(colors).resultButtonIcon}
              />
            }
          />
          <IntroListItem
            title="聲音"
            content="說話的頻率、起伏、快慢等特徵"
            icon={
              <MaterialIcons
                name="record-voice-over"
                size={35}
                style={styles(colors).resultButtonIcon}
              />
            }
          />
        </View>
        <View style={styles(colors).submitArea}>
          <Pressable
            onPress={() => {
              navigation.navigate("開始前測");
              // changeInitial(true);
            }}
            style={({ pressed }) => [{}, styles(colors).submit]}
          >
            <Text style={styles(colors).submitText}>開始前測</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: colors.background.paper,
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
      // flex: 1,
      height: "80%",
      resizeMode: "contain",
    },
    containerLogo: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    containerTutor: {
      // flex: 6,
      backgroundColor: colors.primary.main,
      height: "35%",
      paddingTop: 25,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    submit: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 120,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: colors.primary.main,
    },
    submitText: {
      color: "#FFF",
      fontSize: 20,
    },
    submitArea: {
      backgroundColor: colors.background.paper,
      alignItems: "center",
      alignSelf: "stretch",
      padding: 10,
    },
    introArea: {
      // flex: 10,
      height: "60%",
      backgroundColor: colors.background.paper,
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
    },
    introTitle: {
      width: "80%",
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text.primary,
      marginTop: 10,
      marginBottom: 30,
      marginLeft: 10,
      marginRight: 10,
    },
    listArea: {
      alignItems: "flex-start",
      marginBottom: '5%',
    },
    resultButtonIcon: {
      color: colors.background.paper,
    },
  });
export default TestIntro;
