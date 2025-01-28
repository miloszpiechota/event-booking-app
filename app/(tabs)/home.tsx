import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button, FlatList } from 'react-native';
import { supabase } from '../../superbase';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import EventCard from '../../components/EventCard';  // Importowanie komponentu EventCard
import TopBar from '../../components/TopBar';
import { fetchEvents } from '../../utils/fetchEvents';
import { useSession } from '@/utils/useSession';

const { width } = Dimensions.get('window');

export default function Home() {

  const router = useRouter();
  const [user, setUser] = useState<{ email: string | undefined } | null>(null);
  const [events, setEvents] = useState<any[]>([]);  // Stan dla przechowywania listy wydarzeń
  const [locations, setLocations] = useState<any[]>([]);  // Stan dla przechowywania listy lokalizacji
  const session = useSession();  // Używamy hooka do pobrania sesji
  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
    };

    loadEvents();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

 
  

  return (
    <View style={styles.container}>
     
    <TopBar user={session?.user} events={events} locations={locations} />
    
      

      {/* FlatList renderuje EventCard z listą wydarzeń */}
      <FlatList 
        ListHeaderComponent={Header}
        data={events} 
        renderItem={({ item }) => <EventCard event={item} user={session?.user}/>}  // Przekazujemy `event` do EventCard
        keyExtractor={(item) => item.id.toString()} 
      />

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: Math.min(25, width * 0.1), textAlign: 'center', color: 'black', marginTop: 10 },
  subTitle: { fontSize: Math.min(18, width * 0.05), textAlign: 'center', color: '#7f8c8d', marginVertical: 20 },
  image: { width: 400, height: 200, resizeMode: 'contain', marginVertical: 20 },
});
