import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";

import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

const Setting = () => {
  const { colors } = useTheme();
  const [content, setContent] = useState("");
  const [header, setHeader] = useState("");
  const bs = useRef();
  const fall = new Animated.Value(1);

  const renderInner = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: "100%",
      }}
    >
      <Text>{content}</Text>
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
  return (
    <View style={styles(colors).container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
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
              setContent("一年級任務");
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
              setContent("二年級任務");
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
              setContent("三年級任務");
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
              setContent("四年級任務");
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
