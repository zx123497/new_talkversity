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
let redundentList = [0, 0, 0, 0];
const TextResult = ({ navigation }) => {
  const { colors } = useTheme();
  const [article, setArticle] = useState({ pure_text_len: 0, talk_speed: 0.0 });
  const [articleDetail, setArticleDetail] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  const { getData } = useContext(AuthContext);
  const userData = getData();
  useEffect(() => {
    ArticleService.getArticleList(userData.userId).then((res) => {
      console.log(res.data);
      let arr = [];
      arr = res.data.pop();
      barChartData.datasets[0].data[0] = arr.redundant_1_count;
      barChartData.datasets[0].data[1] = arr.redundant_2_count;
      barChartData.datasets[0].data[2] = arr.redundant_3_count;
      barChartData.datasets[0].data[3] = arr.redundant_4_count;
      setArticle(arr);
      ArticleService.getArticleDetail(arr.id).then((res2) => {
        console.log(res2.data);
        setArticleDetail(res2.data);
      });
    });
  }, []);
  let barChartData = {
    labels: ["所以", "然後", "就是", "那個"],
    datasets: [
      {
        data: redundentList,
        // 三個以下良好 colors.primary.light 五個警告"#FAA948" 八個嚴重"#D7ABAB"
        colors: [
          (opacity = 1) => "#D7ABAB",
          (opacity = 1) => "#FAA948",
          (opacity = 1) => colors.primary.light,
          (opacity = 1) => "#D7ABAB",
        ],
      },
    ],
  };
  // console.log(data.datasets[0].data[0]);

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
              {/* 面試官好，我目前就讀中央大學資管系在學期間，我的成績一直都很爛，還差點被而已，
              <Text style={styles(colors).textNegative}>
                很多科目最後成績都很差，此外我也有在學校其他單位接案，但因為能力不足常常被雇主嗎？
              </Text>
              最後需要其他人幫我收爛攤子烤雞的分數也很低，在新的工作中，
              <Text style={styles(colors).textNegative}>
                我可能會放很多錯，應該也不能升職薪水，應該也只能訂很低櫃
              </Text>
              ，公司可以決定要不要錄用我。 */}
            </Text>
          </View>
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
            {article.suggest}
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
    },
    resultText: {
      color: colors.paragraph.primary,
      fontSize: 24,
      fontWeight: "bold",
      marginTop: "10%",
      marginLeft: "15%",
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
      width: "120%",
      height: "120%",
      position: "absolute",
      right: "-30%",
      bottom: "5%",
      alignSelf: "flex-end",
    },
    commentWrapper: {
      width: "85%",
      alignSelf: "center",
      backgroundColor: colors.background.default,
      borderRadius: 20,
      marginBottom: "5%",
      padding: "5%",
    },
    textComment: {
      width: "75%",
      fontSize: 14,
      color: colors.paragraph.primary,
      paddingRight: "8%",
    },
  });
export default TextResult;
