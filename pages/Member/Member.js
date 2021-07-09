import React from 'react';
import Login from '../Login/Login';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

 const Member = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="登入" component={Login} />
      </Stack.Navigator>
    );
}

export default Member;