import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,Text,Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Grow from './Grow/Grow';
import Career from './Career/Career';
import Record from './Record/Record';
import {useRoute} from '@react-navigation/native';
const Stack = createStackNavigator();

 const Member = (props) => {
  const route = useRoute();
  const {colors}=useTheme();
    return (
      <View style={styles(colors).container}>
        <View style={styles(colors).titlebar}>
          <Text style={styles(colors).title}>個人專區</Text>
          <View style={styles(colors).navbar}>
          <Pressable onPress={() => props.navigation.navigate('成長分析')}><Text style={route.name==="成長分析"? styles(colors).navActive:styles(colors).nav}>成長分析</Text></Pressable>
          <Pressable onPress={() => props.navigation.navigate('生涯紀錄')}><Text style={route.name==="生涯紀錄"? styles(colors).navActive:styles(colors).nav}>生涯紀錄</Text></Pressable>
          <Pressable onPress={() => props.navigation.navigate('訓練紀錄')}><Text style={route.name==="訓練紀錄"? styles(colors).navActive:styles(colors).nav}>訓練紀錄</Text></Pressable>
          </View>
        </View>
    </View>
    );
}


const MemberRouter = ({navigation}) => {
  return (

      <Stack.Navigator initialRouteName="成長分析" headerMode="float" >
      <Stack.Screen name="成長分析" component={Grow} options={({ navigation }) => ({headerLeft:()=>null, headerTitleAlign:"center", headerStatusBarHeight:100, headerTitle:props=><Member {...props} navigation={navigation}/>})}/>
      <Stack.Screen name="生涯紀錄" component={Career} options={({ navigation }) => ({headerLeft:()=>null,headerTitleAlign:"center", headerStatusBarHeight:100, headerTitle:props=><Member {...props} navigation={navigation}/>})}/>
      <Stack.Screen name="訓練紀錄" component={Record} options={({ navigation }) => ({headerLeft:()=>null,headerTitleAlign:"center", headerStatusBarHeight:100, headerTitle:props=><Member {...props} navigation={navigation}/>})}/>
    </Stack.Navigator>
  );
}

const styles =(colors)=> StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.background.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlebar:{
    flex:1,
    backgroundColor:colors.background.paper,
    alignSelf:"stretch",
    alignItems: 'center',
    justifyContent: 'flex-end',

    paddingTop:10,
  },
  title:{
    marginBottom:10,
    fontSize:25,
    alignSelf:"flex-start",
    fontWeight:"bold",
    height:40,
  },
  navbar:{
    flexDirection:"row",
    alignSelf:"stretch",
    backgroundColor:colors.background.paper,
    height:50,
  },
  nav:{
    margin:15,
    marginBottom:5,
    color:colors.text.secondary,
    
  },
  navActive:{
    margin:15,
    fontWeight:"bold",
    color:colors.primary.main,
    borderBottomColor:colors.primary.main,
    borderBottomWidth:1,
  }
});
export default MemberRouter;