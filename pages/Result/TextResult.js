import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "react-native-paper";
import { AuthContext } from "../../components/context/context";
import ArticleService from "../../services/ArticleService";
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
import {
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
  VictoryArea,
  VictoryLabel,
} from "victory-native";

let redundentList = [0, 0, 0, 0];
const TextResult = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();
  const [article, setArticle] = useState({
    pure_text_len: 0,
    talk_speed: 0.0,
  });
  const [articleDetail, setArticleDetail] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  const { getData } = useContext(AuthContext);
  const userData = getData();
  const [chartData, setChartData] = useState([
    { x: "恐懼", y: 2 },
    { x: "快樂", y: 3 },
    { x: "悲傷", y: 5 },
    { x: "憤怒", y: 4 },
    { x: "驚訝", y: 7 },
    { x: "噁心", y: 7 },
    { x: "信任", y: 2 },
    { x: "期待", y: 1 },
  ]);

  useEffect(() => {
    ArticleService.getArticleListLatest(userData.userId).then((res) => {
      // console.log(res.data);
      let arr = [];
      arr = res.data;
      barChartData.datasets[0].data[0] = arr.redundant_1_count;
      barChartData.datasets[0].data[1] = arr.redundant_2_count;
      barChartData.datasets[0].data[2] = arr.redundant_3_count;
      barChartData.datasets[0].data[3] = arr.redundant_4_count;
      setArticle(res.data);
      let suprise = arr.surprise_score;
      let angry = arr.anger_score;
      let disgust = arr.disgust_score;
      let fear = arr.fear_score;
      let joy = arr.joy_score;
      let trust = arr.trust_score;
      let sad = arr.sadness_score;
      let anticipation = arr.anticipation_score;
      let chart = [
        { x: "驚訝", y: suprise },
        { x: "信任", y: trust },
        { x: "快樂", y: joy },
        { x: "噁心", y: disgust },
        { x: "憤怒", y: angry },
        { x: "悲傷", y: sad },
        { x: "恐懼", y: fear },
        { x: "期待", y: anticipation },
      ];

      setChartData(chart);
      ArticleService.getArticleDetail(arr.id).then((res2) => {
        // console.log(res2.data);
        setArticleDetail(res2.data);
      });
      setLoading(false);
    });
  }, []);
  const color_1 =
    article.redundant_1_count <= 3
      ? colors.primary.light
      : article.redundant_1_count >= 8
      ? "#D7ABAB"
      : "#FAA948";

  const color_2 =
    article.redundant_2_count <= 3
      ? colors.primary.light
      : article.redundant_2_count >= 8
      ? "#D7ABAB"
      : "#FAA948";

  const color_3 =
    article.redundant_3_count <= 3
      ? colors.primary.light
      : article.redundant_3_count >= 8
      ? "#D7ABAB"
      : "#FAA948";

  const color_4 =
    article.redundant_4_count <= 3
      ? colors.primary.light
      : article.redundant_4_count >= 8
      ? "#D7ABAB"
      : "#FAA948";

  // 處理評分建議
  const obj = article.suggest_json;
  var suggest_str = "";
  for (var item in obj) {
    if (obj.hasOwnProperty(item)) {
      suggest_str += obj[item];
      suggest_str += "\n\n";
    }
  }
  // console.log(article);
  let barChartData = {
    labels: ["就是", "那個", "然後", "所以"],
    datasets: [
      {
        data: redundentList,
        // 三個以下良好 colors.primary.light 五個警告"#FAA948" 八個嚴重"#D7ABAB"
        colors: [
          (opacity = 1) => color_1,
          (opacity = 1) => color_2,
          (opacity = 1) => color_3,
          (opacity = 1) => color_4,
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
        <Text style={styles(colors).scoreArea}>{article.rank}</Text>
      </View>
      <View style={styles(colors).resultWrapper}>
        <Text style={styles(colors).resultText}>語意分析</Text>
        <View style={styles(colors).resultTop}>
          <View style={styles(colors).resultCard}>
            <Text style={styles(colors).resultCardTitle}>字數</Text>
            <View style={styles(colors).resultContent}>
              <Text style={styles(colors).resultCardText}>
                {article.pure_text_len}
              </Text>
              <Text style={styles(colors).resultCardUnit}>字</Text>
            </View>
          </View>
          <View style={styles(colors).resultCard}>
            <Text style={styles(colors).resultCardTitle}>語速</Text>
            <View style={styles(colors).resultContent}>
              <Text style={styles(colors).resultCardText}>
                {article !== undefined ? article.talk_speed.toFixed(1) : ""}
              </Text>
              <Text style={styles(colors).resultCardUnit}>字/分</Text>
            </View>
          </View>
        </View>
        <View style={styles(colors).textAnalysis}>
          <Text style={styles(colors).resultCardTitle}>文字分析</Text>
          <View style={styles(colors).note}>
            <View style={styles(colors).tifinyDot} />
            <Text style={styles(colors).noteText}>正面</Text>
            <View style={styles(colors).redDot} />
            <Text style={styles(colors).noteText}>負面</Text>
          </View>
          <View style={styles(colors).textContent}>
            <Text style={styles(colors).textNeutral}>
              {/* {article.fulltext} */}
              {articleDetail.map((text) => {
                if (text.sentiment == "positive") {
                  return (
                    <Text key={text.id} style={styles(colors).textPositive}>
                      {text.sentence + ", "}
                    </Text>
                  );
                } else if (text.sentiment == "negative") {
                  return (
                    <Text key={text.id} style={styles(colors).textNegative}>
                      {text.sentence + ", "},
                    </Text>
                  );
                } else {
                  return text.sentence + ", ";
                }
              })}
            </Text>
          </View>
        </View>
        <View style={styles(colors).barChartWrapper}>
          <Text style={styles(colors).resultCardTitle}>情緒分析</Text>
          <VictoryChart
            polar
            style={{
              flex: 1,
              data: { fill: colors.background.default },
              background: { fill: colors.background.default },
            }}
            width={screenWidth - 20}
            theme={VictoryTheme.material}
          >
            <VictoryArea
              style={{
                data: {
                  fill: colors.primary.light,
                  fillOpacity: 0.5,
                  strokeWidth: 2,
                },
              }}
              data={chartData}
            ></VictoryArea>
            {["快樂", "信任", "驚訝", "期待", "恐懼", "悲傷","憤怒", "噁心"].map(
              (d, i) => {
                return (
                  <VictoryPolarAxis
                    dependentAxis
                    key={i}
                    label={d}
                    tickLabelComponent={
                      <VictoryLabel labelPlacement="vertical" />
                    }
                    labelPlacement="perpendicular"
                    style={{
                      tickLabels: { fill: "none", stroke: "none" },
                      axis: { stroke: "none" },
                      grid: { stroke: colors.primary.light, opacity: 0.1 },
                    }}
                    axisValue={d}
                  />
                );
              }
            )}
          </VictoryChart>
        </View>
        <View style={styles(colors).remindWrapper}>
          <Image
            style={styles(colors).remindImage}
            source={require("../../images/tutor_orange_result.png")}
            resizeMode="contain"
          />
          <Text style={styles(colors).textRemind}>
            如分析結果與您預期差異過大，建議您可放慢速度、注意咬字哦!
          </Text>
        </View>
        <View></View>
        <View style={styles(colors).barChartWrapper}>
          <Text style={styles(colors).resultCardTitle}>冗言贅字</Text>
          <BarChart
            data={barChartData}
            width={screenWidth - 100}
            height={200}
            chartConfig={chartConfig}
            withCustomBarColorFromData={true}
            showBarTops={false}
            showValuesOnTopOfBars={true}
            fromZero={true}
            style={{ marginTop: "1%" }}
          />
          <View style={styles(colors).note}>
            <View style={styles(colors).tifinyDot} />
            <Text style={styles(colors).noteText}>良好</Text>
            <View style={styles(colors).orangeyDot} />
            <Text style={styles(colors).noteText}>警告</Text>
            <View style={styles(colors).redDot} />
            <Text style={styles(colors).noteText}>嚴重</Text>
          </View>
        </View>
        <View style={styles(colors).commentWrapper}>
          <Text style={styles(colors).commentText}>評分建議</Text>
          <Text style={[styles(colors).textComment, { marginBottom: "1%" }]}>
            {suggest_str}
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
    textAnalysis: {
      width: "80%",
      alignSelf: "center",
      backgroundColor: colors.background.paper,
      borderRadius: 20,
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 3,
      marginBottom: "5%",
    },
    note: {
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      padding: "3%",
    },
    noteText: {
      color: colors.paragraph.primary,
      fontSize: 12,
      fontWeight: "bold",
      marginLeft: 3,
    },
    redDot: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: colors.red.main,
      marginLeft: 10,
    },
    tifinyDot: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: colors.primary.main,
    },
    orangeyDot: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: colors.orange.main,
      marginLeft: 10,
    },
    textContent: {
      width: "90%",
      alignSelf: "center",
      marginBottom: "5%",
    },
    textNeutral: {
      fontSize: 20,
      color: colors.paragraph.primary,
    },
    textNegative: {
      color: colors.red.main,
    },
    textPositive: {
      color: colors.primary.main,
    },
    remindWrapper: {
      width: "85%",
      alignSelf: "center",
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: colors.background.default,
      borderRadius: 20,
      flexDirection: "row",
      marginBottom: "5%",
    },
    remindImage: {
      width: "65%",
      height: "65%",
      position: "absolute",
      left: "-18%",
      alignSelf: "center",
    },
    textRemind: {
      width: "75%",
      fontSize: 16,
      color: colors.paragraph.primary,
      fontWeight: "bold",
      paddingVertical: "5%",
      paddingRight: "8%",
    },
    barChartWrapper: {
      width: "85%",
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: colors.background.paper,
      borderRadius: 20,
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 2,
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
export default TextResult;
