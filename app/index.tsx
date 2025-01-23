import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/pl.jpg")} style={styles.bannerImage} />
      <Text style={styles.title}>Event Booking App</Text>
      <Text style={styles.subTitle}>
        Event Booking App to idealne narzędzie dla wszystkich, którzy chcą być na bieżąco z lokalnymi wydarzeniami.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#011C40' }]} onPress={() => router.push('/auth')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: "center", justifyContent: "center" },
  bannerImage: { height: 120, width: 350, marginVertical: 20 },
  title: { fontSize: Math.min(40, width * 0.1), textAlign: "center", color: 'black', marginTop: 40 },
  subTitle: { fontSize: Math.min(18, width * 0.05), textAlign: "center", color: '#7f8c8d', marginVertical: 20 },
  buttonContainer: { marginTop: 20 },
  button: { padding: 15, borderRadius: 10, width: 150, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 18 },
});
