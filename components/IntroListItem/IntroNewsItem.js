
import React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';



 const IntroListItem = (props) => {
    const {colors}=useTheme();
  return (
      <View style={styles(colors).container}>
          <View style={styles(colors).iconArea}>{props.icon}</View>
    <View style={styles(colors).list}>
        <Text style={styles(colors).listTitle}>{props.title}</Text>
        <Text style={styles(colors).listContent}>{props.content}</Text>
    </View>
    </View>
  );
}

const styles =(colors)=> StyleSheet.create({
 
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
  container:{
      flexDirection:"row",
  },
  iconArea:{
      backgroundColor:colors.primary.main,
      width:50,
      height:50,
      borderRadius:25,
      marginRight: 15,
      alignItems:"center",
      justifyContent:"center"
  }
});
export default IntroListItem;