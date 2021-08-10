import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { DrawerRouter } from "@react-navigation/native";

const DrawerContent = (props) => {
  const { colors } = useTheme();
  const { signOut, getData } = React.useContext(AuthContext);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPicture, setUserPicture] = useState("");
  useEffect(() => {
    getData().then((data) => setUserInfo(data));
  }, []);
  const setUserInfo = (data) => {
    setUserName(data.userName);
    setUserEmail(data.userEmail);
    setUserPicture(data.userPicture);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles(colors).drawerContent}>
          <View style={styles(colors).userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
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
                  80
                </Paragraph>
                <Caption style={styles(colors).caption}>完成訓練</Caption>
              </View>
              <View style={styles(colors).section}>
                <Paragraph
                  style={[styles(colors).paragraph, styles(colors).caption]}
                >
                  三年級
                </Paragraph>
                <Caption style={styles(colors).caption}>成就段位</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles(colors).drawerSection}>
            <DrawerItem
              label="成長紀錄"
              icon={({ color, size }) => (
                <Icon name="chart-line" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("成長紀錄");
              }}
            />
            <DrawerItem
              label="生涯成就"
              icon={({ color, size }) => (
                <Icon name="crown-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("生涯成就");
              }}
            />
            <DrawerItem
              label="訓練紀錄"
              icon={({ color, size }) => (
                <Icon name="history" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("訓練紀錄");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="外觀設定">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles(colors).preference}>
                <Text>暗黑模式</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles(colors).bottomDrawerSection}>
        <DrawerItem
          label="登出"
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
      fontSize: 16,
      marginTop: 3,
      fontWeight: "bold",
    },
    caption: {
      fontSize: 14,
      lineHeight: 15,
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
      fontWeight: "bold",
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: "#f4f4f4",
      borderTopWidth: 1,
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
