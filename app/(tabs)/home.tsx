import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header.tsx';
import EventCard from '../../components/EventCard.tsx';  // Importowanie komponentu EventCard
import TopBar from '../../components/TopBar.tsx';
import { fetchEvents } from '../../utils/fetchEvents.ts';
import { useSession } from '../../utils/useSession.ts';
import { SelectedLocationContext } from '../../context/SelectedLocationContext.tsx';

const { width } = Dimensions.get('window');

export default function Home() {
  
  const [events, setEvents] = useState<any[]>([]); // Stan dla przechowywania listy wydarzeń
  const [locations, setLocations] = useState<any[]>([]); // Jeśli potrzebujesz listy lokalizacji do innych celów
  const session = useSession(); // Używamy hooka do pobrania sesji
  const { selectedLocation } = useContext(SelectedLocationContext); // Pobieramy wybraną lokalizację z kontekstu

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
    };

    loadEvents();
  }, []);

  // Filtrowanie wydarzeń: jeśli wybrano lokalizację, pokazujemy tylko te eventy, których city_name jest równy wybranemu
  const filteredEvents = selectedLocation 
    ? events.filter(event => event.location.city_name === selectedLocation.city_name)
    : events;

  return (
    <View style={styles.container}>
      <TopBar user={session?.user} events={events} locations={locations} />

      <FlatList 
        ListHeaderComponent={Header}
        data={filteredEvents} 
        renderItem={({ item }) => <EventCard event={item} user={session?.user} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No availible events</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: Math.min(25, width * 0.1), 
    textAlign: 'center', 
    color: 'black', 
    marginTop: 10 
  },
  subTitle: { 
    fontSize: Math.min(18, width * 0.05), 
    textAlign: 'center', 
    color: '#7f8c8d', 
    marginVertical: 20 
  },
  image: { 
    width: 400, 
    height: 200, 
    resizeMode: 'contain', 
    marginVertical: 20 
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
});
