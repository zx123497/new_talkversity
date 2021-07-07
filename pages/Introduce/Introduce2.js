
import React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View ,Image,Pressable } from 'react-native';



 const Introduce2 = ({navigation}) => {

    const {colors}=useTheme();
  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).text}>Talkversity會幫您加強在各種情境的會話技巧，
給予您在說話上的建議</Text>
      
      <View style={styles(colors).containerTutor}>
      <Image
        style={styles(colors).image}
        source={require('../../images/tutor_score.png')}
    />
      </View>
      <Pressable onPress={() => navigation.navigate('軟體介紹3')} style={({ pressed }) => [
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
export default Introduce2;