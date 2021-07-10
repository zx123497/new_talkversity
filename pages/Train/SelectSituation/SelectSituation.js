
import React from 'react';
import {Image, StyleSheet, Text, View,Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import SelectCard from '../../../components/SelectCard/SelectCard'
 const Setting = (props) => {
     const {colors}=useTheme();
  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).selectArea}>
                  <Swiper  
                    showsButtons={true}
                    // loop={false}
                    showsPagination={false}
                    nextButton={<Text style={styles(colors).buttonText}>›</Text>}
                    prevButton={<Text style={styles(colors).buttonText}>‹</Text>}
                  >
                  <View style={styles(colors).wrapper} > 
                 <SelectCard props={{...props}} />
                </View> 
                <View style={styles(colors).wrapper} > 
                <SelectCard navigation={() => navigation.navigate('評分結果')}/>
                </View> 
                </Swiper>
                
            </View> 
        <View style={styles(colors).infoArea}>
<Pressable onPress={()=>props.navigation.navigate('評分結果')} style={({ pressed }) => [
          {
            
          },styles(colors).submit]}>
            <Text style={styles(colors).submitText}>評分結果</Text>
            </Pressable>
            <Text style={styles(colors).text}>訓練紀錄</Text>
                <View style={styles(colors).infoCard}>
                    <View></View>
                    <View></View>
                    
                </View>
        </View>
    </View>
  );
}

const styles =(colors)=> StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:colors.text.primary,
    fontSize:25,
    margin:10,
  },
  wrapper:{
    flex:1,
    alignItems: 'center',
    justifyContent:"center",
    alignSelf:"stretch",
    // backgroundColor:colors.orange.main,
  },
  buttonText:{
    color:colors.background.paper,
    fontSize:60,
    fontWeight:"600",
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
  card:{
      backgroundColor:colors.orange.main,
      alignSelf:"stretch",
      alignItems: 'center',
    justifyContent: 'center',
  },
  card2:{
    backgroundColor:colors.red.main,
    alignSelf:"stretch",
    alignItems: 'center',
    justifyContent: 'center',
},
infoArea:{
    flex:1,
    alignSelf:"stretch",
},
selectArea:{
    flex:1
},
infoCard:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.background.paper,
    alignSelf:"stretch",
    margin:10,
    borderRadius:20,
}
});



export default Setting;