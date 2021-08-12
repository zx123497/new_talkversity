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
import { BarChart } from "react-native-chart-kit";

const VoiceResult = ({ navigation }) => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get("window").width;
  let barChartData = {
    labels: ["前側", "實測"],
    datasets: [
      {
        data: [15, 30],
        // 三個以下良好 colors.primary.light 五個警告"#FAA948" 八個嚴重"#D7ABAB"
        colors: [
          (opacity = 1) => colors.orange.main,
          (opacity = 1) => colors.primary.main,
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: colors.background.paper,
    backgroundGradientFrom: colors.background.paper,
    backgroundGradientTo: colors.background.paper,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

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
        <Text style={styles(colors).scoreArea}>A</Text>
      </View>
      <View style={styles(colors).resultWrapper}>
        <Text style={styles(colors).resultText}>聲音分析</Text>
        <View style={styles(colors).resultTop}>
          <View style={styles(colors).resultCard}>
            <Text style={styles(colors).resultCardTitle}>發語聲</Text>
            <View style={styles(colors).resultContent}>
              <Text style={styles(colors).resultCardText}>過多</Text>
            </View>
          </View>
          <View style={styles(colors).resultCard}>
            <Text style={styles(colors).resultCardTitle}>停頓</Text>
            <View style={styles(colors).resultContent}>
              <Text style={styles(colors).resultCardText}>過長</Text>
            </View>
          </View>
        </View>
        <View style={styles(colors).barChartWrapper}>
          <Text style={styles(colors).resultCardTitle}>音量</Text>
          <BarChart
            data={barChartData}
            width={screenWidth - 150}
            height={200}
            chartConfig={chartConfig}
            withCustomBarColorFromData={true}
            showBarTops={false}
            showValuesOnTopOfBars={true}
            fromZero={true}
            style={{ marginTop: "1%", marginBottom: "5%",}}
          />
        </View>
        <View style={styles(colors).barChartWrapper}>
          <Text style={styles(colors).resultCardTitle}>語調</Text>
          <BarChart
            data={barChartData}
            width={screenWidth - 150}
            height={200}
            chartConfig={chartConfig}
            withCustomBarColorFromData={true}
            showBarTops={false}
            showValuesOnTopOfBars={true}
            fromZero={true}
            style={{ marginTop: "1%" }}
          />
          <View style={styles(colors).tuneResultCard}>
            <Text style={styles(colors).resultCardTitle}>訓練結果</Text>
            <View style={styles(colors).resultContent}>
              <Text style={styles(colors).resultCardText}>平淡</Text>
            </View>
          </View>
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
      marginBottom: "5%",
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
    },
    tuneResultCard: {
      width: "55%",
      backgroundColor: colors.background.default,
      borderRadius: 20,
      padding: "2%",
      marginTop: '2%',
      marginBottom: '5%',
    },
    resultCardTitle: {
      alignSelf: "center",
      color: colors.paragraph.primary,
      fontSize: 20,
      fontWeight: "bold",
      marginTop: "5%",
      marginBottom: "1%",
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
    barChartWrapper: {
      width: "80%",
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: colors.background.paper,
      borderRadius: 20,
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 3,
      marginBottom: "5%",
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
  });
export default VoiceResult;
