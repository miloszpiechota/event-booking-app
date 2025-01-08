
import {Text,View,StyleSheet} from 'react-native';
import Auth from '@/components/Auth';
export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <Auth/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});