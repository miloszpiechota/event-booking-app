import { useLocalSearchParams } from 'expo-router';
import React from 'react'
import { ScrollView, StyleSheet,View,Text,Image } from 'react-native'

const TicketPayment = () => {
  const { eventData } = useLocalSearchParams();
  if (!eventData) {
      return <Text>Event not found</Text>;
    }
    const event = JSON.parse(eventData as string);
  return (
    <ScrollView style={styles.container}>
      
        

        <View style={styles.info_container}>
        <Text style={styles.title}>Ticket: {event.name}</Text>
        <Text style={styles.info}>Category: {event.event_category?.name}</Text>
        <Text style={styles.info}>
  Start date: {new Date(event.start_date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Ustawienie 24-godzinnego formatu
  })}
</Text>
<Text style={styles.info}>
  Valid until: {new Date(event.end_date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Ustawienie 24-godzinnego formatu
  })}
</Text>
        </View>

        
              
        
              <Text style={styles.info}>
                📅 {new Date(event.start_date).toLocaleDateString()} - {event.end_date ? new Date(event.end_date).toLocaleDateString() : 'None'}
              </Text>
        
              <Text style={styles.info}>
                📍 {event.location?.street_name} {event.location?.apartment_number}, 
                {event.location?.city_name} {event.location?.zip_code}, {event.location?.country_name}
              </Text>
              
              <View style={styles.area}>
              
              </View>
              
 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  info_container: {
    width: '100%', // Pełna szerokość
    padding: 15,
    marginVertical: 10, // Dodaje odstęp
    backgroundColor: '#f9f9f9', // Jasnoszare tło dla lepszej widoczności
    borderRadius: 10, // Zaokrąglone rogi
    shadowColor: '#000', // Cień dla efektu 3D
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Cień dla Androida
    alignItems: 'center', // Wyrównanie tekstu do środka
    borderWidth: 1,
    borderColor: '#ddd',
  },
  
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
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
  },
  ratingContainer: {
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },

   
   
  
});

export default TicketPayment
