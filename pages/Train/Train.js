import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
 const Train = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Train</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'#FFF',
    backgroundColor: '#DBEB4D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:'#FFF',
    fontSize:40,
  }
});
export default Train;