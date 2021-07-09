import React from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, Pressable} from 'react-native';
import { useTheme } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';


const Train = ({navigation}) => {
  const {colors}=useTheme();
  return (
    <View style={styles.center,styles(colors).container}>
      <View style={styles(colors).textArea}>
        <Text style={styles(colors).text}>評分結果</Text>
      </View>
      <View style={styles(colors).wrapper}>
          <ImageBackground 
            source={require('../../../images/tutor_train.png')}
            resizeMode='contain'
            style={styles(colors).type}
          >
            <Text style={styles(colors).typeText}>面試</Text>
          </ImageBackground>
      </View>
      <View style={styles(colors).selectResult}>
        <View style={styles(colors).scoreContainer}>
          <Text style={styles(colors).scoreText}>A+</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('表情分析')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? colors.primary.main
                : colors.background.default
            },styles(colors).resultButton]}
        >
          <MaterialIcons name="face" size={75} style={styles(colors).resultButtonIcon} />
          <Text style={styles(colors).resultButtonText}>表情</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('語意分析')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? colors.primary.main
                : colors.background.default              
            },styles(colors).resultButton]}
        >
          <MaterialIcons name="text-fields" size={75} style={styles(colors).resultButtonIcon} />
          <Text style={styles(colors).resultButtonText}>語意</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('聲音分析')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? colors.primary.main
                : colors.background.default
            },styles(colors).resultButton]}
        >
          <MaterialIcons name="record-voice-over" size={75} style={styles(colors).resultButtonIcon} />
          <Text style={styles(colors).resultButtonText}>聲音</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => navigation.navigate('選擇教練')}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? colors.primary.dark
              : colors.primary.main
          },styles(colors).buttonReturn]}
      >
        <AntDesign name="play" size={24} color="white" />
        <Text style={styles(colors).buttonText}>返回主頁</Text>
      </Pressable>
    </View>
  );
}

const styles = colors => StyleSheet.create({
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
  wrapper:{
    width: '85%',
    backgroundColor: '#81BFBA',
    borderRadius: 25,
    flex:0.3,
    alignItems: 'center',
    marginBottom: 30,
  },
  type:{
    width: '100%',
    height: '100%',
  },
  typeText:{
    color: '#F1F5F4',
    fontSize: 35,
    paddingLeft: '15%',
    paddingTop: '15%',
  },
  selectResult:{
    width: '85%',
    flex:0.6,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  scoreContainer:{
    width: '40%',
    height: '45%',
    backgroundColor: colors.primary.main,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  resultButton:{
    width: '40%',
    height: '45%',
    backgroundColor: colors.background.default,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  resultButtonText:{
    fontSize: 25,
    color: colors.text.primary,
  },
  resultButtonIcon:{
    color: colors.primary.main,
    marginBottom: '5%',
  },
  scoreText:{
    fontSize: 65,
    fontWeight: '900',
    color: '#FFF',
  },
  buttonReturn:{
    width: '85%',
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
  },
  buttonText:{
    marginLeft: '3%',
    color:"#FFF",
    fontSize:25,
  },

});
export default Train;