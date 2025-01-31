// components/EventCard.tsx
import React from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface Event {
  id: string;
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

interface EventCardProps {
  event: Event;
  user?: { email: string | undefined } | null; // Dodajemy user jako prop
}

const EventCard: React.FC<EventCardProps> = ({ event, user }) => {
  const router = useRouter();

  return (
    <View style={styles.card}>
      {/* Obrazek */}
      {event.image_url && (
        <Image source={{ uri: event.image_url }} style={styles.image} />
      )}

      {/* Treść wydarzenia */}
      <Text style={styles.name}>{event.name ?? "None"}</Text>
      <Text style={styles.name}>{event.event_category?.name}</Text>
      <Text style={styles.description}>
        {event.short_description ?? "None"}
      </Text>

      {/* Informacje o dacie i lokalizacji */}
      <View style={styles.infoContainer}>
        <Text>
          📅 {new Date(event.start_date).toLocaleDateString()} -{" "}
          {event.end_date
            ? new Date(event.end_date).toLocaleDateString()
            : "None"}
        </Text>
        <Text>
          📍 {event.location?.street_name} {event.location?.apartment_number},
          {event.location?.city_name} {event.location?.zip_code},{" "}
          {event.location?.country_name}
        </Text>
      </View>

      {/* Pokazanie danych użytkownika (jeśli istnieją) */}
      {user && (
        <View style={styles.userInfo}>
          <Text>User Email: {user.email}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={() =>
            router.push({
              pathname: `/event/${event.id}`,
              params: {
                eventData: JSON.stringify(event),
                userData: JSON.stringify(user),
              },
            })
          }
        >
          <Text style={styles.buttonText}>Show Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "93%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
  },
  userInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 5,
  },
  area: {
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#011C40',  // Tło przycisku
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#011C40', // Tło dla przycisku
  },
  buttonText: {
    color: '#fff',  // Zmieniamy kolor tekstu na biały
    fontSize: 16,  // Rozmiar czcionki
    fontWeight: 'bold',  // Pogrubienie tekstu
  },
});

export default EventCard;
