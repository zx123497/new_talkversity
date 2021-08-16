import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Dimensions
} from "react-native";
import { Camera } from "expo-camera";
import { useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import * as FaceDetector from "expo-face-detector";

const TrainRecording = ({ navigation }) => {
  const dimensions = useRef(Dimensions.get("window"));
  const screenWidth = dimensions.current.width;
  const height = Math.round((screenWidth * 16) / 9);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [recording, setRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const { colors } = useTheme();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      Camera.requestMicrophonePermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    console.log("no permission ", hasPermission);
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderIntroduce = () => {
    return (
      <View style={styles(colors).topic}>
        <View style={styles(colors).header}>
          <Text style={styles(colors).subTitle}>題目</Text>
        </View>
        <Text style={styles(colors).title}>請您自我介紹...</Text>
        <View style={styles(colors).line} />
        <Image
          source={require("../../images/logo_tiffany.png")}
          resizeMode="contain"
          style={styles(colors).logo}
        />
      </View>
    );
  };

  const renderVideoRecordIndicator = () => {
    return (
      <View style={styles(colors).recordIndicatorContainer}>
        <View style={styles(colors).recordDot} />
        <Text style={styles(colors).recordTitle}>Record</Text>
      </View>
    );
  };

  const renderVideoRecoding = (recording) => {
    return (
      <View style={{ flex: 1 }}>
        {recording ? renderVideoRecordIndicator() : renderIntroduce()}
        <View style={styles(colors).record}>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={async () => {
              console.log("take video");
              try {
                if (!recording) {
                  setRecording(true);
                  video = await cameraRef.recordAsync({
                    maxDuration: 30,
                  });
                  console.log("video", video);
                } else {
                  console.log("stop record");
                  let endVideo = await cameraRef.stopRecording();
                  setRecording(false);
                  setHasRecorded(true);
                }
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <View style={styles(colors).outerButton}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 25,
                  borderColor: recording ? colors.primary.light : "red",
                  height: 30,
                  width: 30,
                  backgroundColor: recording ? colors.primary.light : "red",
                }}
              ></View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderHasRecorded = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles(colors).finished}>
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#0F0F0F",
              opacity: 0.7,
            }}
          />
          <Image
            style={styles(colors).finishedImage}
            source={require("../../images/tutor_orange.png")}
            resizeMode="contain"
          />
          <Text style={styles(colors).finishedText}>恭喜您完成練習!</Text>
          <Pressable
            onPress={() => navigation.navigate("評分結果")}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? colors.primary.dark
                  : colors.primary.main,
              },
              styles(colors).buttonFinished,
            ]}
          >
            <AntDesign name="play" size={24} color="white" />
            <Text style={styles(colors).buttonText}>查看評分結果</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ratio="16:9"
        style={{ flex: 1,height: height, width: "100%"}}
        type={Camera.Constants.Type.front}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        {hasRecorded ? renderHasRecorded() : renderVideoRecoding(recording)}
      </Camera>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    topic: {
      alignSelf: "center",
      width: "85%",
      height: "15%",
      marginTop: "20%",
      borderRadius: 10,
      backgroundColor: colors.background.paper,
      opacity: 0.9,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "6%",
      marginTop: "3%",
      marginBottom: "1%",
    },
    subTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.paragraph.secondary,
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: colors.paragraph.primary,
      marginLeft: "6%",
      marginBottom: "1%",
    },
    line: {
      width: "90%",
      alignSelf: "center",
      borderBottomColor: colors.paragraph.secondary,
      borderBottomWidth: 2,
      marginBottom: "1.5%",
    },
    logo: {
      height: "20%",
      width: "20%",
      marginRight: "3%",
      alignSelf: "flex-end",
    },
    record: {
      flex: 0.9,
      justifyContent: "flex-end",
    },
    outerButton: {
      borderWidth: 2,
      borderRadius: 50,
      borderColor: colors.primary.main,
      height: 65,
      width: 65,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    recordIndicatorContainer: {
      flexDirection: "row",
      //   position: "absolute",
      marginTop: "20%",
      alignSelf: "center",
      width: "30%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2F2F2D",
      borderRadius: 30,
      opacity: 0.7,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 25,
      paddingRight: 32,
    },
    recordTitle: {
      fontSize: 18,
      color: "#ffffff",
      textAlign: "center",
      fontWeight: "bold",
    },
    recordDot: {
      borderRadius: 10,
      height: 10,
      width: 10,
      backgroundColor: "#ff0000",
      marginRight: 8,
    },
    finished: {
      width: "100%",
      height: "100%",
      // backgroundColor: "#0F0F0F",
      alignItems: "center",
      // opacity: 0.7
    },
    finishedText: {
      color: colors.background.paper,
      fontSize: 24,
      fontWeight: "bold",
      position: "absolute",
      top: "60%",
    },
    finishedImage: {
      width: "75%",
      height: "75%",
      position: "absolute",
      top: "8%",
    },
    buttonFinished: {
      width: "70%",
      paddingVertical: "5%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      flexDirection: "row",
      position: "absolute",
      top: "80%",
    },
    buttonText: {
      marginLeft: "3%",
      color: "#FFF",
      fontSize: 24,
      fontWeight: "bold",
    },
  });

export default TrainRecording;
