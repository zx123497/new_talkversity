import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../../components/context/context";
import GradeSerivce from "../../../services/GradeService";
import RecordService from "../../../services/RecordService";
import { LineChart } from "react-native-chart-kit";

const Setting = () => {
  const isFocused = useIsFocused();
  const { colors } = useTheme();
  const [type, setType] = useState("face");
  const [words, setWords] = useState(0);
  const [suggest_str, setSuggest_str] = useState("");
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [records, setRecords] = useState({
    date: ["1/1", "1/2", "1/3"],
    wordscore: [1, 1, 1],
    soundscore: [1, 1, 1],
    facescore: [1, 1, 1],
  });

  useEffect(() => {
    console.log("suggest change");
    let suggest = "";
    if (type === "text") {
      suggest = "";
      if (
        records.wordscore[6] > records.wordscore[0] ||
        records.wordscore[6] === 5
      ) {
        suggest += "這一週的語意表現有進步的趨勢，或者表現得非常好，繼續加油";
      } else {
        suggest += "這一週的語意表現有停滯甚至退步的趨勢，請多加練習並找出盲點";
      }
      setSuggest_str(suggest);
    }
    if (type === "voice") {
      suggest = "";
      if (
        records.soundscore[6] > records.soundscore[0] ||
        records.soundscore[6] === 5
      ) {
        suggest += "這一週的聲音表現有進步的趨勢，或者表現得非常好，繼續加油";
      } else {
        suggest += "這一週的聲音表現有停滯甚至退步的趨勢，請多加練習並找出盲點";
      }
      setSuggest_str(suggest);
    }
    if (type === "face") {
      suggest = "";
      if (
        records.facescore[6] > records.facescore[0] ||
        records.facescore[6] === 5
      ) {
        suggest += "這一週的表情表現有進步的趨勢，或者表現得非常好，繼續加油";
      } else {
        suggest += "這一週的表情表現有停滯甚至退步的趨勢，請多加練習並找出盲點";
      }
      setSuggest_str(suggest);
    }
  }, [type]);

  const screenWidth = Dimensions.get("window").width;
  const { getData } = useContext(AuthContext);
  const userData = getData();
  useEffect(() => {
    console.log("HIHI");
    RecordService.getRecordWeekdate(userData.userId).then((res) => {
      console.log(res.data);
      let temp = [];
      let temp2 = [];
      let temp3 = [];
      let temp4 = [];
      if (res.data.length != 0) {
        res.data.forEach((record) => {
          temp.push(createScore(record));
          temp2.push(createDate(record));
          temp3.push(createScore_v(record));
          temp4.push(createScore_f(record));
        });
        setRecords({
          date: temp2,
          wordscore: temp,
          soundscore: temp3,
          facescore: temp4,
        });
      } else {
        setNoData(true);
        setLoading(false);
      }

      GradeSerivce.getUserWords(userData.userId).then((res) => {
        setWords(res.data[0].total_word);
        setLoading(false);
      });
    });
  }, [isFocused]);

  const createScore = (record) => {
    if (record.article__rank === "S") {
      return 5;
    } else if (record.article__rank === "A") {
      return 4;
    } else if (record.article__rank === "B") {
      return 3;
    } else if (record.article__rank === "C") {
      return 2;
    } else if (record.article__rank === "D") {
      return 1;
    } else {
      return 1;
    }
  };
  const createScore_v = (record) => {
    if (record.sound__rank === "S") {
      return 5;
    } else if (record.sound__rank === "A") {
      return 4;
    } else if (record.sound__rank === "B") {
      return 3;
    } else if (record.sound__rank === "C") {
      return 2;
    } else if (record.sound__rank === "D") {
      return 1;
    } else {
      return 1;
    }
  };
  const createScore_f = (record) => {
    if (record.face__Total_Score === "S") {
      return 5;
    } else if (record.face__Total_Score === "A") {
      return 4;
    } else if (record.face__Total_Score === "B") {
      return 3;
    } else if (record.face__Total_Score === "C") {
      return 2;
    } else if (record.face__Total_Score === "D") {
      return 1;
    } else {
      return 1;
    }
  };
  const createDate = (record) => {
    const date = record.created.split("T")[0];
    const md = date.split("-")[1] + "/" + date.split("-")[2];
    return md;
  };

  const data = {
    labels: records.date,
    datasets: [
      {
        data: records.wordscore,
        color: (opacity = 1) => `rgba(121,202,195, ${opacity})`, // optional
        strokeWidth: 0, // optional
      },
      {
        data: [1], // minfake
        color: (opacity = 0) => `rgba(121,202,195, 0)`, // optional
      },
      {
        data: [5], // maxfake
        color: (opacity = 0) => `rgba(121,202,195, 0)`, // optional
      },
    ],
    // legend: ["成長分析"], // optional
  };
  const data_v = {
    labels: records.date,
    datasets: [
      {
        data: records.soundscore,
        color: (opacity = 1) => `rgba(121,202,195, ${opacity})`, // optional
        strokeWidth: 0, // optional
      },
      {
        data: [1], // minfake
        color: (opacity = 0) => `rgba(121,202,195, 0)`, // optional
      },
      {
        data: [5], // maxfake
        color: (opacity = 0) => `rgba(121,202,195, 0)`, // optional
      },
    ],
    // legend: ["成長分析"], // optional
  };
  const data_f = {
    labels: records.date,
    datasets: [
      {
        data: records.facescore,
        color: (opacity = 1) => `rgba(121,202,195, ${opacity})`, // optional
        strokeWidth: 0, // optional
      },
      {
        data: [1], // minfake
        color: (opacity = 0) => `rgba(121,202,195, 0)`, // optional
      },
      {
        data: [5], // maxfake
        color: (opacity = 0) => `rgba(121,202,195, 0)`, // optional
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

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1 }}
        color={colors.primary.main}
      />
    );
  } else if (noData) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          margin: 15,
        }}
      >
        <Text
          style={{
            color: colors.primary.main,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {`目前還沒有訓練的紀錄喔\n請先完成第一次訓練再來看看:D`}
        </Text>
      </View>
    );
  }

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
          width: "100%",
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
            {type === "face" ? "表情" : type === "voice" ? "聲音" : "語意"}
            近一週訓練之成長分析
          </Text>
          {type === "text" ? (
            <LineChart
              style={{ flex: 1 }}
              data={data}
              width={screenWidth - 40}
              height={220}
              yLabelsOffset={10}
              withVerticalLabels={false}
              yAxisInterval={1}
              segments={4}
              chartConfig={chartConfig}
              formatYLabel={(value) => {
                if (value == 1) return "D";
                else if (value == 2) return "C";
                else if (value == 3) return "B";
                else if (value == 4) return "A";
                else if (value == 5) return "S";
              }}
            />
          ) : type === "voice" ? (
            <LineChart
              style={{ flex: 1 }}
              data={data_v}
              width={screenWidth - 40}
              height={220}
              yLabelsOffset={10}
              withVerticalLabels={false}
              yAxisInterval={1}
              segments={4}
              chartConfig={chartConfig}
              formatYLabel={(value) => {
                if (value == 1) return "D";
                else if (value == 2) return "C";
                else if (value == 3) return "B";
                else if (value == 4) return "A";
                else if (value == 5) return "S";
              }}
            />
          ) : (
            <LineChart
              style={{ flex: 1 }}
              data={data_f}
              width={screenWidth - 40}
              height={220}
              yLabelsOffset={10}
              withVerticalLabels={false}
              yAxisInterval={1}
              segments={4}
              chartConfig={chartConfig}
              formatYLabel={(value) => {
                if (value == 1) return "D";
                else if (value == 2) return "C";
                else if (value == 3) return "B";
                else if (value == 4) return "A";
                else if (value == 5) return "S";
              }}
            />
          )}

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
                    width: "50%",
                    borderRadius: 10,
                    alignItems: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <Text
                    style={{ color: colors.primary.dark, marginBottom: 10 }}
                  >
                    訓練總字數
                  </Text>
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
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
              width: "100%",
              marginTop: 20,
              margin: 20,
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
                {suggest_str}
              </Text>
            </View>
            <Image
              style={styles(colors).image}
              source={
                userData.coachGender === "F"
                  ? require("../../../images/tutor_orange.png")
                  : require("../../../images/tutor_m_orange.png")
              }
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
