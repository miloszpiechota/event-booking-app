import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TextInput } from 'react-native';

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
          <TextInput
            style={styles.searchBar}
            placeholder="Search for events"
            placeholderTextColor="white"
          />
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
  searchBar: {
    backgroundColor: "transparent", // Delikatne tło dla lepszej czytelności
    borderColor: "white", // Białe obramowanie
    borderWidth: 1.5, // Grubość obramowania
    width: "100%",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "white", // Tekst wewnątrz SearchBar również biały
    elevation: 5, // Cień (Android)
    shadowColor: "#000", // Cień (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
