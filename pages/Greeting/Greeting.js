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
        `！ ${userData.userName}，今天也是適合訓練的一天~~ 趕快來場溝通訓練吧！`
      );
    } else if (randomGreeting === 1) {
      setGreetword(
        `！ ${userData.userName}，今天天氣很好~~ 是時候來場自我介紹訓練！`
      );
    } else {
      setGreetword(
        `！ ${userData.userName}，Hey Yo What's up, 來場面試訓練吧！`
      );
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
          style={{
            position: "absolute",
            bottom: -20,
            left: 80,
            height: 100,
            resizeMode: "contain",
          }}
          source={require("../../images/flower.png")}
        />
        <Image
          style={{
            position: "absolute",
            bottom: -10,
            left: 150,
            height: 100,
            resizeMode: "contain",
          }}
          source={require("../../images/dog.png")}
        />
        <Image
          style={{
            position: "absolute",
            bottom: -20,
            left: 200,
            height: 100,
            resizeMode: "contain",
          }}
          source={require("../../images/flower.png")}
        />
        <Image
          style={{
            position: "absolute",
            bottom: -20,
            left: 400,
            height: 100,
            resizeMode: "contain",
          }}
          source={require("../../images/flower2.png")}
        />

        <Image
          style={styles(colors).tutor}
          source={
            userData.coachGender === "F"
              ? require("../../images/tutor_girl.gif")
              : require("../../images/tutorMan_2.gif")
          }
        />
        <Image
          style={{
            position: "absolute",
            bottom: -20,
            left: 300,
            height: 100,
            resizeMode: "contain",
          }}
          source={require("../../images/flower2.png")}
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
      backgroundColor: colors.primary.dark,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      padding: 20,
      flexWrap: "wrap",
      elevation: 3,
    },
    greeting: {
      fontSize: 18,
      color: "#FFF",
    },
  });
export default Setting;
