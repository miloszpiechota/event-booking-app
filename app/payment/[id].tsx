import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react'
import { ScrollView, StyleSheet,View,Text,Image, TouchableOpacity} from 'react-native'

const TicketPayment = () => {
  const { eventData } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState('standard');
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
<View style={styles.separator}></View>

  


        </View>

        
              
        

        
             
              
              <View style={styles.area}>
              <Text style={styles.title}> Select pricing option:</Text>
<View style={styles.segmentedContainer}>
  <TouchableOpacity
    style={[
      styles.segmentButton,
      selectedOption === 'standard' ? styles.segmentButtonSelected : styles.segmentButtonUnselected
    ]}
    onPress={() => setSelectedOption('standard')}
  >
    <Text style={[styles.segmentText, selectedOption === 'standard' ? styles.segmentTextSelected : styles.segmentTextUnselected]}>
      Standard
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.segmentButton,
      selectedOption === 'vip' ? styles.segmentButtonSelected : styles.segmentButtonUnselected
    ]}
    onPress={() => setSelectedOption('vip')}
  >
    <Text style={[styles.segmentText, selectedOption === 'vip' ? styles.segmentTextSelected : styles.segmentTextUnselected]}>
      VIP
    </Text>
    
  </TouchableOpacity>
  
</View>
<Text style={styles.info}>
      Selected: {selectedOption === 'standard' ? 'Standard' : 'VIP'}
    </Text>
    <Text style={styles.info}>
      Price: {selectedOption === 'standard' ? event.event_ticket?.ticket_pricing?.ticket_price : event.event_ticket?.ticket_pricing?.vip_price}
    </Text>

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
 
  description: {
    fontSize: 16,
    color: '#555',
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
 
 
  
  infoContainer: { alignItems: 'center', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  info: { fontSize: 16, color: '#333', marginTop: 15 },
  segmentedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    
  },
  segmentButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  segmentButtonSelected: {
    backgroundColor: '#333',
  },
  segmentButtonUnselected: {
    backgroundColor: 'white',
  },
  segmentText: {
    fontSize: 16,
  },
  segmentTextSelected: {
    color: 'white',
  },
  segmentTextUnselected: {
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 12,
  },
   
   
  
});

export default TicketPayment
