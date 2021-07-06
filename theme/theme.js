
import { DefaultTheme} from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    myOwnProperty: true,
    colors: {
        ...DefaultTheme.colors,
        primary: {main:'#79CAC3',dark:'#6faab0',light:'#abd7d6'},
        text: {primary:'#5d5d5d',secondary:'#9d9d9d'},
        orange: {main:'#e68614',light:'#efcea7'},
        red: {main:'#ed2816',light:'#fc9595'},
        background: {default:'#f1f5f4',paper:'#ffffff'}
    },
    
    
  };
  
export default theme;