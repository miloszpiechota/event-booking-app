import React from 'react'
import { ScrollView, StyleSheet,View,Text } from 'react-native'

const TicketPayment = () => {
  return (
    <ScrollView>
      <View style={styles.text_area}>
        <Text>Witaj w ekranie płatności biletów</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({ 
  area: {
    padding: 15,
    borderRadius: 10,
    width: '100%', // Szerokość przycisku na 100% kontenera
    marginVertical: 10, // Odstęp między przyciskami
    backgroundColor: '#fff', // Kolor przycisku
    alignItems: 'center', // Wyrównanie tekstu w przycisku
    borderColor: 'black',
    borderWidth: 1,
    
  },
  text_area:{
    alignItems: 'center',
  }
 });

export default TicketPayment
