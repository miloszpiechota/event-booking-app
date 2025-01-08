import { StyleSheet,Text, View } from 'react-native';
import Auth from '@/components/Auth';
import {Link} from "expo-router"

export default function TabOneScreen() {
  return (
   <View style={styles.container}>
         <Text>Hello World</Text>
         <Link href={"/auth"} style={styles.button}>
         Go to Login</Link>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:
  {fontSize:20,
    textDecorationLine:"underline",
    color:"#fff"
  }

});