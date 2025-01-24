import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface Event {
  image_url?: string;
  name: string;
  short_description: string;
  start_date: string;
  location?: {
    city_name: string;
  };
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <View style={styles.card}>
      {/* Obrazek */}
      {event.image_url && <Image source={{ uri: event.image_url }} style={styles.image} />}
      
      {/* Treść wydarzenia */}
      <Text style={styles.name}>{event.name ?? 'None'}</Text>
      <Text style={styles.description}>{event.short_description ?? 'None'}</Text>
      <Text style={styles.description}>{event.location?.city_name ??'None'}</Text>
      <Text style={styles.date}>{new Date(event.start_date).toLocaleDateString() ?? 'None'}</Text>
      
      {/* Zawartość w jednej linii: ikona korony i przycisk */}
      
       
        <Button title="Show Details" color="black" />
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Efekt cienia na Androidzie
    width: '93%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    flexDirection: 'row', // Ustawienie elementów w jednej linii
    justifyContent: 'space-between', // Rozłożenie na całą szerokość
    alignItems: 'center', // Wyrównanie elementów w pionie
    marginTop: 10,
  },
});

export default EventCard;
