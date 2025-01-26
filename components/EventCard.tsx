import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';
interface Event {
  image_url?: string;
  name: string;
  short_description: string;
  start_date: string;
  end_date: string;
  location?: {
    city_name: string;
    country_name?: string;
    street_name?: string;
    apartment_number?: string;
    zip_code?: string;
  };
  event_category?: {
    name: string;
  };
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    console.log(event);

  const router = useRouter();
  return (
    <View style={styles.card}>
      {/* Obrazek */}
      {event.image_url && <Image source={{ uri: event.image_url }} style={styles.image} />}
      
      {/* Treść wydarzenia */}
      <Text style={styles.name}>{event.name ?? 'None'}</Text>
      <Text style={styles.name}>{event.event_category?.name}</Text>
      

      <Text style={styles.description}>{event.short_description ?? 'None'}</Text>

      {/* Kontenery obok siebie */}
      <View style={styles.infoContainer}>
        
        <Text  >
                📅 {new Date(event.start_date).toLocaleDateString()} - {event.end_date ? new Date(event.end_date).toLocaleDateString() : 'None'}
              </Text>
        
              <Text >
                📍 {event.location?.street_name} {event.location?.apartment_number}, 
                {event.location?.city_name} {event.location?.zip_code}, {event.location?.country_name}
              </Text>

      </View>

      {/* Przycisk */}
      <View style={styles.area}>
      <Button
     
        title="Show Details" 
        color="black" 
        onPress={() => router.push({ pathname: `/event/${event.id}`, params: { eventData: JSON.stringify(event) } })}

      />
      </View>
      
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
    elevation: 3,
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
  infoContainer: {
    flexDirection: 'column',  // Ustawienie lokalizacji i daty obok siebie
    justifyContent: 'space-between', // Rozłożenie na całą szerokość
    alignItems: 'flex-start', // Wyrównanie do góry
    marginTop: 10,
  },
  locationContainer: {
    padding: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    flex: 1, // Równomierne rozłożenie
    marginRight: 10, // Odstęp od drugiego kontenera
  },
  dateContainer: {
    padding: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    flex: 1, // Równomierne rozłożenie
  },
  locationText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    textAlign: 'center', // Wyśrodkowanie tekstu w kontenerze
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

export default EventCard;
