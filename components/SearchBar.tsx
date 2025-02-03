import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Fontisto from '@expo/vector-icons/Fontisto';
// SearchBar komponent
const SearchBar = () => {
  return (
    <View style={styles.searchInputContainer}>
      <Fontisto name="search" size={20} color="white" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search for events"
        placeholderTextColor="white"
      />
    </View>
  );
};

// Style dla SearchBar
const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row', // Ustawienie ikony i pola tekstowego obok siebie
    alignItems: 'center', // Wyrównanie ikonki i tekstu w pionie
    backgroundColor: "transparent", // Tło przezroczyste
    borderColor: "white", // Białe obramowanie
    borderWidth: 1.5, // Grubość obramowania
    width: "100%",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    
    elevation: 5, // Cień (Android)
    shadowColor: "#000", // Cień (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchBar: {
    flex: 1, // Zajmuje całą dostępną przestrzeń
    fontSize: 16,
    color: "white", // Kolor tekstu wewnątrz
    paddingLeft: 10, // Odstęp od ikony
  },
});

export default SearchBar;
