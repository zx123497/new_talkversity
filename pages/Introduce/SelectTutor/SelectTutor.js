import React, { useState, useContext } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import Swiper from "react-native-swiper";
import { AuthContext } from "../../../components/context/context";
import UserService from "../../../services/UserService";
const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("Amy");
  const { getData, changeCoachGender } = useContext(AuthContext);
  const userData = getData();
  const submitTutor = () => {
    let gender;
    let current = name;
    if (current === "Amy") {
      gender = "F";
    } else {
      gender = "M";
    }
    changeCoachGender(gender);
    const data = { user_id: userData.userId, coach_gender: gender };
    UserService.UpdateCoachGender(data).then((res) => {
      console.log(res);
    });
  };
  const handleIndexChange = (index) => {
    if (index === 0) {
      setIndex(0);
      setName("Amy");
    } else {
      setIndex(1);
      setName("Tommy");
    }
  };

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).textArea}>
        <Text style={styles(colors).text}>{name}</Text>
      </View>
      <View style={styles(colors).selectArea}>
        <Swiper
          showsButtons={true}
          loop={false}
          showsPagination={false}
          onMomentumScrollEnd={(event, state) => handleIndexChange(state.index)}
          nextButton={<Text style={styles(colors).buttonText}>›</Text>}
          prevButton={<Text style={styles(colors).buttonText}>‹</Text>}
        >
          <View style={styles(colors).wrapper}>
            <Image
              style={styles(colors).image}
              source={require("../../../images/tutor_w.png")}
            />
          </View>
          <View style={styles(colors).wrapper}>
            <Image
              style={styles(colors).image}
              source={require("../../../images/tutor_man_w.png")}
            />
          </View>
        </Swiper>
      </View>
      <Pressable
        onPress={() => {
          submitTutor();
          navigation.navigate("軟體介紹", { index: index });
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? colors.primary.dark
              : colors.primary.main,
          },
          styles(colors).submit,
        ]}
      >
        <Text style={styles(colors).submitText}>確認</Text>
      </Pressable>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
      alignItems: "center",
      justifyContent: "center",
      padding: 30,
    },
    textArea: {
      marginTop: 10,
      flex: 1,
    },
    selectArea: {
      flex: 10,
      padding: 20,
    },
    image: {
      flex: 1,
      resizeMode: "contain",
    },

    text: {
      color: colors.text.primary,
      fontSize: 30,
      fontWeight: "900",
    },
    wrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: colors.text.secondary,
      fontSize: 60,
      fontWeight: "900",
    },
    submit: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 100,
      borderRadius: 4,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
    },
    submitText: {
      color: "#FFF",
      fontSize: 16,
    },
  });

export default Home;
