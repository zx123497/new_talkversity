import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "react-native-paper";
import Swiper from "react-native-swiper";
import { useIsFocused } from "@react-navigation/native";
import SelectCard from "../../../components/SelectCard/SelectCard";
import SituationService from "../../../services/SituationService";
import RecordService from "../../../services/RecordService";
import { AuthContext } from "../../../components/context/context";
const Setting = (props) => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const [situations, setSituations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState("None");
  const [time, setTime] = useState("");
  const { getData } = useContext(AuthContext);
  const userData = getData();
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
      setLoading(false);
      setSituations(temp);
      RecordService.getRecordWeekdate(userData.userId).then((res) => {
        if (res.data.length > 0) {
          const last = res.data.pop();
          setScore(last.total_score);
          let date = last.created.split("T")[0];
          let t = last.created.split("T")[1].split(".")[0];
          setTime(date + " " + t);
        }
      });
    });
  }, [isFocused]);

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).selectArea}>
        <Text style={[styles(colors).title, { marginTop: 0 }]}>Choose Situation</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary.main}
            style={{
              flex: 1,
            }}
          />
        ) : (
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
                  navigation={() =>
                    props.navigation.navigate("訓練說明", {
                      scenario_id: { row },
                    })
                  }
                  title={row.title}
                  info={row.intro}
                  id={row.id}
                />
              </View>
            ))}
          </Swiper>
        )}
      </View>
      <View style={styles(colors).infoArea}>
        <Text style={styles(colors).text}>Training recordings</Text>
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
                  Last Training
                </Text>
                <Text style={{ color: colors.paragraph.secondary }}>
                  {time}
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
                {score}
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
                Total Training
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
                Average Scores
              </Text>
              <Text style={{ color: colors.primary.main, fontSize: 22 }}>
                A
              </Text>
            </View>
            <View style={{ alignItems: "center", padding: 10 }}>
              <Text style={{ color: colors.paragraph.secondary }}>
              Total Questions
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
            <Text style={{ color: "#FFF" }}>View Total Training Recording</Text>
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
      alignItems: "stretch",
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
