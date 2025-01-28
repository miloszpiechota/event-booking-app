import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { fetchRatings } from "@/utils/fetchRatings";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import EventMap from "../../components/EventMap";
import StarRating from "../../components/StarRating";
import { supabase } from "@/superbase";
import { createRating } from "@/utils/createRatings";
const EventDetails = () => {
  const router = useRouter();
  const { eventData, userData } = useLocalSearchParams();
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const user = userData ? JSON.parse(userData as string) : null;
  if (!eventData) {
    return <Text>Event not found</Text>;
  }

  const event = JSON.parse(eventData as string);

  useEffect(() => {
    const loadRating = async () => {
      const ratings = await fetchRatings(event.id);
      if (ratings.length > 0) {
        setAverageRating(
          ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        );
      }
    };
    loadRating();
  }, []);

  // Zmień funkcję handleRate, aby korzystała z createRating
const handleRate = (rating: number) => {
    createRating(rating, event.id, user?.id, setUserRating);
  };
  
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image_url }} style={styles.image} />
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.title}>{event.event_category?.name}</Text>

      <Text style={styles.description}>{event.short_description}</Text>
      <Text style={styles.description}>{event.long_description}</Text>

      <Text style={styles.info}>
        📅 {new Date(event.start_date).toLocaleDateString()} -{" "}
        {event.end_date
          ? new Date(event.end_date).toLocaleDateString()
          : "None"}
      </Text>

      <Text style={styles.info}>
        📍 {event.location?.street_name} {event.location?.apartment_number},
        {event.location?.city_name} {event.location?.zip_code},{" "}
        {event.location?.country_name}
      </Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.info}>
          ⭐ Average rating:{" "}
          {averageRating ? averageRating.toFixed(1) : "No ratings yet"}
        </Text>
        <StarRating onRate={handleRate} />
      </View>

      {/* Mapka */}
      {event.location?.latitude && event.location?.longitude && (
        <EventMap
          location={{
            latitude: event.location.latitude,
            longitude: event.location.longitude,
          }}
        />
      )}

      {/* Przycisk */}
      <View style={styles.area}>
        <Button
          title="Book Ticket"
          color="black"
          onPress={() =>
            router.push({
              pathname: `/payment/${event.id}`,
              params: { eventData: JSON.stringify(event) },
            })
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
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
  ratingContainer: {
    alignItems: "center",
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});

export default EventDetails;
