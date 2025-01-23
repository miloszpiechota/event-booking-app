import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface Event {
  image_url?: string;
  name: string;
  short_description: string;
  start_date: string;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <View style={styles.card}>
      {event.image_url && <Image source={{ uri: event.image_url }} style={styles.image} />}
      <Text style={styles.name}>{event.name?? 'None'}</Text>
      <Text style={styles.description}>{event.short_description?? 'None'}</Text>
      <Text style={styles.date}>{new Date(event.start_date).toLocaleDateString() ?? 'None'}</Text>
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
    width: '90%',
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
});

export default EventCard;
