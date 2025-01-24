import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import EventMap from '../../components/EventMap';
const EventDetails = () => {
  const router = useRouter();
  const { eventData } = useLocalSearchParams(); // Pobiera dane z URL

  if (!eventData) {
    return <Text>Event not found</Text>;
  }

  const event = JSON.parse(eventData as string); // Parsujemy event do obiektu

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image_url }} style={styles.image} />
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.title}>{event.event_category?.name}</Text> 

      <Text style={styles.description}>{event.short_description}</Text>
      <Text style={styles.description}>{event.long_description}</Text>

      <Text style={styles.info}>
        📅 {new Date(event.start_date).toLocaleDateString()} - {event.end_date ? new Date(event.end_date).toLocaleDateString() : 'None'}
      </Text>

      <Text style={styles.info}>
        📍 {event.location?.street_name} {event.location?.apartment_number}, 
        {event.location?.city_name} {event.location?.zip_code}, {event.location?.country_name}
      </Text>

<View style={styles.area}>
<Text >Seats number: {event.seats_number}</Text>
</View>
      

         {/* Mapka */}
      {event.location?.latitude && event.location?.longitude && (
        <EventMap location={{ latitude: event.location.latitude, longitude: event.location.longitude }} />
      )}

      <Button title="Book Ticket" onPress={() => router.back()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  }
});

export default EventDetails;
