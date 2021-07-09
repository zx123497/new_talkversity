import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View ,Image,Pressable } from 'react-native';



 const Introduce = ({navigation,route}) => {

    const {colors}=useTheme();

  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).text}>初次見面~ 我們是Talkversity</Text>
      {/* <View style={styles(colors).container}>
      <Image
        style={styles(colors).image}
        source={require('../../images/logo.png')}
    />
      </View> */}
      <View style={styles(colors).containerTutor}>
      <Image
        style={styles(colors).image}
        source={route.params.index===1 ? require("../../images/tutor_m_logo.png"):require("../../images/tutor.png")}
    />
      </View>
      <View style={styles(colors).submitArea}>
      <Pressable onPress={() => navigation.navigate('軟體介紹2',{index: route.params.index})} style={styles(colors).submit}>
            <Text style={styles(colors).submitText}>下一步</Text>
        </Pressable>
      </View>
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
    margin:50,
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
    flex: 5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  submit:{
    
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
 
    
    
  },
  submitText:{
    color:"#FFF",
    fontSize:20,
  },
  submitArea:{
    alignItems:"flex-end",
    alignSelf: 'stretch',
    padding:10,
    
  }
});
export default Introduce;