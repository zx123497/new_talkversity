import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View ,Image,Pressable } from 'react-native';



 const Introduce = ({navigation}) => {

    const {colors}=useTheme();
  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).text}>初次見面~ 我們是Talkversity</Text>
      <View style={styles(colors).container}>
      <Image
        style={styles(colors).image}
        source={require('../../images/logo.png')}
    />
      </View>
      <View style={styles(colors).containerTutor}>
      <Image
        style={styles(colors).image}
        source={require('../../images/tutor.png')}
    />
      </View>
      <Pressable onPress={() => navigation.navigate('軟體介紹2')} style={({ pressed }) => [
          {
            
          },styles(colors).submit]}>
            <Text style={styles(colors).submitText}>下一步</Text>
            </Pressable>
    </View>
  );
}

const styles =(colors)=> StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor:colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:'#FFF',
    fontSize:25,
    fontWeight:"500",
    margin:30,
  },
  image:{
    flex: 1,
    resizeMode: 'contain',
  },
  containerLogo: {
    flex: 2,

    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTutor: {
    flex: 6,

    alignItems: 'center',
    justifyContent: 'center',
  },
  submit:{
    
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3
    
  },
  submitText:{
    color:"#FFF",
    fontSize:16,
  }
});
export default Introduce;