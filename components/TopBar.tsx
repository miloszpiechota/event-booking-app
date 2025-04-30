// TopBar.tsx
import React, { useContext, useRef } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Animated } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, useFocusEffect } from "expo-router";
import { SelectedLocationContext } from "../context/SelectedLocationContext";

const { width } = Dimensions.get("window");

interface User {
  email?: string;
}

const TopBar = ({ user }: { user?: User }) => {
  // Jeśli masz również dane użytkownika i wydarzeń, możesz je przekazać jako props lub pobrać z innego kontekstu.
  // Dla uproszczenia przyjmujemy, że użytkownik nie jest zalogowany.
  
  const { selectedLocation } = useContext(SelectedLocationContext);

  // Utwórz animowaną wartość opacity
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      opacityAnim.setValue(0);
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, [opacityAnim, selectedLocation])
  );

  return (
    <View style={styles.container}>
      {/* Tekst powitalny */}
      <Text style={styles.title}>Welcome, {user?.email || "Guest"}!</Text>

      {/* Ikona lokalizacji oraz miasto */}
      <TouchableOpacity style={styles.locationContainer} onPress={() => router.push("/location")}>
        <FontAwesome6 name="location-dot" size={24} color="white" />
        <Animated.Text style={[styles.locationText, { opacity: opacityAnim }]}>
          {selectedLocation?.city_name || "Select city"}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between", // Rozdziela tekst i ikonę po dwóch stronach
    padding: 15, // Dodajemy trochę przestrzeni wewnętrznej
    backgroundColor: "#050915", // Kolor tła TopBar
    alignItems: "center", // Centrujemy elementy w pionie
    marginTop:40
  },
  title: {
    fontSize: Math.min(16, width * 0.04), // Rozmiar czcionki zależny od szerokości ekranu
    color: "white", // Kolor czcionki na biały
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row", // Ułożenie ikony obok tekstu
    alignItems: "center", // Wyrównanie ikonki i tekstu w pionie
  },
  locationText: {
    fontSize: Math.min(16, width * 0.04), // Rozmiar czcionki dla nazwy miasta
    color: "white", // Kolor czcionki na biały
    marginLeft: 5, // Margines między ikoną a tekstem
  },
});

export default TopBar;
