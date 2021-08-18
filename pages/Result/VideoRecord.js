import * as React from "react";
import { useTheme } from "react-native-paper";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { Video } from "expo-av";

const VideoRecord = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { width } = Dimensions.get("window");
  const video_uri = route.params.uri.video_uri;
  return (
    <View style={styles(colors).container}>
      <View>
        <Video
          source={{
            uri: video_uri,
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
      width: "100%",
      height: "100%",
      backgroundColor: colors.background.default,
      alignItems: "center",
      justifyContent: "center",
    },
  });
export default VideoRecord;
