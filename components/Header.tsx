import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import SearchBar from './SearchBar.tsx';  // Importowanie SearchBar
import FilterIcon from './FilterIcon.tsx';
// Pobranie szerokości ekranu
const { width } = Dimensions.get('window');
interface HeaderProps {
  searchQuery: string;
  onSearch: (text: string) => void;
}
const Header = ({ searchQuery, onSearch }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/background3.webp")}
      >
        {/* Overlay dla lepszej czytelności */}
        <View style={styles.overlay} />

        {/* Tekst na obrazie */}
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Explore events near You!</Text>
        </View>

        {/* Search Bar na dole ImageBackground */}
         {/* Kontener dla SearchBar oraz FilterIcon */}
         <View style={styles.searchBarContainer}>
         <SearchBar value={searchQuery} onChangeText={onSearch} />
          <FilterIcon />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: width, // Pełna szerokość ekranu
  },
  backgroundImage: {
    width: width,
    height: 190,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
  },
  textContainer: {
    padding: 10,
    marginBottom: 50,
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 1,
  },
  searchBarContainer: {
    position: "absolute",
    bottom: 10, // Pasek wyszukiwania wystaje poza obrazek
    width: "95%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBarWrapper: {
    width: "85%", // SearchBar zajmie 85% szerokości kontenera
  },
  filterIconWrapper: {
    width: "15%", // FilterIcon zajmie pozostałe 15%
    alignItems: 'center',
  },
});
