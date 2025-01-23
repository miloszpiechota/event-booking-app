import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { supabase } from '../superbase';
import { Button, Input } from '@rneui/themed';
import { useRouter } from 'expo-router';

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    if (data?.user?.email_confirmed_at) {
      router.replace('/home');
    } else {
      Alert.alert('Please check your inbox for email verification!');
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Input label="Email" leftIcon={{ type: 'font-awesome', name: 'envelope' }} onChangeText={setEmail} value={email} autoCapitalize="none" />
      <Input label="Password" leftIcon={{ type: 'font-awesome', name: 'lock' }} onChangeText={setPassword} value={password} secureTextEntry autoCapitalize="none" />
      <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
      <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },

    buttonContainer: { marginTop: 20 },
    button: { padding: 15, borderRadius: 10, width: 150, alignItems: 'center' },
    buttonText: { color: '#ffffff', fontSize: 18 },

});
