
import React from 'react';
import Introduce from '../Introduce/Introduce';
import Introduce2 from '../Introduce/Introduce2';
import Introduce3 from '../Introduce/Introduce3';
import SelectTutor from '../Introduce/SelectTutor/SelectTutor'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

 const Home = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="選擇教練" component={SelectTutor} />
        <Stack.Screen name="軟體介紹" component={Introduce} />
        <Stack.Screen name="軟體介紹2" component={Introduce2} />
        <Stack.Screen name="軟體介紹3" component={Introduce3} />
      </Stack.Navigator>
    );
}



export default Home;