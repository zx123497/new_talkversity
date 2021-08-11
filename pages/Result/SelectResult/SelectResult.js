import React from 'react';
import { Image, StyleSheet, Text, View, Pressable} from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import ResultListItem from '../../../components/TrainResult/ResultListItem';
import Dash from 'react-native-dash';

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
      <View style={styles(colors).content}>
        <View style={styles(colors).connectList}>
            <MaterialIcons name="check-circle" size={30} style={styles(colors).checkIcon} />
            <Dash style={{margin:2, width:1, height:30, flexDirection:'column'}} dashColor='#abd7d6'/>
            <MaterialIcons name="radio-button-checked" size={30} style={styles(colors).checkIcon} />
            <Dash style={{margin:2, width:1, height:60, flexDirection:'column'}} dashColor='#abd7d6'/>
            <MaterialCommunityIcons name="checkbox-blank-circle" size={25} style={styles(colors).loadIcon} />
            <Dash style={{margin:2, width:1, height:65, flexDirection:'column', opacity:0.5}} dashColor='#abd7d6'/>
            <MaterialCommunityIcons name="checkbox-blank-circle" size={25} style={styles(colors).loadIcon} />
            <Dash style={{margin:2, width:1, height:65, flexDirection:'column', opacity:0.5}} dashColor='#abd7d6'/>
            <MaterialCommunityIcons name="checkbox-blank-circle" size={25} style={styles(colors).loadIcon} />
        </View>
        <View style={styles(colors).selectResult}>
          <Pressable
            onPress={() => navigation.navigate('聲音分析')}
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
            onPress={() => navigation.navigate('聲音分析')}
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
  content:{
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
    // borderWidth:1,
  },
  connectList:{
    flex: 1,
    alignItems:'center',
    paddingTop: 2,
    // borderWidth:1,
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
    paddingRight: '1%',
    // borderWidth: 1,
  },
  buttonSelect:{
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 15,
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  selectText:{
    color:colors.paragraph.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonNext:{
    paddingBottom: '3%',
    color: colors.paragraph.secondary,
    fontSize: 30,
    fontWeight: '600',
  },
  checkIcon:{
    color: colors.primary.main,
  },
  loadIcon:{
    color: colors.primary.light,
    opacity:0.5,
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