import React from 'react';
import FacialResult from '../Result/FacialResult';
import TextResult from '../Result/TextResult';
import VoiceResult from '../Result/VoiceResult';
import SelectResult from '../Result/SelectResult/SelectResult'
import SelectSituation from './SelectSituation/SelectSituation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

 const Train = () => {
    return (
      <Stack.Navigator initialRouteName="選擇情境">
        <Stack.Screen name="選擇情境" component={SelectSituation} />
        <Stack.Screen name="評分結果" component={SelectResult} />
        <Stack.Screen name="表情分析" component={FacialResult} />
        <Stack.Screen name="語意分析" component={TextResult} />
        <Stack.Screen name="聲音分析" component={VoiceResult} />
      </Stack.Navigator>
    );
}



export default Train;