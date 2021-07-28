import React from "react";
import { useTheme } from "react-native-paper";
import { Pressable, Image, StyleSheet, Text, View, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import axios from "axios";
import { Buffer } from "buffer";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../../components/context/context";
const Member = ({ navigation }) => {
  const { signIn, load } = React.useContext(AuthContext);

  var username = "mis_admin";
  var password = "ej03xu3m065;4cl4";
  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );

  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user, accessToken } = await Google.logInAsync({
        iosClientId: `969636168353-uuu3n6fu1t2j7q02fkdvvib4bindthbt.apps.googleusercontent.com`,
        androidClientId: `969636168353-f18olkamqlbulmapg90e5fldpfotknpf.apps.googleusercontent.com`,
      });

      if (type === "success") {
        load();
        console.log("getting userData");

        axios
          .post(
            "https://talkversity.herokuapp.com/users/",
            {
              access_token: accessToken,
            },
            {
              headers: {
                Authorization: `Basic ${token}`,
              },
            }
          )
          .then(function (response) {
            console.log(response.data);
            // navigation.navigate("選擇教練");
            console.log("signIn");
            signIn(
              response.data.name,
              accessToken,
              response.data.email,
              response.data.picture
            );
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  const { colors } = useTheme();
  return (
    <View style={(styles.center, styles(colors).container)}>
      <LinearGradient
        colors={[colors.primary.main, colors.background.paper]}
        style={styles(colors).background}
      >
        <Image
          source={require("../../images/logo_2.png")}
          resizeMode="contain"
          style={styles(colors).logo}
        />
      </LinearGradient>

      <View style={(styles.center, styles(colors).wrapper)}>
        <Text style={styles(colors).title}>Hello!</Text>
        <Text style={styles(colors).subTitle}>歡迎使用Talkversity</Text>
        <Text style={styles(colors).loginText}>請登入您的帳號</Text>
        <Pressable
          onPress={signInAsync}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? colors.primary.dark
                : colors.primary.main,
            },
            styles(colors).buttonLogin,
          ]}
        >
          <AntDesign name="google" size={25} color="white" />
          <Text style={styles(colors).buttonText}>Google 登入</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Stack = createStackNavigator();
const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="登入"
      headerMode="none"
      headerShown={false}
    >
      <Stack.Screen name="登入" component={Member} />
    </Stack.Navigator>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
    },
    background: {
      height: "50%",
      opacity: 0.8,
    },
    logo: {
      height: "120%",
      width: "120%",
      position: "absolute",
      left: "20%",
      top: "-25%",
      opacity: 0.8,
    },
    wrapper: {
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      textAlign: "center",
      color: colors.paragraph.primary,
      fontSize: 70,
      fontWeight: "bold",
    },
    subTitle: {
      textAlign: "center",
      color: colors.paragraph.primary,
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: "15%",
    },
    loginText: {
      textAlign: "center",
      color: colors.paragraph.primary,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: "5%",
    },
    buttonLogin: {
      width: "65%",
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "center",
      textAlign: "center",
      padding: 15,
    },
    buttonText: {
      marginLeft: "5%",
      color: colors.background.paper,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default LoginStack;
