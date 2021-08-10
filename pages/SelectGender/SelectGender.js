import React, { useState, useContext, useEffect } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../components/context/context";
import UserService from "../../services/UserService";
let userdata = {};
const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [gender, setGender] = useState(null);
  const { getData } = useContext(AuthContext);
  let opacity = new Animated.Value(0);
  useEffect(() => {
    getData().then((data) => {
      userdata = data;
    });
  }, []);

  const animate = () => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedStyles = [
    {
      alignItems: "center",
      justifyContent: "center",
      padding: 70,
      paddingTop: 100,
      paddingBottom: 20,
      width: 500,
      height: 300,
    },
    {
      opacity,
    },
  ];

  const submitGender = () => {
    let userGender = gender;
    if (userGender === "female") {
      userGender = "F";
    } else if (userGender === "male") {
      userGender = "M";
    }
    const data = { user_id: userdata.userId, gender: userGender };
    UserService.UpdateUserGender(data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles(colors).container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 70,
          paddingTop: 120,
          paddingBottom: 20,
          width: 500,
          flex: 1,
          marginBottom: 30,
        }}
      >
        <Animated.View style={animatedStyles}>
          <Animated.Image
            onLoad={animate}
            source={
              gender !== null
                ? gender === "female"
                  ? require("../../images/girl.png")
                  : require("../../images/boy.png")
                : require("../../images/no.png")
            }
            style={{
              resizeMode: "contain",
              flex: 1,
              transform: [{ scale: size }],
            }}
          />
        </Animated.View>
      </View>
      <View style={{ alignItems: "center", flex: 1, marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.text,
            marginBottom: 10,
          }}
        >
          選擇性別
        </Text>
        <Text style={{ color: colors.paragraph.secondary }}>
          了解您的性別可以讓訓練更加準確
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={[
                styles(colors).btn,
                gender === "female"
                  ? { backgroundColor: "#EE94CA", borderColor: "#EE94CA" }
                  : {},
              ]}
              onPress={() => {
                setGender("female");
              }}
            >
              <Icon
                name="gender-female"
                size={50}
                style={[
                  { color: "#EE94CA" },
                  gender === "female" ? { color: "#FFF" } : {},
                ]}
              />
            </TouchableOpacity>
            <Text>女生</Text>
          </View>

          <Text
            style={{ color: colors.paragraph.secondary, marginHorizontal: 10 }}
          >
            或
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={[
                styles(colors).btn,
                gender === "male"
                  ? { backgroundColor: "#80C8FF", borderColor: "#80C8FF" }
                  : {},
              ]}
              onPress={() => {
                setGender("male");
              }}
            >
              <Icon
                name="gender-male"
                size={50}
                style={[
                  { color: "#80C8FF" },
                  gender === "male" ? { color: "#FFF" } : {},
                ]}
              />
            </TouchableOpacity>
            <Text>男生</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary.main,
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
          marginBottom: 15,
          borderRadius: 15,
          elevation: 2,
        }}
        onPress={() => {
          submitGender();
          navigation.navigate("選擇教練");
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>
          開始吧
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background.paper,
    },
    btn: {
      borderColor: colors.background.default,
      borderWidth: 3,
      padding: 10,
      margin: 10,
      marginTop: 25,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Home;
