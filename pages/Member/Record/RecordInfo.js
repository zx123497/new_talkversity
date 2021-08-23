import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/MaterialIcons";
import RecordService from "../../../services/RecordService";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
const RecordInfo = ({ route }) => {
  const { colors } = useTheme();
  useEffect(() => {
    RecordService.getRecord(route.params.id).then((res) => {
      console.log(res.data);
    });
  }, []);
  const bs = useRef();
  const fall = new Animated.Value(1);

  const renderInner = () => (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: colors.background.paper,
        paddingTop: 16,
        // justifyContent: "center",
        // alignItems: "center",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        elevation: 2,
      }}
    >
      <View
        style={{
          marginVertical: 5,
          marginBottom: 15,
          width: "20%",
          borderColor: colors.paragraph.secondary,
          borderTopWidth: 6,
          borderRadius: 50,
          alignSelf: "center",
        }}
      />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>您獲得的總分是</Text>
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
              bs.current.snapTo(0);
              console.log("HI");
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
        ref={bs}
        snapPoints={[500, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledContentGestureInteraction={true}
        renderContent={renderInner}
      />
    </View>
  );
};

export default RecordInfo;
