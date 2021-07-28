import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useTheme, Avatar } from "react-native-paper";

import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Setting = () => {
  const { colors } = useTheme();
  const [content, setContent] = useState(<View></View>);
  const [header, setHeader] = useState("");
  const bs = useRef();
  const fall = new Animated.Value(1);
  const [firstMission, setFirstMission] = useState({});
  const [secondMission, setSecondMission] = useState({});
  const [thirdMission, setThirdMission] = useState({});
  const [fourMission, setFourMission] = useState({});

  useEffect(() => {
    setFirstMission({
      unlock: 1,
      missions: [
        { title: "總字數1000字", status: 1, current: 1000, total: 1000 },
        { title: "文字達到A", status: 1, current: 1, total: 1 },
        { title: "聲音達到A", status: 1, current: 1, total: 1 },
        { title: "表情達到A", status: 1, current: 1, total: 1 },
      ],
    });
    setSecondMission({
      unlock: 1,
      missions: [
        { title: "總字數2000字", status: 0, current: 1000, total: 2000 },
        { title: "文字達到A+", status: 1, current: 1, total: 1 },
        { title: "聲音達到A+", status: 0, current: 0, total: 1 },
        { title: "表情達到A+", status: 1, current: 1, total: 1 },
      ],
    });
    setThirdMission({
      unlock: 0,
      missions: [
        { title: "總字數5000字", status: 0, current: 1000, total: 5000 },
        { title: "文字達到A++", status: 0, current: 0, total: 1 },
        { title: "聲音達到A++", status: 0, current: 0, total: 1 },
        { title: "表情達到A++", status: 1, current: 1, total: 1 },
      ],
    });
    setFourMission({
      unlock: 0,
      missions: [
        { title: "總字數10000字", status: 0, current: 1000, total: 10000 },
        { title: "文字A++", status: 0, current: 1, total: 5 },
        { title: "聲音A++", status: 0, current: 0, total: 5 },
        { title: "表情A++", status: 0, current: 0, total: 5 },
      ],
    });
  }, []);

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
      grade.missions.map((row, index) => (
        <View
          key={index}
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
                  row.status === 1 ? "white" : colors.paragraph.primary
                }`}
                size={30}
              />
            )}
            style={{
              backgroundColor:
                row.status === 1
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
              {row.title}
            </Text>
            <Text
              style={{ color: colors.paragraph.secondary, flex: 1 }}
            >{`${row.current} / ${row.total}`}</Text>
          </View>
        </View>
      ))
    );
  };

  return (
    <View style={styles(colors).container}>
      <BottomSheet
        ref={bs}
        snapPoints={[450, 0]}
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
              console.log("HI");
              setInner(firstMission);
              setHeader("一年級");
              bs.current.snapTo([0]);
            }}
            style={{
              marginTop: 25,
              marginLeft: 100,
              marginBottom: 40,
            }}
          >
            <Image
              style={styles(colors).image}
              source={require("../../../images/ball1.png")}
              style={{ width: 91.5, height: 100 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInner(secondMission);
              setHeader("二年級");
              bs.current.snapTo([0]);
            }}
            style={{ marginBottom: 30 }}
          >
            <Image
              style={styles(colors).image}
              source={require("../../../images/ball2.png")}
              style={{ width: 92.5, height: 100 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInner(thirdMission);
              setHeader("三年級");
              bs.current.snapTo([0]);
            }}
            style={{ marginLeft: 120, marginBottom: 15 }}
          >
            <Image
              style={styles(colors).image}
              source={require("../../../images/ball3.png")}
              style={{ width: 92.5, height: 100 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInner(fourMission);
              setHeader("四年級");
              bs.current.snapTo([0]);
            }}
            style={{}}
          >
            <Image
              style={styles(colors).image}
              source={require("../../../images/ball4.png")}
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
