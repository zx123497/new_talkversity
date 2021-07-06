import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import SelectTutor from '../Introduce/SelectTutor/SelectTutor'

 const Home = () => {
    const {colors}=useTheme(); 
    return (
        <SelectTutor/>
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