import React from 'react';
import { Image, StyleSheet, Text, View, Pressable} from 'react-native';
import { useTheme } from 'react-native-paper';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import ResultListItem from '../../../components/TrainResult/ResultListItem';

const Train = ({navigation}) => {
  const {colors}=useTheme();
  return (
    <View style={styles.center,styles(colors).container}>
      <View style={styles(colors).wrapper}>
        <Image 
              source={require('../../../images/result_bg.png')}
              resizeMode='stretch'
              style={styles(colors).bgImage}
        />
        <Image 
              source={require('../../../images/tutor_w_orange.png')}
              resizeMode='contain'
              style={styles(colors).tutor}
        />
        <Text style={styles(colors).title}>評分結果</Text>
      </View>
      <View style={styles(colors).selectResult}>
        <Pressable
          onPress={() => navigation.navigate('選擇教練')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? colors.primary.light
                : colors.background.default
            },
            styles(colors).buttonSelect
          ]}>
          <Text style={styles(colors).selectText}>查看練習影片</Text>
          <Text style={styles(colors).buttonNext}>›</Text>
        </Pressable>
        <ResultListItem
            onPress={() => navigation.navigate("聲音分析")}
            title="聲音"
            icon={
              <MaterialIcons 
                name="record-voice-over"
                size={50}
                style={styles(colors).resultIcon}
              />
            }
        />
        <ResultListItem
            onPress={() => navigation.navigate("語意分析")}
            title="語意"
            icon={
              <MaterialIcons 
                name="text-fields"
                size={50}
                style={styles(colors).resultIcon}
              />
            }
        />
        <ResultListItem
            onPress={() => navigation.navigate("表情分析")}
            title="表情"
            icon={
              <MaterialIcons 
                name="face"
                size={50}
                style={styles(colors).resultIcon}
              />
            }
        />

        <Pressable
          onPress={() => navigation.navigate('選擇教練')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? colors.primary.light
                : colors.primary.main
            },
            styles(colors).buttonSelect
          ]}>
          <Text style={styles(colors).scoreText}>查看總分</Text>
          <Text style={styles(colors).scoreNext}>›</Text>
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
  wrapper:{
    width: '100%',
    height:'30%',
    marginBottom: '6%',
  },
  bgImage:{
    height: '100%',
    width: '100%',
  },
  tutor:{
    height: '80%',
    width: '80%',
    position: 'absolute',
    bottom: '-2%',
    left: '-15%',
  },
  title:{
    color:colors.background.paper,
    position: 'absolute',
    fontSize: 40,
    fontWeight: 'bold',
    right: '10%',
    top: '35%',
  },
  selectResult:{
    width: '85%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: '1%',
    // borderWidth: 3,
  },
  buttonSelect:{
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    borderRadius: 15,
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  selectText:{
    color:colors.text.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonNext:{
    paddingBottom: '3%',
    color: colors.text.secondary,
    fontSize: 30,
    fontWeight: '600',
  },
  resultIcon:{
    color: colors.primary.main,
    marginRight: '5%',
  },
  scoreText:{
    color:colors.background.paper,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreNext:{
    paddingBottom: '3%',
    color: colors.background.paper,
    fontSize: 30,
    fontWeight: '600',
  },
  buttonText:{
    marginLeft: '3%',
    color:"#FFF",
    fontSize:25,
    fontWeight: 'bold',
  },
  buttonReturn:{
    width: '85%',
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
  },

});
export default Train;