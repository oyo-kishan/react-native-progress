import * as React from 'react';
import { SafeAreaView,View,Text} from 'react-native';
import Progress from './components/Progress';


export default function App() {

  return (
    <SafeAreaView style={{flex : 1,justifyContent:'center',alignItems:"center"}}>
          <Progress
            percentage={60}
            width={200}
            height={200}
            strokeWidth={20}
            strokeColor="#27425c"
            strokeBackgroundColor="#b3cee8"
          />
    </SafeAreaView>
  );
}