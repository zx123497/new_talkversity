import * as React from "react";
import { useTheme } from "react-native-paper";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { Video } from "expo-av";

const VideoRecord = ({ navigation }) => {
  const { colors } = useTheme();
  const { width } = Dimensions.get("window");
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    
    <View style={styles(colors).container}>
      <View>
        <Video
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          shouldPlay
          useNativeControls
          resizeMode="contain"
          style={{ width, height: "100%" }}
        />
      </View>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    controlBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 45,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  });
export default VideoRecord;
