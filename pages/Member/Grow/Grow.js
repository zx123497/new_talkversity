import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
 const Setting = () => {
     const {colors}=useTheme();
  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).text}>Grow</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles =(colors)=> StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:colors.text.secondary,
    fontSize:40,
  }
});
export default Setting;