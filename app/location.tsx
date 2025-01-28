import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import { fetchLocations } from '@/utils/fetchLocations';  // Załóżmy, że masz funkcję fetchLocations
import { useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar';

const { width, height } = Dimensions.get('window');  // Pobieramy wymiary ekranu

export default function Location() {
  const [locations, setLocations] = useState<any[]>([]);  // Stan przechowujący dane lokalizacji
  const router = useRouter();

  useEffect(() => {
    const loadLocations = async () => {
      const locationsData = await fetchLocations();  // Pobranie danych lokalizacji
      setLocations(locationsData);
    }
    loadLocations();
  }, []);  // useEffect uruchamiany raz po załadowaniu komponentu

  // Funkcja renderująca każdy element w FlatList
  const renderLocation = ({ item }: { item: any }) => (
    <View style={styles.locationItem}>
      <Text style={styles.locationText}>
        📍 {item.street_name} {item.apartment_number}, {item.city_name} {item.zip_code}, {item.country_name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your location:</Text>
      <SearchBar />  {/* Użycie komponentu SearchBar */}
      

      <FlatList
        data={locations}
        keyExtractor={(item, index) => index.toString()}  // Klucz do każdego elementu
        renderItem={renderLocation}  // Funkcja renderująca elementy
        contentContainerStyle={styles.locationList}
      />

      <Text style={styles.title}>Event Booking App</Text>
      <Text style={styles.subTitle}>
        Event Booking App to idealne narzędzie dla wszystkich, którzy chcą być na bieżąco z lokalnymi wydarzeniami.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    alignItems: "center", 
    justifyContent: "center" 
  },
  title: { 
    fontSize: Math.min(40, width * 0.1), 
    textAlign: "center", 
    color: 'black', 
    marginTop: 40 
  },
  subTitle: { 
    fontSize: Math.min(18, width * 0.05), 
    textAlign: "center", 
    color: '#7f8c8d', 
    marginVertical: 20 
  },
  locationList: { 
    paddingHorizontal: 20, 
    marginTop: 20, 
    height: height * 0.15,  // Zmieniamy wysokość na 1/3 wysokości ekranu
  },
  locationItem: { 
    marginBottom: 15, 
    padding: 10, 
    backgroundColor: '#f1f1f1', 
    borderRadius: 8, 
    width: '100%' 
  },
  locationText: { 
    fontSize: 16, 
    color: '#333' 
  },
});
