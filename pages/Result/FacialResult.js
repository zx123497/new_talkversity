import React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View ,Image,Pressable } from 'react-native';

const FacialResult = ({navigation}) => {
     
  const {colors}=useTheme();
  return (
    <View style={styles.center,styles(colors).container}>
      <View style={styles(colors).textArea}>
        <Text style={styles(colors).text}>評分結果</Text>
      </View>
    </View>
  );
}

const styles =(colors)=> StyleSheet.create({
  container: {
    flex: 1,
    color:'#FFF',
    backgroundColor: colors.background.paper,
    alignItems: 'center',
  },
  textArea:{
    width: '85%',
    flex:0.05,
    marginTop:30,
    marginBottom: '4%',
  },
  text:{
    paddingLeft: '3%',
    color:colors.text.primary,
    fontSize:30,
    fontWeight:'900',
  },
});
export default FacialResult;