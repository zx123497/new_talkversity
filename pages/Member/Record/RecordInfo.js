import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/MaterialIcons";
import RecordService from "../../../services/RecordService";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { BarChart } from "react-native-chart-kit";
import CircleChart from "../../../components/Chart/CircleChart";
const RecordInfo = ({ route }) => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const [word, setWord] = useState({
    suggest_json: [],
    redundant_1_count: 0,
    redundant_2_count: 0,
    redundant_3_count: 0,
    redundant_4_count: 0,
  });
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

  let barChartDataWord = {
    labels: ["所以", "然後", "就是", "那個"],
    datasets: [
      {
        data: [
          word.redundant_1_count,
          word.redundant_2_count,
          word.redundant_3_count,
          word.redundant_4_count,
        ],
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

  useEffect(() => {
    RecordService.getRecord(route.params.id).then((res) => {
      console.log(res.data);
      let temp = res.data.article[0].suggest_json;
      let new_suggest = Object.keys(temp).map((k) => ({
        id: k,
        name: temp[k],
      }));
      console.log(new_suggest);
      let talk_speed = res.data.article[0].talk_speed.toFixed(1);
      setWord({
        ...res.data.article[0],
        suggest_json: new_suggest,
        talk_speed: talk_speed,
      });
    });
  }, []);
  const bs_voice = useRef();
  const bs_word = useRef();
  const bs_face = useRef();
  const bs_all = useRef();
  const fall_voice = new Animated.Value(1);
  const fall_word = new Animated.Value(1);
  const fall_face = new Animated.Value(1);
  const fall_all = new Animated.Value(1);
  const renderHeaderAll = () => (
    <View
      style={{
        backgroundColor: colors.orange.main,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        position: "relative",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#FFF",
          flex: 1,
        }}
      >
        您獲得的總分為
      </Text>
      <TouchableOpacity
        onPress={() => {
          bs_all.current.snapTo(1);
        }}
        style={{ position: "absolute", right: 10 }}
      >
        <Icon name="close" size={25} style={{ color: "#FFF" }} />
      </TouchableOpacity>
    </View>
  );
  const renderHeaderVoice = () => (
    <View
      style={{
        backgroundColor: colors.orange.main,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 2,
        padding: 10,
        position: "relative",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#FFF",
          flex: 1,
        }}
      >
        聲音表現
      </Text>
      <TouchableOpacity
        onPress={() => {
          bs_voice.current.snapTo(1);
        }}
        style={{ position: "absolute", right: 10 }}
      >
        <Icon name="close" size={25} style={{ color: "#FFF" }} />
      </TouchableOpacity>
    </View>
  );
  const renderHeaderWord = () => (
    <View
      style={{
        backgroundColor: colors.orange.main,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 2,
        padding: 10,
        position: "relative",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#FFF",
          flex: 1,
        }}
      >
        語意表現
      </Text>
      <TouchableOpacity
        onPress={() => {
          bs_word.current.snapTo(1);
        }}
        style={{ position: "absolute", right: 10 }}
      >
        <Icon name="close" size={25} style={{ color: "#FFF" }} />
      </TouchableOpacity>
    </View>
  );
  const renderHeaderFace = () => (
    <View
      style={{
        backgroundColor: colors.orange.main,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 2,
        padding: 10,
        position: "relative",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#FFF",
          flex: 1,
        }}
      >
        表情表現
      </Text>
      <TouchableOpacity
        onPress={() => {
          bs_face.current.snapTo(1);
        }}
        style={{ position: "absolute", right: 10 }}
      >
        <Icon name="close" size={25} style={{ color: "#FFF" }} />
      </TouchableOpacity>
    </View>
  );
  const renderInnerAll = () => (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: colors.orange.main,
      }}
    >
      <Text style={{ fontSize: 80, color: "#FFF", fontWeight: "bold" }}>S</Text>
    </View>
  );
  const renderInnerVoice = () => (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: colors.background.default,
        padding: 20,
        paddingTop: 16,
        elevation: 2,
        position: "relative",
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            height: 150,
            width: "100%",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 10,
              marginBottom: 20,
              marginRight: 10,
              elevation: 1,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: colors.paragraph.secondary }}>
              發語聲
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.orange.main,
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                適中
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 10,

              marginLeft: 10,
              marginBottom: 20,
              borderRadius: 10,
              alignItems: "center",
              // justifyContent: "center",
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 16, color: colors.paragraph.secondary }}>
              停頓
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: colors.orange.main,
                }}
              >
                過長
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FFF",
            width: "100%",
            height: 400,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            elevation: 1,
          }}
        >
          <Text style={{ fontSize: 25 }}>聲音</Text>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: colors.orange.light,s
              alignSelf: "stretch",
            }}
          >
            <BarChart
              data={barChartData}
              width={screenWidth - 80}
              height={300}
              chartConfig={chartConfig}
              withCustomBarColorFromData={true}
              showBarTops={false}
              showValuesOnTopOfBars={true}
              fromZero={true}
              style={{ marginTop: "1%", marginBottom: "5%" }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FFF",
            width: "100%",
            borderRadius: 10,
            height: 450,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            marginTop: 20,
            elevation: 1,
          }}
        >
          <Text style={{ fontSize: 25 }}>語調</Text>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",

              // backgroundColor: colors.orange.light,
              alignSelf: "stretch",
            }}
          >
            <BarChart
              data={barChartData}
              width={screenWidth - 80}
              height={300}
              chartConfig={chartConfig}
              withCustomBarColorFromData={true}
              showBarTops={false}
              showValuesOnTopOfBars={true}
              fromZero={true}
              style={{ marginTop: "1%", marginBottom: "5%" }}
            />
          </View>
          <View
            style={{
              backgroundColor: colors.background.default,
              // height: 50,
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              marginTop: 15,
              padding: 10,
              borderRadius: 10,
              elevation: 1,
            }}
          >
            <Text style={{ color: colors.paragraph.secondary }}>訓練結果</Text>
            <Text
              style={{
                color: colors.orange.main,
                fontSize: 25,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              平淡
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            // height: 300,
            marginTop: 20,
            backgroundColor: "#FFF",
            borderRadius: 10,
            elevation: 1,
            padding: 15,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.text, fontSize: 20, marginBottom: 15 }}>
            評分建議
          </Text>
          <Text style={{ color: colors.paragraph.secondary }}>
            語調起伏較平緩，平均語速 稍快，可調整語調並減緩語速
          </Text>
        </View>
        <View style={{ height: 100 }} />
      </View>
    </ScrollView>
  );
  const renderInnerWord = () => (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: colors.background.default,
        paddingTop: 16,
        padding: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        elevation: 2,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            height: 150,
            width: "100%",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 10,
              marginBottom: 20,
              marginRight: 10,
              elevation: 1,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: colors.paragraph.secondary }}>
              字數
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.orange.main,
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                {word.pure_text_len} 字
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 10,

              marginLeft: 10,
              marginBottom: 20,
              borderRadius: 10,
              alignItems: "center",
              // justifyContent: "center",
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 16, color: colors.paragraph.secondary }}>
              語速
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: colors.orange.main,
                }}
              >
                {word.talk_speed}字/分
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background.paper,
            padding: 15,
            borderRadius: 10,
            elevation: 1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            文字分析
          </Text>
          <Text style={{ color: colors.primary.main }}>{word.fulltext}</Text>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background.paper,
            padding: 15,
            height: 300,
            borderRadius: 10,
            elevation: 1,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            情緒分析
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background.paper,
            padding: 15,
            height: 350,
            borderRadius: 10,
            elevation: 1,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            冗言贅字
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: colors.orange.light,s
              alignSelf: "stretch",
            }}
          >
            <BarChart
              data={barChartDataWord}
              width={screenWidth - 80}
              height={300}
              chartConfig={chartConfig}
              withCustomBarColorFromData={true}
              showBarTops={false}
              showValuesOnTopOfBars={true}
              fromZero={true}
              style={{ marginTop: "1%", marginBottom: "5%" }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background.paper,
            padding: 15,

            borderRadius: 10,
            elevation: 1,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            評分建議
          </Text>
          {word.suggest_json.map((row) => (
            <View key={row.id} style={{ marginBottom: 10 }}>
              <Text style={{ color: colors.paragraph.secondary }}>
                {row.name}
              </Text>
            </View>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </View>
    </ScrollView>
  );
  const renderInnerFace = () => (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: colors.background.default,
        paddingTop: 16,
        padding: 20,
        // justifyContent: "center",
        // alignItems: "center",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        elevation: 2,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            height: 150,
            width: "100%",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 10,
              marginBottom: 20,
              marginRight: 10,
              elevation: 1,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: colors.paragraph.secondary }}>
              皺眉
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.orange.main,
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                適中
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 10,

              marginLeft: 10,
              marginBottom: 20,
              borderRadius: 10,
              alignItems: "center",
              // justifyContent: "center",
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 16, color: colors.paragraph.secondary }}>
              眨眼
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: colors.orange.main,
                }}
              >
                15 次/分
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 150,
            width: "100%",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 10,
              marginBottom: 20,
              marginRight: 10,
              elevation: 1,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: colors.paragraph.secondary }}>
              笑容表現PR值
            </Text>

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Text
                style={{
                  color: colors.orange.main,
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                PR95
              </Text> */}
              <CircleChart
                percentage={80}
                color={colors.primary.dark}
                delay={500 + 100 * 0}
                max={100}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 10,

              marginLeft: 10,
              marginBottom: 20,
              borderRadius: 10,
              alignItems: "center",
              // justifyContent: "center",
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 16, color: colors.paragraph.secondary }}>
              眉毛表現PR值
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: colors.orange.main,
                }}
              >
                PR45
              </Text> */}
              <CircleChart
                percentage={95}
                color={colors.orange.main}
                delay={500 + 100 * 0}
                max={100}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 150,
            width: "100%",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              padding: 10,
              marginBottom: 20,
              elevation: 1,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: colors.paragraph.secondary }}>
              笑容表現PR值
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Text
                style={{
                  color: colors.orange.main,
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                PR95
              </Text> */}
              <CircleChart
                percentage={80}
                color={colors.red.main}
                delay={500 + 100 * 0}
                max={100}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background.paper,
            padding: 15,

            borderRadius: 10,
            elevation: 1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            評分建議
          </Text>
          <Text style={{ color: colors.paragraph.secondary }}>
            使用負面詞彙，張力較不足夠， 少數用詞不妥當。
            使用負面詞彙，張力較不足夠，
            少數用詞不妥當。使用負面詞彙，張力較不足夠， 少數用詞不妥當。
          </Text>
        </View>
        <View style={{ height: 100 }} />
      </View>
    </ScrollView>
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* <Text>
        {route.params.title} id: {route.params.id}
      </Text> */}
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Video
          resizeMode="contain"
          useNativeControls
          isLooping
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }} // Can be a URL or a local file.
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#333",
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: "#FFF",
          alignSelf: "stretch",
          padding: 20,
          paddingHorizontal: 40,
          alignItems: "center",
        }}
      >
        <View style={{ alignSelf: "stretch" }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.text,
              fontWeight: "bold",
            }}
          >
            {route.params.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: colors.paragraph.secondary,
              fontWeight: "normal",
              marginTop: 10,
            }}
          >
            2021/10/10 08:00AM
          </Text>
        </View>
        <View style={{ alignSelf: "stretch", marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              bs_voice.current.snapTo(0);
            }}
            style={{
              backgroundColor: colors.background.default,
              height: 60,
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name="record-voice-over"
              size={35}
              style={{ color: colors.primary.main, marginRight: 20 }}
            />
            <Text style={{ flex: 1, fontSize: 18 }}>聲音表現</Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={{ color: colors.paragraph.secondary, marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bs_word.current.snapTo(0);
            }}
            style={{
              backgroundColor: colors.background.default,
              height: 60,
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name="text-fields"
              size={35}
              style={{ color: colors.primary.main, marginRight: 20 }}
            />
            <Text style={{ flex: 1, fontSize: 18 }}>文字表現</Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={{ color: colors.paragraph.secondary, marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bs_face.current.snapTo(0);
            }}
            style={{
              backgroundColor: colors.background.default,
              height: 60,
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name="face"
              size={35}
              style={{ color: colors.primary.main, marginRight: 20 }}
            />
            <Text style={{ flex: 1, fontSize: 18 }}>表情表現</Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={{ color: colors.paragraph.secondary, marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bs_all.current.snapTo(0);
            }}
            style={{
              backgroundColor: colors.primary.main,
              height: 60,
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name="info"
              size={35}
              style={{ color: "#FFF", marginRight: 20 }}
            />
            <Text style={{ flex: 1, fontSize: 18, color: "#FFF" }}>
              查看總分
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={{ color: "#FFF", marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        style={{ flex: 1 }}
        ref={bs_voice}
        snapPoints={["66%", 0]}
        initialSnap={1}
        callbackNode={fall_voice}
        enabledContentGestureInteraction={false}
        renderContent={renderInnerVoice}
        renderHeader={renderHeaderVoice}
      />
      <BottomSheet
        style={{ flex: 1 }}
        ref={bs_word}
        snapPoints={["66%", 0]}
        initialSnap={1}
        callbackNode={fall_word}
        enabledContentGestureInteraction={false}
        renderContent={renderInnerWord}
        renderHeader={renderHeaderWord}
      />
      <BottomSheet
        style={{ flex: 1 }}
        ref={bs_face}
        snapPoints={["66%", 0]}
        initialSnap={1}
        callbackNode={fall_face}
        enabledContentGestureInteraction={false}
        renderContent={renderInnerFace}
        renderHeader={renderHeaderFace}
      />
      <BottomSheet
        style={{ flex: 1 }}
        ref={bs_all}
        snapPoints={[300, 0]}
        initialSnap={1}
        callbackNode={fall_all}
        enabledContentGestureInteraction={true}
        renderContent={renderInnerAll}
        renderHeader={renderHeaderAll}
      />
    </View>
  );
};

export default RecordInfo;
