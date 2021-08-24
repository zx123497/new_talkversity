import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import Swiper from "react-native-swiper";
import SelectCard from "../../../components/SelectCard/SelectCard";
import SituationService from "../../../services/SituationService";

const Setting = (props) => {
  const { colors } = useTheme();
  const [situations, setSituations] = useState([]);
  useEffect(() => {
    SituationService.getSituationList().then((res) => {
      // console.log(res);
      let temp = [];
      res.forEach((element) => {
        temp.push({
          title: element.content,
          id: element.id,
          intro: element.intro,
        });
      });
      setSituations(temp);
    });
  }, []);

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).selectArea}>
        <Text style={[styles(colors).title, { marginTop: 0 }]}>選擇情境</Text>
        <Swiper
          showsButtons={true}
          // loop={false}
          showsPagination={false}
          loop={false}
          nextButton={<Text style={styles(colors).buttonText}>›</Text>}
          prevButton={<Text style={styles(colors).buttonText}>‹</Text>}
        >
          {situations.map((row) => (
            <View style={styles(colors).wrapper} key={row.id}>
              <SelectCard
                navigation={() => props.navigation.navigate("開始訓練")}
                title={row.title}
                info={row.intro}
                id={row.id}
              />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles(colors).infoArea}>
        <Text style={styles(colors).text}>訓練紀錄</Text>
        <View style={styles(colors).infoCard}>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <View
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View>
                <Text style={{ fontSize: 20, color: colors.paragraph.primary }}>
                  上次訓練
                </Text>
                <Text style={{ color: colors.paragraph.secondary }}>
                  June 6, 2021 08:00PM
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.primary.main,
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                A+
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <View
              style={{
                alignItems: "center",
                padding: 10,
                borderRightColor: colors.background.default,
                borderRightWidth: 1,
              }}
            >
              <Text style={{ color: colors.paragraph.secondary }}>
                完成訓練
              </Text>
              <Text style={{ color: colors.primary.main, fontSize: 22 }}>
                6
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                padding: 10,
                borderRightColor: colors.background.default,
                borderRightWidth: 1,
              }}
            >
              <Text style={{ color: colors.paragraph.secondary }}>
                平均總分
              </Text>
              <Text style={{ color: colors.primary.main, fontSize: 22 }}>
                A
              </Text>
            </View>
            <View style={{ alignItems: "center", padding: 10 }}>
              <Text style={{ color: colors.paragraph.secondary }}>
                完成題數
              </Text>
              <Text style={{ color: colors.primary.main, fontSize: 22 }}>
                60
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.primary.main,
              padding: 2,
              width: "80%",
              borderRadius: 20,
            }}
            onPress={() => {
              props.navigation.navigate("訓練紀錄");
            }}
          >
            <Text style={{ color: "#FFF" }}>查看所有訓練紀錄</Text>
          </TouchableOpacity>
        </View>
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
    title: {
      color: colors.paragraph.primary,
      fontSize: 30,
      fontWeight: "bold",
      marginLeft: "7%",
    },
    text: {
      color: colors.paragraph.primary,
      fontSize: 20,
      marginLeft: "7%",
    },
    wrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "stretch",
      // backgroundColor:colors.orange.main,
    },
    buttonText: {
      color: colors.background.paper,
      fontSize: 60,
      fontWeight: "600",
    },
    submit: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 100,
      borderRadius: 4,
    },
    card: {
      backgroundColor: colors.orange.main,
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
    },
    card2: {
      backgroundColor: colors.red.main,
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
    },
    infoArea: {
      flex: 1,
      alignSelf: "stretch",
    },
    selectArea: {
      marginTop: "15%",
      flex: 1,
    },
    infoCard: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background.paper,
      alignSelf: "stretch",
      margin: 10,
      borderRadius: 20,
      padding: 15,
    },
  });

export default Setting;
