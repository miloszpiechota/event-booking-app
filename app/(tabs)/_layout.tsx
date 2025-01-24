import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarStyle: { backgroundColor: "#fff" } }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: "Home", 
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={24} color="black" />
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: "Profile", 
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={24} color="black" /> 
        }} 
      />
      <Tabs.Screen 
        name="tickets" 
        options={{ 
          title: "Tickets", 
          tabBarIcon: ({ color, size }) => <Foundation name="ticket" size={24} color="black" /> 
        }} 
      />
    </Tabs>
    
  );
}
