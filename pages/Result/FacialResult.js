import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const FacialResult = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={(styles.center, styles(colors).container)}>
      <View style={styles(colors).textArea}>
        <Pressable
          onPress={() => navigation.navigate("評分結果")}
          style={styles(colors).returnButton}
        >
          {({ pressed }) => (
            <MaterialIcons
              name="arrow-back-ios"
              size={35}
              color={
                pressed ? colors.paragraph.secondary : colors.paragraph.primary
              }
            />
          )}
        </Pressable>
        <Text style={styles(colors).text}>評分結果</Text>
        <Text style={styles(colors).scoreArea}>B</Text>
      </View>
      <ScrollView style={styles(colors).resultWrapper}>
        <Text style={styles(colors).resultText}>臉部分析</Text>
        <View style={styles(colors).resultTop}>
          <View style={styles(colors).resultCard}>
          <Text style={styles(colors).resultText}>字數</Text>
        </View>
        </View>
        
      </ScrollView>
    </View>
  );
};

const styles =(colors)=> StyleSheet.create({
  container: {
    flex: 1,
    color: "#FFF",
    backgroundColor: colors.background.default,
    // alignItems: "center",
  },
  textArea: {
    marginTop: 30,
    marginBottom: "8%",
    paddingLeft: "10%",
    // borderWidth: 2,
  },
  scoreArea:{
    fontSize:100,
    fontWeight: 'bold',
    color: colors.primary.dark,
    position:'absolute',
    alignSelf: 'flex-end',
    bottom:-20,
    paddingRight: '20%',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', 
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 10, 
  },
  returnButton: {
    marginTop: "10%",
    marginBottom: "5%",
  },
  text: {
    color: colors.paragraph.primary,
    fontSize: 30,
    fontWeight: "bold",
  },
  resultWrapper:{
    flex:1,
    backgroundColor: colors.background.paper,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 20,
  },
  resultText:{
    color: colors.paragraph.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '10%',
    marginLeft: '15%',
  },
  resultTop:{
    width: '80%',
    borderWidth: 2,
    alignSelf: 'center',
  },
  resultCard:{
    width: '45%',
    backgroundColor: colors.background.paper,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 20,
  }
});
export default FacialResult;
