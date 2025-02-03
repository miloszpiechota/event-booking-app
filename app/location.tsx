// Location.tsx
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { fetchLocations } from "../utils/fetchLocations.ts"; // Załóżmy, że masz funkcję fetchLocations
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar.tsx";
import { SelectedLocationContext, LocationType } from "../context/SelectedLocationContext.tsx";

const { width, height } = Dimensions.get("window");

export default function Location() {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const router = useRouter();
  const { setSelectedLocation } = useContext(SelectedLocationContext);

  useEffect(() => {
    const loadLocations = async () => {
      const locationsData = await fetchLocations(); // Pobranie danych lokalizacji
      setLocations(locationsData);
    };
    loadLocations();

    // Nasłuchiwanie na przycisk Back
    const backAction = () => {
      router.back(); // Powrót do poprzedniego ekranu
      return true; // Zatrzymuje domyślną akcję
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    // Clean up: usuwamy nasłuchiwanie po opuszczeniu ekranu
    return () => backHandler.remove();
  }, []);

  const onSelectLocation = (item: LocationType) => {
    setSelectedLocation(item); // Aktualizacja kontekstu
    router.back(); // Powrót do poprzedniego ekranu
  };

  // Funkcja renderująca każdy element listy
  const renderLocation = ({ item }: { item: LocationType }) => (
    <TouchableOpacity onPress={() => onSelectLocation(item)}>
      <View style={styles.locationItem}>
        <Text style={styles.locationText}>
          📍 {item.street_name} {item.apartment_number}, {item.city_name} {item.zip_code}, {item.country_name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your location:</Text>
      <SearchBar /> {/* Użycie komponentu SearchBar */}
      {locations.length === 0 ? (
        <Text>No locations found</Text>
      ) : (
        <FlatList
          data={locations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLocation}
          contentContainerStyle={styles.locationList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
  },
  title: {
    fontSize: Math.min(40, width * 0.1),
    textAlign: "center",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
  },
  locationList: {
    paddingHorizontal: 20,
    marginTop: 20,
    
    
  },
  locationItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    width: "100%",
  },
  locationText: {
    fontSize: 16,
    color: "#333",
  },
});
