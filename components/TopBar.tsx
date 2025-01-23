import React from 'react'
import { StyleSheet,View, Text,Dimensions, TouchableOpacity} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
interface User {
  email?: string;
}
interface TopBarProps {
    user: User | null;  // Użytkownik może być null
    events: any[];      // Lista wydarzeń
    locations: any[];
  }
const { width } = Dimensions.get('window');
const TopBar = ({ user, events,locations }: TopBarProps) => {
  return (
    <View style={styles.container}>
        
         <Text style={styles.title}>Welcome, {user?.email || 'Guest'}!</Text>
         <TouchableOpacity >
         <FontAwesome6 name="location-dot" size={24} color="black" />
         <Text style={styles.title}>{locations[0]?.city_name || 'Unknown City'}</Text>
          
        </TouchableOpacity>

    </View>
  );
};
const styles = StyleSheet.create({
container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
},
title: { fontSize: Math.min(20, width * 0.1), textAlign: 'center', color: 'black', marginTop: 10 },
});

export default TopBar
