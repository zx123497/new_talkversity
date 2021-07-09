
import React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';



 const IntroListItem = (props) => {
    const {colors}=useTheme();
  return (
    <View style={styles(colors).list}>
        <Text style={styles(colors).listTitle}>{props.title}</Text>
        <Text style={styles(colors).listContent}>{props.content}</Text>
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
});
export default IntroListItem;