import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { useTheme } from "react-native-paper";

const TrainIntro = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { width, height } = Dimensions.get("screen");
  const scenario_id = route.params.scenario_id.row.id;
  const bgs = [
    colors.primary.secondary,
    colors.orange.secondary,
    colors.red.light,
    "#B98EFF",
  ];
  const DATA = [
    {
      key: "1",
      title: "Tip.1 Record Training Video",
      description: "Please record a training video about 15~30 secs",
      image: require("../../images/clock.png"),
    },
    {
      key: "2",
      title: "Tip.2 Start and End your recording",
      description: "Click the circle button below the screen\nThen you can start or end your recording",
      image: require("../../images/click.png"),
    },
    {
      key: "3",
      title: "Tip.3 Notes about training",
      description: "Please keep your face on the screen when recording\n Do not move freely",
      image: require("../../images/speak.png"),
    },
  ];

  const Indicator = ({ scrollX }) => {
    return (
      <View
        style={{ position: "absolute", bottom: "-10%", flexDirection: "row" }}
      >
        {DATA.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 0.9, 0.6],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`indication-${i}`}
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: "#fff",
                opacity,
                margin: 10,
                transform: [
                  {
                    scale,
                  },
                ],
              }}
            ></Animated.View>
          );
        })}
      </View>
    );
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const Backdrop = ({ scrollX }) => {
    const backgroundColor = scrollX.interpolate({
      inputRange: bgs.map((_, i) => i * width),
      outputRange: bgs.map((bg) => bg),
    });
    return (
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
      />
    );
  };
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "-35deg", "35deg"],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  const Square = ({ scrollX }) => {
    return (
      <Animated.View
        style={{
          width: height,
          height: height,
          backgroundColor: "#fff",
          borderRadius: 86,
          position: "absolute",
          top: -height * 0.6,
          left: -height * 0.3,
          transform: [
            {
              rotate,
            },
            {
              translateX,
            },
          ],
        }}
      />
    );
  };

  return (
    <View style={styles(colors).container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: "center", padding: 20 }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={item.image}
                  style={
                    item.key === "1"
                      ? {
                        width: width / 2,
                        height: width / 2,
                        resizeMode: "contain",
                      }
                      : {
                        width: width / 1.5,
                        height: width / 1.5,
                        resizeMode: "contain",
                      }
                  }
                />
              </View>

              <View style={{ flex: 0.2, alignSelf: "flex-start" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    fontSize: 28,
                    marginTop: "20%",
                    marginBottom: 10,
                    color: colors.paragraph.primary,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontWeight: "900",
                    fontSize: 20,
                    color: colors.background.paper,
                  }}
                >
                  {item.description}
                </Text>
              </View>
              <Indicator scrollX={scrollX} />
            </View>
          );
        }}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("開始訓練", { scenario_id: { scenario_id } });
        }}
        style={({ pressed }) => [
          {
            opacity: pressed
              ? 1
              : 0.8,
          },
          styles(colors).button,
        ]}
      >
        <Text
          style={{
            color: colors.background.paper,
            fontWeight: "bold",
            fontSize: 22,
            opacity: 0.8,
          }}
        >
          Skip
        </Text>
      </Pressable>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    button: {
      alignSelf: "flex-end",
      marginBottom: "8%",
      marginRight: "10%",
    }
  });

export default TrainIntro;
