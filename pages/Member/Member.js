import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
 const Member = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Member</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'#FFF',
    backgroundColor: '#FA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:'#FFF',
    fontSize:40,
  }
});
export default Member;