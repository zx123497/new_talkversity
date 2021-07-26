import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Dimensions } from "react-native";
import {
  LineChart,
  // BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart,
} from "react-native-chart-kit";
const Setting = () => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(121,202,195, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["成長分析"], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: colors.background.paper,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.background.paper,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(93,93,93, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
  };

  return (
    <View style={styles(colors).container}>
      {/* <Text style={styles(colors).text}>Grow</Text> */}
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
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
    text: {
      color: colors.text.secondary,
      fontSize: 40,
    },
  });
export default Setting;
