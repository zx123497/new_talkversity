import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../context/context";
import GradeService from "../../services/GradeService";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";

const DrawerContent = (props) => {
  const { colors } = useTheme();
  const { signOut, getData } = React.useContext(AuthContext);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userName, setUserName] = useState("");
  const [userWord, setUserWord] = useState(0);
  const [grade, setGrade] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPicture, setUserPicture] = useState("");
  useEffect(() => {
    const data = getData();
    setUserInfo(data);
    GradeService.getUserWords(data.userId).then((res) => {
      setUserWord(res.data[0].total_word);
    });
    GradeService.getUserGrade().then((res) => {
      // console.log();
      setGrade(getGrade(res));
    });
  }, []);

  const getGrade = (res) => {
    let grade = 0;
    let userId = getData.userId;
    res.forEach((row) => {
      if (row.user === userId) {
        if (row.grade > grade) {
          grade = row.grade;
        }
      }
    });
    if (grade === 0) {
      return "Not acquired";
    } else if (grade === 1) {
      return "Freshman";
    } else if (grade === 2) {
      return "Sophomore";
    } else if (grade === 3) {
      return "Junior";
    } else if (grade === 4) {
      return "Senior";
    }
  };
  const setUserInfo = (data) => {
    setUserName(data.userName);
    setUserEmail(data.userEmail);
    setUserPicture(data.userPicture);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary.dark }}>
      <DrawerContentScrollView
        {...props}
        style={{ backgroundColor: colors.primary.dark }}
      >
        <View style={styles(colors).drawerContent}>
          <View style={styles(colors).userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                style={{ backgroundColor: "#FFF", borderRadius: 35 }}
                // source={require("../../images/avatar.jpg")}
                source={{ uri: userPicture ? userPicture : "123" }}
                size={70}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles(colors).title}>{userName}</Title>
                <Caption style={styles(colors).caption}>
                  {userEmail.split("@")[0]}
                </Caption>
              </View>
            </View>

            <View style={styles(colors).row}>
              <View style={styles(colors).section}>
                <Paragraph
                  style={[styles(colors).paragraph, styles(colors).caption]}
                >
                  {userWord}
                </Paragraph>
                <Caption style={styles(colors).caption}>Words</Caption>
              </View>
              <View style={styles(colors).section}>
                <Paragraph
                  style={[styles(colors).paragraph, styles(colors).caption]}
                >
                  {grade}
                </Paragraph>
                <Caption style={styles(colors).caption}>Achievement Levels</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles(colors).drawerSection}>
            <DrawerItem
              label="Growth Record"
              inactiveTintColor="white"
              icon={({ color, size }) => (
                <Icon name="chart-line" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("成長紀錄");
              }}
            />
            <DrawerItem
              label="Career Achievements"
              inactiveTintColor="white"
              icon={({ color, size }) => (
                <Icon name="crown-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("生涯成就");
              }}
            />
            <DrawerItem
              label="Training Record"
              inactiveTintColor="#FFF"
              icon={({ color, size }) => (
                <Icon name="history" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("訓練紀錄");
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section
            title={
              <Text style={{ color: colors.primary.light }}>外觀模式</Text>
            }
          >
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles(colors).preference}>
                <Text style={{ color: "#FFF" }}>暗黑模式</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles(colors).bottomDrawerSection}>
        <DrawerItem
          label="登出"
          inactiveTintColor="white"
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      color: "#FFF",
      fontSize: 16,
      marginTop: 3,
      fontWeight: "bold",
    },
    caption: {
      color: "rgba(255,255,255,0.7)",
      fontSize: 14,
      lineHeight: 18,
    },
    row: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 15,
    },
    paragraph: {
      color: "#FFF",
      fontWeight: "bold",
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: colors.primary.light,
      borderTopWidth: 1,
      backgroundColor: colors.primary.dark,
      color: colors.paragraph.primary,
    },
    preference: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

export default DrawerContent;
