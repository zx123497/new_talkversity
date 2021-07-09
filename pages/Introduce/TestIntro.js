
import React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View ,Image,Pressable } from 'react-native';
import IntroListItem from '../../components/IntroListItem/IntroNewsItem';


 const TestIntro = ({navigation,route}) => {

    const {colors}=useTheme();
  return (
    <View style={styles(colors).container}>
      
      
      <View style={styles(colors).containerTutor}>
      <Image
        style={styles(colors).image}
        source={route.params.index===0 ? require("../../images/tutor_orange.png"):require("../../images/tutor_m_orange.png")}
    />
      </View>
      <View  style={styles(colors).introArea}>
        
        <Text style={styles(colors).introTitle}>接下來，我將會記錄您的說話習慣，作為訓練判斷的基準，我們將會記錄：</Text>
        <View style={styles(colors).listArea}>

        <IntroListItem title="表情" content="您的眉毛、眼睛等臉部活動特徵"/>
        <IntroListItem title="語意" content="您的說話內容。"/>
        <IntroListItem title="聲音" content="說話的頻率、起伏、快慢等特徵"/>
    
        
        </View>
        
      </View>
      <View style={styles(colors).submitArea}>
      <Pressable onPress={() => navigation.navigate('軟體介紹',{index: route.params.index})} style={({ pressed }) => [
          {
            
          },styles(colors).submit]}>
            <Text style={styles(colors).submitText}>開始前測</Text>
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
    justifyContent: 'flex-end',
  },
  submit:{
    
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 10,
    elevation: 3,
    backgroundColor:colors.primary.main,
    
  },
  submitText:{
    color:"#FFF",
    fontSize:20,
    
  },
  submitArea:{
    backgroundColor:colors.background.paper,
    alignItems:"center",
    alignSelf: 'stretch',
    padding:10,
    
  },
  introArea:{
    flex:12,
    backgroundColor:colors.background.paper,
    alignSelf:"stretch",
    alignItems: 'center',
    justifyContent: 'center',
  },
  introTitle:{
      fontSize:20,
      fontWeight:"600",
      color:colors.text.primary,
      marginBottom:50,
      marginTop:50,
      marginLeft:10,
      marginRight:10,
  },
  listTitle:{
    
    fontSize:20,
    fontWeight:"600",
    color:colors.text.primary,
    marginBottom:5
  },
  listContent:{
    fontSize:16,
    fontWeight:"600",
    color:colors.text.secondary,
  },
  list:{
    marginBottom:50
  },
  listArea:{
      alignItems:"flex-start",
  }
      
  
});
export default TestIntro;