import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';

interface User {
  email?: string;
}

interface TopBarProps {
  user: User | null;  // Użytkownik może być null
  events: any[];      // Lista wydarzeń
  locations: any[];   // Lista lokalizacji
}

const { width } = Dimensions.get('window');


const TopBar = ({ user, events, locations }: TopBarProps) => {
  return (
    <View style={styles.container}>
      {/* Text powitalny */}
      <Text style={styles.title}>
        Welcome, {user?.email || 'Guest'}!
      </Text>

      {/* Ikona lokalizacji oraz miasto */}
      <TouchableOpacity style={styles.locationContainer}
      onPress={() => router.push("/location")}>
        <FontAwesome6 name="location-dot" size={24} color="white" />
        <Text style={styles.locationText}>
          {locations[0]?.city_name || 'Select city'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',  // Rozdziel tekst i ikonę po dwóch stronach
    padding: 15,                      // Dodajemy trochę przestrzeni wewnętrznej
    backgroundColor: '#050915',       // Kolor tła TopBar
    alignItems: 'center',             // Centrujemy elementy w pionie
  },
  title: {
    fontSize: Math.min(16, width * 0.04), // Rozmiar czcionki zależny od szerokości ekranu
    color: 'white',                      // Kolor czcionki na biały
                     // Pogrubiona czcionka
  },
  locationContainer: {
    flexDirection: 'row',                // Ułożenie ikony obok tekstu
    alignItems: 'center',                // Wyrównanie ikonki i tekstu w pionie
  },
  locationText: {
    fontSize: Math.min(16, width * 0.04), // Rozmiar czcionki dla nazwy miasta
    color: 'white',                      // Kolor czcionki na biały
    marginLeft: 5,                       // Margines między ikoną a tekstem
  },
});

export default TopBar;
