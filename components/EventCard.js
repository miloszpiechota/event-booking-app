import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { ec_s } from "./EventCard.styles";
import { useNavigation } from "@react-navigation/native";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Miesiące są indeksowane od 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const EventCard = ({ item }) => {
  const formattedStartDate = formatDate(item.start_date);
  const formattedEndDate = formatDate(item.end_date);
  const locationName = item.location_name;
  const cityName = item.city_name;
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Pressable style={ec_s.card}>
        <Image style={ec_s.img_left} source={{ uri: item.photo }} />
        <View style={ec_s.info_right}>
          <Text style={ec_s.eventName}>{item.name}</Text>
          <Text style={ec_s.eventDates}>
            {formattedStartDate === formattedEndDate
              ? formattedStartDate
              : `${formattedStartDate} - ${formattedEndDate}`}
          </Text>
          <Text style={ec_s.eventLocation}>
            {locationName}, {cityName}
          </Text>

          <Pressable
            style={ec_s.bookButton}
            onPress={() =>
              navigation.navigate("Event", {
                title: item.name,
                photo: item.photo,
                description: item.description,
                location: locationName,
                city: cityName,
                startDate: item.start_date,
                endDate: item.end_date,
                categoryType: item.categoryType,
                isSeatCategorized: item.is_seat_categorized,
                eventTickets: item.eventTickets // Pass tickets to EventScreen
              })
            }
          >
            <Text style={ec_s.bookButtonText}>Book</Text>
          </Pressable>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default EventCard;
