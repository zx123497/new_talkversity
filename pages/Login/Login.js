import React from 'react';
import { useTheme } from 'react-native-paper';
import { Pressable, Image, StyleSheet, Text, View, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';  
import { AntDesign } from '@expo/vector-icons'; 

const Member = ({ navigation }) => {

    const {colors}=useTheme();
    const responseGoogle = (response) => {
      console.log(response)
    };
    return (
      <View style={styles.center,styles(colors).container}>
        <LinearGradient colors={[colors.primary.main, colors.background.paper]} style={styles(colors).background}>
          <Image 
            source={require('../../images/logo_2.png')}
            resizeMode='contain'
            style={styles(colors).logo}
          />    
        </LinearGradient>
        
        <View style={styles.center,styles(colors).wrapper}>
          <Text style={styles(colors).title}>Hello!</Text>
          <Text style={styles(colors).subTitle}>歡迎使用Talkversity</Text>
          <Text style={styles(colors).loginText}>請登入您的帳號</Text>
          <Pressable
          onPress={() => navigation.navigate('選擇教練')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? colors.primary.dark
                : colors.primary.main
            },styles(colors).buttonLogin]}
        >
          <AntDesign name="google" size={25} color="white" />
          <Text style={styles(colors).buttonText}>Google 登入</Text>
        </Pressable>
        </View>
      </View>
    );
  };
  
  const styles = colors => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
    },
    background: {
      height: '50%',
      opacity: 0.8,
    },
    logo: {
      height: '120%',
      width: '120%',
      position: 'absolute',
      left: '20%',
      top: '-25%',
      opacity: 0.8,
    },
    wrapper:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
      textAlign:'center',
      color:colors.text.primary,
      fontSize:70,
      fontWeight:'bold',
    },
    subTitle:{
      textAlign:'center',
      color:colors.text.primary,
      fontSize:25,
      fontWeight:'bold',
      marginBottom:'15%',
    },
    loginText:{
      textAlign:'center',
      color:colors.text.primary,
      fontSize:20,
      fontWeight:'bold',
      marginBottom:'5%',
    },
    buttonLogin:{
      width: '65%',
      backgroundColor: colors.primary.main,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 15,
    },
    buttonText:{
      marginLeft: '5%',
      color: colors.background.paper,
      fontSize: 20,
      fontWeight:'bold',
      textAlign: 'center',
    }
});

export default Member;
  
