import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../../components/context/context";
import GradeSerivce from "../../../services/GradeService";
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
  const [type, setType] = useState("face");
  const [words, setWords] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const { getData } = useContext(AuthContext);
  const userData = getData();
  useEffect(() => {
    GradeSerivce.getUserWords(userData.userId).then((res) => {
      setWords(res.data[0].total_word);
    });
  }, []);
  const data = {
    labels: ["8/1", "8/2", "8/3", "8/4", "8/5", "8/6"],
    datasets: [
      {
        data: [1, 4, 2, 3, 5, 4],
        color: (opacity = 1) => `rgba(121,202,195, ${opacity})`, // optional
        strokeWidth: 0, // optional
      },
    ],
    // legend: ["成長分析"], // optional
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
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setType("face");
          }}
          style={[
            {
              alignItems: "center",
              margin: 15,
              borderColor: colors.primary.main,
              borderWidth: 2,
              paddingHorizontal: 13,
              paddingVertical: 3,
              backgroundColor: colors.background.paper,
              borderRadius: 10,
              elevation: 2,
            },
            type === "face" ? {} : { borderWidth: 0 },
          ]}
        >
          <Icon
            name="face"
            size={50}
            style={
              type === "face"
                ? { color: colors.primary.main }
                : { color: colors.paragraph.secondary }
            }
          />
          <Text style={{ color: colors.text, fontWeight: "bold" }}>表情</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType("text");
          }}
          style={[
            {
              alignItems: "center",
              margin: 15,
              borderColor: colors.primary.main,
              borderWidth: 2,
              paddingHorizontal: 13,
              paddingVertical: 3,
              backgroundColor: colors.background.paper,
              borderRadius: 10,
              elevation: 2,
            },
            type === "text" ? {} : { borderWidth: 0 },
          ]}
        >
          <Icon
            name="text-fields"
            size={50}
            style={
              type === "text"
                ? { color: colors.primary.main }
                : { color: colors.paragraph.secondary }
            }
          />
          <Text style={{ color: colors.text, fontWeight: "bold" }}>文字</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType("voice");
          }}
          style={[
            {
              // alignItems: "center",
              margin: 15,
              borderColor: colors.primary.main,
              borderWidth: 2,
              paddingHorizontal: 13,
              paddingVertical: 3,
              backgroundColor: colors.background.paper,
              borderRadius: 10,
              elevation: 2,
            },
            type === "voice" ? {} : { borderWidth: 0 },
          ]}
        >
          <Icon
            name="record-voice-over"
            size={50}
            style={
              type === "voice"
                ? { color: colors.primary.main }
                : { color: colors.paragraph.secondary }
            }
          />
          <Text style={{ color: colors.text, fontWeight: "bold" }}>語音</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          backgroundColor: colors.background.paper,
          // alignItems: "center",
          padding: 10,
          flex: 1,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text,
              marginBottom: 20,
            }}
          >
            {type}の成長分析
          </Text>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            formatYLabel={(value) => {
              if (value == 1) return "D";
              else if (value == 2) return "C";
              else if (value == 3) return "B";
              else if (value == 4) return "A";
              else if (value == 5) return "S";
            }}
          />
          {type === "text" ? (
            <View
              style={{
                alignSelf: "stretch",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 30,
                height: 100,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.text,
                  marginBottom: 15,
                  borderBottomColor: colors.text,
                  borderBottomWidth: 2,
                }}
              >
                訓練累積
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: colors.background.default,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={{ color: colors.primary.dark }}>訓練總字數</Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {words}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: colors.background.default,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={{ color: colors.primary.dark }}>訓練總字數</Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {words}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: colors.background.default,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={{ color: colors.primary.dark }}>訓練總字數</Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {words}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <></>
          )}

          <View
            style={{
              height: 150,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.background.default,
              paddingHorizontal: 10,
              borderRadius: 10,
              elevation: 2,
            }}
          >
            <View style={{ flex: 1.5 }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "bold",
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                成長建議
              </Text>
              <Text style={{ color: colors.paragraph.secondary, fontSize: 16 }}>
                皺眉的情況有改善，不過眨眼的次數 還是需要加強。
              </Text>
            </View>
            <Image
              style={styles(colors).image}
              source={require("../../../images/tutor_orange.png")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
      color: colors.text.secondary,
      fontSize: 40,
    },
    image: {
      flex: 1,
      resizeMode: "contain",
    },
  });
export default Setting;
