import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import CircleChart from "../../components/Chart/CircleChart";

const FacialResult = ({ navigation }) => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={(styles.center, styles(colors).container)}>
      <View style={styles(colors).textArea}>
        <Pressable
          onPress={() => navigation.navigate("評分結果")}
          style={styles(colors).returnButton}
        >
          {({ pressed }) => (
            <MaterialIcons
              name="arrow-back-ios"
              size={35}
              color={
                pressed ? colors.paragraph.secondary : colors.paragraph.primary
              }
            />
          )}
        </Pressable>
        <Text style={styles(colors).text}>評分結果</Text>
        <Text style={styles(colors).scoreArea}>B</Text>
      </View>
      <View style={styles(colors).resultWrapper}>
        <Text style={styles(colors).resultText}>臉部分析</Text>
        <View style={styles(colors).resultTop}>
          <View style={styles(colors).resultCard}>
            <Text style={styles(colors).resultCardTitle}>皺眉</Text>
            <View style={styles(colors).resultContent}>
              <Text style={styles(colors).resultCardText}>適中</Text>
            </View>
          </View>
          <View style={styles(colors).resultCard}>
            <Text style={styles(colors).resultCardTitle}>眨眼</Text>
            <View style={styles(colors).resultContent}>
              <Text style={styles(colors).resultCardText}>15</Text>
              <Text style={styles(colors).resultCardUnit}>字/分</Text>
            </View>
          </View>
          <View style={styles(colors).resultCard}>
            <Text style={styles(colors).resultCardTitle}>笑容表達</Text>
            <View style={styles(colors).resultContent}>
              <CircleChart
                  percentage={54}
                  color={colors.red.main}
                  delay={500 + 100 * 0}
                  max={100}
                />
            </View>
          </View>
          <View style={styles(colors).resultCard}>
            <Text style={styles(colors).resultCardTitle}>眉毛表現</Text>
            <View style={styles(colors).resultContent}>
              <CircleChart
                    percentage={80}
                    color={colors.primary.dark}
                    delay={500 + 100 * 0}
                    max={100}
                  />
            </View>
          </View>
        </View>
        <View style={styles(colors).eyesAnalysis}>
          <Text style={[styles(colors).resultCardTitle,{width: '40%',textAlign:'center'}]}>眼神游移百分比</Text>
          <Text style={[styles(colors).resultCardTitle,{marginTop:0}]}></Text>
          <CircleChart
                    percentage={92}
                    color={colors.orange.main}
                    delay={500 + 100 * 0}
                    max={100}
                  />
        </View>

        <View style={styles(colors).commentWrapper}>
          <Text style={styles(colors).commentText}>評分建議</Text>
          <Text style={[styles(colors).textComment, { marginBottom: "1%" }]}>
            語調起伏較平緩，平均語速稍快，可調整語調並減緩語速
          </Text>

          <Pressable onPress={() => navigation.navigate("成長紀錄")}>
            <Text
              style={[
                styles(colors).textComment,
                { color: colors.primary.main, fontWeight: "bold" },
              ]}
            >
              查看個人頁面
            </Text>
          </Pressable>
          <Image
            style={styles(colors).commentImage}
            source={require("../../images/tutor_orange.png")}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      color: "#FFF",
      backgroundColor: colors.background.default,
      // alignItems: "center",
    },
    textArea: {
      marginTop: 30,
      marginBottom: "8%",
      paddingLeft: "10%",
      // borderWidth: 2,
    },
    scoreArea: {
      fontSize: 100,
      fontWeight: "bold",
      color: colors.primary.dark,
      position: "absolute",
      alignSelf: "flex-end",
      bottom: -20,
      paddingRight: "20%",
      textShadowColor: "rgba(0, 0, 0, 0.3)",
      textShadowOffset: { width: 0, height: 5 },
      textShadowRadius: 10,
    },
    returnButton: {
      marginTop: "10%",
      marginBottom: "5%",
    },
    text: {
      color: colors.paragraph.primary,
      fontSize: 30,
      fontWeight: "bold",
    },
    resultWrapper: {
      flex: 1,
      backgroundColor: colors.background.paper,
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 20,
      alignItems: "center",
    },
    resultText: {
      color: colors.paragraph.primary,
      fontSize: 24,
      fontWeight: "bold",
      marginTop: "10%",
      marginBottom: "5%",
    },
    resultTop: {
      width: "80%",
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "space-around",
      flexWrap: "wrap",
    },
    resultCard: {
      width: "40%",
      backgroundColor: colors.background.paper,
      borderRadius: 20,
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 8,
      padding: "2%",
      marginBottom: "5%",
    },
    tuneResultCard: {
      width: "55%",
      backgroundColor: colors.background.default,
      borderRadius: 20,
      padding: "2%",
      marginTop: "2%",
      marginBottom: "5%",
    },
    resultCardTitle: {
      alignSelf: "center",
      color: colors.paragraph.primary,
      fontSize: 20,
      fontWeight: "bold",
      marginTop: "5%",
      marginBottom: "5%",
    },
    resultContent: {
      flexDirection: "row",
      alignSelf: "center",
      marginBottom: "8%",
    },
    resultCardText: {
      color: colors.orange.main,
      fontSize: 30,
      fontWeight: "bold",
      marginRight: "2%",
    },
    resultCardUnit: {
      color: colors.paragraph.primary,
      fontSize: 12,
      fontWeight: "bold",
      alignSelf: "flex-end",
      paddingBottom: "3%",
    },
    commentText: {
      color: colors.paragraph.primary,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: "1%",
    },
    commentImage: {
      width: "100%",
      height: 200,
    },
    commentWrapper: {
      width: "85%",
      backgroundColor: colors.background.default,
      borderRadius: 20,
      marginBottom: "5%",
      padding: "5%",
    },
    textComment: {
      width: "100%",
      fontSize: 14,
      color: colors.paragraph.primary,
      paddingRight: "8%",
    },
    eyesAnalysis: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between',
      width: "72%",
      backgroundColor: colors.background.paper,
      borderRadius: 20,
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 3,
      marginBottom: "5%",
      paddingVertical:'8%',
      paddingHorizontal:'10%',
    },
    
  });
export default FacialResult;
