
import React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View ,Image,Pressable } from 'react-native';



 const Introduce2 = ({navigation,route}) => {

    const {colors}=useTheme();
  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).text}>Talkversity會幫您加強在各種情境的會話技巧，
給予您在說話上的建議</Text>
      
      <View style={styles(colors).containerTutor}>
      <Image
        style={styles(colors).image}
        source={route.params.index===0 ? require("../../images/tutor_score.png"):require("../../images/tutor_m_score.png")}
    />
      </View>
      <View style={styles(colors).submitArea}>
      <Pressable onPress={() => navigation.navigate('軟體介紹3',{index: route.params.index})} style={styles(colors).submit}>
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
    flex: 6,

    alignItems: 'center',
    justifyContent: 'center',
  },
  submit:{
    
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 50,
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
export default Introduce2;