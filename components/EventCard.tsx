import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { fetchRatings } from "../utils/fetchRatings.ts";

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
  user?: { email: string | undefined } | null;
  
}

const EventCard: React.FC<EventCardProps> = ({ event, user}) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const maxDescriptionLength = 120;
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
      const loadRating = async () => {
        const ratings: { rating: number }[] = await fetchRatings(event.id);
        if (ratings.length > 0) {
          setAverageRating(
            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          );
        }
      };
      loadRating();
    }, []);
  const toggleExpanded = () => setExpanded(!expanded);
  const truncatedDescription =
    event.short_description.length > maxDescriptionLength
      ? event.short_description.substring(0, maxDescriptionLength) + "..."
      : event.short_description;

  // 🔢 Funkcja obliczająca czas trwania wydarzenia
  const calculateEventDuration = (start: string, end?: string) => {
    if (!end) return "Ongoing"; // Jeśli brak daty zakończenia

    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationInMs = endDate.getTime() - startDate.getTime();
    const durationInDays = durationInMs / (1000 * 60 * 60 * 24);

    return durationInDays === 1 ? "1 day" : `${Math.round(durationInDays)} days`;
  };

  return (
    <View style={styles.card}>
      {event.image_url && <Image source={{ uri: event.image_url }} style={styles.image} />}
      
       {/* Nazwa wydarzenia + ocena */}
       <View style={styles.headerRow}>
        <Text style={styles.name}>{event.name ?? "None"}</Text>
        <Text style={styles.rating}>
          ⭐ {averageRating ? averageRating.toFixed(1) : "No ratings yet"}
        </Text>
      </View>
      <Text style={styles.category}>{event.event_category?.name} Category</Text>

      <Text style={styles.description}>
        {expanded ? event.short_description : truncatedDescription}
      </Text>
      {event.short_description.length > maxDescriptionLength && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={styles.showMore}>{expanded ? "Show less" : "Show more"}</Text>
        </TouchableOpacity>
      )}

      {/* 📅 Data + czas trwania */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          📅 {new Date(event.start_date).toLocaleDateString()} -{" "}
          {event.end_date ? new Date(event.end_date).toLocaleDateString() : "No end date"}
        </Text>
        <Text style={styles.infoText}>
          ⏳ Duration: {calculateEventDuration(event.start_date, event.end_date)}
        </Text>
        <Text style={styles.infoText}>
          📍 {event.location?.street_name} {event.location?.apartment_number},{" "}
          {event.location?.city_name} {event.location?.zip_code},{" "}
          {event.location?.country_name}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
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
  );
};

// 🎨 Style
const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 18,
    marginVertical: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    width: "93%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFB400",
  },
  category: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0066CC",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
    lineHeight: 20,
  },
  showMore: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  infoContainer: {
    backgroundColor: "#f6f6f6",
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#011C40",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventCard;
