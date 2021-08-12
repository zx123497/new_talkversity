import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useTheme } from "react-native-paper";
import { AuthContext } from "../../components/context/context";
const Setting = () => {
  const { colors } = useTheme();
  const { getData } = useContext(AuthContext);
  const userData = getData();
  const [greet, setGreet] = useState("早安");
  const [greetword, setGreetword] = useState(
    "!OOO，今天要訓練甚麼呢? 趕快來訓練吧! LetGOGOGO!!!!!!"
  );
  useEffect(() => {
    const current = new Date();
    let hour = current.getHours();
    if (hour >= 5 && hour <= 12) {
      setGreet("早安");
    } else if (hour >= 12 && hour <= 18) {
      setGreet("午安");
    } else {
      setGreet("晚安");
    }

    let randomGreeting = getRandomInt(0, 3);
    if (randomGreeting === 0) {
      setGreetword(
        "! OOO，今天也是適合訓練的一天~~ 趕快來訓練吧! LetGOGOGO!!!!!!"
      );
    } else if (randomGreeting === 1) {
      setGreetword("! OOO，今天要訓練甚麼呢? 趕快來訓練吧! LetGOGOGO!!!!!!");
    } else {
      setGreetword("! OOO，HEyYOYOO 歡迎來到Talkversity! LetGOGOGO!!!!!!");
    }
  }, []);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).text}>
        <View style={styles(colors).box}>
          <Text style={styles(colors).greeting}>
            {greet}
            {greetword}
          </Text>
        </View>
      </View>
      <View style={styles(colors).image}>
        {/*TODO:change better image*/}
        <Image
          style={styles(colors).tutor}
          source={
            userData.coachGender === "F"
              ? require("../../images/tutor_3.gif")
              : require("../../images/tutorMan_2.gif")
          }
        />
      </View>
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
    },
    text: {
      flex: 1,
      backgroundColor: colors.primary.main,
      padding: 20,
      paddingTop: 40,
      width: "100%",
    },
    image: {
      flex: 3,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary.main,
    },
    tutor: {
      flex: 1,
      resizeMode: "contain",
    },
    box: {
      flex: 1,
      backgroundColor: colors.background.paper,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      padding: 20,
      flexWrap: "wrap",
    },
    greeting: {
      fontSize: 18,
    },
  });
export default Setting;
