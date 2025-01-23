import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button } from 'react-native';
import { supabase } from '../superbase';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) router.replace('/');
      else setUser(data.user);
    };

    checkUser();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/pl.jpg')} style={styles.image} />
      <Text style={styles.title}>Welcome, {user?.email}!</Text>
      <Text style={styles.subTitle}>This is the home screen.</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: Math.min(40, width * 0.1), textAlign: 'center', color: 'black', marginTop: 40 },
  subTitle: { fontSize: Math.min(18, width * 0.05), textAlign: 'center', color: '#7f8c8d', marginVertical: 20 },
  image: { width: 400, height: 200, resizeMode: 'contain', marginVertical: 20 },
});
