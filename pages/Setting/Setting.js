import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
 const Setting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Setting</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'#FFF',
    backgroundColor: '#A74DEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:'#FFF',
    fontSize:40,
  }
});
export default Setting;