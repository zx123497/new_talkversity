
import React from 'react';
import Grow from './Grow/Grow';
import Career from './Career/Career';
import Record from './Record/Record';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

 const MemberRouter = () => {
    return (

        <Stack.Navigator initialRouteName="成長分析" >
        <Stack.Screen name="成長分析" component={Grow} />
        <Stack.Screen name="生涯紀錄" component={Career} />
        <Stack.Screen name="訓練紀錄" component={Record} />
      </Stack.Navigator>
    );
}



export default MemberRouter;