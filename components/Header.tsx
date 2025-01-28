import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import SearchBar from './SearchBar';  // Importowanie SearchBar

// Pobranie szerokości ekranu
const { width } = Dimensions.get('window');

const Header = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/backgroundImage.jpg")}
      >
        {/* Overlay dla lepszej czytelności */}
        <View style={styles.overlay} />

        {/* Tekst na obrazie */}
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Explore events near You!</Text>
        </View>

        {/* Search Bar na dole ImageBackground */}
        <View style={styles.searchBarContainer}>
          <SearchBar />  {/* Użycie komponentu SearchBar */}
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
    bottom: 10, // Wystaje poza obrazek
    width: "95%", // Szerokość paska wyszukiwania
    alignItems: "center",
  },
});
