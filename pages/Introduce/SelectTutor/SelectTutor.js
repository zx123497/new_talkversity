
import React from 'react';
import { Image, StyleSheet, Text, View ,Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import Swiper from 'react-native-swiper';
 const Home = ({navigation}) => {
    const {colors}=useTheme(); 
    return (
        <View style={styles(colors).container}>
            <View style={styles(colors).textArea}>
                <Text style={styles(colors).text}>選擇教練</Text>
            </View>  
            <View style={styles(colors).selectArea}>
                  <Swiper  
                    showsButtons={true}
                    showsPagination={false}
                    nextButton={<Text style={styles(colors).buttonText}>›</Text>}
                    prevButton={<Text style={styles(colors).buttonText}>‹</Text>}
                  >
                  <View style={styles(colors).wrapper} > 
                  <Image
                    style={styles(colors).image}
                    source={require('../../../images/tutor_w.png')}
                />
                </View> 
                <View style={styles(colors).wrapper} > 
                <Image
                    style={styles(colors).image}
                    source={require('../../../images/tutor_man_w.png')}
                />
                </View> 
                </Swiper>
                
            </View> 
            <Pressable onPress={() => navigation.navigate('軟體介紹')} style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? colors.primary.dark
              : colors.primary.main
          },styles(colors).submit]}>
            <Text style={styles(colors).submitText}>確認</Text>
            </Pressable>
        </View>
    );
}

const styles = colors => StyleSheet.create({  
  container: {
    flex:1,
    backgroundColor: colors.background.paper,
    alignItems: 'center',
    justifyContent:"center",
    padding:30,
  },
  textArea:{
      marginTop:10,
    flex:1,
  },
  selectArea:{
    flex:10,
    padding:20,
  },
  image:{
    flex: 1,
    
    resizeMode: 'contain',
    
  },
  
  text:{
    color:colors.text.primary,
    fontSize:30,
    fontWeight:"900",
  },
  wrapper:{
    flex:1,
    alignItems: 'center',
    justifyContent:"center",
  },
  buttonText:{
    color:colors.text.secondary,
    fontSize:60,
    fontWeight:"900",
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

export default Home;