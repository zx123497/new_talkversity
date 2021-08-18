import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../components/context/context";

const PreTest = ({ navigation }) => {
  const dimensions = useRef(Dimensions.get("window"));
  const screenWidth = dimensions.current.width;
  const height = Math.round((screenWidth * 16) / 9);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] =useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [recording, setRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const { colors } = useTheme();
  const { getData, changeInitial } = useContext(AuthContext);
  const userData = getData();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null || hasAudioPermission === null ) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderIntroduce = () => {
    return (
      <View style={styles(colors).topic}>
        <View style={styles(colors).header}>
          <Text style={styles(colors).subTitle}>請您面無表情地朗讀以下文字</Text>
        </View>
        <Text style={styles(colors).title}>
          中央大學資訊管理學系成立於七十四學年度，
          目的在於培養學生開發及資訊系統開發的專業能力，
          以提供國內企業所需之資訊人才， 並致力於資訊管理領域的長遠發展。
        </Text>
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
        {renderIntroduce()}
        <View style={styles(colors).record}>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={async () => {
              console.log("take video");
              try {
                if (!recording) {
                  setRecording(true);
                  let video = await cameraRef.recordAsync({
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
            source={require("../../images/tutor_w_pretest.png")}
            resizeMode="contain"
          />
          <Text style={styles(colors).finishedText}>恭喜您完成前測!</Text>
          <Pressable
            onPress={() => {
              changeInitial(true);
            }}
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
            <Text style={styles(colors).buttonText}>回到首頁</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ratio="16:9"
        style={{ flex: 1, height: height, width: "100%" }}
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
      // height: "25%",
      marginTop: "5%",
      borderRadius: 10,
      backgroundColor: colors.background.paper,
      opacity: 0.9,
      // borderWidth: 2,
    },
    header: {
      flexDirection: "row",
      marginHorizontal: "6%",
      marginTop: "3%",
      marginBottom: "1%",
      alignSelf: "center",
    },
    subTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.paragraph.secondary,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.paragraph.primary,
      paddingHorizontal: "5%",
      paddingBottom: "2%",
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

export default PreTest;
