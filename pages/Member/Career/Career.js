import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect, useContext } from "react";
import GradeService from "../../../services/GradeService";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme, Avatar } from "react-native-paper";
import { AuthContext } from "../../../components/context/context";
import Animated, { set } from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";

const Setting = () => {
  const isFocused = useIsFocused();
  const { colors } = useTheme();
  const [content, setContent] = useState(<View></View>);
  const [header, setHeader] = useState("");
  const bs = useRef();
  const [unlock, setUnlock] = useState([false, false, false, false]);
  const fall = new Animated.Value(1);
  const { getData } = useContext(AuthContext);
  const userData = getData();
  const [loading, setLoading] = useState(true);
  const [firstMission, setFirstMission] = useState([]);
  const [secondMission, setSecondMission] = useState([]);
  const [thirdMission, setThirdMission] = useState([]);
  const [fourMission, setFourMission] = useState([]);
  let achievementList = [];
  const [userWord, setUserWord] = useState(0);
  useEffect(() => {
    console.log("HI");
    GradeService.getAllAchievementList(userData.userId).then((res) => {
      achievementList = res.data;
      GradeService.getUserWords(userData.userId).then((res3) => {
        setUserWord(res3.data[0].total_word);
        createMisionList(achievementList);
        GradeService.getUserGrade().then((res4) => {
          let list = res4.filter((row) => row.id === userData.userId);
          let temp = [true, false, false, false];

          list.forEach((row) => {
            temp[row.grade] = true;
          });
          setUnlock(temp);
          setLoading(false);
        });
      });
    });
  }, [isFocused]);

  const createMisionList = (list) => {
    console.log(list);
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];
    let temp4 = [];
    let achievement = {};
    list.forEach((mission, id) => {
      if (mission.achievement_id <= 4) {
        mission.time = mission.achievement__name.split(" ")[1];
        mission = { ...mission, current: userWord };
      }

      if (mission.grade === 1) {
        console.log("push 1");
        temp1.push(mission);
      } else if (mission.grade === 2) {
        console.log("push 2");
        temp2.push(mission);
      } else if (mission.grade === 3) {
        console.log("push 3");
        temp3.push(mission);
      } else if (mission.grade === 4) {
        console.log("push 4");
        temp4.push(mission);
      }
      achievement = null;
    });
    setFirstMission(temp1);
    setSecondMission(temp2);
    setThirdMission(temp3);
    setFourMission(temp4);
  };

  const renderInner = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: "100%",
      }}
    >
      <View style={{ flex: 1, alignItems: "center", padding: 15 }}>
        {content}
      </View>
    </View>
  );
  const renderHeader = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{ color: colors.text.primary, fontSize: 20, fontWeight: "bold" }}
      >
        {header}
      </Text>
    </View>
  );

  const setInner = (grade) => {
    setContent(<View></View>);
    setContent(
      grade.map((row) => (
        <View
          key={row.achievement_id}
          style={{
            flexDirection: "row",
            marginBottom: 15,
            width: 300,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background.default,
            borderRadius: 10,
            borderBottomLeftRadius: 25,
            borderTopLeftRadius: 25,
          }}
        >
          <Avatar.Icon
            icon={(color, size) => (
              <Icon
                name="check-bold"
                color={`${
                  row.is_achieve === 1 ? "white" : colors.paragraph.primary
                }`}
                size={30}
              />
            )}
            style={{
              backgroundColor:
                row.is_achieve === 1
                  ? colors.orange.light
                  : colors.paragraph.secondary,
            }}
            size={50}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                marginRight: 15,
                marginLeft: 10,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {row.achievement__name}
            </Text>
            <Text
              style={{ color: colors.paragraph.secondary, marginRight: 15 }}
            >{`${row.current} / ${row.time}`}</Text>
          </View>
        </View>
      ))
    );
  };
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1 }}
        color={colors.primary.main}
      />
    );
  }
  return (
    <View style={styles(colors).container}>
      <BottomSheet
        ref={bs}
        snapPoints={[550, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledContentGestureInteraction={true}
        renderContent={renderInner}
        renderHeader={renderHeader}
      />
      <Animated.View
        style={{
          position: "relative",
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={styles(colors).image}
            source={require("../../../images/road.png")}
          />
        </View>
        <Image
          style={styles(colors).image}
          source={require("../../../images/planet.png")}
          style={{
            position: "absolute",
            top: 0,
            left: 10,
            right: 0,
            bottom: 0,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Image
          style={styles(colors).image}
          source={require("../../../images/fairy1.png")}
          style={{
            position: "absolute",
            top: 250,
            left: 200,
            right: 0,
            bottom: 0,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Image
          style={styles(colors).image}
          source={require("../../../images/fairy2.png")}
          style={{
            position: "absolute",
            top: 380,
            left: 10,
            right: 0,
            bottom: 0,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Image
          style={styles(colors).image}
          source={require("../../../images/fairy3.png")}
          style={{
            position: "absolute",
            top: 480,
            left: 180,
            right: 0,
            bottom: 0,
            width: 100,
            height: 90,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <View
          style={{
            width: 250,
            height: 600,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: 20,

            // backgroundColor: "red",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (unlock[0]) {
                setInner(firstMission);
                setHeader("一年級");
                bs.current.snapTo([0]);
              }
            }}
            style={{
              marginTop: 25,
              marginLeft: 100,
              marginBottom: 40,
            }}
          >
            <Image
              style={styles(colors).image}
              source={
                unlock[0]
                  ? require("../../../images/ball1.png")
                  : require("../../../images/ball1_lock.png")
              }
              style={{ width: 91.5, height: 100 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (unlock[1]) {
                setInner(secondMission);
                setHeader("二年級");
                bs.current.snapTo([0]);
              }
            }}
            style={{ marginBottom: 30 }}
          >
            <Image
              style={styles(colors).image}
              source={
                unlock[1]
                  ? require("../../../images/ball2.png")
                  : require("../../../images/ball2_lock.png")
              }
              style={{ width: 92.5, height: 100 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (unlock[2]) {
                setInner(thirdMission);
                setHeader("三年級");
                bs.current.snapTo([0]);
              }
            }}
            style={{ marginLeft: 120, marginBottom: 15 }}
          >
            <Image
              style={styles(colors).image}
              source={
                unlock[2]
                  ? require("../../../images/ball3.png")
                  : require("../../../images/ball3_lock.png")
              }
              style={{ width: 93.5, height: 100 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (unlock[3]) {
                setInner(fourMission);
                setHeader("四年級");
                bs.current.snapTo([0]);
              }
            }}
            style={{}}
          >
            <Image
              style={styles(colors).image}
              source={
                unlock[3]
                  ? require("../../../images/ball4.png")
                  : require("../../../images/ball4_lock.png")
              }
              style={{ width: 100, height: 120 }}
            />
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </Animated.View>
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
      position: "relative",
      zIndex: 0,
    },
    text: {
      color: colors.text.secondary,
      fontSize: 40,
    },
    image: {
      resizeMode: "contain",
    },
  });
export default Setting;
