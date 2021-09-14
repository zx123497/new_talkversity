import React, { useState, useRef, useEffect, useContext } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import ResultListItem from "../../../components/TrainResult/ResultListItem";
import PostVideoService from "../../../services/PostVideoService";
import { AuthContext } from "../../../components/context/context";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

const Train = ({ navigation, route }) => {
  const { colors } = useTheme();
  const video_uri = route.params.uri.video_uri;
  const form = route.params.formData.formData.form;
  const Faceform = route.params.formData.formData.Faceform;

  const bs = useRef();
  const fall = new Animated.Value(1);
  const [unlock, setUnlock] = useState([false, false, false, false]);
  const [soundResult, setSoundResult] = useState(null);
  const [articleResult, setArticleResult] = useState(null);
  const [faceResult, setFaceResult] = useState(null);
  const { getData } = useContext(AuthContext);
  const userData = getData();
  const user = userData.userId;

  useEffect(() => {
    (async () => {
      PostVideoService.postSound(form).then((res) => {
        let soundResult = [];
        soundResult = res.data;
        setSoundResult(soundResult);
        setUnlock([true, false, false, false]);
      });

      PostVideoService.postArticle(form).then((res) => {
        let articleResult = [];
        articleResult = res.data;
        setArticleResult(articleResult);
        setUnlock([true, true, false, false]);
      });

      PostVideoService.postFace(Faceform).then((res) => {
        let faceResult = [];
        faceResult = res.data;
        setFaceResult(faceResult);
        setUnlock([true, true, true, true]);
      });
    })();
  }, []);

  const renderInner = () => (
    <View style={styles(colors).scoreSheet}>
      <View style={styles(colors).scoreLine} />
      <View style={styles(colors).scoreInner}>
        <Text style={styles(colors).scoreTitle}>您獲得的總分是</Text>
        <Text style={styles(colors).scoreText}>
          {faceResult && faceResult.Overall_Rank}
        </Text>
      </View>
    </View>
  );

  const renderLoading = () => {
    return (
      <LottieView
        source={require("../../../assets/resultLoading.json")}
        style={{
          width: 50,
          height: 50,
        }}
        autoPlay
        loop
      />
    );
  };

  const renderFinished = () => {
    return (
      <MaterialIcons
        name="check-circle"
        size={30}
        style={styles(colors).checkIcon}
      />
    );
  };

  const renderWaiting = () => {
    return (
      <MaterialCommunityIcons
        name="checkbox-blank-circle"
        size={30}
        style={styles(colors).loadIcon}
      />
    );
  };  
  
  return (
    <View style={(styles.center, styles(colors).container)}>
      <BottomSheet
        ref={bs}
        snapPoints={["40%", 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledContentGestureInteraction={true}
        renderContent={renderInner}
      />

      <View style={styles(colors).wrapper}>
        <Image
          source={require("../../../images/result_bg.png")}
          resizeMode="stretch"
          style={styles(colors).bgImage}
        />
        <Image
          style={
            userData.coachGender === "M"
              ? styles(colors).tutor_m
              : styles(colors).tutor_w
            }
          resizeMode="contain"
          source={
            userData.coachGender === "M"
              ? require("../../../images/tutor_result_m_orange.png")
              : require("../../../images/tutor_w_orange.png")
          }
        />
        <Text style={styles(colors).title}>評分結果</Text>
      </View>
      <View style={styles(colors).content}>
        <View style={styles(colors).selectResult}>
          <View style={styles(colors).result}>
            {renderFinished()}
            <Pressable
              onPress={() =>
                navigation.navigate("練習紀錄", { uri: { video_uri } })
              }
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? colors.primary.light
                    : colors.background.default,
                },
                styles(colors).buttonSelect,
              ]}
            >
              <Text style={styles(colors).selectText}>查看練習影片</Text>
              <Text style={styles(colors).buttonNext}>›</Text>
            </Pressable>
          </View>
          <View style={styles(colors).result}>
            {unlock[0] ? renderFinished() : renderLoading()}
            <ResultListItem
              onPress={unlock[0] ? () => navigation.navigate("聲音分析") : null}
              title="聲音"
              icon={
                <MaterialIcons
                  name="record-voice-over"
                  size={50}
                  style={styles(colors).resultIcon}
                />
              }
            />
          </View>
          <View style={styles(colors).result}>
            {unlock[0]
              ? unlock[1]
                ? renderFinished()
                : renderLoading()
              : renderWaiting()}
            <ResultListItem
              onPress={unlock[1] ? () => navigation.navigate("語意分析") : null}
              title="語意"
              icon={
                <MaterialIcons
                  name="text-fields"
                  size={50}
                  style={styles(colors).resultIcon}
                />
              }
            />
          </View>
          <View style={styles(colors).result}>
            {unlock[1]
              ? unlock[2]
                ? renderFinished()
                : renderLoading()
              : renderWaiting()}
            <ResultListItem
              onPress={unlock[2] ? () => navigation.navigate("表情分析") : null}
              title="表情"
              icon={
                <MaterialIcons
                  name="face"
                  size={50}
                  style={styles(colors).resultIcon}
                />
              }
            />
          </View>
          <View style={styles(colors).result}>
            {unlock[2]
              ? unlock[3]
                ? renderFinished()
                : renderLoading()
              : renderWaiting()}
            <Pressable
              onPress={unlock[3] ? () => bs.current.snapTo(0) : null}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? colors.primary.light
                    : colors.primary.main,
                },
                styles(colors).buttonSelect,
              ]}
            >
              <Text style={styles(colors).scoreButtonText}>查看總分</Text>
              <Text style={styles(colors).scoreNext}>›</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => navigation.navigate("選擇情境")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? colors.primary.dark
              : colors.primary.main,
          },
          styles(colors).buttonReturn,
        ]}
      >
        <AntDesign name="play" size={24} color="white" />
        <Text style={styles(colors).buttonText}>返回訓練</Text>
      </Pressable>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      color: "#FFF",
      backgroundColor: colors.background.paper,
      alignItems: "center",
    },
    wrapper: {
      width: "100%",
      height: "28%",
      marginBottom: "6%",
    },
    content: {
      width: "85%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "5%",
      // borderWidth:1,
    },
    connectList: {
      flex: 1,
      alignItems: "center",
      paddingTop: 2,
      // borderWidth: 1,
    },
    bgImage: {
      height: "100%",
      width: "100%",
    },
    tutor_w: {
      height: "80%",
      width: "80%",
      position: "absolute",
      bottom: "-2%",
      left: "-15%",
    },
    tutor_m: {
      height: "90%",
      width: "90%",
      position: "absolute",
      bottom: "-8%",
      left: "-18%",
    },
    title: {
      color: colors.background.paper,
      position: "absolute",
      fontSize: 40,
      fontWeight: "bold",
      right: "10%",
      top: "35%",
    },
    selectResult: {
      width: "100%",
      flexDirection: "column",
      paddingRight: "1%",
      // borderWidth: 1,
    },
    result: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "5%",
      // borderWidth: 1,
    },
    buttonSelect: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
      borderRadius: 15,
      paddingLeft: "8%",
      paddingRight: "8%",
      alignSelf: "center",
    },
    selectText: {
      color: colors.paragraph.primary,
      fontSize: 20,
      fontWeight: "bold",
    },
    buttonNext: {
      paddingBottom: "3%",
      color: colors.paragraph.secondary,
      fontSize: 30,
      fontWeight: "600",
    },
    checkIcon: {
      marginHorizontal: "3%",
      color: colors.primary.main,
    },
    loadIcon: {
      marginHorizontal: "3%",
      color: colors.primary.light,
      opacity: 0.5,
    },
    resultIcon: {
      color: colors.primary.main,
      marginRight: "5%",
    },

    scoreButtonText: {
      color: colors.background.paper,
      fontSize: 20,
      fontWeight: "bold",
    },
    scoreNext: {
      paddingBottom: "3%",
      color: colors.background.paper,
      fontSize: 30,
      fontWeight: "600",
    },
    buttonText: {
      marginLeft: "3%",
      color: "#FFF",
      fontSize: 25,
      fontWeight: "bold",
    },
    buttonReturn: {
      width: "85%",
      paddingTop: "2.5%",
      paddingBottom: "2.5%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
      flexDirection: "row",
    },
    scoreSheet: {
      height: "100%",
      backgroundColor: colors.primary.light,
      paddingTop: 16,
      justifyContent: "center",
      alignItems: "center",
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    scoreLine: {
      marginTop: "3%",
      width: "20%",
      borderColor: colors.paragraph.secondary,
      borderTopWidth: 6,
      borderRadius: 50,
      alignSelf: "center",
    },
    scoreInner: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    scoreTitle: {
      color: colors.background.paper,
      fontSize: 20,
      fontWeight: "bold",
    },
    scoreText: {
      color: colors.background.paper,
      fontSize: 120,
      fontWeight: "bold",
    },
  });
export default Train;
