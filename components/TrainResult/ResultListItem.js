import React from "react";
import { useTheme } from "react-native-paper";
import { View, StyleSheet, Text, Pressable } from "react-native";

const ResultListItem = (props) => {
  const { colors } = useTheme();
  return (
      <Pressable
          onPress={props.onPress}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? colors.primary.light
                : colors.background.default
            },
            styles(colors).buttonResult
          ]}>
          <View>{props.icon}</View>
          <Text style={styles(colors).resultText}>{props.title}</Text>
          <Text style={styles(colors).buttonNext}>›</Text>
        </Pressable>
  );
};

const styles = (colors) => StyleSheet.create({
    buttonResult: {
      marginBottom: '5%',
      flexDirection: 'row',
      alignItems: 'center',
      width: '85%',
      borderRadius: 15,
      paddingLeft: '8%',
      padding: '5%',
    },
    resultText:{
      color:colors.text.primary,
      fontSize: 25,
      fontWeight: 'bold',
      marginRight: '47%',
    },
    buttonNext:{
      paddingBottom: '3%',
      color: colors.text.secondary,
      fontSize: 30,
      fontWeight: '600',
    },
  });

export default ResultListItem;
