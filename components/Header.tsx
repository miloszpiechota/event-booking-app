import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';

// Pobranie szerokości ekranu
const { width } = Dimensions.get('window');

const Header = () => {
  return (
    <View style={{ marginBottom: 10 }}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/backgroundImage.jpg")}
      >
        <View style={styles.overlay} />

        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Explore Events Near You!</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  backgroundImage: {
    width: width, // Pełna szerokość ekranu
    height: 180, 
    resizeMode: "cover", // Obraz wypełni przestrzeń, zachowując proporcje
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.58)', // Ciemniejszy overlay dla lepszej czytelności
  },
  textContainer: {
    padding: 10,
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 1,
  },
});
