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

  // Funkcja logowania
  async function signInWithEmail() {
    setLoading(true);
    router.replace('/home');
    setLoading(false);
  }

  // Funkcja rejestracji
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
      {/* Inputy do logowania/rejestracji */}
      <Input
        label="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        containerStyle={styles.inputContainer}
      />
      <Input
        label="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
        containerStyle={styles.inputContainer}
      />

      {/* Przycisk logowania */}
      <Button
        title="Sign In"
        buttonStyle={styles.button}
        disabled={loading}
        onPress={signInWithEmail}
      />
      
      {/* Przycisk rejestracji */}
      <Button
        title="Sign Up"
        buttonStyle={[styles.button, styles.signUpButton]}
        disabled={loading}
        onPress={signUpWithEmail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  inputContainer: {
    marginBottom: 15, // Odstęp między inputami
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '100%', // Szerokość przycisku na 100% kontenera
    marginVertical: 10, // Odstęp między przyciskami
    backgroundColor: '#011C40', // Kolor przycisku
    alignItems: 'center', // Wyrównanie tekstu w przycisku
  },
  signUpButton: {
    backgroundColor: '#4CAF50', // Zmiana koloru dla przycisku "Sign Up"
  },
});
