import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

 const Home = () => {
    const {colors}=useTheme(); 
    return (
        <View style={styles(colors).container}>
        <Text style={styles(colors).text}>Home</Text>
        <StatusBar style="auto" />
        </View>
    );
}

const styles = colors => StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:"#FFF",
    fontSize:40,
  }
});

export default Home;