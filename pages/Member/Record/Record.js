import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../components/context/context";
import RecordService from "../../../services/RecordService";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import { createKeyboardAwareNavigator } from "react-navigation";

const Record = ({ navigation }) => {
  const { colors } = useTheme();
  const [records, setRecords] = useState([]);
  const { getData } = useContext(AuthContext);
  const userData = getData();
  useEffect(() => {
    RecordService.getRecordList(userData.userId).then((res) => {
      let temp = [];
      res.data.forEach((element) => {
        temp.push(createRow(element));
      });
      setRecords(temp);
    });
  }, []);

  const createRow = (record) => {
    const date = record.created.split("T")[0];
    const time = record.created.split("T")[1].split(".")[0];
    return { ...record, created: date + " " + time };
  };
  return (
    <ScrollView style={styles(colors).container}>
      {records.map((row) => (
        <TouchableOpacity
          key={row.id}
          onPress={() => {
            navigation.navigate("紀錄內容", {
              screen: "info",
              params: { title: "自我介紹訓練", id: row.id },
            });
          }}
          style={{
            flexDirection: "row",
            height: 100,
            backgroundColor: colors.background.paper,
            borderBottomColor: colors.background.default,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flex: 1.3, padding: 7 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.orange.light,
                borderRadius: 5,
                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              <Image
                style={styles(colors).image}
                source={require("../../../images/tutor_orange.png")}
              />
            </View>
          </View>

          <View style={{ flex: 3, padding: 10, justifyContent: "center" }}>
            <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: "bold" }}>
              {row.scenario__content}訓練
            </Text>
            <Text style={{ color: colors.paragraph.secondary }}>
              {row.created}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
      // alignItems: "center",
      // justifyContent: "flex-start",
      // overflow: "scroll",
    },
    text: {
      color: colors.text.secondary,
      fontSize: 40,
    },
    image: {
      flex: 1,
      resizeMode: "contain",
      height: "100%",
      width: "100%",
      padding: 2,
    },
  });
export default Record;
