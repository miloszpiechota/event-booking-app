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
    flexDirection: 'row', // Ikona i pole tekstowe obok siebie
    alignItems: 'center', // Wyrównanie pionowe
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1.5,
    width: "90%",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    
  },
  searchBar: {
    flex: 1, // Pole tekstowe zajmuje pozostałą przestrzeń w kontenerze
    fontSize: 16,
    color: "white",
    paddingLeft: 10,
  },
});

export default SearchBar;
