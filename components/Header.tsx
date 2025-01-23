import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
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
  )
}

export default Header
const styles = StyleSheet.create({
    backgroundImage: {
      height: 250,
      resizeMode: "cover", 
      justifyContent: "center", 
      alignItems: "center",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject, 
      backgroundColor: 'rgba(0, 0.4, 0.4, 0.45)', 
    },
    textContainer: {
      padding: 10,
    },
    headerText: {
      fontSize: 33,          
      color: "white",       
      fontWeight: "400",      
      textAlign: "center",   
      letterSpacing: 1,       
    },
    
  });
  